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
                className="relative p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100/80 rounded-xl transition duration-200 focus:outline-none"
            >
                <Bell size={20} />

                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center ring-2 ring-white">
                        {unreadCount}
                    </div>
                )}
            </button>

            {/* DROPDOWN */}
            {showDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 z-50 overflow-hidden animate-slide-in">
                    {/* HEADER */}
                    <div className="flex items-center justify-between py-3.5 px-5 border-b border-slate-100">
                        <h2 className="font-bold text-slate-800 text-sm">
                            Notifications
                        </h2>

                        <button
                            onClick={markAllRead}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                        >
                            Mark all read
                        </button>
                    </div>

                    {/* LIST */}
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50">
                        {notifications.length === 0 ? (
                            <div className="py-6 px-5 text-center text-xs font-semibold text-slate-400">
                                No notifications yet
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
                                        className={`py-3 px-5 cursor-pointer hover:bg-slate-50/50 transition-colors flex items-start gap-2.5 ${!notification.is_read
                                            ? "bg-indigo-50/20"
                                            : ""
                                            }`}
                                    >
                                        {!notification.is_read && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-semibold leading-relaxed ${!notification.is_read ? 'text-slate-900' : 'text-slate-600'}`}>
                                                {notification.message}
                                            </p>

                                            <p className="text-[10px] text-slate-400 font-medium mt-1">
                                                {new Date(
                                                    notification.created_at
                                                ).toLocaleString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        </div>
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