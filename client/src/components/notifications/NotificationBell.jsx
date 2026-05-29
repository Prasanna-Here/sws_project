import {
    Bell,
    CheckCheck,
} from "lucide-react";


const NotificationBell = ({
    notifications,
    showDropdown,
    setShowDropdown,
    markNotificationRead,
    markAllRead,
}) => {

    const unreadCount =
        notifications.filter(
            (n) => !n.is_read
        ).length;

    return (
        <div className="relative">
            {/* BELL BUTTON */}
            <button
                onClick={() =>
                    setShowDropdown(
                        !showDropdown
                    )
                }
                className="relative"
            >
                <Bell size={22} />

                {unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </div>
                )}
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white border rounded-2xl shadow-lg z-50 overflow-hidden">
                    {/* HEADER */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h2 className="font-semibold">
                            Notifications
                        </h2>

                        <button
                            onClick={markAllRead}
                            className="text-sm text-blue-600"
                        >
                            Mark all read
                        </button>
                    </div>

                    {/* LIST */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-sm text-gray-500">
                                No notifications
                            </div>
                        ) : (
                            notifications.map(
                                (notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() =>
                                            markNotificationRead(
                                                notification.id
                                            )
                                        }
                                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!notification.is_read
                                            ? "bg-blue-50"
                                            : ""
                                            }`}
                                    >
                                        <p className="text-sm font-medium">
                                            {
                                                notification.message
                                            }
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(
                                                notification.created_at
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;