"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Menu, Car, LogOut, Settings } from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navItems = user
    ? [{ href: "/dashboard", label: "Dashboard", icon: Car }]
    : [];

  const isActive = (href: string) => pathname === href;

  if (!user) {
    return (
      <nav className="bg-emerald-dark/20 backdrop-blur-md border-b border-emerald-light/10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-emerald-light" />
              <span className="font-bold text-xl text-emerald-light">
                RideBook
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-emerald-light hover:bg-emerald-light/10"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald hover:bg-emerald/80 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-emerald-dark/20 backdrop-blur-md border-b border-emerald-light/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-emerald-light" />
            <span className="font-bold text-xl text-emerald-light">
              RideBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-emerald text-emerald-light"
                    : "text-emerald-light/70 hover:text-emerald-light hover:bg-emerald-light/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full border border-emerald-light/20"
                >
                  <Avatar className="h-8 w-8 bg-emerald">
                    <AvatarFallback className="bg-emerald text-emerald-light">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-emerald-dark/90 backdrop-blur-md border-emerald-light/20"
                align="end"
                forceMount
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-emerald-light">
                      {user.name}
                    </p>
                    <p className="w-[200px] truncate text-sm text-emerald-light/70">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-emerald-light/20" />
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center text-emerald-light/70 hover:text-emerald-light"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-emerald-light/20" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-emerald-light/70 hover:text-emerald-light focus:bg-emerald-light/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-emerald-light"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-emerald-dark/90 backdrop-blur-md border-emerald-light/20"
            >
              <div className="flex flex-col space-y-4 mt-4">
                <div className="flex items-center space-x-2 pb-4 border-b border-emerald-light/20">
                  <Avatar className="h-10 w-10 bg-emerald">
                    <AvatarFallback className="bg-emerald text-emerald-light">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-emerald-light">
                      {user.name}
                    </p>
                    <p className="text-sm text-emerald-light/70">
                      {user.email}
                    </p>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? "bg-emerald text-emerald-light"
                        : "text-emerald-light/70 hover:text-emerald-light hover:bg-emerald-light/10"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start px-3 text-emerald-light/70 hover:text-emerald-light hover:bg-emerald-light/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
