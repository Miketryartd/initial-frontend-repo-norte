import { useState, useEffect } from "react";
import { DynamicUrl } from "./DynamicUrl";

export type NotificationType = {
  _id: string;
  userId: string;
  senderId: string;
  type: string;
  referenceId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

interface NotificationsProps {
  isOpen: boolean;
}

function Notifications({ isOpen }: NotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${DynamicUrl()}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data: NotificationType[] = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isOpen) fetchNotifications(); 
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white p-1 shadow-lg rounded-xl max-h-80 overflow-y-auto mt-10 z-50">
      {notifications.length === 0 && (
        <p className="p-2 text-gray-500">No notifications</p>
      )}
      {notifications.map((n) => (
        <div
          key={n._id}
          className={`p-2  ${n.isRead ? "bg-sky-50 text-gray-800  rounded-xl m-5" : "bg-sky-100 text-gray-600 rounded-xl m-5 "}`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
