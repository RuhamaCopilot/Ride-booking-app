"use client";

import { useState, useEffect } from "react";
import type { User, Driver, VehicleType } from "@/types/user";
import type { RideStatus } from "@/types/ride";
import { useRides } from "@/hooks/use-rides";
import { DriverService } from "@/lib/driver";
import { PendingRides } from "@/components/driver/pending-rides";
import { CurrentRideManagement } from "@/components/driver/current-ride-management";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Car, Clock, DollarSign, UserIcon } from "lucide-react";
import { RIDE_TYPES } from "@/lib/constants";

interface DriverDashboardProps {
  user: User;
}

export function DriverDashboard({ user }: DriverDashboardProps) {
  if (!user || user.type !== "driver") {
    return null;
  }

  const driver = user as Driver;
  const {
    availableRides: pendingRides,
    currentRide,
    isLoading,
    acceptRide,
    startRide,
    completeRide,
  } = useRides();
  const [isAvailable, setIsAvailable] = useState(driver.isAvailable);
  const [isAcceptingRide, setIsAcceptingRide] = useState(false);

  useEffect(() => {
    const savedStatus = localStorage.getItem("driver_availability");
    if (savedStatus === "true") {
      handleAvailabilityChange(true);
    }
  }, []);

  const handleAvailabilityChange = async (newAvailability: boolean) => {
    try {
      const updatedDriver = await DriverService.updateAvailability(
        newAvailability
      );
      setIsAvailable(updatedDriver.isAvailable);
      if (!newAvailability) {
        localStorage.removeItem("driver_availability");
        toast.success(
          "You are now offline. You won't receive any ride requests."
        );
      } else {
        localStorage.setItem(
          "driver_availability",
          String(updatedDriver.isAvailable)
        );
        toast.success(
          "You are now online! You'll start receiving ride requests for your vehicle types."
        );
      }
    } catch (error) {
      toast.error("Failed to update availability");
      setIsAvailable(!newAvailability); // Revert the switch
      localStorage.removeItem("driver_availability");
    }
  };

  const handleAcceptRide = async (rideId: string) => {
    setIsAcceptingRide(true);
    try {
      await acceptRide(rideId);
      toast.success("Ride accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept ride");
    } finally {
      setIsAcceptingRide(false);
    }
  };

  const handleUpdateRideStatus = async (status: RideStatus) => {
    if (!currentRide?._id) return;
    try {
      if (status === "in_progress") {
        await startRide(currentRide._id);
      } else if (status === "completed") {
        await completeRide(currentRide._id);
      }
      toast.success(
        `Ride ${status === "completed" ? "completed" : "started"} successfully!`
      );
    } catch (error) {
      toast.error("Failed to update ride status");
    }
  };

  // Add this function to render vehicle type badges
  const renderVehicleTypes = () => {
    if (!driver.vehicleTypes?.length) {
      return (
        <p className="text-sm text-muted-foreground">
          No vehicle types selected
        </p>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {driver.vehicleTypes.map((type) => (
          <Badge key={type} variant="secondary" className="text-sm">
            {RIDE_TYPES[type as keyof typeof RIDE_TYPES].icon}{" "}
            {RIDE_TYPES[type as keyof typeof RIDE_TYPES].name}
          </Badge>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="availability">Available</Label>
          <Switch
            id="availability"
            checked={isAvailable}
            onCheckedChange={handleAvailabilityChange}
          />
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {isAvailable ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="rides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rides" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Rides
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rides" className="space-y-6">
          {currentRide ? (
            <CurrentRideManagement
              ride={currentRide}
              onUpdateStatus={handleUpdateRideStatus}
            />
          ) : (
            isAvailable && (
              <PendingRides
                rides={pendingRides}
                onAcceptRide={handleAcceptRide}
                isLoading={isAcceptingRide}
              />
            )
          )}

          {!isAvailable && (
            <Card>
              <CardHeader>
                <CardTitle>You're Currently Offline</CardTitle>
                <CardDescription>
                  Turn on availability to start receiving ride requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Toggle the availability switch to go online and start
                    earning.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your earnings summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">₹0</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">₹0</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">₹0</div>
                  <div className="text-sm text-muted-foreground">
                    This Month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Driver Profile</CardTitle>
              <CardDescription>Your driver account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <p className="text-sm text-muted-foreground">{driver.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground">
                    {driver.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Account Type</label>
                  <p className="text-sm text-muted-foreground capitalize">
                    {driver.type}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Vehicle Types</label>
                  <div className="space-y-2 mt-2">
                    {(
                      Object.entries(RIDE_TYPES) as [
                        VehicleType,
                        (typeof RIDE_TYPES)[keyof typeof RIDE_TYPES]
                      ][]
                    ).map(([type, details]) => (
                      <div key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`vehicle-${type}`}
                          checked={driver.vehicleTypes?.includes(type)}
                          onChange={async (e) => {
                            try {
                              const newTypes = e.target.checked
                                ? [...(driver.vehicleTypes || []), type]
                                : (driver.vehicleTypes || []).filter(
                                    (t) => t !== type
                                  );
                              await DriverService.registerVehicleTypes(
                                newTypes
                              );
                              toast.success(
                                "Vehicle types updated successfully"
                              );
                            } catch (error) {
                              toast.error("Failed to update vehicle types");
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label
                          htmlFor={`vehicle-${type}`}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span>{details.icon}</span>
                          <span>{details.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {driver.vehicle && (
                  <>
                    <div>
                      <label className="text-sm font-medium">Vehicle</label>
                      <p className="text-sm text-muted-foreground">
                        {driver.vehicle.make} {driver.vehicle.model} (
                        {driver.vehicle.year})
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        License Plate
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {driver.vehicle.licensePlate}
                      </p>
                    </div>
                  </>
                )}
                {driver.rating && (
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <p className="text-sm text-muted-foreground">
                      {driver.rating.toFixed(1)} ⭐ ({driver.totalRides} rides)
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
