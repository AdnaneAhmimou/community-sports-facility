'use client';

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginSignup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful:", response.data);

      // Assuming accessToken is the token you need to store
      localStorage.setItem("token", response.data.accessToken);
      console.log("Token:", response.data.accessToken);

      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/users";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email and password below to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleLogin}>Sign In</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
