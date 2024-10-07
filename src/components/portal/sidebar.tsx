"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronDown, GraduationCap, Users, BookOpen, Home, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useSidebar } from "./sidebar-context"

export default function Sidebar() {
  const { sidebarOpen } = useSidebar()
  const [adminOpen, setAdminOpen] = useState(false)
  const [teachersOpen, setTeachersOpen] = useState(false)
  const pathname = usePathname()

  const isGradosAcademicosActive = pathname === "/portal-admin/grados-academicos"
  const isInicioDActive = pathname === "/portal-docente"

  return (
    <aside
      className={`bg-primary/90 text-primary-foreground w-64 transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0 ${sidebarOpen ? "" : "-ml-64"
        }`}
    >
      <nav className="p-4">
        <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between hover:bg-primary-foreground/20">
              Administrar <ChevronDown className={`${adminOpen ? "rotate-180" : ""} transition-all`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Link
              href={isGradosAcademicosActive ? "#" : "/portal-admin/grados-academicos"}
              className={`w-full block ${isGradosAcademicosActive ? 'bg-primary-foreground/20' : ''}`}
            >
              <Button
                variant="ghost"
                className="w-full justify-start pl-8 hover:bg-primary-foreground/20"
              >
                <GraduationCap className="mr-2 h-4 w-4" /> Grados Académicos
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start pl-8 hover:bg-primary-foreground/20">
              <Users className="mr-2 h-4 w-4" /> Docentes
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-8 hover:bg-primary-foreground/20">
              <BookOpen className="mr-2 h-4 w-4" /> Cursos Académicos
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible open={teachersOpen} onOpenChange={setTeachersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between mt-2 hover:bg-primary-foreground/20">
              Docentes <ChevronDown className={`${teachersOpen ? "rotate-180" : ""} transition-all`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Link
              href={isInicioDActive ? "#" : "/portal-docente"}
              className={`w-full block ${isInicioDActive ? 'bg-primary-foreground/20' : ''}`}
            >
              <Button variant="ghost" className="w-full justify-start pl-8 hover:bg-primary-foreground/20">
                <Home className="mr-2 h-4 w-4" /> Inicio
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start pl-8 hover:bg-primary-foreground/20">
              <GraduationCap className="mr-2 h-4 w-4" /> Grados Académicos
            </Button>
            <Button variant="ghost" className="w-full justify-start pl-8 hover:bg-primary-foreground/20">
              <FileText className="mr-2 h-4 w-4" /> Reportes
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  )
}