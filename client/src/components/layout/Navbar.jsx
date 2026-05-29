import NotificationBell from "../notifications/NotificationBell";

const Navbar = ({
  notifications,
  showDropdown,
  setShowDropdown,
  markNotificationRead,
  markAllRead,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent tracking-tight">
          SWS AI Document Hub
        </h1>
      </div>

      {/* RIGHT */}
      <NotificationBell
        notifications={notifications}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        markNotificationRead={markNotificationRead}
        markAllRead={markAllRead}
      />
    </div>
  );
};

export default Navbar;

