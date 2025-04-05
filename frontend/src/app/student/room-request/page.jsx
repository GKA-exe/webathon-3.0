"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, User, Mail, Phone, Calendar, MapPin, Users, Droplet } from 'lucide-react';

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
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#e2ded0' }}>
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => router.push('/student/dashboard')}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b" style={{ backgroundColor: '#647c90' }}>
            <h2 className="text-xl font-semibold flex items-center text-white">
              <Home size={20} className="mr-2" />
              Room Request Form
            </h2>
          </div>
          
          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                {/* Personal Information Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-700">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <User size={16} className="mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <Mail size={16} className="mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Contact */}
                    <div>
                      <label htmlFor="contact" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <Phone size={16} className="mr-2" />
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.contact ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                    </div>
                    
                    {/* DOB */}
                    <div>
                      <label htmlFor="dob" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <Calendar size={16} className="mr-2" />
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.dob ? 'border-red-500' : 'border-gray-200'}`}
                      />
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="mt-4">
                    <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                      <MapPin size={16} className="mr-2" />
                      Permanent Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.address ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Enter your complete address"
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
                
                {/* Guardian Information Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-700">Guardian Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Parent Name */}
                    <div>
                      <label htmlFor="parentName" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <Users size={16} className="mr-2" />
                        Parent/Guardian Name
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.parentName ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="Enter parent/guardian name"
                      />
                      {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                    </div>
                    
                    {/* Parent Contact */}
                    <div>
                      <label htmlFor="parentContact" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                        <Phone size={16} className="mr-2" />
                        Parent/Guardian Contact
                      </label>
                      <input
                        type="tel"
                        id="parentContact"
                        name="parentContact"
                        value={formData.parentContact}
                        onChange={handleChange}
                        className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.parentContact ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.parentContact && <p className="text-red-500 text-xs mt-1">{errors.parentContact}</p>}
                    </div>
                  </div>
                </div>
                
                {/* Other Information Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-700">Other Information</h3>
                  
                  {/* Blood Group */}
                  <div className="max-w-xs">
                    <label htmlFor="bloodGroup" className="flex items-center text-sm font-medium text-gray-600 mb-2">
                      <Droplet size={16} className="mr-2" />
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={`w-full p-3 bg-gray-50 border rounded-lg text-sm ${errors.bloodGroup ? 'border-red-500' : 'border-gray-200'}`}
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
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row md:justify-end space-y-3 md:space-y-0 md:space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/student/dashboard')}
                  className="w-full md:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-3 text-white rounded-lg font-medium transition-colors hover:shadow-lg disabled:opacity-70"
                  style={{ backgroundColor: '#647c90' }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      </div>
    </div>
  );
};

export default RoomRequestForm;