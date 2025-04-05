import { useState } from "react";
import StudentDetailsModal from "./StudentDetailsModal";

export default function VacateApplicationsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Manage applications with state
  const [applications, setApplications] = useState([
    {
      id: 101,
      name: "Alex Wilson",
      studentPhone: "9876543220",
      parentName: "Thomas Wilson",
      parentPhone: "8765432100",
      email: "alex.w@example.com",
      dob: "1999-03-20",
      address: "321 Hostel Road, City",
      bloodGroup: "AB+",
      room: "A-101",
      joinDate: "2023-08-10",
    },
    {
      id: 102,
      name: "Emily Brown",
      studentPhone: "9876543221",
      parentName: "Sarah Brown",
      parentPhone: "8765432101",
      email: "emily.b@example.com",
      dob: "2000-07-12",
      address: "654 Dorm Street, Town",
      bloodGroup: "O-",
      room: "B-205",
      joinDate: "2023-08-15",
    },
    {
      id: 103,
      name: "Daniel Taylor",
      studentPhone: "9876543222",
      parentName: "James Taylor",
      parentPhone: "8765432102",
      email: "daniel.t@example.com",
      dob: "2001-01-30",
      address: "987 Campus Lane, State",
      bloodGroup: "A+",
      room: "C-304",
      joinDate: "2023-09-01",
    },
  ]);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleApprove = (studentId) => {
    // Simulate API call
    console.log(`Approved vacate request for student with ID: ${studentId}`);

    // After successful API call, remove student from list
    setApplications((prevApps) => prevApps.filter((student) => student.id !== studentId));

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#a0bcd1]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Student Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Parent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Parent Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Room
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4e4f50]">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">
                  {student.studentPhone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">
                  {student.parentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">
                  {student.parentPhone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">
                  {student.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewClick(student)}
                    className="bg-[#647c90] hover:bg-[#546a7a] text-[#eceae4] px-4 py-2 rounded-md transition-colors mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(student.id)}
                    className="bg-[#746c70] hover:bg-[#645c60] text-[#eceae4] px-4 py-2 rounded-md transition-colors"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4 text-sm">
                  No vacate applications pending.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setIsModalOpen(false)}
          onApprove={handleApprove}
          type="vacate"
        />
      )}
    </div>
  );
}
