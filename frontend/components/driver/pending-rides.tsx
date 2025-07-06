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
import { RIDE_TYPES } from "@/lib/constants";
import { getTimeAgo } from "@/lib/utils/date";
import { MapPin, Clock, DollarSign, User } from "lucide-react";

interface PendingRidesProps {
  rides: Ride[];
  onAcceptRide: (rideId: string) => Promise<void>;
  isLoading: boolean;
}

export function PendingRides({
  rides,
  onAcceptRide,
  isLoading,
}: PendingRidesProps) {
  if (rides.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Ride Requests</CardTitle>
          <CardDescription>
            No pending ride requests at the moment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              New ride requests will appear here when passengers book rides in
              your area.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Ride Requests</CardTitle>
        <CardDescription>
          {rides.length} ride{rides.length !== 1 ? "s" : ""} waiting for
          acceptance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="border rounded-lg p-4 space-y-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">
                      {typeof ride.userId === "object"
                        ? ride.userId.name
                        : ride.userId}
                    </span>
                    <Badge variant="secondary">
                      {(ride.rideType && RIDE_TYPES[ride.rideType]?.icon) ||
                        "🚗"}{" "}
                      {(ride.rideType && RIDE_TYPES[ride.rideType]?.name) ||
                        "Car"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{getTimeAgo(ride.requestedAt)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold">
                    Rs {ride.fare || 0}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Pickup</p>
                    <p className="text-sm text-muted-foreground">
                      {ride.pickup.address}
                    </p>
                  </div>
                </div>
                <div className="ml-1.5 w-0.5 h-4 bg-border" />
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">Drop-off</p>
                    <p className="text-sm text-muted-foreground">
                      {ride.dropoff.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onAcceptRide(ride._id)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Accepting..." : "Accept Ride"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
