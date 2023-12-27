"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValueName = exports.generateKeyName = void 0;
const indexify = (key, value, values) => {
    if (values[key] !== undefined && values[key] !== value) {
        let i = 1;
        while (values[`${key}_${i}`] && values[`${key}_${i}`] !== value) {
            ++i;
        }
        key += `_${i}`;
    }
    return key;
};
/**
 * Parse a key to an expression statement that can be used directly in an expression and to an
 * object that maps the keyname to the original name.
 *
 * @param	key			The key that should be converted to a valid name
 */
function generateKeyName(key) {
    const tokens = key.split('.');
    const expression = [];
    const names = {};
    for (let token of tokens) {
        // Filter out non-alphanumeric characters, except for array indexes
        let expressionKey = `#k_${token.replace(/[^a-zA-Z0-9_\[\]]+/g, '_')}`;
        // Push the key to the expression list
        expression.push(expressionKey);
        // Remove array indexes
        expressionKey = expressionKey.replace(/\[[0-9]+]/g, '');
        token = token.replace(/\[[0-9]+]/g, '');
        // Add the key with the keyvalue to the result
        names[expressionKey] = token;
    }
    // Return the object
    return {
        Expression: expression.join('.'),
        ExpressionAttributeNames: names
    };
}
exports.generateKeyName = generateKeyName;
/**
 * Generates a unique name, based on the key, for the value provided.
 *
 * @param	key			The key that should be converted to a valid name
 * @param	value		The value associated with the key.
 * @param	values		The map of values already generated.
 * @param	raw			If set to true, it will handle the value as is and will not convert if it is an array.
 */
function generateValueName(key, value, values, raw) {
    if (value === undefined) {
        // Trow an error if the value is undefined
        throw new Error(`Value for key \`${key}\` is undefined. Please provide a valid value.`);
    }
    values = values || {};
    const valueKey = ':v_' + key.replace(/[^a-zA-Z0-9_]+/g, '_');
    let expression = [];
    const expressionValues = {};
    if (Array.isArray(value) && !raw) {
        for (let i = 0; i < value.length; i++) {
            const tempKey = indexify(`${valueKey}_${i}`, value, values);
            expression.push(tempKey);
            expressionValues[tempKey] = value[i];
        }
    }
    else {
        expression = indexify(valueKey, value, values);
        expressionValues[expression] = value;
    }
    return {
        Expression: expression,
        ExpressionAttributeValues: expressionValues
    };
}
exports.generateValueName = generateValueName;
//# sourceMappingURL=name.js.map