import getComponentFromType from "./typeToComponentMapping";
import style from "./Input.module.scss";

function Input({inputType, className=style[inputType], ...rest}) {
    const Component = getComponentFromType(inputType);

    return <Component className={className} {...rest}/>;
}

export default Input;