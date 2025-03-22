import React from 'react';
import { useSelector } from 'react-redux';

const UserNotifications = () => {
    const { notifications } = useSelector(store => store.notifications);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Notifications</h2>
            {notifications.length > 0 ? (
                <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                        <li key={index} className="p-2 border rounded bg-gray-100">
                            {notification.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No new notifications.</p>
            )}
        </div>
    );
};

export default UserNotifications;
