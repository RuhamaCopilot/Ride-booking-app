import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Users, Shield, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-6 w-6" />
              <span className="font-bold text-xl">RideBook</span>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Ride, Your Way
          </h1>
          <p className="text-xl text-muted-foreground">
            Book rides instantly with our simple and reliable ride booking
            system. Choose from bikes, cars, or rickshaws for your perfect
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Book Your First Ride
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Become a Driver
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose RideBook?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the convenience of modern ride booking with our
            user-friendly platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Car className="h-8 w-8 mb-2" />
              <CardTitle>Multiple Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from bikes, cars, or rickshaws based on your needs and
                budget
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 mb-2" />
              <CardTitle>Quick Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Book your ride in seconds with our streamlined booking process
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2" />
              <CardTitle>Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your safety is our priority with verified drivers and secure
                payments
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2" />
              <CardTitle>For Everyone</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Whether you're a passenger or driver, our platform serves
                everyone
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <CardDescription>
              Join thousands of users who trust RideBook for their daily commute
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  Already have an account?
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Car className="h-5 w-5" />
              <span className="font-semibold">RideBook</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RideBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
