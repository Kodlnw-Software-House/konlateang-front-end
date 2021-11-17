import http from "./auth-header";
class AdminService {
  getMe(token = localStorage.getItem("user")) {
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
  getAllIsolation(
    pageSize = 10,
    pageNumber = 1,
    sortType = "ASC",
    sortBy = "community_isolation_id"
  ) {
    return http.get(
      `/admin/getAllIsolation?pageSize=${pageSize}&pageNumber=${pageNumber}&sortType=${sortType}&sortBy=${sortBy}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      }
    );
  }
  getIsolationById(id) {
    return http.get("/admin/getIsolation/" + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
    });
  }
  getBookings(id, pageNumber = 1, pageSize = 10) {
    return http.get(
      `/admin/getBooking/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
      }
    );
  }
  updatePatientStatus(b_id, status, token) {
    return http.put(`/admin/editStatus/${b_id}?statusId=${status}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  updateIsolationData(id, data) {
    return http.put(`/admin/editIsolation/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
    });
  }
  uploadIsolationPictures(id, formdata) {
    return http.post("/admin/uploadImage/" + id, formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteIsolationImage(id, index) {
    return http.delete(`/admin/deleteIsolationImage/${id}/${index}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new AdminService();
