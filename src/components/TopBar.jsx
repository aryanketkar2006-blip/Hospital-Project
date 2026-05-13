/**
 * TopBar — Top navigation bar for the dashboard app shell.
 * Displays page title on the left, search input, bell icon, and avatar on the right.
 * On mobile: includes hamburger button to toggle the sidebar overlay.
 * @param {{ title: string, user: object, onMenuToggle: function }} props
 */
export default function TopBar({ title, user, onMenuToggle }) {
  /** Extracts initials from user name for avatar */
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1 text-muted hover:text-dark-text cursor-pointer"
          aria-label="Toggle sidebar menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-dark-text">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] h-9 border border-border rounded-lg px-3 text-sm text-body-text focus:border-primary focus:ring-2 focus:ring-primary-border outline-none"
          />
        </div>

        {/* Bell icon */}
        <button className="relative p-1 text-muted hover:text-dark-text cursor-pointer" aria-label="Notifications">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
          {getInitials(user?.name)}
        </div>
      </div>
    </header>
  );
}
