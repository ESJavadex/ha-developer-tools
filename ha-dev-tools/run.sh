#!/usr/bin/with-contenv bashio

set -e

bashio::log.info "Starting HA Developer Tools..."

# Get configuration
CONFIG_THEME=$(bashio::config 'theme')
CONFIG_READ_ONLY=$(bashio::config 'read_only_mode')
CONFIG_HIDE_SECRETS=$(bashio::config 'hide_secrets')

# Export environment variables for the backend
export SUPERVISOR_TOKEN="${SUPERVISOR_TOKEN}"
export HA_DEV_TOOLS_THEME="${CONFIG_THEME}"
export HA_DEV_TOOLS_READ_ONLY="${CONFIG_READ_ONLY}"
export HA_DEV_TOOLS_HIDE_SECRETS="${CONFIG_HIDE_SECRETS}"

bashio::log.info "Configuration:"
bashio::log.info "  - Theme: ${CONFIG_THEME}"
bashio::log.info "  - Read-only mode: ${CONFIG_READ_ONLY}"
bashio::log.info "  - Hide secrets: ${CONFIG_HIDE_SECRETS}"

# Start nginx in background for serving frontend
bashio::log.info "Starting nginx..."
nginx

# Start Python backend
bashio::log.info "Starting backend API..."
cd /opt/ha-dev-tools/backend
exec python3 -m uvicorn main:app --host 0.0.0.0 --port 8098
