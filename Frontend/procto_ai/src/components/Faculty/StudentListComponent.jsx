import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentListComponent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        const studentList = response.data.filter(user => user.role === 'student');
        setStudents(studentList);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 text-3xl font-bold">Student List</h2>

      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-blue-100">
                <td className="border px-4 py-2">{student.id}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListComponent;
