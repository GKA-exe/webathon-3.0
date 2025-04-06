import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_URL
async function entryQrValidator(email) {
  let response = await axios.post(`${BASE_URL}/student/attendance/mark`, { email });
  if (response.data.message === "Entrance marked successfully") {
    return true;
  }
  return false;
}

async function exitQrValidator(email) {
  let response = await axios.post(`${BASE_URL}/student/attendance/exit`, { email });
  if (response.data.message === "Exit marked successfully") {
    return true;
  }
  return false;
  // return true; // For testing purposes, always return true
}

export { entryQrValidator, exitQrValidator };