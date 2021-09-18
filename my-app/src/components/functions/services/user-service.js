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
  // anything else
}

export default new userService();
