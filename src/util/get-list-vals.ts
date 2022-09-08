import { ScriptsType } from "../../typings/ScriptLoaderProps";

import { ValueStatus } from "mendix";
import Big from "big.js";
import { md5 } from "super-fast-md5";
import { executeAction } from "./action";

export type ListValue = {
    key: string;
    scriptID: string;
    url: string;
    delay: number;
    scriptProps: { [key: string]: string };
    onLoad: () => void;
    onError: () => void;
};

const isValuesAvailable = (script: ScriptsType): boolean =>
    script.scriptURL.status === ValueStatus.Available &&
    script.loadDelay.status === ValueStatus.Available &&
    script.scriptElementProps
        ? script.scriptElementProps.status === ValueStatus.Available
        : true;

const getListValue = (script: ScriptsType, index: number): ListValue => {
    const scriptPropsString = script.scriptElementProps?.value || "{}";
    let scriptProps = {};
    try {
        scriptProps = JSON.parse(scriptPropsString);
    } catch (error) {
        console.warn(`Error while trying to parse script props: '${scriptPropsString}'`, error);
        scriptProps = {};
    }

    return {
        key: `script-${index}`,
        url: script.scriptURL.value as string,
        scriptID: `script-loader-${md5((script.scriptURL.value as string) || "empty")}`,
        scriptProps,
        delay: parseInt((script.loadDelay.value as Big).toFixed(0), 10),
        onLoad: () => {
            // console.log("load", script);
            executeAction(script.onLoad);
        },
        onError: () => executeAction(script.onError)
    };
};

export const getListValues = (scriptList: ScriptsType[]): ListValue[] | null => {
    const allAvailable = scriptList.every(script => isValuesAvailable(script));

    if (allAvailable) {
        return scriptList.map(getListValue);
    }
    return null;
};
