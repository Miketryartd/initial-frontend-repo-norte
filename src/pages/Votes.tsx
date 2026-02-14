import { useState } from "react";
import axios from "axios";
import { DynamicUrl } from "./DynamicUrl";

interface VotesProps {
  postId: string;
  initialUpVotes?: number;
  initialDownVotes?: number;
  userVote?: "upvote" | "downvote" | null; 
}

const Votes = ({
  postId,
  initialUpVotes = 0,
  initialDownVotes = 0,
  userVote = null,
}: VotesProps) => {

  const [upVote, setUpVote] = useState<number>(initialUpVotes);
  const [downVote, setDownVote] = useState<number>(initialDownVotes);


  const [vote, setVote] = useState<"upvote" | "downvote" | null>(userVote);

  const handleUpVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to vote!");
  
      const res = await axios.post(
        `${DynamicUrl()}/post/${postId}/upvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setUpVote(res.data.upVotes);
      setDownVote(res.data.downVotes);
      setVote(res.data.type); 
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };
  
  const handleDownVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to vote!");
  
      const res = await axios.post(
        `${DynamicUrl()}/post/${postId}/downvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setUpVote(res.data.upVotes);
      setDownVote(res.data.downVotes);
      setVote(res.data.type); 
    } catch (err) {
      console.error("Error downvoting:", err);
    }
  };
  

  return (
    <div className="flex flex-row justify-center items-center gap-5">

  <button
    onClick={handleUpVote}
    className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg shadow-md cursor-pointer transition-colors duration-200
      ${vote === "upvote" ? "bg-orange-100 text-orange-500" : "bg-white text-gray-700 hover:bg-gray-100"}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
    </svg>
    <span className="font-semibold">{upVote}</span>
  </button>


  <button
    onClick={handleDownVote}
    className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg shadow-md cursor-pointer transition-colors duration-200
      ${vote === "downvote" ? "bg-red-100 text-red-500" : "bg-white text-gray-700 hover:bg-gray-100"}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z" />
      <path d="M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z" />
    </svg>
    <span className="font-semibold">{downVote}</span>
  </button>
</div>

  );
};

export default Votes;
