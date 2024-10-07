"use client"

import { Menu, X, Settings, Moon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "./sidebar-context"

export default function TopBar() {
  const { sidebarOpen, toggleSidebar } = useSidebar()

  return (
    <header className="bg-primary text-primary-foreground z-10">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Comercio 32 MHC</h1>
          <Button variant="ghost" onClick={toggleSidebar} className="hover:bg-primary-foreground/20">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-primary-foreground/20">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="text-lg">Usuario</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-5 w-5" />
              <span>Opciones</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Moon className="mr-2 h-5 w-5" />
              <span>Cambiar tema</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-5 w-5" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}