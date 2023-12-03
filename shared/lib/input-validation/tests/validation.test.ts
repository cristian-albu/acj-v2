import { validateSlug, validateEmail, validateMinMaxLength } from "../inputValidation";

describe("validateSlug", () => {
    test("valid slug format", () => {
        const result = validateSlug("valid-slug");
        expect(result).toEqual({ isValid: true, error: "" });
    });

    test("invalid slug format", () => {
        const result = validateSlug("invalid slug");
        expect(result).toEqual({ isValid: false, error: "Invalid slug format" });
    });

    test("custom error message", () => {
        const result = validateSlug("invalid slug", "Custom error");
        expect(result).toEqual({ isValid: false, error: "Custom error" });
    });
});

describe("validateEmail", () => {
    test("valid email format", () => {
        const result = validateEmail("valid@email.com");
        expect(result).toEqual({ isValid: true, error: "" });
    });

    test("invalid email format", () => {
        const result = validateEmail("invalid email");
        expect(result).toEqual({ isValid: false, error: "Invalid email format" });
    });

    test("custom error message", () => {
        const result = validateEmail("invalid email", "Custom error");
        expect(result).toEqual({ isValid: false, error: "Custom error" });
    });
});

describe("validateMinMaxLength", () => {
    test("within range", () => {
        const result = validateMinMaxLength("value", 3, 5);
        expect(result).toEqual({ isValid: true, error: "" });
    });

    test("below minimum length", () => {
        const result = validateMinMaxLength("val", 4, 6);
        expect(result).toEqual({ isValid: false, error: "Must be at least 4 characters long" });
    });

    test("above maximum length", () => {
        const result = validateMinMaxLength("value123", 2, 5);
        expect(result).toEqual({ isValid: false, error: "Must be at most 5 characters long" });
    });

    test("custom error messages", () => {
        const result = validateMinMaxLength("value123", 2, 5, "Custom min", "Custom max");
        expect(result).toEqual({ isValid: false, error: "Custom max" });
    });
});
