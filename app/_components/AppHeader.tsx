import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ProfileAvatar from './ProfileAvatar'
import { ChevronDown, FileCode, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth-context'
import { auth } from '@/configs/firebaseConfig'
import { signOut } from 'firebase/auth'

interface AppHeaderProps {
  hideSidebar?: boolean;
  title?: string;
}

function AppHeader({ hideSidebar = false, title }: AppHeaderProps) {
  const router = useRouter();
  const { user } = useAuth();
  
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await signOut(auth);
        router.push('/');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };
  
  return (
    <header className="sticky top-0 z-30 w-full border-b">
      <div className="mx-auto px-4">
        <div className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-4">
              <SidebarTrigger className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
              
              {title && (
                <h1 className="text-sm font-medium text-gray-900 dark:text-gray-100 ml-2">
                  {title}
                </h1>
              )}
          </div>
          
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-8 w-px bg-gray-200 dark:bg-gray-700",
              hideSidebar ? "hidden md:block" : "hidden sm:block"
            )} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <ProfileAvatar />
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user && (
                  <>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500">Account</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => router.push('/designs')}>
                  <FileCode className="mr-2 h-4 w-4" />
                  <span>My Designs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader