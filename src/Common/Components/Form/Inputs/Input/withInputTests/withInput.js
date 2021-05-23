import style from "../../Input.module.scss";
import FormContext from "../../../FormContext";
import {useContext} from "react";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";

function withInput(inputType, {className=style[inputType]}={}) {
    return function (props) {
        const formData = useContext(FormContext);
        const contextProps = getInputPropsFromFormData(formData, props.name, inputType);
        const Component = inputType;

        return <Component {...contextProps} className={className} {...props}/>;
    }
}

export default withInput;