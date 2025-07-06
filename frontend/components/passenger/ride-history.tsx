"use client";

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
import { MapPin, Clock, DollarSign } from "lucide-react";

interface RideHistoryProps {
  rides: Ride[];
  isLoading: boolean;
}

export function RideHistory({ rides, isLoading }: RideHistoryProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ride History</CardTitle>
          <CardDescription>Loading your ride history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="border rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (rides.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ride History</CardTitle>
          <CardDescription>No rides found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Your ride history will appear here once you start booking rides.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride History</CardTitle>
        <CardDescription>
          {rides.length} ride{rides.length !== 1 ? "s" : ""} completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rides.map((ride) => (
            <div
              key={ride._id}
              className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        RIDE_STATUS_COLORS[ride.status] ||
                        "bg-gray-100 text-gray-800"
                      }
                    >
                      {ride.status.replace("_", " ").toUpperCase()}
                    </Badge>
                    {ride.rideType && (
                      <Badge variant="secondary">
                        {RIDE_TYPES[ride.rideType]?.icon || "🚗"}{" "}
                        {RIDE_TYPES[ride.rideType]?.name || ride.rideType}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(ride.requestedAt)}</span>
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
                    <p className="font-medium text-sm">From</p>
                    <p className="text-sm text-muted-foreground">
                      {ride.pickup.address}
                    </p>
                  </div>
                </div>
                <div className="ml-1.5 w-0.5 h-4 bg-border" />
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
                  <div>
                    <p className="font-medium text-sm">To</p>
                    <p className="text-sm text-muted-foreground">
                      {ride.dropoff.address}
                    </p>
                  </div>
                </div>
              </div>

              {ride.driverId && (
                <div className="text-sm text-muted-foreground">
                  Driver:{" "}
                  {typeof ride.driverId === "string"
                    ? ride.driverId
                    : ride.driverId.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
