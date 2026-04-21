import { describe, expect, test } from "bun:test"
import { validatePassword } from "../func"

describe("validatePassword", () => {
  describe("valid passwords", () => {
    test("valid secure password should pass", () => {
      const result = validatePassword("SecureP@ss123")
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.strength).toBe("strong")
    })

    test("password with exactly 12 characters should pass", () => {
      const result = validatePassword("Abc123!@#$")
      expect(result.valid).toBe(true)
    })

    test("password with exactly 64 characters should pass", () => {
      const result = validatePassword("A" + "b2@".repeat(16))
      expect(result.valid).toBe(true)
    })
  })

  describe("length validation", () => {
    test("empty password should fail", () => {
      const result = validatePassword("")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must be at least 12 characters long")
    })

    test("password with 7 characters should fail", () => {
      const result = validatePassword("Abc1!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must be at least 12 characters long")
    })

    test("password with 11 characters should fail", () => {
      const result = validatePassword("Abcdefghijk")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must be at least 12 characters long")
    })

    test("password with 65 characters should fail", () => {
      const result = validatePassword("A" + "b2@".repeat(16) + "x")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must be at most 64 characters long")
    })

    test("password with 100 characters should fail", () => {
      const result = validatePassword("A".repeat(100))
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must be at most 64 characters long")
    })
  })

  describe("missing uppercase", () => {
    test("password without uppercase should fail", () => {
      const result = validatePassword("lowercase123!@")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must contain at least one uppercase letter")
    })
  })

  describe("missing lowercase", () => {
    test("password without lowercase should fail", () => {
      const result = validatePassword("UPPERCASE123!@")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must contain at least one lowercase letter")
    })
  })

  describe("missing digit", () => {
    test("password without digit should fail", () => {
      const result = validatePassword("NoDigits!@#$")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must contain at least one digit")
    })
  })

  describe("missing special character", () => {
    test("password without special character should fail", () => {
      const result = validatePassword("NoSpecial123")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password must contain at least one special character")
    })

    test("password with allowed special characters should pass", () => {
      const result = validatePassword("Password1!")
      expect(result.valid).toBe(true)
    })

    test("password with @ should pass", () => {
      const result = validatePassword("Password1@")
      expect(result.valid).toBe(true)
    })

    test("password with # should pass", () => {
      const result = validatePassword("Password1#")
      expect(result.valid).toBe(true)
    })

    test("password with $ should pass", () => {
      const result = validatePassword("Password1$")
      expect(result.valid).toBe(true)
    })
  })

  describe("common passwords", () => {
    test("password should fail for 'password'", () => {
      const result = validatePassword("Password123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for '123456'", () => {
      const result = validatePassword("12345678Abc!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'qwerty'", () => {
      const result = validatePassword("Qwerty123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'admin'", () => {
      const result = validatePassword("Admin123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'letmein'", () => {
      const result = validatePassword("Letmein123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'welcome'", () => {
      const result = validatePassword("Welcome123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'monkey'", () => {
      const result = validatePassword("Monkey123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })

    test("password should fail for 'dragon'", () => {
      const result = validatePassword("Dragon123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password is too common")
    })
  })

  describe("sequential characters", () => {
    test("password with '123' should fail", () => {
      const result = validatePassword("Pass123word!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains sequential characters")
    })

    test("password with 'abc' should fail", () => {
      const result = validatePassword("Abcdefghijk1!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains sequential characters")
    })

    test("password with 'xyz' should fail", () => {
      const result = validatePassword("XyZabcdefg12!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains sequential characters")
    })

    test("password with '012' should fail", () => {
      const result = validatePassword("Pass012word!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains sequential characters")
    })
  })

  describe("repeated characters", () => {
    test("password with 'aaa' should fail", () => {
      const result = validatePassword("Passaaa123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains repeated characters")
    })

    test("password with '111' should fail", () => {
      const result = validatePassword("Pass111abc!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains repeated characters")
    })

    test("password with '!!!!' should fail", () => {
      const result = validatePassword("Pass!!!!123")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains repeated characters")
    })

    test("password with 'aa11' should fail", () => {
      const result = validatePassword("Aaa11!!!!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains repeated characters")
    })

    test("password with exactly 2 repeated characters should pass", () => {
      const result = validatePassword("Paass123!")
      expect(result.valid).toBe(true)
    })
  })

  describe("keyboard patterns", () => {
    test("password with 'qwerty' should fail", () => {
      const result = validatePassword("Qwerty123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains keyboard patterns")
    })

    test("password with 'asdf' should fail", () => {
      const result = validatePassword("Asdf123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains keyboard patterns")
    })

    test("password with 'zxcv' should fail", () => {
      const result = validatePassword("Zxcv123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains keyboard patterns")
    })

    test("password with 'qazwsx' should fail", () => {
      const result = validatePassword("Qazwsx123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains keyboard patterns")
    })
  })

  describe("blocked words", () => {
    test("password containing 'password' should fail", () => {
      const result = validatePassword("MyPassword123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })

    test("password containing 'admin' should fail", () => {
      const result = validatePassword("Admin123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })

    test("password containing 'login' should fail", () => {
      const result = validatePassword("Login123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })

    test("password containing 'root' should fail", () => {
      const result = validatePassword("Root123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })

    test("password containing 'user' should fail", () => {
      const result = validatePassword("User123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })

    test("password containing 'test' should fail", () => {
      const result = validatePassword("Test123!")
      expect(result.valid).toBe(false)
      expect(result.errors).toContain("Password contains blocked words")
    })
  })

  describe("strength levels", () => {
    test("password failing 3+ criteria should be weak", () => {
      const result = validatePassword("abc")
      expect(result.valid).toBe(false)
      expect(result.strength).toBe("weak")
    })

    test("password failing 1-2 criteria should be medium", () => {
      const result = validatePassword("password123")
      expect(result.valid).toBe(false)
      expect(result.strength).toBe("medium")
    })

    test("password passing all criteria should be strong", () => {
      const result = validatePassword("SecureP@ss123")
      expect(result.valid).toBe(true)
      expect(result.strength).toBe("strong")
    })
  })

  describe("multiple errors", () => {
    test("password missing multiple criteria should have multiple errors", () => {
      const result = validatePassword("weak")
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(1)
    })
  })
})