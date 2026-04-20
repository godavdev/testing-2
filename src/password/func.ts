export type PasswordStrength = "weak" | "medium" | "strong"

export type ValidationResult = {
  valid: boolean
  errors: string[]
  strength: PasswordStrength
}

export const validatePassword = (password: string): ValidationResult => {
  throw new Error("Not implemented")
}