import { Link } from "react-router-dom";
import syncro_logo from "../images/Syncro logo.png";


function Dashboard() {
    return (
     
        <aside className="w-64 h-full bg-white border-r border-neutral-200 flex flex-col items-center py-6">
            <img className="h-15 w-15 object-contain" src={syncro_logo} alt="Syncro" />
            <nav className="mt-10 w-full px-4">
             
             <div className="flex flex-col gap-2">
                
          

             <div className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full">
  <Link className="block w-full cursor-pointer " to='/Feed'>
    Feed
  </Link>
</div>            <div className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full">
  <Link className="block w-full cursor-pointer " to='/Publish'>
    Publish Notes
  </Link>
</div>

<div className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full">
  <Link className="block w-full cursor-pointer " to='/Quiz-Feed'>
    Quizzes
  </Link>
</div>
<div className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full">
  <Link className="block w-full cursor-pointer " to='/Create-Quiz'>
    Create Quiz
  </Link>
</div>
<div className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full">
  <Link className="block w-full cursor-pointer " to='/Bookmarks'>
    Saved Notes
  </Link>
</div>
    
    
             </div>
            </nav>
        </aside>
    );
}
export default Dashboard;