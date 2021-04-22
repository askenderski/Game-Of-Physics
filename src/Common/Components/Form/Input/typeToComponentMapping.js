//It acts as a map and so is called one, but it will only use string keys and an object is sufficient in terms of implementation
import InvalidInputTypeError from "./InvalidInputTypeError";

const typeToComponentMap = {
    field: "input"
};

export default function getComponentFromType(type) {
    if (type in typeToComponentMap) {
        return typeToComponentMap[type];
    }

    throw new InvalidInputTypeError();
};