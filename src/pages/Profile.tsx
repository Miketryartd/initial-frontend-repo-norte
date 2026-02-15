import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "./LayoutWrapper";
import { DynamicUrl } from "./DynamicUrl";

interface Userquiz {
  _id: string;
  title: string;
  creator: string;
  username: string;
}

interface Userpost {
  _id: string;
  description: string;
  username: string;
  filePaths: string[];
  userId: { _id: string; username: string } | string; // string if not populated
}

function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();

  const [userQuizzes, setUserQuizzes] = useState<Userquiz[]>([]);
  const [userPosts, setUserPosts] = useState<Userpost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        // Fetch posts
        const resPosts = await fetch(`${DynamicUrl()}/files-fetch`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resPosts.ok) throw new Error("Failed to fetch posts");
        const postsData: Userpost[] = await resPosts.json();
        console.log("All posts:", postsData);

        const filteredPosts = postsData.filter((p) => {
          if (typeof p.userId === "string") return p.userId === userId;
          return p.userId?._id === userId;
        });
        setUserPosts(filteredPosts);

        // Fetch quizzes
        const resQuizzes = await fetch(`${DynamicUrl()}/quiz/quizzes`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resQuizzes.ok) throw new Error("Failed to fetch quizzes");
        const quizzesData: Userquiz[] = await resQuizzes.json();
        console.log("All quizzes:", quizzesData);

        const filteredQuizzes = quizzesData.filter(
          (q) => q.creator.toString() === userId
        );
        setUserQuizzes(filteredQuizzes);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setUserPosts([]);
        setUserQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname, userId]);

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h2>User Posts</h2>
      {userPosts.length > 0 ? (
        userPosts.map((post) => (
          <div key={post._id} style={{ marginBottom: "20px" }}>
            <h3>{post.username}</h3>
            <p>{post.description}</p>
            {post.filePaths?.map((path, i) => (
              <img
                key={i}
                src={path}
                alt="Post file"
                style={{ width: "200px", height: "auto", marginTop: "10px" }}
              />
            ))}
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}

      <h2>User Quizzes</h2>
      {userQuizzes.length > 0 ? (
        userQuizzes.map((quiz) => (
          <div key={quiz._id} style={{ marginBottom: "20px" }}>
            <h3>{quiz.title}</h3>
            <p>By: {quiz.username}</p>
          </div>
        ))
      ) : (
        <p>No quizzes found.</p>
      )}
    </Layout>
  );
}

export default Profile;
