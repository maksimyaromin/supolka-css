import { get } from "lodash";
import { SupolkaPluginOptions } from "../types";
import { removeUnusedMarkers, removeUnusedStyles } from "../utils/css";

export default function processUnused(options: SupolkaPluginOptions) {
    const purge = get(options, "purgeCss", false) as any;

    if (!purge) {
        return removeUnusedMarkers;
    }
    
    return removeUnusedStyles(purge);
};
