import {
    validateEmail,
    validateFile,
    validateFileSize,
    validateFileType,
    validateMinMaxLength,
    validateSlug,
} from "@/shared/lib/input-validation/inputValidation";
import { TErrorProps, TFileError, TInputError } from "../types";

export default function checkInputErrors({ value, errors }: TErrorProps) {
    const errorList = errors.map((error: TInputError) => {
        switch (error.validation) {
            case "email":
                return validateEmail(value as string, error.args);
            case "minmax":
                return validateMinMaxLength(value as string, ...error.args);
            case "slug":
                return validateSlug(value as string, error.args);
            case "file":
                return validateFile(value as string | TFileError, error.args);
            case "fileSize":
                return validateFileSize(value as number, ...error.args);
            case "fileType":
                return validateFileType(value as string, ...error.args);
        }
    });

    return errorList;
}
