import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#1c1c1c]">
      {/* Header */}
      <header className="bg-[#252525] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛠️</span>
            <h1 className="text-xl font-semibold text-white">HA Developer Tools</h1>
          </div>
          <nav className="flex items-center gap-4">
            <NavItem href="#entities" active>Entity Explorer</NavItem>
            <NavItem href="#logs">Logs</NavItem>
            <NavItem href="#services">Services</NavItem>
            <NavItem href="#templates">Templates</NavItem>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

interface NavItemProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

function NavItem({ href, children, active }: NavItemProps) {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded transition-colors ${
        active
          ? 'bg-[#03a9f4] text-white'
          : 'text-gray-400 hover:text-white hover:bg-[#303030]'
      }`}
    >
      {children}
    </a>
  );
}
