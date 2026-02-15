import { useState, useEffect } from "react";
import Layout from "./LayoutWrapper";
import { Link } from "react-router-dom";
import { DynamicUrl } from "./DynamicUrl";

interface Post {
  _id: string;
  username: string;
  subject: string;
  description: string;
  upVotes: number;
  downVotes: number;
  coverPhoto: string;
}

interface Bookmarks {
  postId: Post | null; 
  createdAt?: string;
}

function User_Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);


  const getImageUrl = (path?: string) => {
    if (!path) return "https://placehold.co/150?text=No+Image";

    const cleanPath = path.trim();

  
    if (/^https?:\/\//i.test(cleanPath)) {
      return cleanPath;
    }


    return `${DynamicUrl()}/${cleanPath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("User not logged in");
          return;
        }

        const res = await fetch(`${DynamicUrl()}/api/bookmarks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Server error:", text);
          return;
        }

        const data = await res.json();

     
        const safeBookmarks = (data.bookmarks || []).filter(
          (b: Bookmarks) => b?.postId && typeof b.postId === "object"
        );

        setBookmarks(safeBookmarks);
      } catch (error) {
        console.error("Error fetching bookmark data:", error);
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <Layout>
      <div>
        {bookmarks.length === 0 ? (
          <p className="text-center">
            No saved post yet.
          </p>
        ) : (
          bookmarks.map((bookmark) => (
            <Link
              key={bookmark.postId!._id} 
              to={`/Post/${bookmark.postId!._id}`}
            >
              <div className="flex flex-row gap-3 shadow-sm w-full p-5 rounded-sm m-2 hover:bg-sky-50 items-center">
                
                <img
                  src={getImageUrl(bookmark.postId?.coverPhoto)}
                  alt="cover-photo"
                  className="h-20 w-20 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />

                <div className="flex flex-col">
                  <h1 className="font-semibold">
                    Posted by{" "}
                    <span className="text-sky-600">
                      {bookmark.postId?.username}
                    </span>
                  </h1>

                  <h3 className="text-sm">
                    <span className="font-medium">Subject:</span>{" "}
                    {bookmark.postId?.subject}
                  </h3>

                  <h3 className="text-sm text-gray-600 line-clamp-2">
                    {bookmark.postId?.description}
                  </h3>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Layout>
  );
}

export default User_Bookmarks;
