"""
HA Developer Tools - Backend API
"""
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import aiohttp

app = FastAPI(
    title="HA Developer Tools API",
    description="Backend API for Home Assistant Developer Tools",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Assistant API configuration
SUPERVISOR_TOKEN = os.environ.get("SUPERVISOR_TOKEN")
HA_API_URL = "http://supervisor/core/api"

async def ha_request(method: str, endpoint: str, data: dict = None):
    """Make a request to the Home Assistant API."""
    headers = {
        "Authorization": f"Bearer {SUPERVISOR_TOKEN}",
        "Content-Type": "application/json",
    }

    async with aiohttp.ClientSession() as session:
        url = f"{HA_API_URL}{endpoint}"
        async with session.request(method, url, headers=headers, json=data) as response:
            if response.status == 200:
                return await response.json()
            else:
                raise HTTPException(status_code=response.status, detail=await response.text())


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "service": "ha-dev-tools"}


@app.get("/api/states")
async def get_states():
    """Get all entity states."""
    return await ha_request("GET", "/states")


@app.get("/api/states/{entity_id}")
async def get_state(entity_id: str):
    """Get state for a specific entity."""
    return await ha_request("GET", f"/states/{entity_id}")


@app.get("/api/services")
async def get_services():
    """Get all available services."""
    return await ha_request("GET", "/services")


@app.get("/api/config")
async def get_config():
    """Get Home Assistant configuration."""
    return await ha_request("GET", "/config")


@app.get("/api/events")
async def get_events():
    """Get available event types."""
    return await ha_request("GET", "/events")


@app.post("/api/services/{domain}/{service}")
async def call_service(domain: str, service: str, data: dict = None):
    """Call a Home Assistant service."""
    read_only = os.environ.get("HA_DEV_TOOLS_READ_ONLY", "false").lower() == "true"
    if read_only:
        raise HTTPException(status_code=403, detail="Read-only mode enabled")

    return await ha_request("POST", f"/services/{domain}/{service}", data)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8098)
