import http from "./auth-header";

const userToken = localStorage.getItem("user");

class userService {
  user_logout(token = userToken) {
    return http.delete("/patient/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  fetchCurrentPatientProfile() {
    return http.get("/patient/me");
  }
  uploadNewPicture(data, token = userToken) {
    return http.post("/patient/upload", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getBooking(token = userToken) {
    return http.get("/patient/getBookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  // anything else
}

export default new userService();
