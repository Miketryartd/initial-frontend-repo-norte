import { useLocation } from "react-router-dom";


const Header = () => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case "/Feed":
                return "Community Feed";
            case "/Publish":
                return "Upload";
            case "/Dashboard":
                return "My Desk";
            default:
                return "Syncro";
        }
    };
    return (
     
        <header className="flex flex-row w-full h-20 px-8 items-center gap-5 bg-white border-b border-neutral-200">
            <h1 className="text-2xl font-bold whitespace-nowrap">{getTitle()}</h1>
            <input 
                type="search" 
                placeholder="Looking for something?" 
                className="border-1 w-full rounded-md p-2 outline-none border-neutral-300 bg-neutral-50 focus:bg-white transition-all"
            />
        
            <div className="flex gap-10 p-2">
                <button className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg></button>
                <button className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" /><path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" /></svg></button>
                <button className="p-2 cursor-pointer rounded-full bg-neutral-100 hover:bg-neutral-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" /><path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" /></svg></button>
            
            </div>
        </header>
    );
}

export default Header