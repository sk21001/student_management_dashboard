import type { Student } from "../types/student"

interface ApiData{
    id: number;
    name: string;
    email: string;
};

export const handleFetch= async () : Promise<Student[]> =>{
    const response=await fetch("https://jsonplaceholder.typicode.com/users?_limit=5")
    
    if(!response.ok){
        throw new Error("Something went wrong")
    }

    const data=await response.json()

    const formattedUsers : Student[] = data.map((user : ApiData)=>({
        id:user.id,
        name:user.name,
        email:user.email,
        course:"",
        status:"Active"
    }))
    return formattedUsers
}

export const createStudent = async (
  student: Student
): Promise<Student> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    }
  )

  if (!response.ok) {
    throw new Error("Failed to create student")
  }
const data: Student = await response.json()

  return {...student,id: data.id}
}

export const updateStudent = async (
  student: Student
): Promise<Student> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${student.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update student")
  }

  const data: Student = await response.json()

  return {
    ...student,
    ...data,
  }
}
export const deleteStudent = async (
  studentId: number
): Promise<void> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${studentId}`,
    {
      method: "DELETE",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to delete student")
  }
}


