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

var IsolationService =
/*#__PURE__*/
function () {
  function IsolationService() {
    _classCallCheck(this, IsolationService);
  }

  _createClass(IsolationService, [{
    key: "getAllIsolation",
    value: function getAllIsolation() {
      var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
      var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var search = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : localStorage.getItem("user");
      return _authHeader["default"].get("/isolation/getAll?pageSize=".concat(pageSize, "&pageNumber=").concat(pageNumber, "&search=").concat(search), {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "getIsolationById",
    value: function getIsolationById(id) {
      var token = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage.getItem("user");
      return _authHeader["default"].get("/isolation/get/".concat(id), {
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }]);

  return IsolationService;
}();

var _default = new IsolationService();

exports["default"] = _default;