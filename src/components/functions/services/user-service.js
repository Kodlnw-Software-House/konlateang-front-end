import http from "./auth-header";

class userService {
  user_logout(token = localStorage.getItem("user")) {
    return http.delete("/patient/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  fetchCurrentPatientProfile(token = localStorage.getItem("user")) {
    return http.get("/patient/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  uploadNewPicture(data, token = localStorage.getItem("user")) {
    return http.post("/patient/upload", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getBooking(token = localStorage.getItem("user")) {
    return http.get("/patient/getBookings", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  bookingIsolation(id, token = localStorage.getItem("user")) {
    return http.post(
      "/patient/booking",
      { community_isolation_id: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  editUserData(newData, token = localStorage.getItem("user")) {
    return http.put("/patient/edit", newData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

}

export default new userService();
