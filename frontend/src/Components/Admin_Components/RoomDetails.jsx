import { useState } from "react";

export default function RoomDetails() {
  const [roomNumber, setRoomNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!roomNumber.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // ✅ API Call Boilerplate
      // const response = await fetch(`/api/rooms/${roomNumber}`);
      // const data = await response.json();
      // setStudents(data.students || []);

      // 🔁 Using dummy data for now (can be removed when using API)
      const dummyData = {
        101: [
          { id: 201, name: "Kevin Lee", status: "Present" },
          { id: 202, name: "Mark Johnson", status: "Present" },
        ],
        205: [
          { id: 203, name: "Emily Brown", status: "Present" },
          { id: 204, name: "Sarah Williams", status: "Home pass" },
        ],
        304: [{ id: 205, name: "Daniel Taylor", status: "Absent" }],
      };

      setTimeout(() => {
        setStudents(dummyData[roomNumber] || []);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setStudents([]);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Enter Room Number (e.g., A-101)"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#647c90] focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="bg-[#647c90] text-[#eceae4] px-6 py-2 rounded-r-md hover:bg-[#546a7a] transition-colors"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="loader"></div>
        </div>
      ) : hasSearched ? (
        students.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-3">Students in Room {roomNumber}</h3>
            <div className="bg-white rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#a0bcd1]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4e4f50] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#4e4f50]">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === "Present"
                              ? "bg-green-100 text-green-800"
                              : student.status === "Absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border">
            <p className="text-lg text-gray-500">No students found in room {roomNumber}</p>
          </div>
        )
      ) : null}

      <style jsx>{`
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #647c90;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
