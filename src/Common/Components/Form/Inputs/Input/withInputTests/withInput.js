import FormContext from "../../../FormContext";
import {useContext} from "react";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";

function withInput(Component, options={}) {
    const {defaultProps, getFormProps = () => {}} = options;

    return function (props) {
        const formData = useContext(FormContext);
        const contextProps = getInputPropsFromFormData(formData, props.name, Component);
        const typeSpecificContextProps = getFormProps(formData, props.name);

        return <Component {...contextProps} {...typeSpecificContextProps} {...defaultProps} {...props}/>;
    }
}

export default withInput;