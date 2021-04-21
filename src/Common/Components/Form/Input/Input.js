import getComponentFromType from "./typeToComponentMapping";

function Input({inputType, ...rest}) {
    const Component = getComponentFromType(inputType);

    return <Component {...rest}/>;
}

export default Input;