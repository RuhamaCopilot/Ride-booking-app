"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Ride } from "@/types/ride";
import { RIDE_STATUS_COLORS, RIDE_TYPES } from "@/lib/constants";
import { formatDate } from "@/lib/utils/date";
import { Phone, User, Car, Navigation } from "lucide-react";

interface CurrentRideManagementProps {
  ride: Ride;
  onUpdateStatus: (status: Ride["status"]) => Promise<void>;
}

export function CurrentRideManagement({
  ride,
  onUpdateStatus,
}: CurrentRideManagementProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (status: Ride["status"]) => {
    setIsLoading(true);
    try {
      await onUpdateStatus(status);
    } catch (error) {
      console.error("Failed to update ride status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNextAction = () => {
    switch (ride.status) {
      case "accepted":
        return {
          label: "Start Ride",
          action: () => handleStatusUpdate("in_progress"),
          variant: "default" as const,
        };
      case "in_progress":
        return {
          label: "Complete Ride",
          action: () => handleStatusUpdate("completed"),
          variant: "default" as const,
        };
      default:
        return null;
    }
  };

  const nextAction = getNextAction();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Current Ride
          </span>
          <Badge className={RIDE_STATUS_COLORS[ride.status]}>
            {ride.status.replace("-", " ").toUpperCase()}
          </Badge>
        </CardTitle>
        <CardDescription>
          {(ride.rideType && RIDE_TYPES[ride.rideType]?.icon) || "🚗"}{" "}
          {(ride.rideType && RIDE_TYPES[ride.rideType]?.name) || "Car"} • Rs{" "}
          {ride.fare || 0}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Passenger Information */}
        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">
              Passenger:{" "}
              {typeof ride.userId === "object" ? ride.userId.name : ride.userId}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Contact passenger</span>
            </div>
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
          </div>
        </div>

        {/* Route Information */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
            <div className="flex-1">
              <p className="font-medium">Pickup Location</p>
              <p className="text-sm text-muted-foreground">
                {ride.pickup.address}
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </Button>
          </div>
          <div className="ml-1.5 w-0.5 h-6 bg-border" />
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
            <div className="flex-1">
              <p className="font-medium">Drop-off Location</p>
              <p className="text-sm text-muted-foreground">
                {ride.dropoff.address}
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </Button>
          </div>
        </div>

        {/* Ride Timeline */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Requested</p>
            <p className="font-medium">{formatDate(ride.requestedAt)}</p>
          </div>
          {ride.status !== "requested" && (
            <div>
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium capitalize">
                {ride.status.replace("_", " ")}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {nextAction && (
            <Button
              onClick={nextAction.action}
              disabled={isLoading}
              variant={nextAction.variant}
              className="flex-1"
            >
              {isLoading ? "Updating..." : nextAction.label}
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={() => handleStatusUpdate("cancelled")}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel Ride
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
