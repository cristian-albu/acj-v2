import { TDynamicFormProps } from "@/shared/components/inputs/types";

const mock_formData: TDynamicFormProps = {
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
        { type: "number", children: "Text input", id: "id4", errorCallbacks: [{ validation: "minmax", args: [1, 2] }] },
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
        {
            type: "file",
            children: "File upload 2",
            uploadToServerData: { endpoint: "/api/file" },
            id: "id7",
            errorCallbacks: [{ validation: "file" }],
        },
        { type: "switch", children: "Switch input", id: "id8" },
    ],
    formButton: {
        text: "🖥️ Submit",
        action: (data) => console.log(data),
        placement: "right",
    },
};

export default mock_formData;
