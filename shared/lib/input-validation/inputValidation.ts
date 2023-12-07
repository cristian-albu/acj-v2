export type TvalidationReturn = {
    isValid: boolean;
    error: string;
};

/**
 * Validates if a string is in slug form.
 * @param value - The string to be validated.
 * @param customError - Custom error message (optional).
 * @returns The validation result.
 */
export const validateSlug = (value: string, customError?: string): TvalidationReturn => {
    const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    let output: TvalidationReturn = { isValid: true, error: "" };

    if (!regex.test(value)) {
        output = { isValid: false, error: customError || "Invalid slug format" };
    }

    return output;
};

/**
 * Validates if a value is a valid email.
 * @param value - The value to be validated.
 * @param customError - Custom error message (optional).
 * @returns The validation result.
 */
export const validateEmail = (value: string, customError?: string): TvalidationReturn => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let output: TvalidationReturn = { isValid: true, error: "" };

    if (!regex.test(value)) {
        output = { isValid: false, error: customError || "Invalid email format" };
    }

    return output;
};

/**
 * Validates if a string's length is within the specified range.
 * @param value - The string to be validated.
 * @param min - The minimum length.
 * @param max - The maximum length.
 * @param customMinLength - Custom error message for minimum length (optional).
 * @param customMaxLength - Custom error message for maximum length (optional).
 * @returns The validation result.
 */
export const validateMinMaxLength = (
    value: string,
    min: number,
    max: number,
    customMinLength?: string,
    customMaxLength?: string
): TvalidationReturn => {
    const length = value.length;
    let output: TvalidationReturn = { isValid: true, error: "" };

    if (length < min) {
        output = { isValid: false, error: customMinLength || `Must be at least ${min} characters long` };
    } else if (length > max) {
        output = { isValid: false, error: customMaxLength || `Must be at most ${max} characters long` };
    }

    return output;
};

export const validateFile = (value: "clientErr" | "serverErr" | string, customError?: string): TvalidationReturn => {
    let output: TvalidationReturn = { isValid: true, error: "" };

    if (value === "clientErr") {
        output = { isValid: false, error: customError || "Can't upload this file." };
    }

    if (value === "serverErr") {
        output = { isValid: false, error: customError || "An error has occurred while uploading the file" };
    }

    return output;
};
