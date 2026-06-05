import { useState, useRef, useEffect } from 'react';
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification } from '../../api/endpoints/notifications';
import { formatDistanceToNow } from 'date-fns';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: notificationsData } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 30000 // Poll every 30s
  });

  const notifications = notificationsData?.data || [];
  const unreadCount = notifications.filter(n => !n.read_at).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] })
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors relative group"
      >
        <BellIcon className="w-5 h-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold text-white bg-destructive rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.6)]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card border border-border/60 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-border/50 bg-muted/20 flex justify-between items-center">
            <h3 className="font-semibold text-sm text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markAllAsReadMutation.mutate()}
                className="text-xs text-primary hover:underline font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto custom-scrollbar bg-background">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No notifications right now.
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 flex gap-3 transition-colors ${!notif.read_at ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notif.read_at ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                        {notif.data?.message || 'New notification'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      {!notif.read_at && (
                        <button 
                          onClick={() => markAsReadMutation.mutate(notif.id)}
                          title="Mark as read"
                          className="text-primary hover:bg-primary/10 p-1 rounded-full transition-colors"
                        >
                          <CheckIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteMutation.mutate(notif.id)}
                        title="Delete"
                        className="text-destructive hover:bg-destructive/10 p-1 rounded-full transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ onMenuClick }) => {
  const userStr = localStorage.getItem('authUser');
  const user = userStr ? JSON.parse(userStr) : { name: 'User', role: 1 };
  
  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 lg:px-8 shadow-sm z-20 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="md:hidden text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50 focus-within:border-primary/50 focus-within:bg-background transition-colors max-w-md w-full">
          <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground w-full text-foreground"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <NotificationsDropdown />
        
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
