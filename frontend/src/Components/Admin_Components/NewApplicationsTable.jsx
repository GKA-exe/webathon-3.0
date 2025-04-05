import { useState } from "react";
import StudentDetailsModal from "./StudentDetailsModal";

export default function NewApplicationsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Move applications into state
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      studentPhone: "9876543210",
      parentName: "Robert Doe",
      parentPhone: "8765432109",
      email: "john.doe@example.com",
      dob: "2000-05-15",
      address: "123 College Road, City",
      bloodGroup: "O+",
    },
    {
      id: 2,
      name: "Jane Smith",
      studentPhone: "9876543211",
      parentName: "Mary Smith",
      parentPhone: "8765432108",
      email: "jane.smith@example.com",
      dob: "2001-08-22",
      address: "456 University Avenue, Town",
      bloodGroup: "A-",
    },
    {
      id: 3,
      name: "Michael Johnson",
      studentPhone: "9876543212",
      parentName: "David Johnson",
      parentPhone: "8765432107",
      email: "michael.j@example.com",
      dob: "2000-12-10",
      address: "789 Campus Drive, State",
      bloodGroup: "B+",
    },
  ]);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleApprove = (studentId) => {
    // Simulate successful API call
    console.log(`Approved student with ID: ${studentId}`);

    // After successful response, remove the approved student from list
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewClick(student)}
                    className="bg-[#647c90] hover:bg-[#546a7a] text-[#eceae4] px-4 py-2 rounded-md transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6 text-sm">
                  No new applications to show.
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
          type="new"
        />
      )}
    </div>
  );
}
