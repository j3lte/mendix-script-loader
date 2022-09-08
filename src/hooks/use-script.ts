import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { md5 } from "super-fast-md5";

export type THTMLScriptElementProps = Record<string, keyof HTMLScriptElement>;

export interface IUseScript {
    ready: boolean;
    error: null | Event | string;
}

export interface IScriptProps {
    src?: string;
    innerText?: string;
    onReady?: () => void;
    onError?: (error: string | Event) => void;
    otherProps?: THTMLScriptElementProps;
    startTrigger?: boolean;
    id?: string;
    appendTo?: "head" | "body";
    delay?: number;
    loadOnce?: boolean;
}

const calculateHash = (content?: string): string | null => (content ? md5(content) : null);

export const findScriptElById = (id: string): HTMLScriptElement | null => document.querySelector(`script[id="${id}"]`);

const handleScriptAttributes = (script: HTMLScriptElement, otherProps: THTMLScriptElementProps): void => {
    for (const [attr, value] of Object.entries(otherProps)) {
        script.setAttribute(attr, value as string);
    }
};

export const useScript = ({
    src,
    innerText,
    onReady,
    onError,
    otherProps,
    startTrigger = true,
    id,
    appendTo = "head",
    delay = 0,
    loadOnce = true
}: IScriptProps): [IUseScript, string] => {
    const isLoading = useRef(false);
    const isLoaded = useRef(false);
    const isRegistered = useRef(false);

    const [state, setState] = useState<IUseScript>({
        ready: false,
        error: null
    });

    const handleOnLoad = useCallback(() => {
        setState(() => ({ ready: true, error: null }));
        onReady?.();
    }, [onReady]);

    const handleOnError = useCallback(
        error => {
            setState(() => ({ ready: false, error }));
            onError?.(error);
        },
        [onError]
    );

    const canRunEffect =
        (typeof src === "string" && src?.length > 0) || (typeof innerText === "string" && innerText?.length > 0);

    const contentHash = useMemo(() => calculateHash(src || innerText), [src, innerText]);
    const scriptID = useMemo(() => id || `script-loader-${contentHash}`, [id, contentHash]);

    useEffect(() => {
        if (contentHash && canRunEffect && startTrigger && !isLoading.current && !isRegistered.current) {
            if (loadOnce) {
                const script = findScriptElById(scriptID);
                if (script) {
                    setTimeout(() => {
                        isLoading.current = true;
                        handleOnLoad();
                    }, delay);
                    return;
                }
            }

            if (isRegistered.current) {
                return;
            }

            isRegistered.current = true;

            setTimeout(() => {
                try {
                    const script = window.document.createElement("script");

                    if (innerText && !src) {
                        script.innerText = innerText.toString();
                    }

                    if (src && !innerText) {
                        script.src = src.toString();
                    }

                    script.id = scriptID;

                    if (otherProps) {
                        handleScriptAttributes(script, otherProps);
                    }

                    script.onload = () => {
                        isLoaded.current = true;
                        handleOnLoad();
                    };

                    script.onerror = handleOnError;

                    window.document[appendTo].appendChild(script);

                    isLoading.current = true;

                    if (innerText && !src) {
                        handleOnLoad();
                    }
                } catch (error) {
                    handleOnError(error);
                }
            }, delay);
        }
    }, [
        onReady,
        onError,
        otherProps,
        startTrigger,
        appendTo,
        delay,
        handleOnLoad,
        handleOnError,
        canRunEffect,
        innerText,
        src,
        contentHash,
        scriptID,
        loadOnce
    ]);

    return [state, scriptID];
};
