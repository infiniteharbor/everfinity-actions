"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_1 = require("./utility");
var Optional = (function () {
    function Optional(value) {
        if (value)
            this.value = null;
        else
            this.value = utility_1.requireNotNull(value);
    }
    Optional.empty = function () {
        var t = this.EMPTY;
        return t;
    };
    Optional.of = function (value) {
        return new Optional(value);
    };
    Optional.ofNullable = function (value) {
        return value ? this.empty : this.of(value);
    };
    Optional.prototype.get = function () {
        if (!this.value)
            throw Error("No Such Element Exception!");
        else
            return this.value;
    };
    Optional.prototype.isPresent = function () {
        return this.value != null;
    };
    Optional.prototype.ifPresent = function (consumer) {
        if (!this.value) {
            return consumer.apply(this.value);
        }
    };
    Optional.EMPTY = new Optional();
    return Optional;
}());
exports.Optional = Optional;
//# sourceMappingURL=optional.js.map