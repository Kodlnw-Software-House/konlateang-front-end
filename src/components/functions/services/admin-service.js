import http from "./auth-header";
class AdminService {
    fetchCurrentProfile(token = localStorage.getItem("user")) {
      return http.get("/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    logout(token = localStorage.getItem("user")) {
      return http.delete("/admin/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
  export default new AdminService();