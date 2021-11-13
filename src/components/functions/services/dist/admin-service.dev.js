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
    key: "fetchCurrentProfile",
    value: function fetchCurrentProfile() {
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
  }]);

  return AdminService;
}();

var _default = new AdminService();

exports["default"] = _default;