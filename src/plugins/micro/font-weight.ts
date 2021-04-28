import { SupolkaMicroplugin, SupolkaTheme } from "../../types";
import { createAtomicMicroplugin } from "../../utils/microplugin";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const options = theme("fontWeight") as SupolkaTheme;
    return createAtomicMicroplugin(options, "fontWeight", "fw");
};

export default creator;
