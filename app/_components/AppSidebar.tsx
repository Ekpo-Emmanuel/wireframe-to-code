import React, { useEffect, useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarMenuSubItem,
    SidebarMenuButton,
  useSidebar,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useTheme } from "next-themes";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  CircleDollarSign,
  Code,
  FileCode,
  Home,
  Inbox,
  Paintbrush,
  Search,
  Settings,
  LogOut,
  Plus,
  User,
  Clock,
  Star,
  Moon,
  Sun,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAuth } from "@/app/auth-context";
import axios from "axios";
import { RECORD } from "@/app/(routes)/view-code/[uid]/page";
import { auth } from "@/configs/firebaseConfig";
import { signOut } from "firebase/auth";
import { cn } from "@/lib/utils";

const mainItems = [
  {
    title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    description: "Main workspace",
    },
    {
    title: "Designs",
        url: "/designs",
        icon: Paintbrush,
    description: "Your wireframes",
    hasSubmenu: true,
  },
];

export function AppSidebar() {
  const { user } = useAuth();
    const path = usePathname();
  const router = useRouter();
  const [recentDesigns, setRecentDesigns] = useState<RECORD[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const isCollapsed = state === "collapsed";

  useEffect(() => {
    if (user?.email) {
      fetchRecentDesigns();
    }
  }, [user?.email]);

  const fetchRecentDesigns = async () => {
    if (!user?.email) return;

    setIsLoading(true);
    try {
      const result = await axios.get(
        "/api/wireframe-to-code?email=" + user?.email
      );
      setRecentDesigns(result.data?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching recent designs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "Untitled Design";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  const createNewDesign = () => {
    router.push("/dashboard");
  };

    return (
    <Sidebar collapsible="icon">
      <div
        className={cn(
          "flex items-center gap-3 p-4",
          isCollapsed && "justify-center px-0"
        )}
      >
        <img src={"/logo.svg"} alt="logo" className={cn("w-6 h-6")} />
        {!isCollapsed && (
          <div>
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ai pixel code
            </h2>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <div className="px-4 mt-7">
          <button
            onClick={createNewDesign}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 h-8 transition-all duration-200 font-medium text-sm"
          >
            <Plus className="h-5 w-5" />
            Create New Design
          </button>
        </div>
      )}

      <SidebarContent className="mt-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item, index) => (
                <div key={index}>
                  {item.hasSubmenu && !isCollapsed ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {isLoading && (
                              <SidebarMenuSubItem>
                                <div className="flex items-center justify-center py-2">
                                  <div className="h-3 w-3 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                                  <span className="ml-2 text-xs text-gray-500">
                                    Loading...
                                  </span>
                                </div>
                              </SidebarMenuSubItem>
                            )}

                            {!isLoading && recentDesigns.length > 0 && (
                              <>
                                {recentDesigns.map((design, idx) => (
                                  <SidebarMenuSubItem
                                    key={idx}
                                    className={cn(
                                      path === item.url ||
                                        (item.hasSubmenu &&
                                          path.startsWith(item.url) &&
                                          "text-blue-500 font-bold")
                                    )}
                                  >
                                    <Link
                                      href={`/view-code/${design.uid}`}
                                      className={`
                                                                                flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200
                                                                                ${
                                                                                  path ===
                                                                                  `/view-code/${design.uid}`
                                                                                    ? "text-blue-700 dark:text-blue-400 font-medium"
                                                                                    : "text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                                                                                }
                                                                            `}
                                    >
                                      <FileCode className="h-3.5 w-3.5" />
                                      <span className="truncate max-w-[150px]">
                                        {truncateText(design.description, 20)}
                                      </span>
                                    </Link>
                                  </SidebarMenuSubItem>
                                ))}
                              </>
                            )}

                            {!isLoading && recentDesigns.length === 0 && (
                              <SidebarMenuSubItem>
                                <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                                  No recent designs
                    </div>
                              </SidebarMenuSubItem>
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={cn(
                            path === item.url ||
                              (item.hasSubmenu &&
                                path.startsWith(item.url) &&
                                "text-blue-500 font-bold")
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </div>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-4 py-2">
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-all"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-800 transition-all"
              title="Log out of your account"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 px-3">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-all"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="font-medium">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
              <SidebarTrigger className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-all" />
            </div>

            {user && (
              <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage
                      src={user.photoURL || ""}
                      alt={user.email || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {user.email
                        ? user.email.includes("@")
                          ? user.email.split("@")[0].length > 10
                            ? `${user.email.split("@")[0].substring(0, 10)}...`
                            : user.email.split("@")[0]
                          : user.email
                        : ""}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user.email?.includes("@")
                        ? `@${user.email.split("@")[1]}`
                        : ""}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-auto flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-700 transition-all"
                    title="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
            </SidebarFooter>
        </Sidebar>
  );
}
