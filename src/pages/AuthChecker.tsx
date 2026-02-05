import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthChecker = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        
          setTimeout(() => {
            navigate("/Feed");
          }, 4000);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
        <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">Securing session...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50 p-4">
      {user ? (
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-sky-100 border border-sky-50 flex flex-col items-center text-center transition-all animate-in zoom-in-95 duration-500">
        
          <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-sky-200">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <h2 className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Welcome Back</h2>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-2 mb-1">{user.username}</h1>
          <p className="text-sky-500 text-sm font-medium">Redirecting you to dashboard...</p>

          <div className="w-full h-1 bg-gray-100 mt-8 rounded-full overflow-hidden">
             <div className="h-full bg-sky-500 animate-[loading_2s_ease-in-out]"></div>
          </div>

          <button 
            onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}
            className="mt-8 text-gray-400 hover:text-red-500 text-sm font-medium transition-colors cursor-pointer"
          >
            Not you? <span className="underline">Logout</span>
          </button>
        </div>
      ) : (
        <div className="text-center">
           <p className="text-gray-400 mb-4">You are not logged in.</p>
           <button 
             onClick={() => navigate("/")}
             className="bg-sky-500 text-white px-6 py-2 rounded-full font-bold hover:bg-sky-600 transition-all"
           >
             Go to Login
           </button>
        </div>
      )}
    </div>
  );
};

export default AuthChecker;