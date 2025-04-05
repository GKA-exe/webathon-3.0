"use client";
import React, { useState } from 'react';

const StudentNotifications = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Water Supply Interruption",
      message: "Due to maintenance work, there will be no water supply in Block A from 10:00 AM to 2:00 PM tomorrow. Please store water accordingly.",
      date: "April 5, 2025",
      time: "6:30 PM",
      isRead: false,
      category: "maintenance"
    },
    {
      id: 2,
      title: "Mess Menu Change",
      message: "Based on student feedback, we're updating the mess menu for the next month. New menu will be implemented starting Monday.",
      date: "April 4, 2025",
      time: "1:15 PM",
      isRead: true,
      category: "mess"
    },
    {
      id: 3,
      title: "Room Inspection",
      message: "Monthly room inspection scheduled for April 8th. Please ensure your rooms are clean and tidy. Inspection starts at 11:00 AM.",
      date: "April 3, 2025",
      time: "5:45 PM",
      isRead: false,
      category: "inspection"
    },
    {
      id: 4,
      title: "Wi-Fi Network Upgrade",
      message: "The hostel Wi-Fi will be upgraded this weekend. Expect temporary disconnections between 11:00 PM Saturday and 5:00 AM Sunday.",
      date: "April 2, 2025",
      time: "9:20 AM",
      isRead: false,
      category: "services"
    },
    {
      id: 5,
      title: "Fee Payment Reminder",
      message: "This is a reminder that hostel fees for the next semester are due by April 15th. Late payments will incur a penalty as per hostel rules.",
      date: "April 1, 2025",
      time: "10:00 AM",
      isRead: true,
      category: "payment"
    },
    {
      id: 6,
      title: "Night Out Permission Process",
      message: "The process for requesting night out permissions has been updated. Please use the new online form available on the hostel portal.",
      date: "March 30, 2025",
      time: "7:45 PM",
      isRead: false,
      category: "policy"
    }
  ]);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'maintenance': return '🔧';
      case 'mess': return '🍽️';
      case 'inspection': return '🔍';
      case 'services': return '📡';
      case 'payment': return '💰';
      case 'policy': return '📝';
      default: return '📢';
    }
  };

  return (
    <div className="bg-background min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow">
        <div style={{ backgroundColor: '#647c90' }} className="text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-xl font-bold">Hostel Notifications</h1>
          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
            {notifications.filter(n => !n.isRead).length} New
          </span>
        </div>
        
        <div className="divide-y">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-opacity-10' : ''}`}
                style={!notification.isRead ? { backgroundColor: 'rgba(100, 124, 144, 0.1)' } : {}}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className="text-2xl mr-3">
                    {getCategoryIcon(notification.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${!notification.isRead ? 'font-bold' : 'text-gray-800'}`}
                          style={!notification.isRead ? { color: '#647c90' } : {}}>
                        {notification.title}
                      </h3>
                      <div className="text-xs text-gray-500 ml-2">
                        {notification.date} • {notification.time}
                        {!notification.isRead && (
                          <span className="ml-2 w-2 h-2 inline-block rounded-full" 
                                style={{ backgroundColor: '#647c90' }}></span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No notifications available
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-b-lg text-center border-t">
          <button className="hover:text-opacity-80 text-sm font-medium" 
                  style={{ color: '#647c90' }}>
            Mark All as Read
          </button>
          <span className="mx-2 text-gray-300">|</span>
          <button className="hover:text-opacity-80 text-sm font-medium"
                  style={{ color: '#647c90' }}>
            View Archived Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;