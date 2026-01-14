export function resolveToken(path: string, theme?: any, fallback?: string): string | undefined {
    if (!path || typeof path !== "string") return undefined;
    const keys = path.split(".");
    let current = theme;
    for (const key of keys) {
        if (current == null || current[key] == null) {
            return fallback ?? path; 
        }
        current = current[key];
    }
    return current;
}