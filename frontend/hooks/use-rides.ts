"use client";

import { useState, useEffect } from "react";
import type { Ride, RideRequest } from "@/types/ride";
import { RideService } from "@/lib/rides";
import { useAuth } from "./use-auth";

export function useRides() {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Fetch current ride and history
  const fetchRides = async () => {
    try {
      const [current, history] = await Promise.all([
        RideService.getCurrentRide(),
        RideService.getRideHistory(),
      ]);
      setCurrentRide(current);
      setRideHistory(history);
    } catch (error) {
      console.error("Failed to fetch rides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // For drivers: fetch available rides
  const fetchAvailableRides = async () => {
    if (user?.type !== "driver") return;
    try {
      const rides = await RideService.getAvailableRides();
      setAvailableRides(rides);
    } catch (error) {
      console.error("Failed to fetch available rides:", error);
    }
  };

  useEffect(() => {
    fetchRides();
    if (user?.type === "driver") {
      fetchAvailableRides();
    }
  }, [user?.type]);

  // Passenger functions
  const requestRide = async (request: RideRequest) => {
    try {
      const ride = await RideService.createRideRequest(request);
      setCurrentRide(ride);
      return ride;
    } catch (error) {
      console.error("Failed to request ride:", error);
      throw error;
    }
  };

  const cancelRide = async (rideId: string) => {
    try {
      await RideService.cancelRide(rideId);
      setCurrentRide(null);
      await fetchRides();
    } catch (error) {
      console.error("Failed to cancel ride:", error);
      throw error;
    }
  };

  // Driver functions
  const acceptRide = async (rideId: string) => {
    try {
      const ride = await RideService.acceptRide(rideId);
      setCurrentRide(ride);
      setAvailableRides((prev) => prev.filter((r) => r._id !== rideId));
      return ride;
    } catch (error) {
      console.error("Failed to accept ride:", error);
      throw error;
    }
  };

  const startRide = async (rideId: string) => {
    try {
      const ride = await RideService.startRide(rideId);
      setCurrentRide(ride);
      return ride;
    } catch (error) {
      console.error("Failed to start ride:", error);
      throw error;
    }
  };

  const completeRide = async (rideId: string) => {
    try {
      const ride = await RideService.completeRide(rideId);
      setCurrentRide(null);
      await fetchRides();
      return ride;
    } catch (error) {
      console.error("Failed to complete ride:", error);
      throw error;
    }
  };

  const updateLocation = async (
    rideId: string,
    location: { lat: number; lng: number }
  ) => {
    try {
      await RideService.updateLocation(rideId, location);
    } catch (error) {
      console.error("Failed to update location:", error);
      throw error;
    }
  };

  return {
    currentRide,
    rideHistory,
    availableRides,
    isLoading,
    // Passenger functions
    requestRide,
    cancelRide,
    // Driver functions
    acceptRide,
    startRide,
    completeRide,
    updateLocation,
    // Refresh functions
    refreshRides: fetchRides,
    refreshAvailableRides: fetchAvailableRides,
  };
}
