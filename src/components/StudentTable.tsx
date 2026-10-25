import type { Student } from "../types/student"

type studentTableProps={
  students:Student[],
  onEdit:(student:Student) => void
  onDelete:(student:Student)=>void
}

const StudentTable = ({students,onEdit,onDelete}:studentTableProps) => {
  return (
    <div className="table-container">
    <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {students.map(student=>(
        <tr key={student.id} >
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.course}</td>
          <td>{student.status}</td>
          <td>
          <button onClick={()=>onEdit(student)} >Edit</button>
          <button onClick={()=>onDelete(student)} >Delete</button>
          </td>
        </tr>
        
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default StudentTable