import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const userStr = localStorage.getItem('authUser');
  const user = userStr ? JSON.parse(userStr) : { name: 'User', role: 1 };
  
  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 lg:px-8 shadow-sm z-20 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50 focus-within:border-primary/50 focus-within:bg-background transition-colors max-w-md w-full">
          <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <button className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative group">
          <BellIcon className="w-5 h-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-border pl-5 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20 group-hover:bg-primary/20 transition-colors">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-foreground group-hover:text-primary transition-colors">{user.name}</p>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">{user.role === 2 ? 'Administrator' : 'Staff'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
