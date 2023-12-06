"use client";
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";
import { TErrorState, TFileInput, TInputEvents } from "./types";
import Button from "../layout/Button";
import Image from "next/image";
import Loading from "../layout/Loading";

/**
 *
 * once file is uploaded you can get: server-file-ref data attribute
 * @example
 *
 * event.target.attributes.getNamesItem('server-file-ref').value
 */
const FileInput: React.FC<TFileInput> = ({ errorCallbacks }) => {
    const ref = useRef<null | HTMLInputElement>(null);
    const [file, setFile] = useState<null | File>(null);
    const [generateImageObjectUrl, setImageObjectUrl] = useState<null | string>(null);
    const [serverRef, setServerRef] = useState<null | any>(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [fileErr, setFileErr] = useState("");
    const [errorState, setErrorState] = useState<TErrorState>({
        shouldShowErr: false,
        shouldHighlightErr: false,
    });

    const uploadFileToClient = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFileErr("");
        if (event.target.files && event.target.files[0]) {
            const newFile = event.target.files[0];
            console.log(newFile);
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
            setFileErr("clientErr");
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
            setServerRef(resJson);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setFileErr("serverErr");
            setErrorState({ ...errorState, shouldHighlightErr: true });
        } finally {
            // load animation looks good so we must wait for it for at least 1 more second
            await new Promise((res) => setTimeout(res, 1000));
            setLoading(false);
        }
    };

    const clearFile = (event?: MouseEvent<HTMLButtonElement>) => {
        event && event.preventDefault();
        setFileErr("");
        if (generateImageObjectUrl) {
            URL.revokeObjectURL(generateImageObjectUrl);
            setImageObjectUrl(null);
        }
        if (ref.current) ref.current.value = "";
        setFile(null);
    };

    const inputErrorEventsHandlers = {
        onMouseEnter: () => {
            setErrorState({ ...errorState, shouldShowErr: true });
        },
        onMouseLeave: () => {
            if (!errorState.isFocused) {
                setErrorState({ ...errorState, shouldShowErr: false });
            }
        },
    };

    return (
        <div className={styles.fileUpload}>
            {file ? (
                <>
                    <div className={styles.fileContainer}>
                        {generateImageObjectUrl ? (
                            loading ? (
                                <Loading />
                            ) : (
                                <img
                                    width={900}
                                    height={900}
                                    className={styles.fileImg}
                                    alt="image upload"
                                    src={generateImageObjectUrl}
                                />
                            )
                        ) : loading ? (
                            <Loading />
                        ) : (
                            <div>
                                <p>📂 {file.name} </p>
                                <p> {file.size / 1000} KB</p>
                            </div>
                        )}
                    </div>
                    {success ? (
                        <div>File loaded</div>
                    ) : (
                        <span>
                            <Button onClick={uploadFileToServer} type="submit" disabled={loading}>
                                {loading ? "⌛ Uploading..." : "💾 Save"}
                            </Button>
                            <Button btnStyle="outline" onClick={clearFile} disabled={loading}>
                                ❌ Clear
                            </Button>
                        </span>
                    )}
                </>
            ) : (
                <label className={styles.fileLabel}>
                    <input
                        className={styles.fileInput}
                        type="file"
                        name="fileUpload"
                        server-file-ref={serverRef}
                        onChange={uploadFileToClient}
                        ref={ref}
                        disabled={loading}
                    />
                    <span>📂 Upload file</span>
                </label>
            )}

            {errorCallbacks && (
                <InputError
                    {...{ value: fileErr, errors: errorCallbacks, errorState: errorState }}
                    {...inputErrorEventsHandlers}
                />
            )}
        </div>
    );
};

export default FileInput;
