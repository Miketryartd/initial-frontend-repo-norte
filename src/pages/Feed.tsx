import { useState, useEffect } from "react";
import Layout from "./LayoutWrapper";
import { Link } from "react-router-dom";
import { DynamicUrl } from "./DynamicUrl";


interface Post {
  username: string;
    _id: string;
    subject: string;
    description: string;
    filePaths: string[];
    coverPhoto?: string;
    userId: { username: string };
    uploadedAt: string;
  }


function Feed(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
 
    useEffect(() =>{

        const feedAPI = async () =>{

            try{

              const token = localStorage.getItem('token');
              if (!token){
                return alert("User does not exist!");
              }

                const response = await fetch(`${DynamicUrl()}/files-fetch`, {
                  method: "GET",
                  headers: {
                       'Content-Type' : "application/json",
                        "Authorization" : `Bearer${token}`
                  }
                });
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setPosts(data);
              

            } catch {
                setError("Error fetching feed.");

            };

           
        };
        feedAPI();

    }, []);

    return(
        <>
        <Layout>
        <div className="max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {posts.map((post) => (
            <div key={post._id} className="bg-white border border-gray-200  overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
            
              <div className="h-100 bg-neutral-100 flex items-center justify-center border-b">
              <img 
                  src={
                    post.coverPhoto
                      ? `${DynamicUrl()}/${post.coverPhoto.replace(/\\/g, '/')}`
                      : "https://placehold.co/150?text=No+Image"
                  }
                   loading="lazy"
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/150?text=No+Image";
                  }}
                />
              </div>

             
              <div className="p-5">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">{post.subject}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{post.username + `'s`} Notes</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mt-2">{post.description.length > 40 ? post.description.slice(0, 40) + "..." : post.description}</p>
                
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold">
                      {post.username?.charAt(0) || "U"}
                    </div>
                    <span className="text-xs font-medium text-gray-700">{post.username || "Anonymous"}</span>
                  </div>
                  <button className="text-sky-500 text-xs font-bold hover:underline"><Link to={`/Post/${post._id}`}>View All</Link></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        </Layout>
        </>
    )
}

export default Feed;