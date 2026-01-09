# HA Developer Tools

A powerful web-based developer dashboard for Home Assistant power users, integrators, and developers.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-Add--on-blue.svg)](https://www.home-assistant.io/)

## Overview

**HA Developer Tools** is a standalone Home Assistant add-on that provides a comprehensive web interface for debugging, monitoring, and managing Home Assistant installations. This add-on focuses purely on data access and visualization - no AI features.

## Features

- **Entity Explorer** - Search, filter, and inspect all entities
- **Log Viewer** - Real-time log streaming with powerful filtering
- **Service Caller** - Interactive service testing interface
- **Automation Debugger** - Trace viewer and condition tester
- **Config Validator** - Validate YAML without restarting
- **Database Explorer** - Query history and statistics
- **Event Monitor** - Live event bus inspection
- **Integration Manager** - Health status and diagnostics
- **Template Playground** - Test Jinja2 templates live
- **System Monitor** - CPU, memory, disk, and uptime

## Installation

### Prerequisites
- Home Assistant OS or Supervised installation
- Home Assistant 2024.1.0 or newer

### Add Repository

1. Open Home Assistant
2. Go to **Settings** → **Add-ons** → **Add-on Store**
3. Click the menu (⋮) → **Repositories**
4. Add: `https://github.com/ESJavadex/ha-developer-tools`
5. Find "HA Developer Tools" and click **Install**

## Screenshots

*Coming soon*

## Documentation

See [docs/PROPOSAL.md](docs/PROPOSAL.md) for the full feature proposal and technical details.

## Development Status

🚧 **Work in Progress** - This add-on is currently in development.

### Roadmap

- [ ] **Phase 1 (MVP)**: Entity Explorer, Log Viewer, Service Caller, System Monitor
- [ ] **Phase 2**: Automation Debugger, Config Validator, Template Playground
- [ ] **Phase 3**: Database Explorer, Integration Manager, Event Monitor
- [ ] **Phase 4**: Polish, mobile optimization, themes

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**Javier Santos** ([@esjavadex](https://github.com/esjavadex))

## Related Projects

- [Claude Terminal Pro](https://github.com/ESJavadex/claude-code-ha) - Claude Code CLI for Home Assistant
