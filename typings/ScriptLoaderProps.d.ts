/**
 * This file was generated from ScriptLoader.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue } from "mendix";
import { Big } from "big.js";

export interface ScriptsType {
    scriptURL: DynamicValue<string>;
    onLoad?: ActionValue;
    onError?: ActionValue;
    loadDelay: DynamicValue<Big>;
    scriptElementProps?: DynamicValue<string>;
}

export type LoadingTypeEnum = "parallel" | "sequential";

export interface ScriptsPreviewType {
    scriptURL: string;
    onLoad: {} | null;
    onError: {} | null;
    loadDelay: string;
    scriptElementProps: string;
}

export interface ScriptLoaderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    scripts: ScriptsType[];
    loadingType: LoadingTypeEnum;
    removeScriptsOnUnload: boolean;
    onLoadAll?: ActionValue;
    onErrorAll?: ActionValue;
}

export interface ScriptLoaderPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    scripts: ScriptsPreviewType[];
    loadingType: LoadingTypeEnum;
    removeScriptsOnUnload: boolean;
    onLoadAll: {} | null;
    onErrorAll: {} | null;
}
