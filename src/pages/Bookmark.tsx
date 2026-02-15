import { useState, useEffect } from "react";
import { DynamicUrl } from "./DynamicUrl";

interface BookmarkProps {
  ps: {
    _id: string;
    title?: string;
    username?: string;
  };
}

function Bookmark({ ps }: BookmarkProps) {
  const [bookmarked, setBookmarked] = useState(false);


  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${DynamicUrl()}/api/bookmarks/ids`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Bookmarks from API:", data?.bookmarks); 
      
        if (data?.bookmarks?.includes(ps._id)) {
          setBookmarked(true);
        }
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [ps._id]);

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("User does not exist!");


    setBookmarked(prev => !prev);

    try {
      const res = await fetch(`${DynamicUrl()}/api/bookmark/${ps._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

 
      if (!data?.bookmarked) {
        setBookmarked(false);
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
   
      setBookmarked(prev => !prev);
    }
  };

  return (
    <button onClick={handleBookmark} className="cursor-pointer">
      {bookmarked ? (
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <path d="M5 3v18l7-5 7 5V3H5z" />
        </svg>
      ) : (

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 3v18l7-5 7 5V3H5z" />
        </svg>
      )}
    </button>
  );
}

export default Bookmark;
