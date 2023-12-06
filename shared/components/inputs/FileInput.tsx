"use client";
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";
import { TErrorState, TFileInput, TInputErrorProps } from "./types";

const FileInput: React.FC<TFileInput> = ({ errorCallbacks }) => {
    const ref = useRef<null | HTMLInputElement>(null);
    const [file, setFile] = useState<null | Blob>(null);
    const [generateImageObjectUrl, setImageObjectUrl] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(false);

    const uploadFileToClient = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorState(false);
        if (event.target.files && event.target.files[0]) {
            const newFile = event.target.files[0];

            setFile(newFile);

            if (newFile.type.startsWith("image/")) {
                setImageObjectUrl(URL.createObjectURL(newFile));
            }
        }
    };

    const uploadFileToServer = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formData = new FormData();
        if (!file) {
            setErrorState(true);
            throw new Error("Must have a valid file");
        }

        formData.append("file", file);

        try {
            setLoading(true);
            const response = await fetch("/api/file", {
                method: "POST",
                body: formData,
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resJson = await response.json();

            console.log(resJson);
        } catch (err) {
            console.error(err);
            setErrorState(true);
        } finally {
            setLoading(false);
        }
    };

    const clearFile = () => {
        if (generateImageObjectUrl) {
            // Revoke the object URL to free up resources
            URL.revokeObjectURL(generateImageObjectUrl);
            setErrorState(false);
            setFile(null), setImageObjectUrl(null);
            if (ref.current) {
                ref.current.value = "";
            }
        }
    };

    const handleClearFile = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        clearFile();
    };

    // Default error props
    const errorProps: TErrorState = {
        focusedOnce: errorState,
        isFocused: errorState,
        shouldShowErr: errorState,
        shouldHighlightErr: errorState,
    };

    useEffect(() => {
        // Cleanup function for generatedFileUrl on component unmount
        return () => {
            clearFile();
        };
    }, [generateImageObjectUrl]);

    return (
        <div className={`${styles.fileUpload} ${loading ? styles.loading : ""}`}>
            {generateImageObjectUrl && <img className={styles.fileImg} src={generateImageObjectUrl} />}
            <label className={styles.fileLabel}>
                <input
                    className={styles.fileInput}
                    type="file"
                    name="fileUpload"
                    onChange={uploadFileToClient}
                    ref={ref}
                    disabled={loading}
                />
            </label>
            {generateImageObjectUrl && (
                <span>
                    <button className={styles.uploadButton} onClick={uploadFileToServer} type="submit" disabled={loading}>
                        {loading ? "Uploading..." : "Upload to server"}
                    </button>
                    <button className={styles.clearButton} onClick={handleClearFile} disabled={loading}>
                        Clear
                    </button>
                </span>
            )}
            {errorCallbacks && <InputError {...{ value: "val", errors: errorCallbacks, errorState: errorProps }} />}
        </div>
    );
};

export default FileInput;
