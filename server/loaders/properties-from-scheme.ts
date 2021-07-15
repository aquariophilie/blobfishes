export default function getProperitesFromSchema(schema: any, except: string[] = []): any {
    const result = {};
    if (!schema || typeof schema.properties !== 'object') {
        return result;
    }
    for (const key in schema.properties) {
        let required = false;
        if (schema.properties[key]?.type && except.indexOf(key) === -1) {
            if (Array.isArray(schema.required) && schema.required.indexOf(key) !== -1) {
                required = true;
            }
            result[key] = Object.assign({}, schema.properties[key]);
            result[key].required = required;
        }
    }
    return result;
}
