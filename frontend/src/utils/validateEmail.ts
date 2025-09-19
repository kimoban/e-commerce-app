// Email validation helper
export function validateEmail(email: string): boolean { return /.+@.+\..+/.test(email); }