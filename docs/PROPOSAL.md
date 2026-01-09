# HA Developer Tools - Add-on Proposal

> A powerful web-based developer dashboard for Home Assistant power users, integrators, and developers.

## Overview

**HA Developer Tools** is a standalone Home Assistant add-on that provides a comprehensive web interface for debugging, monitoring, and managing Home Assistant installations. Unlike Claude Terminal Pro, this add-on focuses purely on data access and visualization without AI features.

### Target Users
- Home Assistant power users
- Smart home integrators
- Developers building custom integrations
- Users debugging automation issues
- System administrators managing HA installations

### Design Philosophy
- **No AI** - Pure data access and visualization
- **Fast** - Lightweight, responsive interface
- **Safe** - Read-heavy, write operations require confirmation
- **Accessible** - Works on mobile, tablet, and desktop
- **Offline-capable** - Core features work without internet

---

## Core Features

### 1. Entity Explorer

A powerful interface to browse, search, and inspect all Home Assistant entities.

**Features:**
- **Search & Filter**
  - Full-text search across entity IDs, friendly names, and attributes
  - Filter by domain (light, switch, sensor, automation, etc.)
  - Filter by area, device, or integration
  - Filter by state (on/off, unavailable, unknown)
  - Save custom filter presets

- **Entity Details View**
  - Current state and all attributes
  - State history graph (last 24h, 7d, 30d)
  - Related entities (same device, area, or integration)
  - Entity registry information (disabled, hidden, etc.)
  - Configuration entry details

- **Bulk Operations**
  - Select multiple entities
  - Export to CSV/JSON
  - Bulk enable/disable
  - Bulk rename (with preview)
  - Bulk move to area

- **Entity Comparison**
  - Side-by-side comparison of 2-4 entities
  - Attribute diff highlighting
  - State history overlay

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Entity Explorer                                    [Export] [+] │
├─────────────────────────────────────────────────────────────────┤
│ 🔍 Search entities...                                           │
│ [All Domains ▼] [All Areas ▼] [All States ▼] [More Filters...] │
├─────────────────────────────────────────────────────────────────┤
│ ☐ │ Entity ID              │ State    │ Area      │ Last Changed│
│───┼────────────────────────┼──────────┼───────────┼─────────────│
│ ☐ │ light.living_room      │ on       │ Living    │ 2 min ago   │
│ ☐ │ light.bedroom          │ off      │ Bedroom   │ 1 hour ago  │
│ ☐ │ sensor.temperature     │ 22.5°C   │ Living    │ 30 sec ago  │
│ ☐ │ automation.morning     │ on       │ —         │ 5 hours ago │
└─────────────────────────────────────────────────────────────────┘
```

---

### 2. Log Viewer

Real-time log streaming with powerful filtering and analysis tools.

**Features:**
- **Live Streaming**
  - Real-time log updates via WebSocket
  - Pause/resume streaming
  - Auto-scroll with manual override
  - Timestamp display options (relative, absolute, ISO)

- **Filtering**
  - By log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
  - By integration/component
  - By keyword/regex
  - Time range selection
  - Combine multiple filters with AND/OR

- **Log Analysis**
  - Error frequency chart
  - Most common errors (grouped)
  - Integration health summary
  - Anomaly detection (unusual error spikes)

- **Export & Share**
  - Export filtered logs to file
  - Generate shareable error report
  - Copy formatted for GitHub issues
  - Redact sensitive information automatically

- **Saved Searches**
  - Save filter combinations
  - Quick access to common searches:
    - "All Errors Today"
    - "Z-Wave Issues"
    - "Automation Failures"

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Log Viewer                              [▶ Live] [Export] [⚙️]  │
├─────────────────────────────────────────────────────────────────┤
│ Level: [ERROR ▼] Integration: [All ▼] Search: [___________] 🔍 │
├─────────────────────────────────────────────────────────────────┤
│ 22:45:01 ERROR (MainThread) [homeassistant.components.zwave]   │
│          Node 5: Communication failed after 3 retries          │
│                                                                 │
│ 22:44:58 WARNING (MainThread) [homeassistant.components.mqtt]  │
│          Connection lost, reconnecting...                       │
│                                                                 │
│ 22:44:55 ERROR (MainThread) [custom_components.hacs]           │
│          Rate limit exceeded for GitHub API                     │
├─────────────────────────────────────────────────────────────────┤
│ Errors: 23 │ Warnings: 45 │ Last hour │ [View Analysis]         │
└─────────────────────────────────────────────────────────────────┘
```

---

### 3. Service Caller

Interactive interface to discover, test, and call Home Assistant services.

**Features:**
- **Service Browser**
  - Browse all available services by domain
  - Search services by name or description
  - View service schema and required fields
  - See example payloads

- **Interactive Form**
  - Auto-generated form based on service schema
  - Entity picker for target selection
  - JSON editor for advanced users
  - Field validation before calling

- **Call History**
  - Log of recent service calls
  - Re-run previous calls with one click
  - Edit and re-run with modifications
  - Save frequently used calls as "favorites"

- **Batch Caller**
  - Call multiple services in sequence
  - Add delays between calls
  - Create simple scripts on-the-fly
  - Export as YAML script

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Service Caller                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Service: [light.turn_on                              ▼] 🔍      │
├─────────────────────────────────────────────────────────────────┤
│ Target Entities:                                                │
│ [light.living_room, light.kitchen                    ] [Pick]   │
│                                                                 │
│ Parameters:                                                     │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ brightness_pct: [75        ]  (0-100)                       │ │
│ │ color_temp:     [400       ]  (153-500 mireds)              │ │
│ │ transition:     [2         ]  (seconds)                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [View as YAML]  [View as JSON]                                  │
│                                                                 │
│                              [Call Service]  [Save to Favorites]│
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. Automation Debugger

Tools for testing, debugging, and understanding automations.

**Features:**
- **Automation List**
  - All automations with status (on/off/unavailable)
  - Last triggered time
  - Trigger count (today, week, month)
  - Quick enable/disable toggle

- **Automation Inspector**
  - View full YAML configuration
  - Trigger breakdown with explanation
  - Condition evaluation (current state)
  - Action sequence visualization

- **Trace Viewer**
  - Visual timeline of automation execution
  - Step-by-step breakdown
  - Variable values at each step
  - Identify where automation stopped/failed

- **Manual Trigger**
  - Trigger automation with custom context
  - Override trigger variables
  - Dry-run mode (show what would happen)
  - Watch execution in real-time

- **Condition Tester**
  - Test conditions without running automation
  - See why condition passed/failed
  - Test with hypothetical entity states

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Automation Debugger                                             │
├─────────────────────────────────────────────────────────────────┤
│ automation.motion_lights                              [Enabled] │
├─────────────────────────────────────────────────────────────────┤
│ TRIGGERS (any)                                                  │
│ ├─ 🔘 State: binary_sensor.motion_living → on                  │
│ └─ 🔘 State: binary_sensor.motion_kitchen → on                 │
│                                                                 │
│ CONDITIONS (all)                                      [Test ▶]  │
│ ├─ ✅ Sun is below horizon (currently: true)                   │
│ └─ ✅ input_boolean.guest_mode is off (currently: off)         │
│                                                                 │
│ ACTIONS                                                         │
│ ├─ 1. Call light.turn_on (target: light.living_room)           │
│ ├─ 2. Delay 00:05:00                                           │
│ └─ 3. Call light.turn_off (target: light.living_room)          │
│                                                                 │
│ [View YAML] [View Traces] [Trigger Now] [Dry Run]              │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Config Validator

Validate Home Assistant configuration files without restarting.

**Features:**
- **Full Config Check**
  - Validate entire configuration
  - Show errors with line numbers
  - Suggestions for common mistakes
  - Link to documentation

- **File Browser**
  - Browse /config directory
  - Syntax highlighting for YAML
  - Inline error markers
  - Quick navigation to includes

- **Schema Validation**
  - Validate against known schemas
  - Check for deprecated options
  - Suggest newer alternatives
  - Integration-specific validation

- **Diff Viewer**
  - Compare current vs. last known good config
  - Show changes since last restart
  - Highlight potentially breaking changes

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Config Validator                           [Validate All] [⚙️]  │
├─────────────────────────────────────────────────────────────────┤
│ 📁 configuration.yaml                                           │
│ 📁 automations.yaml                                             │
│ 📁 scripts.yaml                                                 │
│ 📁 scenes.yaml                                                  │
│ 📁 customize.yaml                                               │
│ 📁 secrets.yaml (hidden)                                        │
├─────────────────────────────────────────────────────────────────┤
│ Validation Results:                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ❌ ERROR in automations.yaml:45                             │ │
│ │    Invalid trigger type: 'state_changed'                    │ │
│ │    Did you mean: 'state'?                                   │ │
│ │    📖 Documentation                                         │ │
│ │                                                             │ │
│ │ ⚠️ WARNING in configuration.yaml:12                         │ │
│ │    'homeassistant.customize' is deprecated                  │ │
│ │    Use 'homeassistant.customize_glob' instead               │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

### 6. Database Explorer

Query and explore the Home Assistant database.

**Features:**
- **State History**
  - Query historical states for any entity
  - Time range selection
  - Export to CSV
  - Visualize as chart

- **Statistics Browser**
  - Long-term statistics data
  - Aggregation options (hourly, daily, weekly)
  - Compare multiple entities
  - Detect data gaps

- **Database Health**
  - Database size and growth rate
  - Table sizes breakdown
  - Purge old data
  - Identify space-heavy entities

- **SQL Query (Advanced)**
  - Raw SQL queries (read-only)
  - Predefined useful queries
  - Export results
  - Query history

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Database Explorer                                               │
├─────────────────────────────────────────────────────────────────┤
│ [State History] [Statistics] [DB Health] [SQL Query]           │
├─────────────────────────────────────────────────────────────────┤
│ Entity: [sensor.energy_consumption                     ] [Pick] │
│ Range:  [Last 7 days ▼]  From: [2025-01-02] To: [2025-01-09]   │
├─────────────────────────────────────────────────────────────────┤
│     │                                              ╭──╮         │
│ 5kW │                              ╭──╮    ╭──╮   │  │         │
│     │      ╭──╮    ╭──╮    ╭──╮   │  │   │  │   │  │         │
│ 2kW │  ──╮│  │╭──│  │╭──│  │──│  │──│  │──│  │──│         │
│     │────────────────────────────────────────────────────────   │
│     Jan 2   Jan 3   Jan 4   Jan 5   Jan 6   Jan 7   Jan 8      │
├─────────────────────────────────────────────────────────────────┤
│ Records: 10,234 │ Avg: 3.2 kW │ Min: 0.5 kW │ Max: 5.8 kW     │
│                                              [Export CSV]       │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7. Event Monitor

Real-time event bus monitoring and analysis.

**Features:**
- **Live Event Stream**
  - Subscribe to all events or specific types
  - Real-time updates via WebSocket
  - Event payload inspection
  - Timestamp and origin tracking

- **Event Filtering**
  - Filter by event type
  - Filter by data content
  - Regex pattern matching
  - Exclude noisy events

- **Event Firing**
  - Fire custom events
  - JSON payload editor
  - Event templates
  - Test event-triggered automations

- **Event Statistics**
  - Event frequency by type
  - Busiest event sources
  - Event timeline visualization

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Event Monitor                              [▶ Live] [Fire Event]│
├─────────────────────────────────────────────────────────────────┤
│ Filter: [state_changed, call_service          ] [+ Add Filter] │
├─────────────────────────────────────────────────────────────────┤
│ 22:47:01.234 │ state_changed                                    │
│              │ entity_id: sensor.temperature                    │
│              │ old_state: 22.4 → new_state: 22.5                │
│──────────────┼──────────────────────────────────────────────────│
│ 22:47:00.891 │ call_service                                     │
│              │ domain: light, service: turn_on                  │
│              │ entity_id: light.living_room                     │
│──────────────┼──────────────────────────────────────────────────│
│ 22:46:59.102 │ automation_triggered                             │
│              │ entity_id: automation.motion_lights              │
│              │ source: binary_sensor.motion                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8. Integration Manager

Overview and management of all installed integrations.

**Features:**
- **Integration Dashboard**
  - All integrations with health status
  - Device and entity counts
  - Error indicators
  - Quick access to integration options

- **Integration Details**
  - All devices provided
  - All entities provided
  - Configuration entry details
  - Integration-specific diagnostics

- **Reload & Restart**
  - Reload individual integrations
  - Restart with confirmation
  - View reload history

- **Diagnostics Export**
  - Generate diagnostic report
  - Automatic sensitive data redaction
  - Format for GitHub issues

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Integration Manager                                             │
├─────────────────────────────────────────────────────────────────┤
│ 🔍 Search integrations...                                       │
├─────────────────────────────────────────────────────────────────┤
│ Integration          │ Status  │ Devices │ Entities │ Actions  │
│──────────────────────┼─────────┼─────────┼──────────┼──────────│
│ 🔌 Z-Wave JS         │ ✅ OK   │ 24      │ 87       │ [⚙️] [🔄]│
│ 💡 Philips Hue       │ ✅ OK   │ 12      │ 36       │ [⚙️] [🔄]│
│ 🌡️ OpenWeatherMap    │ ✅ OK   │ 1       │ 8        │ [⚙️] [🔄]│
│ 📺 Google Cast       │ ⚠️ WARN │ 3       │ 6        │ [⚙️] [🔄]│
│ 🔊 Sonos             │ ❌ ERR  │ 0       │ 0        │ [⚙️] [🔄]│
├─────────────────────────────────────────────────────────────────┤
│ Total: 45 integrations │ 2 warnings │ 1 error                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 9. Template Playground

Test and develop Jinja2 templates interactively.

**Features:**
- **Template Editor**
  - Syntax highlighting for Jinja2
  - Auto-completion for entities, states, attributes
  - Real-time rendering
  - Error highlighting

- **Template Library**
  - Common template examples
  - Save custom templates
  - Share templates (export/import)

- **Context Inspector**
  - Available variables
  - Entity states browser
  - Attribute explorer

- **Template Functions**
  - List of available functions
  - Documentation links
  - Usage examples

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ Template Playground                        [Examples] [Save]    │
├─────────────────────────────────────────────────────────────────┤
│ Template:                                                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ {% set temp = states('sensor.temperature') | float %}      │ │
│ │ {% if temp > 25 %}                                          │ │
│ │   It's hot! ({{ temp }}°C)                                  │ │
│ │ {% else %}                                                  │ │
│ │   Temperature is normal ({{ temp }}°C)                      │ │
│ │ {% endif %}                                                 │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Result:                                                         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Temperature is normal (22.5°C)                              │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Available: [states] [is_state] [state_attr] [now] [+42 more]   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 10. System Monitor

Overview of Home Assistant system health.

**Features:**
- **Resource Usage**
  - CPU, memory, disk usage
  - Historical graphs
  - Per-process breakdown
  - Alert thresholds

- **HA Core Status**
  - Current version
  - Update availability
  - Uptime
  - Restart history

- **Add-on Status**
  - All add-ons with status
  - Resource usage per add-on
  - Quick start/stop/restart

- **Network Status**
  - Connected integrations
  - API request rates
  - WebSocket connections
  - Failed connection attempts

**UI Mockup:**
```
┌─────────────────────────────────────────────────────────────────┐
│ System Monitor                                                  │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐          │
│ │ CPU           │ │ Memory        │ │ Disk          │          │
│ │    ▁▃▅▇█▇▅▃   │ │  ████████░░   │ │  ██████░░░░   │          │
│ │     23%       │ │   2.1/4 GB    │ │   58% used    │          │
│ └───────────────┘ └───────────────┘ └───────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ Home Assistant Core                                             │
│ Version: 2025.1.0 │ Uptime: 5 days │ [Check Updates] [Restart] │
├─────────────────────────────────────────────────────────────────┤
│ Recent Events:                                                  │
│ • 22:45 - Integration reloaded: zwave_js                       │
│ • 18:30 - Backup completed successfully                        │
│ • 12:00 - Automation triggered: daily_report                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Additional Features

### Quick Actions Dashboard
- Customizable dashboard with widgets
- Drag-and-drop layout
- Pin frequently used tools
- Keyboard shortcuts

### Notification Center
- System alerts and warnings
- Integration issues
- Update notifications
- Custom alert rules

### Export Center
- Bulk export automations, scripts, scenes
- Export as YAML or JSON
- Version comparison
- Backup before changes

### Documentation Links
- Context-aware documentation
- Quick links to HA docs
- Community forum search
- Integration-specific help

---

## Technical Architecture

### Stack Options

**Option A: Python + FastAPI (Recommended)**
```
├── Backend: Python 3.11+
│   ├── FastAPI for REST API
│   ├── WebSockets for real-time features
│   ├── SQLAlchemy for database access
│   └── Home Assistant API client
│
├── Frontend: Modern SPA
│   ├── React or Vue.js
│   ├── TailwindCSS for styling
│   ├── Chart.js for visualizations
│   └── Monaco Editor for code editing
│
└── Container: Alpine Linux
    ├── Nginx for static files
    └── Supervisor for process management
```

**Option B: Node.js + Express**
```
├── Backend: Node.js 20+
│   ├── Express.js for REST API
│   ├── Socket.io for real-time
│   └── Home Assistant WebSocket API
│
├── Frontend: (same as Option A)
│
└── Container: Alpine Linux
```

### Home Assistant Integration

**API Access:**
```python
# Using Supervisor API
SUPERVISOR_TOKEN = os.environ.get('SUPERVISOR_TOKEN')
SUPERVISOR_API = 'http://supervisor'
HA_API = 'http://supervisor/core/api'

# Endpoints used:
# - GET /core/api/states - All entity states
# - GET /core/api/services - Available services
# - POST /core/api/services/{domain}/{service} - Call service
# - GET /core/api/events - Event types
# - GET /core/api/config - Configuration
# - GET /core/api/history/period - State history
# - WS /core/websocket - Real-time updates
```

**Required Permissions (config.yaml):**
```yaml
hassio_api: true
hassio_role: manager
homeassistant_api: true
auth_api: true
```

### Add-on Structure
```
ha-developer-tools/
├── config.yaml              # Add-on configuration
├── Dockerfile               # Container definition
├── build.yaml              # Multi-arch build config
├── CHANGELOG.md
├── README.md
├── rootfs/
│   ├── etc/
│   │   ├── nginx/          # Nginx config
│   │   └── services.d/     # S6 service definitions
│   └── opt/
│       └── ha-dev-tools/
│           ├── backend/    # Python/Node backend
│           └── frontend/   # Built SPA
└── frontend/               # Frontend source
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## Configuration Options

```yaml
# config.yaml options
options:
  # General
  theme: "auto"  # auto, light, dark
  language: "en"

  # Security
  require_admin: true
  read_only_mode: false
  hide_secrets: true

  # Features
  enable_sql_queries: false
  enable_service_calls: true
  enable_event_firing: false

  # Performance
  max_log_lines: 1000
  history_days: 7
  refresh_interval: 5

schema:
  theme: list(auto|light|dark)
  language: str
  require_admin: bool
  read_only_mode: bool
  hide_secrets: bool
  enable_sql_queries: bool
  enable_service_calls: bool
  enable_event_firing: bool
  max_log_lines: int(100,10000)
  history_days: int(1,30)
  refresh_interval: int(1,60)
```

---

## Security Considerations

### Access Control
- Require Home Assistant authentication
- Admin-only option for sensitive features
- Read-only mode for safe browsing
- Rate limiting on write operations

### Data Protection
- Automatic secrets redaction in logs
- Hidden secrets.yaml content
- Redacted diagnostics export
- No credential storage

### Audit Trail
- Log all service calls
- Track configuration changes
- Export audit log
- Integration with HA logbook

---

## Development Phases

### Phase 1: MVP (Core Features)
- [ ] Entity Explorer (basic search & view)
- [ ] Log Viewer (live streaming & filtering)
- [ ] Service Caller (basic form)
- [ ] System Monitor (basic stats)

### Phase 2: Enhanced Features
- [ ] Automation Debugger
- [ ] Config Validator
- [ ] Template Playground
- [ ] Event Monitor

### Phase 3: Advanced Features
- [ ] Database Explorer
- [ ] Integration Manager
- [ ] Custom Dashboard
- [ ] Export Center

### Phase 4: Polish
- [ ] Mobile optimization
- [ ] Keyboard shortcuts
- [ ] Themes & customization
- [ ] Documentation

---

## Competitive Analysis

### Existing Tools
1. **Built-in Developer Tools** (HA Core)
   - Basic but limited UI
   - No log filtering
   - Limited automation debugging

2. **VS Code HA Extension**
   - Good for config editing
   - Requires VS Code
   - Not accessible from HA UI

3. **AppDaemon**
   - Python scripting focus
   - Not a general debug tool
   - Steeper learning curve

### Differentiation
- **All-in-one** dashboard for debugging
- **Web-based** - no external tools needed
- **Real-time** - live updates everywhere
- **Safe** - read-focused with confirmations
- **Mobile-friendly** - debug from anywhere

---

## Resources

### Useful APIs
- [Home Assistant REST API](https://developers.home-assistant.io/docs/api/rest)
- [Home Assistant WebSocket API](https://developers.home-assistant.io/docs/api/websocket)
- [Supervisor API](https://developers.home-assistant.io/docs/api/supervisor/endpoints)

### UI Inspiration
- Grafana dashboards
- Portainer (Docker UI)
- Home Assistant built-in developer tools
- VS Code's debug interface

---

## Open Questions

1. **Single-page app or multi-page?**
   - SPA = smoother UX, more complex
   - MPA = simpler, faster initial load

2. **WebSocket everywhere or polling for some features?**
   - WS = real-time, more connections
   - Polling = simpler, fewer resources

3. **Store preferences in HA or add-on?**
   - HA = persists across reinstalls
   - Add-on = simpler implementation

4. **Support for custom components?**
   - Could show custom component diagnostics
   - More complex, potential security issues

---

## Next Steps

1. **Validate idea** - Get feedback from HA community
2. **Design mockups** - Create detailed Figma/wireframes
3. **Prototype MVP** - Build Phase 1 features
4. **Alpha testing** - Limited release for feedback
5. **Iterate** - Improve based on feedback
6. **Public release** - Submit to HA add-on store

---

*Document created: January 2026*
*Author: Javier Santos (@esjavadex)*
*Status: Proposal/Planning*
