import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import Notifications from "./Notifications";
import type { NotificationType } from "./Notifications";
import { DynamicUrl } from "../utils/api";

interface User {
  username: string;
  _id: string;
}
interface Search {
  _id: string;
  username: string;
}

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const navigate = useNavigate(); // Add navigate for redirect
  const [hasUnread, setHasUnread] = useState(false);
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false); // State for profile menu

  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Search[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("User not logged in!");

      const res = await fetch(`${DynamicUrl()}/api/search?search=${encodeURIComponent(search)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Server returned non-JSON:", text);
        return alert("Search failed. Server did not return valid JSON.");
      }

      if (!res.ok) {
        return alert(data.error || "Search failed");
      }

      setSearchResults(data);
      console.log("Search results:", data);

    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleLogout = () => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
   
    setProfileMenuOpen(false);
    
    
    navigate('/signin');
  };

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const updateNotifications = async () => {
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

    const fetchUser = async () => {
      try {
        if (!token) return;

        const res = await fetch(`${DynamicUrl()}/auth/me`, {
          method: "GET",
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await res.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    
    fetchUser();
    updateNotifications();
  }, [notifOpen, token]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileMenu = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      
      if (
        profileMenu && 
        !profileMenu.contains(event.target as Node) &&
        profileButton && 
        !profileButton.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case "/Feed": return "Community Feed";
      case "/Publish": return "Create Post";
      case "/Dashboard": return "My Desk";
      case "/Quizzes": return "Community Quizzes";
      case "/Create-Quiz": return "Create Quiz";
      case "/Quiz-Feed": return "Community Quiz";
      default: return "Syncro";
    }
  };

  const getUserInitial = () => {
    if (!user?.username) return "G";
    return user.username.charAt(0).toUpperCase();
  };

  return (
    <header className="flex flex-col gap-2 h-auto px-4 sm:px-6 bg-white border-b border-neutral-200 relative">
      <div className="flex items-center gap-5 h-20">
        <button
          className="md:hidden p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 z-40"
          onClick={toggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold whitespace-nowrap hidden md:block">{getTitle()}</h1>

        <form className="flex w-full" onSubmit={handleSearch}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Looking for something?"
            className="flex-1 border rounded-md p-2 outline-none border-neutral-300 bg-neutral-50 focus:bg-white transition-all"
          />
          <button type="submit" className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-search">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
        </form>

        <div className="flex gap-4 relative">
          <button
            className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200 relative"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setHasUnread(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon">
              <path d="M14.235 19c.865 0 1.322 1.024.745 1.668a3.992 3.992 0 0 1-2.98 1.332 3.992 3.992 0 0 1-2.98-1.332c-.552-.616-.158-1.579.634-1.661l.11-.006h4.471z" />
              <path d="M12 2c1.358 0 2.506.903 2.875 2.141l.046.171a8.013 8.013 0 0 1 4.024 6.069l.028.287v2.931a3 3 0 0 0 1.143 1.847l.167.117c.86.487.56 1.766-.377 1.864h-16c-1.028 0-1.387-1.364-.493-1.87a3 3 0 0 0 1.472-2.063v-2.97a8 8 0 0 1 3.821-6.454l.248-.146a3.003 3.003 0 0 1 2.562-2.29z" />
            </svg>
            {hasUnread && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>
          <Notifications isOpen={notifOpen} />
        </div>

        {/* Profile button with dropdown menu */}
        <div className="relative">
          <button
            id="profile-button"
            className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200 font-bold w-10 h-10 flex items-center justify-center"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            {getUserInitial()}
          </button>

          {/* Dropdown menu */}
          {profileMenuOpen && (
            <div
              id="profile-menu"
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-neutral-200"
            >
              <Link
                to={`/Profile/${user?._id}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </div>
              </Link>
              
            
              
              <Link
                to="/Bookmarks"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Bookmarks
                </div>
              </Link>
              
              <hr className="my-1 border-neutral-200" />
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-2 bg-white border rounded-md max-h-60 overflow-y-auto shadow-lg">
          <ul>
            {searchResults.map((item, idx) => (
              <li key={idx} className="p-2 hover:bg-neutral-100 cursor-pointer">
                <Link to={`/Profile/${item._id}`}>
                  {item.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;