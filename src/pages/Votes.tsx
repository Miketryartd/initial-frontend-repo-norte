import { useState } from "react";
import axios from "axios";

interface VotesProps {
  postId: string;
  initialUpVotes?: number;
  initialDownVotes?: number;
  userVote?: "upvote" | "downvote" | null; // optional: did the user already vote?
}

const Votes = ({
  postId,
  initialUpVotes = 0,
  initialDownVotes = 0,
  userVote = null,
}: VotesProps) => {
  // 1️⃣ state for counts
  const [upVote, setUpVote] = useState<number>(initialUpVotes);
  const [downVote, setDownVote] = useState<number>(initialDownVotes);

  // 2️⃣ state for current user's vote
  const [vote, setVote] = useState<"upvote" | "downvote" | null>(userVote);

  // 3️⃣ handle upvote
  const handleUpVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to vote!");

      // send request to backend with JWT
      const res = await axios.post(
        `http://localhost:5000/post/${postId}/upvote`,
        {}, // no body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 4️⃣ update local state from backend response
      setUpVote(res.data.upVotes);
      setDownVote(res.data.downVotes);

      // 5️⃣ update which vote the user currently has
      setVote(prev => (prev === "upvote" ? null : "upvote"));
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  // 6️⃣ handle downvote (same logic)
  const handleDownVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to vote!");

      const res = await axios.post(
        `http://localhost:5000/post/${postId}/downvote`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpVote(res.data.upVotes);
      setDownVote(res.data.downVotes);

      setVote(prev => (prev === "downvote" ? null : "downvote"));
    } catch (err) {
      console.error("Error downvoting:", err);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center gap-5">
      {/* Upvote button */}
      <button
        onClick={handleUpVote}
        className={`flex items-center gap-1 cursor-pointer ${
          vote === "upvote" ? "text-green-600" : ""
        }`}
      >
        👍 {upVote}
      </button>

      {/* Downvote button */}
      <button
        onClick={handleDownVote}
        className={`flex items-center gap-1 cursor-pointer ${
          vote === "downvote" ? "text-red-600" : ""
        }`}
      >
        👎 {downVote}
      </button>
    </div>
  );
};

export default Votes;
