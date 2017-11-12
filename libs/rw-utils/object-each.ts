export const objectEach = (object: {}, iterator: (value, key?: string) => void) => { for (const key in object) iterator(object[key], key) }
