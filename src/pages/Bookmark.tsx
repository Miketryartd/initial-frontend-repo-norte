import { useState } from "react";
import { DynamicUrl } from "./DynamicUrl";



interface BookmarkProps {
    ps: {
      _id: string;
      title?: string;
      username?: string;
      
    };
  }
  
  function Bookmark({ ps }: BookmarkProps) {
    const [bookmark, setBookmark] = useState<string[]>([]);
  
    const handleBookmark = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("User does not exist!");
  
      try {
        const res = await fetch(`${DynamicUrl()}/api/bookmark/${ps._id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
  
        setBookmark(prev =>
          data?.bookmarked
            ? [...prev, ps._id]
            : prev.filter(id => id !== ps._id)
        );
        console.log("Data succesfully posted:", bookmark);
      } catch (error) {
        console.error("Error bookmarking post:", error);
      }
    };
  
    return (
      <button onClick={handleBookmark} className="cursor-pointer">
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-bookmarks"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3" />
          <path d="M11 3h5a3 3 0 0 1 3 3v11" />
        </svg>
      </button>
    );
  }
  
  export default Bookmark;
  