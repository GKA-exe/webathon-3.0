'use client';

import { useState } from 'react';
import { CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

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

  const categories = ['Mess', 'Room', 'Wi-Fi', 'Water', 'Electricity', 'Other'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.roomNumber.trim()) newErrors.roomNumber = 'Room number is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.category === 'Other' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'Custom category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
        category: formData.category === 'Other' ? formData.customCategory : formData.category,
        customCategory: ''
      };
      
      console.log('Submission Data:', submissionData);
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
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ background: 'background', color: 'foreground' }}>
      <div className="max-w-2xl mx-auto">
        <div className="p-6 rounded-lg shadow-xl" style={{ 
          background: 'var(--color-nav)',
          border: '1px solid var(--primary)'
        }}>
          <h2 className="text-2xl font-bold mb-6">Submit Complaint</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-[var(--primary)]'
                } focus:ring-2 focus:ring-[var(--primary)]`}
                style={{ 
                  background: 'var(--color-nav)',
                  color: 'var(--foreground)'
                }}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Room Number Input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Room Number
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.roomNumber ? 'border-red-500' : 'border-[var(--primary)]'
                } focus:ring-2 focus:ring-[var(--primary)]`}
                style={{ 
                  background: 'var(--color-nav)',
                  color: 'var(--foreground)'
                }}
              />
              {errors.roomNumber && <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>}
            </div>

            {/* Complaint Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Complaint Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.title ? 'border-red-500' : 'border-[var(--primary)]'
                } focus:ring-2 focus:ring-[var(--primary)]`}
                style={{ 
                  background: 'var(--color-nav)',
                  color: 'var(--foreground)'
                }}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.category ? 'border-red-500' : 'border-[var(--primary)]'
                } focus:ring-2 focus:ring-[var(--primary)]`}
                style={{ 
                  background: 'var(--color-nav)',
                  color: 'var(--foreground)'
                }}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Custom Category Input */}
            {formData.category === 'Other' && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Custom Category
                </label>
                <input
                  type="text"
                  name="customCategory"
                  value={formData.customCategory}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.customCategory ? 'border-red-500' : 'border-[var(--primary)]'
                  } focus:ring-2 focus:ring-[var(--primary)]`}
                  style={{ 
                    background: 'var(--color-nav)',
                    color: 'var(--foreground)'
                  }}
                />
                {errors.customCategory && (
                  <p className="text-red-500 text-sm mt-1">{errors.customCategory}</p>
                )}
              </div>
            )}

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.description ? 'border-red-500' : 'border-[var(--primary)]'
                } focus:ring-2 focus:ring-[var(--primary)]`}
                style={{ 
                  background: 'var(--color-nav)',
                  color: 'var(--foreground)'
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-lg focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'var(--primary)',
                color: 'var(--textcolor)',
                border: '1px solid var(--secondary)'
              }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                  Submitting...
                </div>
              ) : (
                'Submit Complaint'
              )}
            </button>
          </form>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-4 p-4 rounded-lg flex items-center animate-fade-in"
              style={{
                background: 'var(--secondary)',
                color: 'var(--primary)'
              }}
            >
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              <span>Complaint submitted successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}