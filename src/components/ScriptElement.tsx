import { ReactElement, createElement, FC } from "react";
import { THTMLScriptElementProps, useScript } from "../hooks/use-script";

export type ScriptElementProps = {
    id: string;
    src: string;
    delay: number;
    loadIt: boolean;
    loaded: () => void;
    error: (error: string | Event | null) => void;
    scriptProps: { [key: string]: string } | null;
};

export const ScriptElement: FC<ScriptElementProps> = ({
    src,
    delay,
    loadIt,
    loaded,
    error: onError,
    scriptProps
}): ReactElement => {
    const otherProps = (scriptProps || {}) as THTMLScriptElementProps;
    const [{ ready, error }, scriptID] = useScript({
        src,
        delay,
        startTrigger: loadIt,
        onReady: loaded,
        onError,
        otherProps
    });
    return <div data-script-id={scriptID} data-script-loaded={ready} data-script-error={error} />;
};
