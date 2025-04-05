'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementsAdmin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load announcements from localStorage
  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }
  }, []);

  // Save announcements to localStorage
  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    
    try {
      if (isEditing && currentId !== null) {
        const updated = announcements.map(item => 
          item.id === currentId ? { 
            ...item, 
            title, 
            description,
            lastEdited: new Date().toLocaleString() 
          } : item
        );
        setAnnouncements(updated);
        setIsEditing(false);
        setCurrentId(null);
      } else {
        const newAnnouncement = {
          id: Date.now(),
          title,
          description,
          date: new Date().toLocaleString()
        };
        setAnnouncements([newAnnouncement, ...announcements]);
      }

      setIsSuccess(true);
      setTitle('');
      setDescription('');
      setTimeout(() => setIsSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... keep the existing handleEdit, handleDelete, and handleCancel functions ...

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#e2ded0' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Form Header */}
            <div className="p-4 text-white font-medium" style={{ backgroundColor: '#647c90' }}>
              <h2 className="text-xl">
                {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {isSuccess && (
                <div className="mb-6 p-4 rounded-md bg-green-100 text-green-700">
                  Announcement {isEditing ? 'updated' : 'published'} successfully!
                </div>
              )}

              <form onSubmit={handlePost} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#4e4f50' }}
                  >
                    Announcement Title*
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Enter announcement title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    style={{
                      borderColor: '#a0bcd1',
                      color: '#4e4f50'
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                    style={{ color: '#4e4f50' }}
                  >
                    Announcement Details*
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter announcement details..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                    style={{
                      borderColor: '#a0bcd1',
                      color: '#4e4f50'
                    }}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-2 font-medium rounded-md border focus:outline-none"
                      style={{
                        borderColor: '#a0bcd1',
                        color: '#4e4f50',
                        backgroundColor: '#f0f0f0'
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 font-medium text-white rounded-md focus:outline-none transition-colors"
                    style={{
                      backgroundColor: isSubmitting ? '#746c70' : '#647c90',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting 
                      ? 'Submitting...' 
                      : isEditing ? 'Update Announcement' : 'Publish Announcement'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Announcements List */}
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-white font-medium" style={{ backgroundColor: '#647c90' }}>
              <h2 className="text-xl">Previous Announcements</h2>
            </div>

            <div className="p-6">
              {announcements.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No announcements found
                </div>
              ) : (
                <ul className="space-y-4">
                  {announcements.map((item) => (
                    <li 
                      key={item.id}
                      className="border rounded-md p-4"
                      style={{ borderColor: '#a0bcd1' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold" style={{ color: '#4e4f50' }}>
                          {item.title}
                        </h3>
                        <span className="text-sm" style={{ color: '#746c70' }}>
                          {item.date}
                          {item.lastEdited && ' (edited)'}
                        </span>
                      </div>
                      <p className="mb-4" style={{ color: '#4e4f50' }}>
                        {item.description}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-sm px-3 py-1 rounded-md"
                          style={{
                            color: '#647c90',
                            backgroundColor: '#f0f0f0'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-sm px-3 py-1 rounded-md text-white"
                          style={{ backgroundColor: '#9d4b4b' }}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}