export function mergeTokens(defaults, custom) {
    if (!custom) return defaults;
    return { ...defaults, ...custom };
}