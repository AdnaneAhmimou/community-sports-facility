// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";

// export default function LoginSignup() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     firstname: "",
//     lastname: "",
//     role: "",
//     adresse: "",
//     cin: "",
//     telephone: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log("Login successful:", response.data);
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/register", {
//         email: formData.email,
//         password: formData.password,
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         role: formData.role,
//         adresse: formData.adresse,
//         cin: formData.cin,
//         telephone: formData.telephone,
//       });
//       console.log("Signup successful:", response.data);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md space-y-8">
//         <div className="flex items-center justify-between">
//           <Button variant={isLogin ? "default" : "ghost"} onClick={() => setIsLogin(true)} className="flex-1">
//             Login
//           </Button>
//           <Button variant={!isLogin ? "default" : "ghost"} onClick={() => setIsLogin(false)} className="flex-1">
//             Sign Up
//           </Button>
//         </div>
//         {isLogin ? (
//           <Card>
//             <CardHeader>
//               <CardTitle>Login to your account</CardTitle>
//               <CardDescription>Enter your email and password below to access your account.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input id="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={handleLogin}>Sign In</Button>
//             </CardFooter>
//           </Card>
//         ) : (
//           <Card>
//             <CardHeader>
//               <CardTitle>Create a new account</CardTitle>
//               <CardDescription>Enter your details below to get started.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2 flex flex-wrap -mx-2">
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="firstname">First Name</Label>
//                   <Input id="firstname" placeholder="Enter First Name" value={formData.firstname} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="lastname">Last Name</Label>
//                   <Input id="lastname" placeholder="Enter Last Name" value={formData.lastname} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input id="email" type="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input id="password" type="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="role">Role</Label>
//                   <Input id="role" placeholder="Enter Role" value={formData.role} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="adresse">Address</Label>
//                   <Input id="adresse" placeholder="Enter Address" value={formData.adresse} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="cin">CIN</Label>
//                   <Input id="cin" placeholder="Enter CIN" value={formData.cin} onChange={handleChange} />
//                 </div>
//                 <div className="w-1/2 px-2">
//                   <Label htmlFor="telephone">Telephone</Label>
//                   <Input id="telephone" placeholder="Enter Telephone" value={formData.telephone} onChange={handleChange} />
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
//             </CardFooter>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }


"use client"

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
    adresse: "",
    cin: "",
    telephone: "",
  });

  const router = useRouter();

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
      localStorage.setItem("isAuthenticated", "true");
      router.push("/users"); // Redirect to the /users page after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        email: formData.email,
        password: formData.password,
        firstname: formData.firstname,
        lastname: formData.lastname,
        role: formData.role,
        adresse: formData.adresse,
        cin: formData.cin,
        telephone: formData.telephone,
      });
      console.log("Signup successful:", response.data);
      localStorage.setItem("isAuthenticated", "true");
      router.push("/users"); // Redirect to the /users page after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <Button variant={isLogin ? "default" : "ghost"} onClick={() => setIsLogin(true)} className="flex-1">
            Login
          </Button>
          <Button variant={!isLogin ? "default" : "ghost"} onClick={() => setIsLogin(false)} className="flex-1">
            Sign Up
          </Button>
        </div>
        {isLogin ? (
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
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Create a new account</CardTitle>
              <CardDescription>Enter your details below to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 flex flex-wrap -mx-2">
                <div className="w-1/2 px-2">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" placeholder="Enter First Name" value={formData.firstname} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" placeholder="Enter Last Name" value={formData.lastname} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="Enter Role" value={formData.role} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="adresse">Address</Label>
                  <Input id="adresse" placeholder="Enter Address" value={formData.adresse} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="cin">CIN</Label>
                  <Input id="cin" placeholder="Enter CIN" value={formData.cin} onChange={handleChange} />
                </div>
                <div className="w-1/2 px-2">
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input id="telephone" placeholder="Enter Telephone" value={formData.telephone} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSignup}>Sign Up</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
