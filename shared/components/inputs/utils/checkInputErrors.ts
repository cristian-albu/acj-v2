import {
    validateEmail,
    validateFile,
    validateFileSize,
    validateFileType,
    validateMinMaxLength,
    validateSlug,
} from "@/shared/lib/input-validation/inputValidation";
import { TErrorProps, TFileError, TInputError } from "../types";

export default function checkInputErrors({ value, errors }: { value: string | number; errors: TInputError[] }) {
    const errorList = errors.map((error: TInputError) => {
        switch (error.validation) {
            case "email":
                return validateEmail(value as string, error.args);
            case "minmax":
                return validateMinMaxLength(value as string, ...error.args);
            case "slug":
                return validateSlug(value as string, error.args);
            default:
                return { isValid: true, error: "" };
        }
    });

    return errorList;
}

export function checkFileErrors(value: string) {}
