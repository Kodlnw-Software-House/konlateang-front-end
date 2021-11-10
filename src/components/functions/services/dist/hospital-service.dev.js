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

var HospitalService =
/*#__PURE__*/
function () {
  function HospitalService() {
    _classCallCheck(this, HospitalService);
  }

  _createClass(HospitalService, [{
    key: "fetchCurrentProfile",
    value: function fetchCurrentProfile() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"].get("/hospital/me", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"]["delete"]("/hospital/logout", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "getIsolation",
    value: function getIsolation() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"].get("/hospital/getIsolations", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "getIsolationById",
    value: function getIsolationById(id) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].get("/hospital/getIsolation/".concat(id), {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "updateIsolationData",
    value: function updateIsolationData(id, data) {
      var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage.getItem("user");
      return _authHeader["default"].put("/hospital/edit/".concat(id), data, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "createNewIsolation",
    value: function createNewIsolation(data) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].post("/hospital/createIsolation", data, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "getBookings",
    value: function getBookings(id) {
      var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : localStorage.getItem("user");
      return _authHeader["default"].get("/hospital/getBooking/".concat(id, "?pageNumber=").concat(pageNumber, "&pageSize=").concat(pageSize), {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "updatePatientStatus",
    value: function updatePatientStatus(h_id, b_id, status) {
      var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : localStorage.getItem("user");
      return _authHeader["default"].put("/hospital/editStatus/".concat(h_id, "/").concat(b_id, "?statusId=").concat(status), {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "uploadIsolationPictures",
    value: function uploadIsolationPictures(id, formdata) {
      var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage.getItem("user");
      return _authHeader["default"].post("/hospital/uploadImage/" + id, formdata, {
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }, {
    key: "deleteIsolationImage",
    value: function deleteIsolationImage(id, index) {
      var token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage.getItem("user");
      return _authHeader["default"]["delete"]("/hospital/deleteIsolationImage/".concat(id, "/").concat(index), {
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }]);

  return HospitalService;
}();

var _default = new HospitalService();

exports["default"] = _default;