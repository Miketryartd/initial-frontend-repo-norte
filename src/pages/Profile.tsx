import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Layout from "./LayoutWrapper";
import { DynamicUrl } from "./DynamicUrl";
interface Userquiz {
  _id: string;
  title: string;
  creator: string;
  username: string;
  questions: string;
}

interface Userpost {
  _id: string;
  description: string;
  username: string;
  filePaths: string[];
  userId: { _id: string; username: string } | string;
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
        const resPosts = await fetch(`${DynamicUrl()}/files-fetch`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resPosts.ok) throw new Error("Failed to fetch posts");
        const postsData: Userpost[] = await resPosts.json();

        const filteredPosts = postsData.filter((p) => {
          if (typeof p.userId === "string") return p.userId === userId;
          return p.userId?._id === userId;
        });
        setUserPosts(filteredPosts);

        const resQuizzes = await fetch(`${DynamicUrl()}/quiz/quizzes`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!resQuizzes.ok) throw new Error("Failed to fetch quizzes");
        const quizzesData: Userquiz[] = await resQuizzes.json();

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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
     
        <div className=" rounded-2xl p-6 shadow-lg border border-zinc-200">
          <h1 className="text-3xl font-bold text-black">User Profile</h1>
          <p className="text-zinc-400 mt-1">User ID: {userId}</p>
        </div>

 
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">User Posts</h2>
          {userPosts.length > 0 ? (
  <div className="grid md:grid-cols-2 gap-6">
    {userPosts.map((item) => (
      <Link key={item._id} to={`/Post/${item._id}`}>
        <div className="border border-zinc-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition cursor-pointer">
          <h3 className="text-lg font-semibold text-black">
            {item.username}
          </h3>

          <p className="text-black mt-2 line-clamp-4">
            {item.description}
          </p>

          {item.filePaths?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {item.filePaths.map((path, i) => (
                <img
                  key={i}
                  src={path}
                  alt="Post file"
                  className="w-full h-40 object-cover rounded-xl border border-zinc-200"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/150?text=No+Image";
                  }}
                  
                  
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    ))}
  </div>
) : (
  <p>No posts found.</p>
)}

        </section>

     
        <section>
  <h2 className="text-2xl font-semibold text-black mb-4">
    User Quizzes
  </h2>

  {userQuizzes.length > 0 ? (
    <div className="grid md:grid-cols-2 gap-6">
      {userQuizzes.map((quiz) => (
        <Link key={quiz._id} to={`/Quiz/${quiz._id}`}>
          <div className="border border-zinc-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition cursor-pointer">
            <h3 className="text-lg font-semibold text-black">
              {quiz.title}
            </h3>
            <div className="flex flex-row gap-2 text-zinc-400">
            <p className="text-zinc-400 mt-1">
              By: {quiz.username}
            </p>
            <p className=" mt-1 ">Total Questions [{quiz.questions.length}]</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-zinc-400 rounded-2xl p-6">
      No quizzes found.
    </div>
  )}
</section>

      </div>
    </Layout>
  );
}

export default Profile;
