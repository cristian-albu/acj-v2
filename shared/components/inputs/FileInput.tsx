"use client";
import React, { ChangeEvent, MouseEvent, useRef, useState } from "react";
import styles from "./inputs.module.scss";
import InputError from "./utils/InputError";
import { TErrorState, TFileInput } from "./types";
import Button from "../layout/Button";
import Loading from "../layout/Loading";

/**
 * Upload a file to the client and then save it to the server. The sever should respond with the resource link from the database and that will become the new value of the input.
 * once file is uploaded you can get: server-file-ref data attribute
 *
 * Get the data once it comes back from the server
 * @example
 * <input type="file" server-file-ref="https://domain.com/image" />
 * const data = event.target.attributes.getNamesItem('server-file-ref').value
 */
const FileInput: React.FC<TFileInput> = ({ id, children, errorCallbacks }) => {
    const ref = useRef<null | HTMLInputElement>(null);
    const hiddenRef = useRef<null | HTMLInputElement>(null);
    const [file, setFile] = useState<null | File>(null);
    const [generateImageObjectUrl, setImageObjectUrl] = useState<null | string>(null);
    const [serverRef, setServerRef] = useState<null | any>(null);
    const [copied, setCopied] = useState(false);
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
            });

            if (response.status === 200) {
                setFileErr("");
                setErrorState({ ...errorState, shouldShowErr: false, shouldHighlightErr: false });

                const resJson = await response.json();
                setServerRef(resJson);
                setSuccess(true);

                if (hiddenRef.current) {
                    hiddenRef.current.value = "loaded";
                    const syntheticEvent = new Event("input", { bubbles: true });
                    hiddenRef.current.dispatchEvent(syntheticEvent);
                }
            }
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
        setServerRef("");
        setErrorState({ ...errorState, shouldShowErr: false, shouldHighlightErr: false });
        setSuccess(false);
        if (generateImageObjectUrl) {
            URL.revokeObjectURL(generateImageObjectUrl);
            setImageObjectUrl(null);
        }
        if (ref.current) ref.current.value = "";
        setFile(null);
    };

    const copyServerRefToClipboard = async () => {
        setCopied(true);
        navigator.clipboard.writeText(serverRef);
        await new Promise((res) =>
            setTimeout(() => {
                res;
                setCopied(false);
            }, 1000)
        );
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
        <div className={styles.fileUpload} onClick={() => ref.current && ref.current.focus()}>
            {file && (
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
                                    src={success ? serverRef : generateImageObjectUrl}
                                />
                            )
                        ) : loading ? (
                            <Loading />
                        ) : (
                            <div>
                                <p>📄 {file.name} </p>
                                <p>
                                    {file.size > 1024 * 1024
                                        ? `${Math.round((file.size / 1024 / 1024) * 100) / 100} MB`
                                        : `${Math.round((file.size / 1024) * 100) / 100} KB`}
                                </p>
                            </div>
                        )}
                    </div>
                    <span>
                        {success ? (
                            <p onClick={copyServerRefToClipboard} style={{ cursor: copied ? "progress" : "copy" }}>
                                {copied ? "Resource copied to clipboard" : serverRef.slice(0, 50)}...
                            </p>
                        ) : (
                            <Button onClick={uploadFileToServer} disabled={loading}>
                                {loading ? "⌛ Uploading..." : "💾 Save"}
                            </Button>
                        )}

                        <Button btnStyle="outline" onClick={clearFile} disabled={loading}>
                            ❌ Clear
                        </Button>
                    </span>
                </>
            )}
            <label className={file ? styles.fileLoaded : styles.fileLabel}>
                <input
                    id={id}
                    className={styles.fileInput}
                    type="file"
                    name="fileUpload"
                    server-file-ref={serverRef}
                    onChange={uploadFileToClient}
                    ref={ref}
                    disabled={loading}
                />

                <span>📂 {children || "Upload file"}</span>
            </label>
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
