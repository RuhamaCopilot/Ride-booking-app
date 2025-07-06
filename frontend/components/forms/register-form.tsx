"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/use-auth";
import { validateEmail, validatePassword } from "@/lib/utils/validation";
import { toast } from "sonner";
import type { RegisterData } from "@/types/auth";
import { RIDE_TYPES } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import type { VehicleType } from "@/types/user";

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    type: "passenger",
    vehicleTypes: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(formData);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: RegisterData) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up to start booking rides</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Account Type</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev: RegisterData) => ({
                  ...prev,
                  type: value as "passenger" | "driver",
                }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="passenger" id="passenger" />
                <Label htmlFor="passenger">Passenger - Book rides</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="driver" id="driver" />
                <Label htmlFor="driver">Driver - Provide rides</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.type === "driver" && (
            <div className="space-y-3">
              <Label>Vehicle Types</Label>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(RIDE_TYPES).map(([type, details]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`vehicle-${type}`}
                      checked={formData.vehicleTypes?.includes(
                        type as VehicleType
                      )}
                      onCheckedChange={(checked) => {
                        setFormData((prev: RegisterData) => ({
                          ...prev,
                          vehicleTypes: checked
                            ? [
                                ...(prev.vehicleTypes || []),
                                type as VehicleType,
                              ]
                            : (prev.vehicleTypes || []).filter(
                                (t) => t !== type
                              ),
                        }));
                      }}
                    />
                    <Label
                      htmlFor={`vehicle-${type}`}
                      className="flex items-center gap-2"
                    >
                      <span>{details.icon}</span>
                      <span>{details.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
              {formData.type === "driver" &&
                (formData.vehicleTypes?.length || 0) === 0 && (
                  <p className="text-sm text-red-500">
                    Please select at least one vehicle type
                  </p>
                )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
