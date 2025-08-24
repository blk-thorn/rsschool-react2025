export const checkPasswordStrength = (
  password: string
): 'Weak' | 'Medium' | 'Strong' => {
  const hasNumber: boolean = /\d/.test(password);
  const hasUpper: boolean = /[A-Z]/.test(password);
  const hasLower: boolean = /[a-z]/.test(password);
  const hasSpecial: boolean = /[^a-zA-Z0-9]/.test(password);
  const longEnough: boolean = password.length >= 8;

  if (!hasNumber || !hasUpper || !hasLower || !longEnough) return 'Weak';
  if (hasNumber && hasUpper && hasLower && longEnough && !hasSpecial)
    return 'Medium';
  if (hasNumber && hasUpper && hasLower && longEnough && hasSpecial)
    return 'Strong';

  return 'Weak';
};
