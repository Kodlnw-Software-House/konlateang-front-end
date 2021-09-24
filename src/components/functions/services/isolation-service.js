import http from "./auth-header";

const userToken = localStorage.getItem("user");

class IsolationService {
  getAllIsolation(
    pageSize = 4,
    pageNumber = 1,
    search = "",
    token = userToken
  ) {
    return http.get(
      `/isolation/getAll?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  getIsolationById(id, token = userToken) {
    return http.get(`/isolation/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export default new IsolationService();
