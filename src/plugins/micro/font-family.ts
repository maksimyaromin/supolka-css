import { SupolkaMicroplugin, SupolkaTheme } from "../../types";
import { createAtomicMicroplugin } from "../../utils/microplugin";
import { omit } from "lodash";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const options = omit(theme("fontFamily") as object, "sans", "mono") as SupolkaTheme;
    return createAtomicMicroplugin(options, "fontFamily", "font");
};

export default creator;
