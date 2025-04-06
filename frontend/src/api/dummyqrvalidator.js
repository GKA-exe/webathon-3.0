// Create a file called dummyQrValidator.js

import axios from "axios";

// Mock axios for testing purposes
const mockAxios = {
  post: async (url, data) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create mock response based on email pattern
    const email = data.email;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Simulate API error for invalid email
      throw {
        response: {
          status: 400,
          data: { message: "Invalid email format" },
        },
      };
    }

    // Check for test cases to simulate different scenarios
    if (email.includes("error")) {
      throw {
        response: {
          status: 500,
          data: { message: "Server error occurred" },
        },
      };
    }

    if (email.includes("notfound")) {
      throw {
        response: {
          status: 404,
          data: { message: "Email not registered in system" },
        },
      };
    }

    if (email.includes("expired")) {
      throw {
        response: {
          status: 403,
          data: { message: "Access expired" },
        },
      };
    }

    // Default: successful response
    return {
      data: {
        status: "success",
        email: email,
        lastUpdated: new Date().toISOString(),
        // Add any other fields you might need
        residentName: `Resident ${email.split("@")[0]}`,
        roomNumber: `${Math.floor(Math.random() * 500) + 100}`,
        accessLevel: "Standard",
      },
    };
  },
};

const dummyQrValidator = {
  validateQR: async (email) => {
    try {
      // Use mockAxios instead of the real axios
      const response = await mockAxios.post(
        "/scan",
        {
          email,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data && response.data.status) {
        return response.data;
      }

      throw new Error("Invalid response format from server");
    } catch (error) {
      let errorMessage = "Validation failed";

      if (error.response) {
        errorMessage = error.response.data.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          "No response from server. Check:" +
          "\n1. Server is running" +
          "\n2. Correct API URL" +
          "\n3. Network connection";
      } else {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },
};

export default dummyQrValidator;
