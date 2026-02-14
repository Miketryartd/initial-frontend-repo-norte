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
  postId: Post;
  createdAt?: string;
}



function User_Bookmarks(){


    const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return alert("User not logged in");
      
            const res = await fetch(`${DynamicUrl()}/api/bookmarks`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
      
            if (!res.ok) {
              const text = await res.text();
              console.error("Server error:", text);
              return;
            }
      
            const data = await res.json();
            setBookmarks(data);
          } catch (error) {
            console.error("Error fetching bookmark data:", error);
          }
        };
      
        fetchBookmarks();
      }, []);
      
    return (

        <>
        <Layout>

             <div>
            {bookmarks.length === 0 ? (
              <p className="text-center">No saved post yet. <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mood-neutral"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /></svg></p>
            ) : (
              bookmarks.map((bookmark, index) => (
                <Link to={`/Post/${bookmark.postId?._id}`}>
                <div className="flex flex-row gap-2 shadow-sm w-full p-5 rounded-sm  m-2 hover:bg-sky-50" key={index}>
                  <img   src={
    bookmark.postId.coverPhoto
      ? `${DynamicUrl()}/${bookmark.postId?.coverPhoto.replace(/\\/g, "/")}`
      : "/placeholder.png"
  } alt="cover-photo" className="h-20 rounded-md w-20 object-cover" loading="lazy"></img>
                    <h1>Posted by <span>{bookmark.postId?.username}</span> </h1>
              <h3>Subject <span>{bookmark.postId?.subject}</span> </h3>
              <h3>Description <span>{bookmark.postId?.description}</span></h3>
                  </div>
                  </Link>
              ))
            )}
             </div>
        </Layout>
        </>
    )
}

export default User_Bookmarks;