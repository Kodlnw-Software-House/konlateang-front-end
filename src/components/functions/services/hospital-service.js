import http from "./auth-header";

class HospitalService {
  fetchCurrentProfile(token = localStorage.getItem("user")) {
    return http.get("/hospital/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  logout(token = localStorage.getItem("user")) {
    return http.delete("/hospital/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getIsolation(token = localStorage.getItem("user")) {
    return http.get("/hospital/getIsolations", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getIsolationById(id, token = localStorage.getItem("user")) {
    return http.get(`/hospital/getIsolation/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  updateIsolationData(id, data, token = localStorage.getItem("user")) {
    return http.put(`/hospital/edit/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  createNewIsolation(data, token = localStorage.getItem("user")) {
    return http.post("/hospital/createIsolation", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getBookings(
    id,
    pageNumber = 1,
    pageSize = 10,
    token = localStorage.getItem("user")
  ) {
    return http.get(
      `/hospital/getBooking/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  updatePatientStatus(
    h_id,
    b_id,
    status,
    token = localStorage.getItem("user")
  ) {
    return http.put(`/hospital/editStatus/${h_id}/${b_id}?statusId=${status}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  uploadIsolationPictures(id, formdata, token = localStorage.getItem("user")) {
    return http.post("/hospital/uploadImage/" + id, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteIsolationImage(id, index, token = localStorage.getItem("user")) {
    return http.delete(`/hospital/deleteIsolationImage/${id}/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
export default new HospitalService();
