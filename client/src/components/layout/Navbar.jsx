import NotificationBell from "../notifications/NotificationBell";

const Navbar = ({
  notifications,
  showDropdown,
  setShowDropdown,
  markNotificationRead,
  markAllRead,
}) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">
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

