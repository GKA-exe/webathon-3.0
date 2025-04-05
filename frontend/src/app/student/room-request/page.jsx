"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // For Next.js 13+ (App Router)
// import { useRouter } from 'next/router'; // For Next.js 12 or older

const RoomRequestForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    dob: '',
    address: '',
    parentName: '',
    parentContact: '',
    bloodGroup: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.contact.trim()) newErrors.contact = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = "Contact should be 10 digits";
    
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.parentName.trim()) newErrors.parentName = "Parent's name is required";
    
    if (!formData.parentContact.trim()) newErrors.parentContact = "Parent's contact is required";
    else if (!/^\d{10}$/.test(formData.parentContact)) newErrors.parentContact = "Contact should be 10 digits";
    
    if (!formData.bloodGroup.trim()) newErrors.bloodGroup = "Blood group is required";
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to your backend
      // await axios.post('/api/room-request', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the student's status in your authentication system
      // This is where you'd update isFirstLogin to false and set request status to "pending"
      
      // Redirect to dashboard
      router.push('/student/dashboard');
      
      // Show success message
      alert('Room request submitted successfully! Your request is pending approval.');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Room Request Form</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Contact */}
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>
              
              {/* DOB */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>
            </div>
            
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Parent Name */}
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.parentName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
              </div>
              
              {/* Parent Contact */}
              <div>
                <label htmlFor="parentContact" className="block text-sm font-medium text-gray-700 mb-1">Parent Contact</label>
                <input
                  type="tel"
                  id="parentContact"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.parentContact ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.parentContact && <p className="text-red-500 text-xs mt-1">{errors.parentContact}</p>}
              </div>
            </div>
            
            {/* Blood Group */}
            <div className="sm:w-1/2">
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md text-sm sm:text-base ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => router.push('/student/dashboard')}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomRequestForm;