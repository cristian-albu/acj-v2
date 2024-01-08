import { TDynamicFormProps } from "@/shared/components/inputs/types";

export const mock_formData: TDynamicFormProps = {
    inputList: [
        {
            type: "text",
            children: "Email Input",
            id: "id1",
            errorCallbacks: [{ validation: "email" }],
            defaultValue: "Default text",
        },
        { type: "text", children: "Slug input", id: "id2", errorCallbacks: [{ validation: "slug" }] },
        { type: "text", children: "Text input", id: "id3", errorCallbacks: [{ validation: "minmax", args: [1, 64] }] },
        { type: "number", children: "Number input", id: "id4", errorCallbacks: [{ validation: "minmax", args: [1, 2] }] },
        { type: "textarea", children: "Textarea", id: "id5", errorCallbacks: [{ validation: "minmax", args: [1, 128] }] },
        {
            uploadToServerData: { endpoint: "/api/file" },
            type: "file",
            children: "File upload",
            id: "id6",
            errorCallbacks: [
                { validation: "file" },
                { validation: "fileSize", args: [5000] },
                { validation: "fileType", args: [["png", "jpg"]] },
            ],
        },
        { type: "switch", children: "Switch input", id: "id8" },
        {
            type: "select",
            children: "Select input",
            id: "id9",
            options: [
                { value: "1", text: "Option 1" },
                { value: "2", text: "Option 2" },
            ],
        },
    ],
    formButton: {
        text: "🖥️ Submit",
        action: (data) => console.log(data),
        placement: "right",
    },
};

export const mock_selectOptions = [
    { text: "Option 1", value: "value1" },
    { text: "Option 2", value: "value2" },
    { text: "Option 3", value: "value3" },
];
