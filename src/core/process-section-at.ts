import { Root } from "postcss";
import { sectionAt } from "../constants";
import { makeComment } from "../utils/css";

export default function processSectionAt() {
    return (root: Root) => {
        root.walkAtRules(sectionAt, (at) => {
            const sectionName = at.params;

            at.before(makeComment(`${sectionName} BEGIN`));
            at.before(at.nodes);
            at.before(makeComment(`${sectionName} END`));
            at.remove();
        });
    };
};
