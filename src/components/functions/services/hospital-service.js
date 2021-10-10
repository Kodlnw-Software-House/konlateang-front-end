import http from "./auth-header";

const userToken = localStorage.getItem("user");

class HospitalService {
  fetchCurrentProfile(token = userToken) {
    return http.get("/hospital/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  logout(token = userToken) {
    return http.delete("/hospital/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getIsolation(token = userToken) {
    return http.get("/hospital/getIsolations", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export default new HospitalService();
