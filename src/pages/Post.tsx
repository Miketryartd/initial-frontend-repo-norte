
import Layout from "./LayoutWrapper";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Votes from "./Votes";


interface PostData {
    _id: string;
    subject: string;
    description: string;
    upVotes: number;
downVotes: number;
    filePaths: string[];
    userId?: {
        username: string;
    };
}

function Post (){


    const {id} = useParams();
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                
                const response = await axios.get<PostData>(`http://localhost:5000/post/${id}`);
                console.log("Data received:", response.data);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching post', err);
                setLoading(false);
            }
        };

        if (id ){
            fetchPost();
        } else {
            setLoading(false);
        };
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found!</p>;

    return (
        <Layout>
          <div className="flex justify-center w-full px-4 py-10">
            
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 space-y-6">
      
            
              <div className="space-y-2 border-b pb-4">
                <h1 className="text-3xl font-bold">{post.subject}</h1>
                <p className="text-sm text-gray-500">
                  Posted by <span className="font-medium">{post.userId?.username}</span>
                </p>
              </div>
      
        
{post.filePaths.length > 0 && (

post.filePaths.length === 1 ? (


  <div className="flex justify-center">
    <a
      href={`http://localhost:5000/${post.filePaths[0]}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`http://localhost:5000/${post.filePaths[0]}`}
        alt="uploaded"
        className="max-w-full h-80 object-contain bg-gray-100 rounded-xl"
      />
    </a>
  </div>

) : (


  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {post.filePaths.map((path, index) => (
      <a
        key={index}
        href={`http://localhost:5000/${path}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`http://localhost:5000/${path}`}
          alt="uploaded"
          className="w-full h-60 object-contain bg-gray-100 rounded-xl w-fu"
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

        </Layout>
      );
      

}

export default Post;