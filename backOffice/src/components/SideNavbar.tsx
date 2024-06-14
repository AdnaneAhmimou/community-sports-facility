'use client'
import React from 'react'
import { Nav } from './ui/nav'
import { useState } from 'react'
import { Button } from "./ui/button";

type Props = {}

import {
  ShoppingCart,
  LayoutDashboard,
  UsersRound,
  Settings,
  ChevronRight,
  Dumbbell,
  UserCog
} from "lucide-react"

import {
    useWindowWidth,
} from '@react-hook/window-size'
  

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768; 

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
        {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      
      <Nav
            isCollapsed={mobileWidth ? true : isCollapsed}
            links={[
              {
                title: "Dashboard",
                href: "/",
                icon: LayoutDashboard,
                variant: "default"
              },
              {
                title: "Users",
                href: "/users",
                icon: UsersRound,
                variant: "ghost"
              },
              {
                title: "Equipment",
                href: "/equipment",
                icon: Dumbbell,
                variant: "ghost"
              },
              {
                title: "Reservations",
                href: "/reservations",
                icon: ShoppingCart,
                variant: "ghost"
              },
              {
                title: "Installers",
                href: "/installers",
                icon: UserCog,
                variant: "ghost"
              }
            ]}
          />
    </div>
  )
}

 
