// components/admin/StudentDetailsModal.js
export default function StudentDetailsModal({ student, onClose, onApprove, type }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-90vh overflow-y-auto">
        <div className="bg-[#647c90] text-[#eceae4] px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {type === "new" ? "New Application Details" : "Vacate Application Details"}
          </h3>
          <button onClick={onClose} className="text-[#eceae4] hover:text-white text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm text-gray-500">Name</h4>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Email</h4>
              <p className="font-medium">{student.email}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Student Phone</h4>
              <p className="font-medium">{student.studentPhone}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Date of Birth</h4>
              <p className="font-medium">{student.dob}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Address</h4>
              <p className="font-medium">{student.address}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Blood Group</h4>
              <p className="font-medium">{student.bloodGroup}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Parent Name</h4>
              <p className="font-medium">{student.parentName}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-500">Parent Phone</h4>
              <p className="font-medium">{student.parentPhone}</p>
            </div>

            {type === "vacate" && (
              <>
                <div>
                  <h4 className="text-sm text-gray-500">Room Number</h4>
                  <p className="font-medium">{student.room}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500">Join Date</h4>
                  <p className="font-medium">{student.joinDate}</p>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onApprove(student.id)}
              className="px-4 py-2 bg-[#647c90] text-[#eceae4] rounded-md hover:bg-[#546a7a]"
            >
              {type === "new" ? "Approve & Assign Room" : "Approve Vacate Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
