"use client";

import { useState } from "react";
import type { User } from "@/types/auth";
import { useRides } from "@/hooks/use-rides";
import { RideRequestForm } from "@/components/passenger/ride-request-form";
import { CurrentRideStatus } from "@/components/passenger/current-ride-status";
import { RideHistory } from "@/components/passenger/ride-history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Car, History, UserIcon } from "lucide-react";

interface PassengerDashboardProps {
  user: User;
}

export function PassengerDashboard({ user }: PassengerDashboardProps) {
  const { rideHistory, currentRide, isLoading, requestRide } = useRides();
  const [isRequestingRide, setIsRequestingRide] = useState(false);

  const handleRideRequest = async (request: any) => {
    setIsRequestingRide(true);
    try {
      await requestRide(request);
      toast.success("Ride requested successfully!");
    } catch (error) {
      toast.error("Failed to request ride");
    } finally {
      setIsRequestingRide(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Ready for your next ride?</p>
        </div>
      </div>

      <Tabs defaultValue="book" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="book" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Book Ride
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="book" className="space-y-6">
          {currentRide ? (
            <CurrentRideStatus ride={currentRide} />
          ) : (
            <RideRequestForm
              onSubmit={handleRideRequest}
              isLoading={isRequestingRide}
            />
          )}
        </TabsContent>

        <TabsContent value="history">
          <RideHistory rides={rideHistory} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Account Type</label>
                  <p className="text-sm text-muted-foreground capitalize">
                    {user.type}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
