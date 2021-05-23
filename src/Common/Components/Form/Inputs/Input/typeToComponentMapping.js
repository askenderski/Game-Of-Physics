//It acts as a map and so is called one, but it will only use string keys and an object is sufficient in terms of implementation
import ButtonInput from "../ButtonInput/ButtonInput";

const typeToComponentMap = {
    input: "input",
    button: ButtonInput
};

export default function getComponentFromType(type) {
    return typeToComponentMap[type];
};