import FormContext from "../../../FormContext";
import {useContext} from "react";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";

function withInput(Component, options={}) {
    const {defaultProps} = options;

    return function (props) {
        const formData = useContext(FormContext);
        const contextProps = getInputPropsFromFormData(formData, props.name, Component);

        return <Component {...contextProps} {...defaultProps} {...props}/>;
    }
}

export default withInput;