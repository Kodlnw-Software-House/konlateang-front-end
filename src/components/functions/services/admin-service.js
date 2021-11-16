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
  getAllPatient(
    pageSize = 10,
    pageNumber = 1,
    sortType = "ASC",
    sortBy = "patient_id"
  ) {
    return http.get(
      `/admin/getAllPatient?pageSize=${pageSize}&pageNumber=${pageNumber}&sortType=${sortType}&sortBy=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      }
    );
  }
  updatePatientData(pId, data) {
    return http.put("/admin/editPatient/" + pId, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
    });
  }
}
export default new AdminService();
