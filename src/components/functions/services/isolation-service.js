import http from "./auth-header";

class IsolationService {
  getAllIsolation(
    pageSize = 4,
    pageNumber = 1,
    sortType = "ASC",
    sortBy = "community_isolation_id",
    search = "",
    token = localStorage.getItem("user")
  ) {
    return http.get(
      `/isolation/getAll?pageSize=${pageSize}&pageNumber=${pageNumber}&sortType=${sortType}&sortBy=${sortBy}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
  getIsolationById(id, token = localStorage.getItem("user")) {
    return http.get(`/isolation/get/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
export default new IsolationService();
