"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnyEmptyString = exports.isEmptyString = void 0;
function isEmptyString(val) {
    return val.trim().length === 0;
}
exports.isEmptyString = isEmptyString;
function isAnyEmptyString(...values) {
    for (const val of values) {
        if (isEmptyString(val)) {
            return true;
        }
    }
}
exports.isAnyEmptyString = isAnyEmptyString;
//# sourceMappingURL=guard.js.map