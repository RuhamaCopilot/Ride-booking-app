"use client";

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
import { Phone, User, Car } from "lucide-react";

interface CurrentRideStatusProps {
  ride: Ride;
}

export function CurrentRideStatus({ ride }: CurrentRideStatusProps) {
  const getStatusStep = (status: Ride["status"]) => {
    const steps = ["requested", "accepted", "in_progress", "completed"];
    return steps.indexOf(status) + 1;
  };

  const currentStep = getStatusStep(ride.status);
  const totalSteps = 4;

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
        {/* Progress Steps */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>
              {currentStep}/{totalSteps}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Requested</span>
            <span>Accepted</span>
            <span>In Progress</span>
            <span>Completed</span>
          </div>
        </div>

        {/* Route Information */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
            <div>
              <p className="font-medium">Pickup</p>
              <p className="text-sm text-muted-foreground">
                {ride.pickup.address}
              </p>
            </div>
          </div>
          <div className="ml-1.5 w-0.5 h-6 bg-border" />
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
            <div>
              <p className="font-medium">Drop-off</p>
              <p className="text-sm text-muted-foreground">
                {ride.dropoff.address}
              </p>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        {ride.driverId && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">
                Driver:{" "}
                {typeof ride.driverId === "string"
                  ? ride.driverId
                  : ride.driverId.name}
              </span>
            </div>
          </div>
        )}

        {/* Ride Details */}
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
      </CardContent>
    </Card>
  );
}
