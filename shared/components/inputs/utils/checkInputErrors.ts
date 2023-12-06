import { validateEmail, validateMinMaxLength, validateSlug } from "@/shared/lib/input-validation/inputValidation";
import { TErrorProps, TInputError } from "../types";

export default function checkInputErrors({ value, errors }: TErrorProps) {
    const errorList = errors.map((error: TInputError) => {
        switch (error.validation) {
            case "email":
                return validateEmail(value, error.args);
            case "minmax":
                return validateMinMaxLength(value, ...error.args);
            case "slug":
                return validateSlug(value, error.args);
            case "file":
                return { isValid: true, error: "" };
        }
    });

    return errorList;
}
