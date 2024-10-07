'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Trash2, ArrowLeft, NotepadText, Trash2 as Trash2Icon, Save as SaveIcon, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"

// Mock student data
const students = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  course: `Course ${Math.floor(i / 5) + 1}`,
}))

type AttendanceStatus = 'present' | 'late' | 'absent'

export default function AttendanceRecord() {
  const [date, setDate] = useState<Date>(new Date())
  const [isRecorded, setIsRecorded] = useState(false)
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({})
  const router = useRouter()

  const handleRecordAttendance = () => {
    setIsRecorded(true)
    setAttendance(students.reduce((acc, student) => {
      acc[student.id] = 'present'
      return acc
    }, {} as Record<number, AttendanceStatus>))
  }

  const handleDeleteAllAttendance = () => {
    setIsRecorded(false)
    setAttendance({})
  }

  const handleAttendanceChange = (studentId: number) => {
    setAttendance(prev => {
      const current = prev[studentId]
      let next: AttendanceStatus
      if (current === 'present') next = 'late'
      else if (current === 'late') next = 'absent'
      else next = 'present'
      return { ...prev, [studentId]: next }
    })
  }

  const handleDeleteAttendance = (studentId: number) => {
    setAttendance(prev => {
      const next = { ...prev }
      delete next[studentId]
      return next
    })
  }

  const handleAddAttendance = (studentId: number) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: 'present'
    }))
  }

  const handleSaveAttendance = () => {
    console.log('Saving attendance for', format(date, 'yyyy-MM-dd'), attendance)
    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(date, 'MMMM d, yyyy')} has been saved.`,
    })
  }

  const handleReturnToPreviousPage = () => {
    router.back()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={handleReturnToPreviousPage}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-2">Registro de Asistencia</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full md:w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center sm:flex-row w-full md:w-auto space-x-3 sm:space-y-0 sm:space-x-2">
          <Button className="w-full sm:w-auto" onClick={handleRecordAttendance}> <NotepadText /> </Button>
          {isRecorded && (
            <>
              <Button variant="destructive" className="w-full sm:w-auto" onClick={handleDeleteAllAttendance}><Trash2Icon /></Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleSaveAttendance}>
                <SaveIcon />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">No.</th>
              <th className="text-left">Name</th>
              {isRecorded && <th className="text-left">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-2">{student.id}</td>
                <td>{student.name}</td>
                {isRecorded && (
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAttendanceChange(student.id)}
                      className={cn(
                        "mr-2 font-bold",
                        "md:hover:bg-transparent md:hover:text-current",
                        "active:bg-transparent focus:bg-transparent",
                        attendance[student.id] === 'present' && "text-green-500",
                        attendance[student.id] === 'late' && "text-orange-500",
                        attendance[student.id] === 'absent' && "text-red-500"
                      )}
                    >
                      {attendance[student.id] === 'present' && 'P'}
                      {attendance[student.id] === 'late' && "T"}
                      {attendance[student.id] === 'absent' && "F"}
                    </Button>
                    {attendance[student.id] ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAttendance(student.id)}
                        className="active:bg-transparent focus:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddAttendance(student.id)}
                        className="active:bg-transparent focus:bg-transparent"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}