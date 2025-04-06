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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch announcements from backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/admin/announcement`
        );
        
        if (!response.ok) throw new Error('Failed to load announcements');
        const data = await response.json();
        
        setAnnouncements(Array.isArray(data) ? data.map(a => ({
          ...a,
          date: new Date(a.date),
          ...(a.lastEdited && { lastEdited: new Date(a.lastEdited) })
        })) : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnnouncements();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/admin/announcement`;
      const method = isEditing ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          ...(isEditing && { _id: currentId })
        })
      });

      if (!response.ok) throw new Error('Operation failed');

      // Refresh the announcements list after successful operation
      const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/announcement`);
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setAnnouncements(Array.isArray(refreshData) ? refreshData.map(a => ({
          ...a,
          date: new Date(a.date),
          ...(a.lastEdited && { lastEdited: new Date(a.lastEdited) })
        })) : []);
      }

      setIsSuccess(true);
      setTitle('');
      setDescription('');
      setIsEditing(false);
      setCurrentId(null);
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (announcement) => {
    setTitle(announcement.title);
    setDescription(announcement.description);
    setCurrentId(announcement._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/admin/announcement/${id}`, 
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Delete failed');
      
      setAnnouncements(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentId(null);
    setTitle('');
    setDescription('');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#e2ded0' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">
              Error: {error}
            </div>
          )}

          {/* Announcement Form */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 text-white font-medium" style={{ backgroundColor: '#647c90' }}>
              <h2 className="text-xl">
                {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
            </div>

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
              {isLoading ? (
                <div className="text-center py-6 text-gray-500">
                  Loading announcements...
                </div>
              ) : announcements.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No announcements found
                </div>
              ) : (
                <ul className="space-y-4">
                  {announcements.map((item) => (
                    <li 
                      key={item._id}
                      className="border rounded-md p-4"
                      style={{ borderColor: '#a0bcd1' }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold" style={{ color: '#4e4f50' }}>
                          {item.title}
                        </h3>
                        <span className="text-sm" style={{ color: '#746c70' }}>
                          {formatDate(item.date)}
                          {item.lastEdited && ` (edited ${formatDate(item.lastEdited)})`}
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
                          onClick={() => handleDelete(item._id)}
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