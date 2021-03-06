import { SupolkaMicroplugin, SupolkaTheme } from "../../types";
import { createAtomicMicroplugin } from "../../utils/microplugin";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const options = theme("fontSize") as SupolkaTheme;
    return createAtomicMicroplugin(options, "fontSize", "fs");
};

export default creator;
