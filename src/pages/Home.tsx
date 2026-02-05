import { useState, useEffect } from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import hero_image from "../images/Hero image.png";
import hero_wide from '../images/hero image wide.png';
import syncro_logo from "../images/Syncro logo.png";
function Home() {



//Live feature displaying message//
  const  messages = ["Hey","Ready to study?", "Yeah, let's start!", "I love this app!!", "I wanna study computer science.", "You up for biology?"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shownMessages, setShownMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
   
    if (currentIndex >= messages.length) {
      const resetTimer = setTimeout(() => {
        setShownMessages([]);
        setCurrentIndex(0);
      }, 3000); 
  
      return () => clearTimeout(resetTimer);
    }
  
   
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
    setIsTyping(true);
  
   
  
      setShownMessages((prev) => [...prev, messages[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 1500);
  
    return () => clearTimeout(typingTimer);
  }, [currentIndex]);
  

  return (
    <>
    {/* Header Section */}
    <div className="flex items-center justify-between px-8 border-b border-sky-100 border-solid p-4">
     <img src={syncro_logo} className='h-20 w-20 object-cover'></img>

     <div className="flex space-x-4">
       <Link to='https://github.com/Miketryartd'><h1>Github</h1></Link>
       <Link to='/Signup'><h1><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg></h1></Link>
      </div>

    </div>
    {/* Hero Section */}
 
     <div className='relative w-full h-full'>
      <img
      src={hero_image}
      alt='Hero'
      className='w-full h-full object-cover'></img>

      
     </div>

     {/* How it works */}

     <div className="flex justify-around mt-20">

  <div className="flex flex-col items-center text-center">
    <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
      1
    </div>
    <h3 className="font-bold mb-2">Create Room</h3>
    <p>Start a room instantly with one click.</p>
  </div>

  <div className="flex flex-col items-center text-center">
    <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
      2
    </div>
    <h3 className="font-bold mb-2">Share Link</h3>
    <p>Invite friends by sharing your room code.</p>
  </div>

  <div className="flex flex-col items-center text-center">
    <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
      3
    </div>
    <h3 className="font-bold mb-2">Collaborate Live</h3>
    <p>Chat, share notes, and work together in real-time.</p>

  </div>
</div>

{/* Benefits */}



<div className="flex justify-around mt-20 gap-4 m-10">

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70  h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-white-900 icon icon-tabler icons-tabler-filled icon-tabler-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" /></svg>
  </div>
  <h3 className="font-bold mb-2">Fast Updates</h3>
  <p className='m-4'>Start a room instantly with one click.</p>
</div>

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-orange-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" /></svg>
  </div>
  <h3 className="font-bold mb-2">Quick Chat</h3>
  <p className='m-4'>Send messages instantly to your team.</p>
</div>

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100  w-full">
  <div className="bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 3a1 1 0 0 1 .608 .206l.1 .087l2.706 2.707h6.586a3 3 0 0 1 2.995 2.824l.005 .176v8a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-11a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" /></svg>
  </div>
  <h3 className="font-bold mb-2">Organize Tasks</h3>
  <p className='m-4'>Create and manage tasks or to-dos together.</p>

</div>
<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-lime-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-writing"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 8v9a1 1 0 0 1 -.293 .707l-2 2a1 1 0 0 1 -.112 .097l-.11 .071l-.114 .054l-.105 .035l-.149 .03l-.117 .006h-13a3 3 0 0 1 0 -6h4a1 1 0 0 0 0 -2h-3a1 1 0 0 1 0 -2h3a3 3 0 0 1 0 6h-4a1 1 0 0 0 0 2h10.585l-.292 -.293a1 1 0 0 1 -.293 -.707v-9zm-3 -6c1.673 0 3 1.327 3 3v1h-6v-1c0 -1.673 1.327 -3 3 -3" /></svg>
  </div>
  <h3 className="font-bold mb-2">Draw Together</h3>
  <p className='m-4'>Draw, brainstorm, or sketch ideas in real-time.</p>

</div>

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70  h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-shield-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm.002 7a2 2 0 0 0 -1.995 1.85l-.005 .15l.005 .15a2 2 0 0 0 .995 1.581v1.769l.007 .117a1 1 0 0 0 1.993 -.117l.001 -1.768a2 2 0 0 0 -1.001 -3.732z" /></svg>
  </div>
  <h3 className="font-bold mb-2">Private & Secure</h3>
  <p className='m-4'>Only invited people can join your room.</p>

</div>
</div>
  
    
    {/* Live Preview*/}

<div className='m-10'>
  
  <div className='flex flex-row w-full h-[500px] gap-2 mt-10'>



<div className='w-150 h-full bg-slate-100 border-1 border-slate-300 relative shadow-[0px_1px_10px_rgba(0,0,0,0.1)]'>
<div className='w-full bg-white p-2'><h1>7 people in sync</h1></div>
{isTyping && (
  <div className="flex items-center gap-2 m-5">
    <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
        <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
      </svg>
    </div>

    <div className="bg-sky-200/70 px-4 py-2 rounded-full text-sm">
      typing…
    </div>
  </div>
)}

   <div>

   {shownMessages.map((msg) => (
     <div className="flex items-center gap-2 m-5">
     <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
         <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
       </svg>
     </div>
 
     <div className="bg-sky-200/70 px-4 py-2 rounded-full text-sm">
       {msg}
     </div>
   </div>
   ))}



   </div>
 
  <div className='flex flex-row absolute bottom-0 h-[50px] bg-neutral-50  border-slate-300 w-full border-[1px]'>
   <input type='text' placeholder='Send message' className='w-full h-full outline-none  p-2'></input>
   <button className=' rounded-full cursor-pointer p-2 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-sky-500  icon icon-tabler icons-tabler-filled icon-tabler-arrow-big-right-line"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-4.999a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 .993 .883l4.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" /><path d="M3 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" /></svg></button>
    </div>
</div>


<div className='  bg-gray-100 border-gray-300 border-1 w-[100px] h-full flex flex-col  '>
  <h1 className='w-full bg-white border-b-1 border-gray-300 p-2'>Toolbox</h1>
 

   <div className='flex flex-col p-5 gap-5'>
   <h1 className='border-1 w-6 border-gray-500 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-typography"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20l3 0" /><path d="M14 20l7 0" /><path d="M6.9 15l6.9 0" /><path d="M10.2 6.3l5.8 13.7" /><path d="M5 20l6 -16l2 0l7 16" /></svg></h1>
  <h1 className='border-1 w-6 border-gray-500 '><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bold"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6l0 -7" /><path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" /></svg></h1>
  <h1 className='border-1 w-6 border-gray-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-italic"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 5l6 0" /><path d="M7 19l6 0" /><path d="M14 5l-4 14" /></svg></h1>
  <h1 className='border-1 w-6 border-gray-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-ballpen"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.828 2a3 3 0 0 1 1.977 .743l.145 .136l1.171 1.17a3 3 0 0 1 .136 4.1l-.136 .144l-1.706 1.707l2.292 2.293a1 1 0 0 1 .083 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.292 -3.293l-1.586 -1.585l-7.464 7.464a3.828 3.828 0 0 1 -2.474 1.114l-.233 .008c-.674 0 -1.33 -.178 -1.905 -.508l-1.216 1.214a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.214 -1.216a3.828 3.828 0 0 1 .454 -4.442l.16 -.17l10.586 -10.586a3 3 0 0 1 1.923 -.873l.198 -.006zm0 2a1 1 0 0 0 -.608 .206l-.099 .087l-1.707 1.707l2.586 2.585l1.707 -1.706a1 1 0 0 0 .284 -.576l.01 -.131a1 1 0 0 0 -.207 -.609l-.087 -.099l-1.171 -1.171a1 1 0 0 0 -.708 -.293z" /></svg></h1>
  <h1 className='border-1 w-6 border-gray-500'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-square-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-4 9h-6l-.117 .007a1 1 0 0 0 .117 1.993h6l.117 -.007a1 1 0 0 0 -.117 -1.993z" /></svg></h1>
   </div>

   

  </div>


<div className='w-full h-full bg-white-100 border-1 border-gray-300'>
 

<div className='flex items-center text-center justify-center mt-50'>
 <div className='flex flex-col'>
 <h1 className='font-bold text-xl'>BUSINESS IDEA - MIKE :)</h1>
  <h1>Project Name</h1>
  <h3>"(NoteSpire)"</h3>
 </div>


  <h1 className='animate-[moveCursor_5s_infinite_ease-in-out]'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.039 4.277l3.904 13.563c.185 .837 .92 1.516 1.831 1.642l.17 .016a2.2 2.2 0 0 0 1.982 -1.006l.045 -.078l1.4 -2.072l4.05 4.05a2.067 2.067 0 0 0 2.924 0l1.047 -1.047c.388 -.388 .606 -.913 .606 -1.461l-.008 -.182a2.067 2.067 0 0 0 -.598 -1.28l-4.047 -4.048l2.103 -1.412c.726 -.385 1.18 -1.278 1.053 -2.189a2.2 2.2 0 0 0 -1.701 -1.845l-13.524 -3.89a1 1 0 0 0 -1.236 1.24z" /></svg></h1>


<div className='bottom-0 absolute'>
  <h1>toolbar</h1>
  </div>

</div>

</div>


<div className='w-120 h-full bg-neutral-100 flex flex-col gap-4 items-start  p-5 relative scroll-smooth max-h-500 overflow-auto
'>



<div className="flex items-center gap-2 w-full">

  <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
      <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
    </svg>
  </div>


  <div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">
  
    <h1 className="font-medium truncate">Michael Oliver M. Jr.</h1>
    
   
    <div className="flex items-center gap-2 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
      </svg>
      <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
    </div>

  </div>
</div>


  <div className="flex items-center gap-2 w-full">

<div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
    <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
  </svg>
</div>


<div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">

  <h1 className="font-medium truncate">Moritz Zickermann</h1>
  
 
  <div className="flex items-center gap-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
    </svg>
    <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
  </div>

</div>
</div>



  <div className="flex items-center gap-2 w-full">

<div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
    <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
  </svg>
</div>


<div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">

  <h1 className="font-medium truncate">Eliot</h1>
  
 
  <div className="flex items-center gap-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
    </svg>
    <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
  </div>

</div>
</div>



  <div className="flex items-center gap-2 w-full">

<div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
    <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
  </svg>
</div>


<div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">

  <h1 className="font-medium truncate">Felix John</h1>
  
 
  <div className="flex items-center gap-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
    </svg>
    <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
  </div>

</div>
</div>


  <div className="flex items-center gap-2 w-full">

<div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
    <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
  </svg>
</div>


<div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">

  <h1 className="font-medium truncate">Linus Beckman</h1>
  
 
  <div className="flex items-center gap-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
    </svg>
    <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
  </div>

</div>
</div>


  <div className="flex items-center gap-2 w-full">

<div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
    <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
  </svg>
</div>


<div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">

  <h1 className="font-medium truncate">Jane Cruz</h1>
  
 
  <div className="flex items-center gap-2 shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
    </svg>
    <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
  </div>

</div>
</div>




<div className="flex items-center gap-2 w-full">

  <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shrink-0">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a5 5 0 1 1 -5 5a5 5 0 0 1 5 -5z" />
      <path d="M14 14a5 5 0 0 1 5 5v1h-14v-1a5 5 0 0 1 5 -5z" />
    </svg>
  </div>


  <div className="border-b border-gray-300 py-2 w-full text-sm flex items-center justify-between gap-2 min-w-0">
  
    <h1 className="font-medium truncate">Crizska E.</h1>
    
   
    <div className="flex items-center gap-2 shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" /><path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85" /><path d="M8 21l8 0" /><path d="M12 17l0 4" />
      </svg>
      <div className='bg-green-500 rounded-full w-2.5 h-2.5 shadow-sm'></div>
    </div>

  </div>
</div>

     


</div>



  </div>
  
<div className=' text-wrap  bg-slate-100 w-full flex flex-row p-2 gap-2'>
  <h1>Class code: <span className='font-bold'>6exm2p</span></h1>
  <h1 className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg></h1>
  <h1 className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7" /></svg></h1>
  </div>

  </div>



{/* call to action btn */}

<div className='relative flex flex-col items-center justify-center w-full h-[700px] overflow-hidden'>
  

  <img 
    src={hero_wide} 
    className='absolute inset-0 w-full h-full object-cover z-0' 
    alt="Background"
  />


  <div className="absolute inset-0 bg-sky-900/40 z-10"></div>


  <div className="relative z-20 text-center flex flex-col items-center gap-6">
    <h1 className='text-4xl md:text-5xl font-bold italic text-white drop-shadow-lg'>
      Join us today
    </h1>
    
    <button className="bg-white text-sky-600 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
      Get Started
    </button>
  </div>
    
</div>

{/*footer*/}

<footer className="bg-sky-500 text-white py-12 px-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
  
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold tracking-tighter">Syncro</h2>
      <p className="text-sky-200 text-sm">
        Elevating student collaboration through real-time synchronization.
      </p>
     
      <div className="flex gap-4 mt-2">
      <Link to='https://www.facebook.com/MichaelOliverM.18'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-meta"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 10.174c1.766 -2.784 3.315 -4.174 4.648 -4.174c2 0 3.263 2.213 4 5.217c.704 2.869 .5 6.783 -2 6.783c-1.114 0 -2.648 -1.565 -4.148 -3.652a27.627 27.627 0 0 1 -2.5 -4.174" /><path d="M12 10.174c-1.766 -2.784 -3.315 -4.174 -4.648 -4.174c-2 0 -3.263 2.213 -4 5.217c-.704 2.869 -.5 6.783 2 6.783c1.114 0 2.648 -1.565 4.148 -3.652c1 -1.391 1.833 -2.783 2.5 -4.174" /></svg></Link>
      <Link to='https://www.instagram.com/maiiyykk/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-8a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-4 5a4 4 0 0 0 -3.995 3.8l-.005 .2a4 4 0 1 0 4 -4m4.5 -1.5a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" /></svg></Link>
      <Link to='https://github.com/Miketryartd?fbclid=IwY2xjawPm4plleHRuA2FlbQIxMABicmlkETFXbW5peGRTR3pvbDFQWFk4c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnplP0gyYpykBXjOFwRwqommLfkPrUlCLqOEaVRUXlFAjc4DQ8xqd4Q3qqLf_aem_yM0o8Ih76w0IVCiBKxTPlQ'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg></Link>
      <Link to='https://www.linkedin.com/in/michael-oliver-m-lea%C3%B1o-jr-42617938a/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1 -5 5h-10a5 5 0 0 1 -5 -5v-10a5 5 0 0 1 5 -5zm-9 8a1 1 0 0 0 -1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0 -1 -1m6 0a3 3 0 0 0 -1.168 .236l-.125 .057a1 1 0 0 0 -1.707 .707v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3 -3m-6 -3a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" /></svg></Link>
      </div>
    </div>


    <div>
      <h3 className="font-bold mb-4">Product</h3>
      <ul className="text-sky-100 text-sm space-y-2">
        <li className="hover:text-white cursor-pointer">Whiteboarding</li>
        <li className="hover:text-white cursor-pointer">PPT Sync</li>
      </ul>
    </div>

  
    <div>
      <h3 className="font-bold mb-4">Join the Waitlist</h3>
      <div className="flex flex-col gap-2">
        <input type="text" placeholder="your@email.com" className="bg-sky-600 border border-sky-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400" />
        <button className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 rounded-md transition-all">Submit</button>
      </div>
    </div>
  </div>


  <div className="border-t border-sky-900 mt-12 pt-6 flex justify-between items-center text-[10px] text-sky-100">
    <p >© 2026 Syncro. All rights reserved.</p>
    <div className="flex items-center gap-2">
       <span className="w-2 h-2 bg-green-500 rounded-full"></span>
       <span>Systems Operational</span>
    </div>
  </div>
</footer>
    </>
  )
  
}

export default Home
