import { PASSWORD_STRENGTH, MIN_PASSWORD_LENGTH, HAS_UPPERCASE, HAS_NUMBER, HAS_SPECIAL } from '../constants/strings.js';

/**
 * PasswordStrengthBar — Visual indicator showing password strength.
 * Calculates strength based on length, uppercase letters, numbers, and special characters.
 * Displays a colored progress bar and label.
 * @param {{ password: string }} props
 */
export default function PasswordStrengthBar({ password }) {
  if (!password) return null;

  /**
   * Calculates password strength level based on criteria met.
   * @returns {{ label: string, width: string, color: string }}
   */
  const getStrength = () => {
    let score = 0;
    if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
    if (HAS_UPPERCASE.test(password)) score += 1;
    if (HAS_NUMBER.test(password)) score += 1;
    if (HAS_SPECIAL.test(password)) score += 1;

    if (score <= 1) return PASSWORD_STRENGTH.WEAK;
    if (score === 2) return PASSWORD_STRENGTH.FAIR;
    if (score === 3) return PASSWORD_STRENGTH.GOOD;
    return PASSWORD_STRENGTH.STRONG;
  };

  const strength = getStrength();

  return (
    <div className="mt-2 flex items-center gap-3">
      <div className="flex-1 h-1 bg-border rounded-sm overflow-hidden">
        <div
          className="h-full rounded-sm"
          style={{
            width: strength.width,
            backgroundColor: strength.color,
            transition: 'width 150ms ease, background-color 150ms ease',
          }}
        />
      </div>
      <span className="text-xs font-medium" style={{ color: strength.color }}>
        {strength.label}
      </span>
    </div>
  );
}
