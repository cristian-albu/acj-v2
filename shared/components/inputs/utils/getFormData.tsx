/**
 * Extract all the data from the form inputs
 * @param formRef HTMlFormElement
 * @returns
 */
export const getFormData = (formRef: HTMLFormElement) => {
    const formElements = formRef.elements;
    const inputData = Array.from(formElements).reduce((acc: Record<string, string | number | boolean>, curr: Element) => {
        if (curr instanceof HTMLInputElement || curr instanceof HTMLTextAreaElement) {
            let value: string | number | boolean = "";
            switch (curr.type) {
                case "text":
                case "textarea":
                    value = curr.value || "";
                    break;
                case "number":
                    value = curr.value || 0;
                    break;
                case "checkbox":
                    value = curr instanceof HTMLInputElement ? curr.checked : false;
                    break;
                case "file":
                    value = curr.attributes.getNamedItem("server-file-ref")?.value || "";
                    break;
            }
            acc[curr.id] = value;
        }

        return acc;
    }, {});

    return inputData;
};

export default getFormData;
