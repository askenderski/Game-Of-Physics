import FormContext from "../../../FormContext";
import {useContext} from "react";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";

function withInput(Component) {
    return function (props) {
        const formData = useContext(FormContext);
        const contextProps = getInputPropsFromFormData(formData, props.name, Component);

        return <Component {...contextProps} {...props}/>;
    }
}

export default withInput;