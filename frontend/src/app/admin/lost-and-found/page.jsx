// LostAndFoundForm.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// API service for lost and found items
const lostAndFoundService = {
  registerItem: async (itemData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/lostandfound/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to register item');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error registering item:', error);
      throw error;
    }
  },
  
  getAllItems: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/lostandfound/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }
};

const LostAndFoundForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Fetch all lost and found items when "View Items" is clicked
  const fetchItems = async () => {
    try {
      const data = await lostAndFoundService.getAllItems();
      setItems(data);
    } catch (error) {
      setError('Failed to load lost and found items');
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await lostAndFoundService.registerItem(data);
      
      if (result.message === "Lost and Found posted successfully") {
        setIsSuccess(true);
        reset();
        
        // If items are being shown, refresh the list
        if (showItems) {
          fetchItems();
        }

        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        setError('Failed to register item');
      }
    } catch (error) {
      setError('Error submitting form: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle items list and fetch data if needed
  const toggleItemsList = () => {
    const newShowItems = !showItems;
    setShowItems(newShowItems);
    
    if (newShowItems && items.length === 0) {
      fetchItems();
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
              
              {error && (
                <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">
                  {error}
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

                  <div className="flex justify-between">
                    <button 
                      type="button"
                      onClick={toggleItemsList}
                      className="px-4 py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      style={{ backgroundColor: '#a0bcd1' }}
                    >
                      {showItems ? 'Hide Items' : 'View Items'}
                    </button>
                    
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
              
              {showItems && (
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4" style={{ color: '#4e4f50' }}>
                    Lost and Found Items
                  </h3>
                  
                  {items.length === 0 ? (
                    <p className="text-gray-500">No items found.</p>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div key={index} className="p-4 border rounded-md" style={{ borderColor: '#a0bcd1' }}>
                          <h4 className="font-medium" style={{ color: '#4e4f50' }}>{item.title}</h4>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Location:</span> {item.foundLocation}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Date Found:</span> {new Date(item.foundDate).toLocaleDateString()}
                          </p>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFoundForm;