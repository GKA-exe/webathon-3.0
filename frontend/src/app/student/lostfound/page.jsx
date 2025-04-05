"use client";

import { useEffect, useState } from "react";

const LostFoundStudent = () => {
    const dummyItems = [
        {
          title: "Student ID Card",
          location: "Main Cafeteria",
          date: "2024-03-15",
          description: "Blue lanyard with university logo, name: John Smith"
        },
        {
          title: "Wireless Headphones",
          location: "Library Study Room 3",
          date: "2024-03-14",
          description: "Black Sony WH-1000XM4 in protective case"
        },
        {
          title: "Engineering Textbook",
          location: "Building C - Lecture Hall 12",
          date: "2024-03-13",
          description: "Fundamentals of Mechanical Engineering 4th Ed."
        },
        {
          title: "Water Bottle",
          location: "Gymnasium",
          date: "2024-03-12",
          description: "Stainless steel 1L bottle with sticker collage"
        },
        {
          title: "Laptop Charger",
          location: "Computer Lab B",
          date: "2024-03-11",
          description: "65W USB-C charger with international adapters"
        },
        {
          title: "Smart Watch",
          location: "Running Track",
          date: "2024-03-10",
          description: "Black Fitbit Versa 3 with blue band"
        }
      ];
    

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(dummyItems);
  }, []);

  return (
    <div className="bg-background min-h-screen p-6">
      {/* Heading Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">Lost & Found</h1>
        <p className="text-teritary">Reported items on campus</p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {/* Card Content */}
            <div className="space-y-4">
              {/* Title */}
              <h3 className="text-2xl font-semibold text-primary">
                {item.title}
              </h3>

              {/* Meta Information */}
              <div className="flex flex-col space-y-3 text-primary">
                {/* Location */}
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">{item.location}</span>
                </div>

                {/* Date */}
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-primary/10">
                <p className="text-teritary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFoundStudent;