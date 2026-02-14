import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Notifications from "./Notifications";
import type { NotificationType } from "./Notifications";
import { DynamicUrl } from "./DynamicUrl";




const Header = () => {
  const [hasUnread, setHasUnread] = useState(false);
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState<boolean>(false);


  useEffect(() => {
    const updateNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      if (notifOpen) {
        await fetch(`${DynamicUrl()}/api/notifications/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
  
      const res = await fetch(`${DynamicUrl()}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data: NotificationType[] = await res.json();
      setHasUnread(data.some((n) => !n.isRead));
    };
  
    updateNotifications();
  }, [notifOpen]);
  

  const getTitle = () => {
    switch (location.pathname) {
      case "/Feed":
        return "Community Feed";
      case "/Publish":
        return "Create Post";
      case "/Dashboard":
        return "My Desk";
      case "/Quizzes":
        return "Community Quizzes";
      case "/Create-Quiz":
        return "Create Quiz";
      case "/Quiz-Feed":
        return "Community Quiz";
      default:
        return "Syncro";
    }
  };

  return (
    <header className="flex flex-row w-full h-20 px-8 items-center gap-5 bg-white border-b border-neutral-200 relative">
      <h1 className="text-2xl font-bold whitespace-nowrap">{getTitle()}</h1>
      <input
        type="search"
        placeholder="Looking for something?"
        className="border-1 w-full rounded-md p-2 outline-none border-neutral-300 bg-neutral-50 focus:bg-white transition-all"
      />

      <div className="flex gap-4 relative">
        <button
          className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200 relative"
          onClick={() => {
            setNotifOpen((prev) => !prev);
            setHasUnread(false); 
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="icon"
          >
            <path d="M14.235 19c.865 0 1.322 1.024.745 1.668a3.992 3.992 0 0 1-2.98 1.332 3.992 3.992 0 0 1-2.98-1.332c-.552-.616-.158-1.579.634-1.661l.11-.006h4.471z" />
            <path d="M12 2c1.358 0 2.506.903 2.875 2.141l.046.171a8.013 8.013 0 0 1 4.024 6.069l.028.287v2.931a3 3 0 0 0 1.143 1.847l.167.117c.86.487.56 1.766-.377 1.864h-16c-1.028 0-1.387-1.364-.493-1.87a3 3 0 0 0 1.472-2.063v-2.97a8 8 0 0 1 3.821-6.454l.248-.146a3.003 3.003 0 0 1 2.562-2.29z" />
          </svg>

       
          {hasUnread && (
  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
)}

        </button>

    
        <Notifications isOpen={notifOpen} />
      </div>

 
      <button className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200">
       s
      </button>
    </header>
  );
};

export default Header;
