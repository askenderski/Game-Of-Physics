import getComponentFromType from "./typeToComponentMapping";
import style from "./Input.module.scss";
import FormContext from "../FormContext";
import {useContext} from "react";

function Input({inputType, name, className=style[inputType], ...rest}) {
    const formData = useContext(FormContext);
    const {props: {[name]: contextProps}} = formData;
    const Component = getComponentFromType(inputType);

    return <Component {...contextProps} className={className} {...rest}/>;
}

export default Input;