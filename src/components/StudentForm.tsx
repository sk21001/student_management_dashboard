
import { useState, useEffect } from "react"
import type { Student } from "../types/student"

interface FormStudent {
  name: string
  email: string
  course: string
}

type StudentFormProps = {
  onSubmit: (student: Student) => Promise<boolean>
  selectedStudent: Student | null
  onCancel: () => void
};

const StudentForm = ({
  onSubmit,
  selectedStudent,
  onCancel,
}: StudentFormProps) => {
  const [formData, setFormData] = useState<FormStudent>({
    name: "",
    email: "",
    course: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
   if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        course: selectedStudent.course,
      });
    }
    else {
      setFormData({
        name: "",
        email: "",
        course: "",
      })
    }
  }, [selectedStudent]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,[e.target.name]: e.target.value,});
  }

const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return

    if (!formData.name.trim() || !formData.email.trim() || !formData.course.trim()) 
      {
      return
    }

    const newStudent: Student = {
      id: selectedStudent ? selectedStudent.id : Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      course: formData.course.trim(),
      status: selectedStudent ? selectedStudent.status : "Active",
    }

    setIsSubmitting(true)

  try {
    const success = await onSubmit(newStudent)
    if (!success) {
        return
      }

      setFormData({
        name: "",
        email: "",
        course: "",
      })
    } 
    catch (error) {
      console.error("Failed to submit student form:", error)
    } 
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="student-form" onSubmit={handleForm}>
      <input type="text" name="name" placeholder="Enter student name" value={formData.name} onChange={handleInput} required disabled={isSubmitting} aria-label="Student name"/>
      <input type="email" name="email" placeholder="Enter student email" value={formData.email} onChange={handleInput} required disabled={isSubmitting} aria-label="Student email"/>
      <input type="text" name="course" placeholder="Enter course name" value={formData.course} onChange={handleInput} required disabled={isSubmitting} aria-label="Student course"/>
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : selectedStudent ? "Update Student": "Add Student"}</button>
      {selectedStudent && (<button type="button" onClick={onCancel} disabled={isSubmitting}>Cancel Edit</button>)}
    </form>
  )
}

export default StudentForm;
