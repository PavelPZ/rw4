import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';

export function toCammelCase(obj: string): string { return camelCase(obj); }
export function fromCammelCase(obj: string): string { return kebabCase(obj); }
//export function normalizeCamelCase(obj: Object) {
//  Object.keys(obj).forEach(key => {
//    var replaced = toCammelCase(key.toLowerCase());
//    if (replaced == key) return;
//    obj[replaced] = obj[key];
//    delete obj[key];
//  });
//}
//var toCammelCaseRegex = /-([a-z])/gi;
//var fromCammelCaseRegex = /([A-Z])/g;

