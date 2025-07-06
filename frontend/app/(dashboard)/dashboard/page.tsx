"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/shared/navbar";
import { PassengerDashboard } from "@/components/passenger/passenger-dashboard";
import { DriverDashboard } from "@/components/driver/driver-dashboard";

export default function DashboardPage() {
  const { user, loading: isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {user.type === "passenger" ? (
          <PassengerDashboard user={user} />
        ) : (
          <DriverDashboard user={user} />
        )}
      </main>
    </div>
  );
}
