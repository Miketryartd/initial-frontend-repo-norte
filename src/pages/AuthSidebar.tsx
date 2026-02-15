// src/components/AuthSidebar.tsx
import syncro_logo from "../images/Syncro logo no text .png";

const AuthSidebar = () => {
  return (
    
<div className="hidden lg:flex w-full h-full flex-col items-center justify-center bg-linear-to-t from-blue-700 to-sky-500 relative">

<h1 className="text-5xl font-bold text-white">Welcome to</h1>

<img className="h-50 w-50 rounded-full mt-10 object-cover border-4 border-white/30 shadow-2xl" src={syncro_logo} alt="Syncro Logo" />



<div className="items-center justify-center p-10 text-white z-10">

  <div className="flex flex-col gap-6 mt-8 max-w-md">

    <div className="flex items-center gap-3">

      <div className="bg-white/20 p-2 rounded-full">

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-sky-200"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>

      </div>

      <p className="text-lg font-medium">Real-time: <span className="text-sky-100 font-normal">Seamless collaboration.</span></p>

    </div>



    <div className="flex items-center gap-3">

      <div className="bg-white/20 p-2 rounded-full">

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-sky-200"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>

      </div>

      <p className="text-lg font-medium">Persistent: <span className="text-sky-100 font-normal">Your notes stay saved even after the call ends.</span></p>

    </div>



    <div className="flex items-center gap-3">

      <div className="bg-white/20 p-2 rounded-full">

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-sky-200"><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>

      </div>

      <p className="text-lg font-medium">Fast: <span className="text-sky-100 font-normal"> No downloads required—just share a link.</span></p>

    </div>

  </div>

</div>







<div className="w-2 h-2 rounded-full bg-white/40 absolute bottom-0 left-[10%] animate-[sparks_6s_infinite_linear]"></div>

<div className="w-4 h-4 rounded-full bg-white/20 absolute bottom-0 left-[30%] animate-[sparks_10s_infinite_linear]"></div>

<div className="w-2 h-2 rounded-full bg-white/40 absolute bottom-0 left-[50%] animate-[sparks_6s_infinite_linear]"></div>

<div className="w-4 h-4 rounded-full bg-white/20 absolute bottom-0 left-[70%] animate-[sparks_10s_infinite_linear]"></div>

</div>
  );
};

export default AuthSidebar;