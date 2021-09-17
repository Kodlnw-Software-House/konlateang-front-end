import http from "./auth-header";

class userService {
  user_logout(token) {
    return http.delete("/patient/logout",{
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  // anything else
}

export default new userService();
