"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authHeader = _interopRequireDefault(require("./auth-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminService =
/*#__PURE__*/
function () {
  function AdminService() {
    _classCallCheck(this, AdminService);
  }

  _createClass(AdminService, [{
    key: "getMe",
    value: function getMe() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"].get("/admin/me", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"]["delete"]("/admin/logout", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "getAllPatient",
    value: function getAllPatient() {
      var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var sortType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ASC";
      var sortBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "patient_id";
      return _authHeader["default"].get("/admin/getAllPatient?pageSize=".concat(pageSize, "&pageNumber=").concat(pageNumber, "&sortType=").concat(sortType, "&sortBy=").concat(sortBy), {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "updatePatientData",
    value: function updatePatientData(pId, data) {
      return _authHeader["default"].put("/admin/editPatient/" + pId, data, {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "getAllIsolation",
    value: function getAllIsolation() {
      var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var sortType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ASC";
      var sortBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "community_isolation_id";
      return _authHeader["default"].get("/admin/getAllIsolation?pageSize=".concat(pageSize, "&pageNumber=").concat(pageNumber, "&sortType=").concat(sortType, "&sortBy=").concat(sortBy), {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "getIsolationById",
    value: function getIsolationById(id) {
      return _authHeader["default"].get("/admin/getIsolation/" + id, {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "getBookings",
    value: function getBookings(id) {
      var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      return _authHeader["default"].get("/admin/getBooking/".concat(id, "?pageNumber=").concat(pageNumber, "&pageSize=").concat(pageSize), {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "updatePatientStatus",
    value: function updatePatientStatus(b_id, status, token) {
      return _authHeader["default"].put("/admin/editStatus/".concat(b_id, "?statusId=").concat(status), null, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "updateIsolationData",
    value: function updateIsolationData(id, data) {
      return _authHeader["default"].put("/admin/editIsolation/".concat(id), data, {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user"))
        }
      });
    }
  }, {
    key: "uploadIsolationPictures",
    value: function uploadIsolationPictures(id, formdata) {
      return _authHeader["default"].post("/admin/uploadImage/" + id, formdata, {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user")),
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }, {
    key: "deleteIsolationImage",
    value: function deleteIsolationImage(id, index) {
      return _authHeader["default"]["delete"]("/admin/deleteIsolationImage/".concat(id, "/").concat(index), {
        headers: {
          Authorization: "Bearer ".concat(localStorage.getItem("user")),
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }]);

  return AdminService;
}();

var _default = new AdminService();

exports["default"] = _default;