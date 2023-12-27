"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupName = void 0;
function lookupName(name, dynamodb) {
    const nameArray = dynamodb.prefix ? [dynamodb.prefix] : [];
    nameArray.push(name);
    return nameArray.join(dynamodb.delimiter);
}
exports.lookupName = lookupName;
//# sourceMappingURL=table.js.map