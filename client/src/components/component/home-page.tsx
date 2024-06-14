"use client"
import Link from "next/link"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { useState } from "react"
import LoginSignup from "./login-signup";


export function HomePage() {
  const [showLoginSignup, setShowLoginSignup] = useState(false);
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white text-black">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
        <Link className="flex items-center justify-center" href="#">
          <DumbbellIcon className="h-6 w-6" />
          <span className="ml-2 font-bold">Fitness Solutions</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Testimonials
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
            onClick={(e) => { e.preventDefault(); setShowLoginSignup(true); }}
          >
            Log In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
      <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Home Gym
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Fitness Solutions provides expert installation of top-quality gym equipment to create your dream
                    home fitness space.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLoginSignup(true);
                    }}
                  >
                    Request Consultation
                  </Link>
                </div>
              </div>
              <img
                alt="Home Gym"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                height="550"
                src="/gym.png"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Equipment We Install</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From treadmills and ellipticals to strength training equipment and free weights, we have the expertise
                  to set up your ideal home gym.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <img
                  alt="Treadmill"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/Male_Treadmill_732x549-thumbnail.avif"
                  width="200"
                />
                <h3 className="text-xl font-bold">Treadmills</h3>
                <p className="text-gray-500">High-quality treadmills for your cardio needs.</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <img
                  alt="Elliptical"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/lifestyle-gym-and-fitness-barcelona-people-on-royalty-free-image-1705340468.jpg"
                  width="200"
                />
                <h3 className="text-xl font-bold">Ellipticals</h3>
                <p className="text-gray-500">Low-impact elliptical machines for your workout.</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <img
                  alt="Weights"
                  className="aspect-square overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/Strength Equipment.png"
                  width="200"
                />
                <h3 className="text-xl font-bold">Strength Equipment</h3>
                <p className="text-gray-500">
                  Durable strength training equipment for your home gym.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers about their experience with Fitness Solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">"Incredible service and expertise"</h3>
                  <p className="text-gray-500">
                    "The Fitness Solutions team was amazing. They helped me design the perfect home gym and handled
                    the entire installation process seamlessly."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-sm text-gray-500">Homeowner</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">"Transformed my home gym"</h3>
                  <p className="text-gray-500">
                    "I'm so impressed with the quality of the equipment and the attention to detail during the
                    installation. My home gym has never looked better."
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src="/avatars/02.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Sarah Miller</p>
                    <p className="text-sm text-gray-500">Homeowner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Installation Process</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our experienced team will handle every step of the installation process, from delivery to final setup,
                  to ensure your home gym is ready to use.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center justify-center space-y-4">
                <TruckIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Delivery</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We'll deliver your equipment with care and attention to detail.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <WrenchIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Installation</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our team will expertly assemble and install your equipment.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <CheckIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Final Setup</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We'll ensure everything is working properly and ready for use.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm bg-gray">
                  Get Started
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Transform Your Home Fitness
                </h2>
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    href="#"
                  >
                    Request Consultation
                  </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm bg-gray">
                  Why Choose Us
                </div>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Fitness Solutions is the trusted choice for expert home gym installation. Our team of professionals
                  will ensure your equipment is set up safely and efficiently, so you can start your fitness journey
                  with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="px-4 py-6 lg:px-6 bg-white">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <p>&copy; 2023 Fitness Solutions. All rights reserved.</p>
        </div>
      </footer>
      {showLoginSignup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoginSignup />
        </div>
      )}
    </div>
  ) 
}


function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function DumbbellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  )
}


function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}


function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}



