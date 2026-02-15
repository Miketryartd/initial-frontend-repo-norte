import { useState, useEffect } from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'

import hero_wide from '../images/hero image wide.png';
import syncro_logo from "../images/Syncro logo no text .png";
import hero_image_v2 from "../images/mike2.png";
function Home() {



//Live feature displaying message//
const messages = [
  "Hey nice reviewer!",
  "This helped me. Thanks!",
  "Omg, I needed this.",
  "I love this app!!",
  "Awesome notes!",
  "Lifesaver"
];

const [currentIndex, setCurrentIndex] = useState(0);
const [shownMessages, setShownMessages] = useState<string[]>([]);
const [isTyping, setIsTyping] = useState(false);
useEffect(() => {
  if (currentIndex >= messages.length) {
    const resetTimer = setTimeout(() => {
      setShownMessages([]);
      setCurrentIndex(0);
    }, 4000);

    return () => clearTimeout(resetTimer);
  }

  const typingStart = setTimeout(() => {
    setIsTyping(true);
  }, 300);


  const messageTimer = setTimeout(() => {
    setShownMessages(prev => [...prev, messages[currentIndex]]);
    setCurrentIndex(prev => prev + 1);
    setIsTyping(false);
  }, 1500);

  return () => {
    clearTimeout(typingStart);
    clearTimeout(messageTimer);
  };
}, [currentIndex]);

  return (
    <>
    {/* Header Section */}
    <div  className="flex items-center justify-between px-4 md:px-8 border-b border-sky-100 border-solid py-3 flex-wrap gap-3">
     <img src={syncro_logo} className='h-14 w-14 md:h-20 md:w-20 object-cover'></img>

     <div className="flex space-x-4 text-sm md:text-base flex-wrap">
     <Link to='https://www.linkedin.com/in/michael-oliver-m-lea%C3%B1o-jr-42617938a/'><h1>LinkedIn</h1></Link>
       <Link to='https://github.com/Miketryartd'><h1>Github</h1></Link>
       <Link to='/Signup'><h1><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg></h1></Link>
      </div>

    </div>
    {/* Hero Section */}
 
    <div className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] overflow-hidden">

  <img
    src={hero_image_v2}
    alt="Syncro Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

 
  <div className="absolute inset-0 bg-black/50"></div>

 
  <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
    
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight">
    Share Notes. Test Knowledge. Study Smarter.
    </h1>

    <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg md:text-xl">
    Syncro is your student hub for uploading files, discussing lessons,
    and creating quizzes — all in one organized platform.

    </p>

    <div className="mt-8 flex gap-4 flex-wrap justify-center">
      <Link
        to="/Signup"
        className="bg-sky-500 hover:bg-sky-600 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
      >
        Get Started
      </Link>

      <a
        href="#live-preview"
        className="bg-white/10 backdrop-blur hover:bg-white/20 transition px-6 py-3 rounded-xl text-white font-semibold border border-white/30"
      >
        See Live Demo
      </a>
    </div>

  </div>
</div>




   {/* How it works */}

<div className="flex justify-center mt-16 px-6">

<div className="flex flex-col items-center text-center max-w-xs">
  <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
    1
  </div>
  <h3 className="font-bold mb-2">Upload Files</h3>
  <p>Share notes, reviewers, and study materials with classmates.</p>
</div>

<div className="flex flex-col items-center text-center max-w-xs">
  <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
    2
  </div>
  <h3 className="font-bold mb-2">Discuss & Like</h3>
  <p>Comment on posts and like helpful resources from other students.</p>
</div>

<div className="flex flex-col items-center text-center max-w-xs">
  <div className="bg-sky-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
    3
  </div>
  <h3 className="font-bold mb-2">Create Quizzes</h3>
  <p>Test your knowledge and help others review smarter.</p>
</div>

</div>


{/* Benefits */}



<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10 m-5 gap-6">

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70  h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-red-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="fill-white-900 icon icon-tabler icons-tabler-filled icon-tabler-bolt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" /></svg>
  </div>
  <h3 className="font-bold mb-2">Fast Updates</h3>
  <p className='m-4'>Start a room instantly with one click.</p>
</div>

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-orange-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-folder"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 3a1 1 0 0 1 .608 .206l.1 .087l2.706 2.707h6.586a3 3 0 0 1 2.995 2.824l.005 .176v8a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-11a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" /></svg>
  </div>
  <h3 className="font-bold mb-2">File Sharing</h3>
  <p className='m-4'>Upload and access study materials anytime.</p>
</div>

<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100  w-full">
  <div className="bg-yellow-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">

  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" /></svg>
  </div>
  <h3 className="font-bold mb-2">Smart Discussions</h3>
  <p className='m-4'>Comment on posts and learn from the community.</p>

</div>
<div className="flex flex-col items-center text-center bg-linear-to-b from white-500 to-sky-100/70 h-[250px] rounded-[10px] shadow-xl shadow-neutral-100 w-full">
  <div className="bg-lime-400 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 mt-10">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-writing"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 8v9a1 1 0 0 1 -.293 .707l-2 2a1 1 0 0 1 -.112 .097l-.11 .071l-.114 .054l-.105 .035l-.149 .03l-.117 .006h-13a3 3 0 0 1 0 -6h4a1 1 0 0 0 0 -2h-3a1 1 0 0 1 0 -2h3a3 3 0 0 1 0 6h-4a1 1 0 0 0 0 2h10.585l-.292 -.293a1 1 0 0 1 -.293 -.707v-9zm-3 -6c1.673 0 3 1.327 3 3v1h-6v-1c0 -1.673 1.327 -3 3 -3" /></svg>
  </div>
  <h3 className="font-bold mb-2">Quiz Builder</h3>
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
  

<div className="bg-gradient-to-b from-sky-50 to-white py-20">


<div  id='live-preview' className="flex flex-col lg:flex-row justify-center items-stretch w-full px-4 py-10 gap-6">
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-black/10">

 
    <div  className="space-y-2 border-b pb-4">
      <h1 className="text-2xl font-bold">Biology Reviewer</h1>
      <p className="text-sm text-gray-500">
        Posted by <span className="font-medium">JuanDelaCruz</span>
      </p>
    </div>

   
    <div className="flex justify-center">
      <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">

      
        <div className="flex flex-col items-center">
          <span className="text-5xl">📄</span>
          <span className="text-sm text-gray-600 mt-2">
            Biology Reviewer.pdf
          </span>
        </div>

        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded">
          Preview
        </div>
      </div>
    </div>


    <div>
      <p className="text-gray-700 leading-relaxed">
        Complete biology reviewer covering cells, genetics, and basic human
        anatomy. Perfect for midterm preparation.
      </p>
    </div>

 
    <div className="flex items-center justify-between pt-2 border-t">


      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg></span>
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-thumb-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z" /><path d="M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z" /></svg></span>
        <span className="font-semibold">24 likes</span>
      </div>

      

   
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-lg">💬</span>
        <span className="font-semibold">6 comments</span>
      </div>

    </div>
  </div>
    {/* RIGHT — LIVE COMMENTS */}
    <div className="w-full lg:w-80 bg-white rounded-2xl shadow-lg p-4 border border-black/10">
      <h2 className="font-bold mb-3">Live Comments</h2>

      <div className="space-y-2 max-h-64 overflow-hidden">
        {shownMessages.map((msg, i) => (
          <div
            key={i}
            className="bg-gray-100 px-3 py-2 rounded-xl text-sm w-fit max-w-full"
          >
            {msg}
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-gray-500 animate-pulse">
            Someone is typing...
          </div>
        )}
      </div>
    </div>
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
