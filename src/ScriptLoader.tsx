import { createElement, ReactNode, useCallback, useEffect, useState } from "react";
import { useUnmount } from "react-use";

import { ScriptLoaderContainerProps } from "../typings/ScriptLoaderProps";
import { ScriptElement } from "./components/ScriptElement";
import { findScriptElById } from "./hooks/use-script";
import { executeAction } from "./util/action";
import { getListValues } from "./util/get-list-vals";

const DEBUG = false;

export const ScriptLoader = ({
    scripts,
    loadingType,
    removeScriptsOnUnload,
    onLoadAll,
    onErrorAll
}: ScriptLoaderContainerProps): ReactNode => {
    const [listLoaded, setListLoaded] = useState<boolean[]>(new Array(scripts.length).fill(false));
    const [listErrors, setListErrors] = useState<boolean[]>(new Array(scripts.length).fill(false));
    const hasErrors = listErrors.some(v => v);
    const listValues = getListValues(scripts);
    const allLoaded = listLoaded.length > 0 && listLoaded.every(v => v);
    const shouldLoad = useCallback(
        (index: number) => {
            if (index === 0 || loadingType === "parallel") {
                return true;
            }
            const previousLoaded = listLoaded.slice(0, index).every(v => v);
            return previousLoaded;
        },
        [listLoaded, loadingType]
    );

    useEffect(() => {
        if (allLoaded && !hasErrors) {
            executeAction(onLoadAll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allLoaded, hasErrors]);

    useEffect(() => {
        if (hasErrors) {
            executeAction(onErrorAll);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasErrors]);

    useUnmount(() => {
        if (DEBUG) {
            console.log("Unmount");
        }
        if (!removeScriptsOnUnload) {
            return;
        }
        listValues?.forEach(v => {
            const script = findScriptElById(v.scriptID);
            if (script !== null) {
                window.document.head.removeChild(script);
            }
        });
    });

    if (!listValues) {
        return null;
    }

    return (
        <div className={"script-loader-widget"}>
            {listValues.map((value, index) => (
                <ScriptElement
                    src={value.url}
                    key={value.key}
                    delay={value.delay}
                    id={value.scriptID}
                    scriptProps={value.scriptProps}
                    loaded={() => {
                        if (DEBUG) {
                            console.log("script loaded", index, value);
                        }
                        if (!listLoaded[index]) {
                            value.onLoad();
                        }
                        setListLoaded(prevList => {
                            prevList[index] = true;
                            return [...prevList];
                        });
                    }}
                    error={error => {
                        if (DEBUG) {
                            console.log("script error", index, error);
                        }
                        setListErrors(prevList => {
                            prevList[index] = true;
                            return [...prevList];
                        });
                        value.onError();
                    }}
                    loadIt={shouldLoad(index)}
                />
            ))}
        </div>
    );
};
