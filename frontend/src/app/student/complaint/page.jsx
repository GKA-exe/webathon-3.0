'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
  ArrowPathIcon, 
  ExclamationCircleIcon, 
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
  HomeIcon,
  DocumentTextIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    title: '',
    category: '',
    customCategory: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const categories = ['Mess', 'Room', 'Wi-Fi', 'Water', 'Electricity', 'Maintenance', 'Security', 'Other'];

  // Validate form fields when they change or lose focus
  useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateFields(Object.keys(touchedFields));
    }
  }, [formData, touchedFields]);

  const validateFields = (fields) => {
    const newErrors = { ...errors };
    
    fields.forEach(field => {
      switch (field) {
        case 'name':
          newErrors.name = !formData.name.trim() ? 'Name is required' : '';
          break;
        case 'roomNumber':
          newErrors.roomNumber = !formData.roomNumber.trim() 
            ? 'Room number is required' 
            : !/^\d+[A-Za-z]?$/.test(formData.roomNumber) 
              ? 'Enter a valid room number' 
              : '';
          break;
        case 'title':
          newErrors.title = !formData.title.trim() 
            ? 'Title is required' 
            : formData.title.length < 5 
              ? 'Title must be at least 5 characters' 
              : '';
          break;
        case 'category':
          newErrors.category = !formData.category ? 'Category is required' : '';
          break;
        case 'customCategory':
          if (formData.category === 'Other') {
            newErrors.customCategory = !formData.customCategory.trim() 
              ? 'Custom category is required' 
              : '';
          }
          break;
        case 'description':
          newErrors.description = !formData.description.trim() 
            ? 'Description is required' 
            : formData.description.length < 20 
              ? 'Please provide more details (at least 20 characters)' 
              : '';
          break;
        default:
          break;
      }
    });

    setErrors(newErrors);
    return !fields.some(field => newErrors[field]);
  };

  const validateForm = () => {
    const allFields = ['name', 'roomNumber', 'title', 'category', 'description'];
    if (formData.category === 'Other') allFields.push('customCategory');
    
    return validateFields(allFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show any errors
    const allFields = ['name', 'roomNumber', 'title', 'category', 'description', 'customCategory'];
    const newTouchedFields = {};
    allFields.forEach(field => newTouchedFields[field] = true);
    setTouchedFields(newTouchedFields);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Prepare submission data
    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString(),
      category: formData.category === 'Other' ? formData.customCategory : formData.category,
    };
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Submission Data:', submissionData);
      
      // Reset form
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        roomNumber: '',
        title: '',
        category: '',
        customCategory: '',
        description: ''
      });
      setTouchedFields({});
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const formatTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
  };

  // Get current step progress
  const getProgress = () => {
    let filledFields = 0;
    let totalFields = 5; // name, room, title, category, description
    
    if (formData.name) filledFields++;
    if (formData.roomNumber) filledFields++;
    if (formData.title) filledFields++;
    if (formData.category) filledFields++;
    if (formData.description) filledFields++;
    
    if (formData.category === 'Other') {
      totalFields++;
      if (formData.customCategory) filledFields++;
    }
    
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ 
      background: 'var(--color-background)', 
      color: 'var(--color-foreground)'
    }}>
      <div className="max-w-3xl mx-auto">
        <div 
          className="rounded-xl overflow-hidden shadow-2xl" 
          style={{ 
            background: '#f0f0f0',
          }}
        >
          {/* Header Section */}
          <div className="py-6 px-8" style={{ 
            background: 'var(--color-primary)',
            borderBottom: '1px solid var(--color-secondary)'
          }}>
            <h2 className="text-2xl font-bold flex items-center" style={{ color: 'var(--color-textc)' }}>
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 mr-2" />
              Submit Complaint
            </h2>
            <p className="mt-2 text-sm opacity-90" style={{ color: 'var(--color-textc)' }}>
              We value your feedback. Please share the details of your concern below.
            </p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--color-textc)' }}>
                <span>Progress</span>
                <span>{getProgress()}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${getProgress()}%`,
                    background: 'var(--color-secondary)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                    <UserCircleIcon className="h-4 w-4 mr-1" />
                    Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name && touchedFields.name ? 'border-red-500' : 'border-transparent'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                      style={{ 
                        color: 'var(--color-foreground)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    {errors.name && touchedFields.name && (
                      <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                        <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Room Number Input */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                    <HomeIcon className="h-4 w-4 mr-1" />
                    Room Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. 123A"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.roomNumber && touchedFields.roomNumber ? 'border-red-500' : 'border-transparent'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                      style={{ 
                        color: 'var(--color-foreground)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    {errors.roomNumber && touchedFields.roomNumber && (
                      <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                        <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                        {errors.roomNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Complaint Title */}
              <div className="relative mt-8">
                <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  Complaint Title *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Brief title of your complaint"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title && touchedFields.title ? 'border-red-500' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                    style={{ 
                      color: 'var(--color-foreground)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  />
                  {errors.title && touchedFields.title && (
                    <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.title}
                    </div>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="relative mt-8">
                <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                  <TagIcon className="h-4 w-4 mr-1" />
                  Category *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-lg border appearance-none ${
                      errors.category && touchedFields.category ? 'border-red-500' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                    style={{ 
                      color: 'var(--color-foreground)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {errors.category && touchedFields.category && (
                    <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.category}
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Category Input */}
              {formData.category === 'Other' && (
                <div className="relative mt-8">
                  <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                    <TagIcon className="h-4 w-4 mr-1" />
                    Custom Category *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="customCategory"
                      value={formData.customCategory}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Specify the category"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.customCategory && touchedFields.customCategory ? 'border-red-500' : 'border-transparent'
                      } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                      style={{ 
                        color: 'var(--color-foreground)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }}
                    />
                    {errors.customCategory && touchedFields.customCategory && (
                      <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                        <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                        {errors.customCategory}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description Textarea */}
              <div className="relative mt-8">
                <label className="block text-sm font-medium mb-2 flex items-center" style={{ color: 'var(--color-teritary)' }}>
                  <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-1" />
                  Description *
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder="Please provide detailed information about your complaint"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description && touchedFields.description ? 'border-red-500' : 'border-transparent'
                    } focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-all duration-200`}
                    style={{ 
                      color: 'var(--color-foreground)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                  />
                  {errors.description && touchedFields.description && (
                    <div className="absolute -bottom-5 left-0 text-red-500 text-xs flex items-center">
                      <ExclamationCircleIcon className="h-3 w-3 mr-1" />
                      {errors.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="text-xs" style={{ color: 'var(--color-teritary)' }}>
                  {formatTimestamp()}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-teritary)' }}>
                  * Required fields
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 flex items-center justify-center font-medium"
                  style={{
                    background: 'var(--color-primary)',
                    color: 'var(--color-textc)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Complaint
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-6 p-5 rounded-lg flex items-center animate-fade-in shadow-lg"
                style={{
                  background: 'var(--color-secondary)',
                  color: 'var(--color-foreground)'
                }}
              >
                <div className="bg-white rounded-full p-2 mr-4" style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <CheckCircleIcon className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="font-medium text-lg">Thank you for your feedback!</p>
                  <p className="text-sm mt-1">Your complaint has been received and will be addressed by our team shortly.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}