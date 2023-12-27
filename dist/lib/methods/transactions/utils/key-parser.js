"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyParser = void 0;
const generateKeyMap = (expression) => {
    const keyExtractRegex = /(#.*?)=(:.*?)(\s|$)/g;
    const result = new Map();
    let match = keyExtractRegex.exec(expression);
    while (match !== null) {
        result.set(match[1], match[2]);
        match = keyExtractRegex.exec(expression);
    }
    return result;
};
/**
 * Parses the key out of the `KeyConditionExpression` and returns the key together with the adjusted attribute names and values.
 *
 * @param	query	Query that should be parsed.
 */
exports.keyParser = (query) => {
    const keyMap = generateKeyMap(query.KeyConditionExpression || '');
    const key = {};
    const attributeNames = Object.assign({}, query.ExpressionAttributeNames);
    const attributeValues = Object.assign({}, query.ExpressionAttributeValues);
    for (const [name, value] of keyMap) {
        const keyName = attributeNames[name];
        key[keyName] = attributeValues[value];
        delete attributeNames[name];
        delete attributeValues[value];
    }
    return {
        Key: key,
        AttributeNames: attributeNames,
        AttributeValues: attributeValues,
    };
};
//# sourceMappingURL=key-parser.js.map