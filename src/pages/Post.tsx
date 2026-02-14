
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
    userId?: {
        username: string;
    };
}

function Post (){


    const {id} = useParams();
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
  post.filePaths.length === 1 ? (
    <div className="flex justify-center bg-gray-400">
      <a
        href={`${DynamicUrl()}/${post.filePaths[0]}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`${DynamicUrl()}/${post.coverPhoto}`}
          alt="uploaded"
          className="max-w-full h-80 object-contain bg-gray-100 "
        />
      </a>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {post.filePaths.map((path, index) => (
        <a
          key={index}
          href={`${DynamicUrl()}/${path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${DynamicUrl()}/${path}`}
            alt="uploaded"
            className="w-full h-60 object-contain bg-gray-100 rounded-xl"
          />
        </a>
      ))}
    </div>
  )
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
<Comments postId={id}/>



        </Layout>
      );
      

}

export default Post;