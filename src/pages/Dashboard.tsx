import { Link } from "react-router-dom";
import syncro_logo from "../images/Syncro logo.png";


function Dashboard() {
    return (
      <>
      <aside className="flex flex-col items-center py-6 md:w-64 w-64 bg-white border-r border-neutral-200 h-full">
  <img
    className="h-12 w-12 object-contain"
    src={syncro_logo}
    alt="Syncro"
  />
  <nav className="mt-10 w-full px-4 flex-1 overflow-y-auto">
    <div className="flex flex-col gap-2">
      {[
        { name: "Feed", path: "/Feed" },
        { name: "Publish Notes", path: "/Publish" },
        { name: "Quizzes", path: "/Quiz-Feed" },
        { name: "Create Quiz", path: "/Create-Quiz" },
        { name: "Saved Notes", path: "/Bookmarks" },
      ].map((link) => (
        <div
          key={link.path}
          className="p-3 bg-slate-100 text-sky-600 rounded-lg font-bold w-full"
        >
          <Link className="block w-full" to={link.path}>
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  </nav>
</aside>

      </>
     
     
    );
}
export default Dashboard;