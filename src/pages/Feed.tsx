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

function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Helper to get proper image URL
  const getImageUrl = (path?: string) => {
    if (!path) return "https://placehold.co/150?text=No+Image";
    if (path.startsWith("http")) return path; 
    return `${DynamicUrl()}/${path.replace(/\\/g, "/")}`; 
  };

  useEffect(() => {
    const feedAPI = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return alert("User does not exist!");

        const response = await fetch(`${DynamicUrl()}/files-fetch`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setPosts(data);
      } catch {
        setError("Error fetching feed.");
      }
    };
    feedAPI();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md overflow-hidden flex flex-col"
            >
              <div className="h-100 sm:h-118 bg-neutral-100 flex items-center justify-center border-b">
                <img
                  src={getImageUrl(post.coverPhoto)}
                  alt="Cover"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/150?text=No+Image";
                  }}
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wide">
                  {post.subject}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">
                  {post.username}'s Notes
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mt-2">
                  {post.description.length > 100
                    ? post.description.slice(0, 100) + "..."
                    : post.description}
                </p>

                <div className="mt-auto pt-4 border-t flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center text-[10px] font-bold">
                      {post.username?.charAt(0) || "U"}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      {post.username || "Anonymous"}
                    </span>
                  </div>
                  <Link
                    to={`/Post/${post._id}`}
                    className="text-sky-500 text-xs font-bold hover:underline"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Feed;
