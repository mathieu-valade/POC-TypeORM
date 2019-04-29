export function getClassName<T>(type: new() => T): string {
    const obj = new type();
    return obj.constructor.name.toLowerCase();
}