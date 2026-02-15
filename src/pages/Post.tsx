import Layout from "./LayoutWrapper";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Votes from "./Votes";
import Comments from "./Comments";
import Bookmark from "./Bookmark";
import { DynamicUrl } from "./DynamicUrl";

interface PostData {
  _id: string;
  username: string;
  subject: string;
  description: string;
  upVotes: number;
  downVotes: number;
  filePaths: string[];
  coverPhoto?: string;
  userId?: { username: string };
}

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalFile, setModalFile] = useState<string | null>(null);

  // Helper function to get correct file URL
  const getFileUrl = (path?: string) => {
    if (!path) return ""; // no file
    if (path.startsWith("http")) return path; // Cloudinary
    return `${DynamicUrl()}/${path.replace(/\\/g, "/")}`; // local path
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await axios.get<PostData>(`${DynamicUrl()}/post/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <Layout>
      <div className="flex justify-center w-full px-4 py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="space-y-2 border-b pb-4">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold">{post.subject}</h1>
              <Bookmark ps={post}></Bookmark>
            </div>
            <p className="text-sm text-gray-500">
              Posted by <span className="font-medium">{post.username}</span>
            </p>
          </div>

          {post.filePaths.length > 0 && (
            <div
              className={
                post.filePaths.length === 1
                  ? "flex justify-center"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-4"
              }
            >
              {post.filePaths.map((path, index) => {
                const ext = path.split(".").pop()?.toLowerCase();
                const fileUrl = getFileUrl(path);

                if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext || "")) {
                  return (
                    <a
                      key={index}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={fileUrl}
                        alt={`uploaded ${index}`}
                        className="w-full h-100 object-cover bg-gray-100 rounded-xl"
                        loading="lazy"
                      />
                    </a>
                  );
                }

                if (ext === "pdf") {
                  return (
                    <div
                      key={index}
                      className="w-full h-60 bg-gray-100 rounded-xl overflow-hidden cursor-pointer relative"
                      onClick={() => setModalFile(fileUrl)}
                    >
                      <iframe
                        src={fileUrl + "#page=1&zoom=70"}
                        title={`PDF preview ${index}`}
                        className="w-full h-full pointer-events-none"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-xs rounded">
                        Click to view
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={index}
                    onClick={() => setModalFile(fileUrl)}
                    className="flex items-center justify-center w-full h-60 bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
                  >
                    <span>File</span>
                  </div>
                );
              })}
            </div>
          )}

          <div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {post && (
        <Votes
          postId={post._id}
          initialUpVotes={post.upVotes}
          initialDownVotes={post.downVotes}
        />
      )}
      <Comments postId={id || ""} />

      {modalFile && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalFile(null)}
        >
          <div className="bg-white rounded-xl max-w-3xl w-full h-[80vh] overflow-auto p-4 relative">
            <button
              className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded"
              onClick={() => setModalFile(null)}
            >
              Close
            </button>
            <iframe src={modalFile} className="w-full h-full" title="Full file view" />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Post;
  