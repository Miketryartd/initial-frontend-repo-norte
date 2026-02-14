
import { useEffect, useState } from "react";
import { DynamicUrl } from "./DynamicUrl";



interface CommentsProps {
    postId: string | undefined;
}

interface Comment {
    _id: string;
    comment: string;
    username: string;
}


const Comments = ( {postId}: CommentsProps) =>{

    const [comment, setComment] = useState<string>('');
    const [renderComments, setRenderComments] = useState<Comment[] >([]);
    const [isLoading ,setIsLoading] = useState<boolean>(true);
    const handleComment = async (e: React.FormEvent) =>{
        e.preventDefault();
        

      
        console.log("post id:", postId);

        if (!postId){
            return alert("Post does not exist!");
        }
    

        const token = localStorage.getItem("token");
        if (!token){
            alert("Account not verified!");
            return;
        }
    
        const formData = new FormData();
        formData.append("comment", comment);

        try{

            const res = await fetch(`${DynamicUrl()}/post/${postId}/comments`, {
                method: "POST",
                headers: {'Content-Type' : 'application/json',
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({comment}),
                
            });
            if (!res.ok) throw new Error("Failed to post comment");
            const newComment = await res.json();
            setRenderComments(prev => [...prev,newComment]);
            console.log("Successfully added comment:" , res);
            setComment('');
        } catch (error){
            console.error('Error adding comment:', error);
        }

        
    
    }

  
    useEffect(() =>{

        const fetchComments = async () =>{

          
            if (!postId) return; 
            const token = localStorage.getItem("token");

            if (!token){
                return alert("User does not exist!");
            }

           try{
            const res = await fetch(`${DynamicUrl()}/post/${postId}/comments`, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });
            const data = await res.json();

            setRenderComments(data);
            
           } catch (error){
            console.error('Error fetching comments', error);
           } finally {
            setIsLoading(false);
           }

        };

        fetchComments();
    }, [postId])

    return(

        <>
      <div className="mt-10 flex flex-col items-center w-full px-4 gap-5 ">

  <form
    onSubmit={handleComment}
    className="flex w-full max-w-2xl bg-gray-100 rounded-md overflow-hidden border-b-1 border-black/30"
    method="POST"
  >
    <input
      type="text"
      placeholder="Add your thoughts..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="flex-1 px-4 py-2 bg-gray-200/30 focus:outline-none "
    />
    <button
      type="submit"
      className="px-4 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 flex items-center justify-center "
    >
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
        <path d="M10 14l11 -11" />
        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
      </svg>
    </button>
  </form>


  <div className="mt-6 flex flex-col items-center w-full max-w-2xl space-y-3 p-6 shadow-md rounded-xl border-t border-black/20">
  {isLoading ? (
    <p>Loading comments...</p>
  ) : renderComments.length === 0 ? (
    <p className="text-gray-500 italic">No comments yet.</p>
  ) : (
    renderComments.map((c, index) => (
      <div
        key={c._id || index}
        className="w-full bg-sky-300/20 text-black px-4 py-2 rounded-md break-words"
      >
        <p><span>Commented by: {c.username}</span>{c.comment}</p>
      </div>
    ))
  )}
</div>

</div>


        </>
    )
}

export default Comments;