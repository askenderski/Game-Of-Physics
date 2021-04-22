//It acts as a map and so is called one, but it will only use string keys and an object is sufficient in terms of implementation
import InvalidInputTypeError from "./InvalidInputTypeError";
import ButtonInput from "../ButtonInput/ButtonInput";

const typeToComponentMap = {
    field: "input",
    button: ButtonInput
};

export default function getComponentFromType(type) {
    if (type in typeToComponentMap) {
        return typeToComponentMap[type];
    }

    throw new InvalidInputTypeError();
};