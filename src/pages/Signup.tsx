import github_icon from "../images/github-logo.png";
import google_icon from "../images/google icon.png";
import { DynamicUrl } from "../pages/DynamicUrl";
import '../styles/Signup.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";


function Signup() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const registration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !name || !password) {
      setError("All fields are required to join Syncro.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${DynamicUrl()}/registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_address: email, username: name, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Success! Your account is ready.");
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server is unreachable. Please try again later.");
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-700/80 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <h2 className="text-white text-xl font-semibold mt-4">Creating your account...</h2>
        </div>
      )}

      <div className="w-full h-screen flex flex-row ">
  
      <AuthSidebar/>
   
        <div className="w-full max-w-xl h-full bg-white flex flex-col items-center p-8 lg:p-16 overflow-y-auto">
          <div className="w-full mb-8">
            <Link to="/" className="group flex items-center gap-2 text-gray-400 hover:text-sky-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1"><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
              <span className="text-sm font-medium">Back to home</span>
            </Link>
          </div>

        
          <h1 className='text-4xl font-bold tracking-tighter mb-2 text-gray-800 self-start'>Create your account</h1>
          <p className="text-gray-500 mb-8 self-start">Join the Syncro community today.</p>

          <form onSubmit={registration} className='flex flex-col w-full'>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-500 p-3 mb-6 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <label className='text-sm font-semibold text-gray-700'>Email Address</label>
            <input 
              type='email' 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='example@gmail.com' 
              className={`border-1 outline-none p-3 mt-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-sky-500/20 transition-all ${error && !email ? 'border-red-400' : 'border-gray-200'}`}
            />

            <label className='mt-5 text-sm font-semibold text-gray-700'>Full Name</label>
            <input 
              type='text' 
              onChange={(e) => setName(e.target.value)} 
              placeholder='John Doe' 
              className={`border-1 outline-none p-3 mt-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-sky-500/20 transition-all ${error && !name ? 'border-red-400' : 'border-gray-200'}`}
            />

            <label className='mt-5 text-sm font-semibold text-gray-700'>Password</label>
            <input 
              type='password' 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='••••••••' 
              className={`border-1 outline-none p-3 mt-2 rounded-md bg-gray-50 focus:ring-2 focus:ring-sky-500/20 transition-all ${error && !password ? 'border-red-400' : 'border-gray-200'}`}
            />

            <button 
              disabled={isLoading}
              className='cursor-pointer w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold p-3 mt-10 rounded-md transition-all shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed'
              type="submit"
            >
              {isLoading ? 'Processing...' : 'Create Account'}
            </button>

            <span className="p-4 text-gray-500 text-sm text-center">
              Already have an account? <Link to='/Signin' className="text-sky-500 font-bold hover:underline">Sign in.</Link>
            </span>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">Or sign up with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className='flex flex-row mt-2 items-center justify-center gap-4'>
              <button type="button" className="cursor-pointer flex-1 flex justify-center border border-gray-200 rounded-md py-2 hover:bg-gray-50 transition-colors active:scale-95 shadow-sm">
                <img className='h-8 w-8 object-contain' src={google_icon} alt="Google" />
              </button>
              <button type="button" className="cursor-pointer flex-1 flex justify-center border border-gray-200 rounded-md py-2 hover:bg-gray-50 transition-colors active:scale-95 shadow-sm">
                <img className='h-8 w-8 object-contain' src={github_icon} alt="Github" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;