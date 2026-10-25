import { useEffect, useState } from "react"
import type { Student } from "./types/student"
import { handleFetch,createStudent,updateStudent,deleteStudent} from "./services/studentService"
import StudentTable from "./components/StudentTable"
import StudentForm from "./components/StudentForm"
import ConfirmDialogue from "./components/ConfirmDialouge"
import "./App.css";



const App = () => {

  const [students,setStudents]=useState<Student[]>([])
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState("")
  const [selectedStudent,setSelectedStudent]=useState<Student | null>(null)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [isDeleting, setIsDeleting] = useState(false);
  
 

const handleAddStudent = async (
  newStudent: Student
): Promise<boolean> => {
 if (selectedStudent) {
  try {
    setError("")

    const updatedStudent = await updateStudent(newStudent)

    setStudents(prev =>
      prev.map(student =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    )

    setSelectedStudent(null)
    return true
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError("Failed to update student")
    }

    return false
  }
}
  try {
    setError("")

    const createdStudent = await createStudent(newStudent)

    setStudents(prev => [...prev, createdStudent])
    return true
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError("Failed to add student")
    }

    return false
  }
}

const handleDeleteStudent = async () => {
  if (!studentToDelete || isDeleting) {
    return
  }

  setIsDeleting(true)

  try {
    setError("");

    await deleteStudent(studentToDelete.id)

    setStudents((prevStudents) =>
      prevStudents.filter(
        (student) => student.id !== studentToDelete.id
      )
    );

    setStudentToDelete(null)
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError("Failed to delete student.")
    }
  } finally {
    setIsDeleting(false)
  }
}

  useEffect(()=>{
    const fetchStudents= async () => {
      try{
      const data=await handleFetch()
      setStudents(data)
      }
      catch(error){
        if(error instanceof Error){
         setError(error.message)
        }
      }
      finally{
        setIsLoading(false)
      }
   }
   fetchStudents()
  },[])

  return (
    <main className="app-container">
    <h1>Student Management Dashboard</h1>
    <p>Manage student details below.</p>
    
 {isLoading ? (<h2>Loading...</h2>) : (
  <>
  {error && <p role="alert">{error}</p>}
  <StudentForm onSubmit={handleAddStudent} selectedStudent={selectedStudent} onCancel={() => setSelectedStudent(null)}/>
 <StudentTable onEdit={setSelectedStudent} onDelete={setStudentToDelete} students={students}/>
  </>
)}
    {studentToDelete && (<ConfirmDialogue studentName={studentToDelete.name} isDeleting={isDeleting} onConfirm={handleDeleteStudent} onCancel={() => setStudentToDelete(null)}  />
)}
    </main>
  )
}

export default App