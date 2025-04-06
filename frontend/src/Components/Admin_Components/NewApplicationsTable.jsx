
import axios from "axios";
import { useEffect, useState } from "react";
import StudentDetailsModal from "./StudentDetailsModal";

export default function NewApplicationsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [applications, setApplications] = useState([]);

  // ✅ Fetch from API on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/student/fetch-allotting-students`
        );
        
        // Filter students to show only those with room status "alloting"
        const allottingStudents = response.data.filter(student => 
          student.room === "allotting"
        );
        
        setApplications(allottingStudents);
        console.log("Fetched alloting students:", allottingStudents);
      } catch (error) {
        console.error("Error fetching allotting students:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleApprove = (studentId) => {
    console.log(`Approved student with ID: ${studentId}`);
    setApplications((prevApps) => prevApps.filter((student) => student._id !== studentId));
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#a0bcd1]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Student Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Parent Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Parent Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Room Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4e4f50]">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">{student.contactNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">{student.parentName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">{student.parentContact}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4e4f50]">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    {student.room}
                  </span>
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
                <td colSpan="6" className="text-center text-gray-500 py-6 text-sm">
                  No new applications with "alloting" status to show.
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