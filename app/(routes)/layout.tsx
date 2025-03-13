"use client";
import React, { useEffect } from "react";
import { useAuth } from "../auth-context";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/AppSidebar";
import AppHeader from "../_components/AppHeader";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-sidebar">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full md:ml-0 md:m-1 border overflow-hidden bg-white dark:bg-muted">
          <AppHeader />
          <div className="px-4 sm:px-8 py-4 sm:py-8 md:px-12 w-full">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default DashboardLayout;
