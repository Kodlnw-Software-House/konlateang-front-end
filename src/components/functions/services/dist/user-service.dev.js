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

var userService =
/*#__PURE__*/
function () {
  function userService() {
    _classCallCheck(this, userService);
  }

  _createClass(userService, [{
    key: "user_logout",
    value: function user_logout() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"]["delete"]("/patient/logout", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "fetchCurrentPatientProfile",
    value: function fetchCurrentPatientProfile() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"].get("/patient/me", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "uploadNewPicture",
    value: function uploadNewPicture(data) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].post("/patient/upload", data, {
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "multipart/form-data"
        }
      });
    }
  }, {
    key: "getBooking",
    value: function getBooking() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage.getItem("user");
      return _authHeader["default"].get("/patient/getBookings", {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "bookingIsolation",
    value: function bookingIsolation(id) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].post("/patient/booking", {
        community_isolation_id: id
      }, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "editUserData",
    value: function editUserData(newData) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].put("/patient/edit", newData, {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "checkDuplicateEmail",
    value: function checkDuplicateEmail(data) {
      return _authHeader["default"].get("/patient/checkEmailInUse?email=".concat(data));
    }
  }, {
    key: "checkDuplicateId",
    value: function checkDuplicateId(data) {
      return _authHeader["default"].get("/patient/checkCitizenIdInUse?citizen_id=".concat(data));
    }
  }]);

  return userService;
}();

var _default = new userService();

exports["default"] = _default;