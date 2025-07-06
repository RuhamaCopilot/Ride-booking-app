"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RideRequest, RideType } from "@/types/ride";
import { RIDE_TYPES, LOCATIONS } from "@/lib/constants";
import { MapPin, DollarSign } from "lucide-react";

interface RideRequestFormProps {
  onSubmit: (request: RideRequest) => Promise<void>;
  isLoading: boolean;
}

export function RideRequestForm({ onSubmit, isLoading }: RideRequestFormProps) {
  const [formData, setFormData] = useState<RideRequest>({
    pickupLocation: "",
    dropLocation: "",
    rideType: "car",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    }

    if (!formData.dropLocation.trim()) {
      newErrors.dropLocation = "Drop-off location is required";
    }

    if (formData.pickupLocation === formData.dropLocation) {
      newErrors.dropLocation =
        "Drop-off location must be different from pickup";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        pickupLocation: "",
        dropLocation: "",
        rideType: "car",
      });
    } catch (error) {
      console.error("Failed to submit ride request:", error);
    }
  };

  const handleChange = (field: keyof RideRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const estimatedFare =
    RIDE_TYPES[formData.rideType].basePrice +
    RIDE_TYPES[formData.rideType].pricePerKm * 10;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Book a Ride
        </CardTitle>
        <CardDescription>
          Enter your pickup and drop-off locations to request a ride
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <Select
                value={formData.pickupLocation}
                onValueChange={(value: any) =>
                  handleChange("pickupLocation", value)
                }
              >
                <SelectTrigger
                  className={errors.pickupLocation ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pickupLocation && (
                <p className="text-sm text-red-500">{errors.pickupLocation}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropoff">Drop-off Location</Label>
              <Select
                value={formData.dropLocation}
                onValueChange={(value) => handleChange("dropLocation", value)}
              >
                <SelectTrigger
                  className={errors.dropLocation ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select drop-off location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.dropLocation && (
                <p className="text-sm text-red-500">{errors.dropLocation}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Ride Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(RIDE_TYPES).map(([type, details]) => (
                <div
                  key={type}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.rideType === type
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => handleChange("rideType", type as RideType)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{details.icon}</span>
                    <span className="font-medium">{details.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Base: Rs {details.basePrice} + Rs {details.pricePerKm}/km
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Estimated Fare:</span>
            </div>
            <span className="text-lg font-bold">Rs {estimatedFare}</span>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Requesting Ride..." : "Request Ride"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
