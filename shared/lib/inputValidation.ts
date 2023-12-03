/**
 * Represents the result of a validation.
 */
export type TvalidationReturn = {
    isValid: boolean;
    error: string;
};

/**
 * Validates a string as a slug.
 * @param value - The string to validate.
 * @param customError - Custom error message (optional).
 * @returns The validation result.
 */
export function validateSlug(value: string, customError?: string): TvalidationReturn {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (slugRegex.test(value)) {
        return { isValid: true, error: "" };
    } else {
        return {
            isValid: false,
            error: customError || "Invalid slug format. It should contain only lowercase letters, numbers, and hyphens.",
        };
    }
}

/**
 * Validates a string as an email address.
 * @param value - The string to validate.
 * @param customError - Custom error message (optional).
 * @returns The validation result.
 */
export function validateEmail(value: string, customError?: string): TvalidationReturn {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
        return { isValid: true, error: "" };
    } else {
        return { isValid: false, error: customError || "Invalid email address format." };
    }
}

/**
 * Validates the length of a string.
 * @param value - The string to validate.
 * @param minLength - The minimum allowed length (default: 1).
 * @param maxLength - The maximum allowed length (default: 300).
 * @param customMinError - Custom error message for min length (optional).
 * @param customMaxError - Custom error message for max length (optional)
 * @returns The validation result.
 */
export function validateLength(
    value: string,
    minLength: number = 1,
    maxLength: number = 300,
    customMinError?: string,
    customMaxError?: string
): TvalidationReturn {
    const length = value.length;

    if (length < minLength || length > maxLength) {
        let error = "";

        if (length < minLength) {
            error = customMinError || `Too short. Minimum length is ${minLength} characters.`;
        } else if (length > maxLength) {
            error = customMaxError || `Too long. Maximum length is ${maxLength} characters.`;
        }
        return { isValid: false, error };
    }

    return { isValid: true, error: "" };
}

/**
 * Validates text with simple letters, numbers, and specific special characters.
 * @param value - The text to validate.
 * @param customError - Custom error message (optional).
 * @returns The validation result.
 */
export function validateSimpleText(value: string, customError?: string): TvalidationReturn {
    const simpleTextRegex = /^[a-zA-Z0-9@#%&()\/,.;'"\\:!?\-+*=]+$/;

    if (simpleTextRegex.test(value)) {
        return { isValid: true, error: "" };
    } else {
        return {
            isValid: false,
            error: customError || "Invalid text format",
        };
    }
}
