// LostAndFoundForm.jsx
'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LostAndFoundForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      console.log('Submitting Lost and Found item:', data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#e2ded0' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-white font-medium" style={{ backgroundColor: '#647c90' }}>
              <h2 className="text-xl">Lost and Found Registry</h2>
            </div>

            <div className="p-6">
              {isSuccess && (
                <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700">
                  Lost and found item registered successfully!
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#4e4f50' }}
                    >
                      Item Title*
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="e.g. White JBL Earphones"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        borderColor: errors.title ? 'red' : '#a0bcd1',
                        color: '#4e4f50'
                      }}
                      {...register('title', {
                        required: 'Item title is required'
                      })}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="foundLocation"
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#4e4f50' }}
                    >
                      Found Location*
                    </label>
                    <input
                      id="foundLocation"
                      type="text"
                      placeholder="e.g. Library, Second Floor"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        errors.foundLocation ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        borderColor: errors.foundLocation ? 'red' : '#a0bcd1',
                        color: '#4e4f50'
                      }}
                      {...register('foundLocation', {
                        required: 'Found location is required'
                      })}
                    />
                    {errors.foundLocation && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.foundLocation.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="foundDate"
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#4e4f50' }}
                    >
                      Date Found*
                    </label>
                    <input
                      id="foundDate"
                      type="date"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        errors.foundDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        borderColor: errors.foundDate ? 'red' : '#a0bcd1',
                        color: '#4e4f50'
                      }}
                      {...register('foundDate', {
                        required: 'Date found is required'
                      })}
                    />
                    {errors.foundDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.foundDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-1"
                      style={{ color: '#4e4f50' }}
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      placeholder="Enter any additional details about the item..."
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                      style={{
                        borderColor: '#a0bcd1',
                        color: '#4e4f50'
                      }}
                      {...register('description')}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      style={{
                        backgroundColor: isSubmitting ? '#746c70' : '#647c90',
                        opacity: isSubmitting ? '0.7' : '1'
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Register Item'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundForm;
