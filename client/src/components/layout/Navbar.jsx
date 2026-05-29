import NotificationBell from "../notifications/NotificationBell";
const Navbar = ({
  notifications,
  showDropdown,
  setShowDropdown,
  markNotificationRead,
}) => {
  return (
    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        SWS AI Document Hub
      </h1>

      <NotificationBell
        notifications={
          notifications
        }
        showDropdown={
          showDropdown
        }
        setShowDropdown={
          setShowDropdown
        }
        markNotificationRead={
          markNotificationRead
        }
      />
    </div>
  );
};

export default Navbar;