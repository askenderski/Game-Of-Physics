import getFieldInputPropsFromFormData from "./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData";
import withInput from "../Input/withInputTests/withInput";
import FieldInputComponent from "./FieldInputComponent/FieldInputComponent";
import {useContext} from "react";
import FormContext from "../../FormContext";

const FieldInputComponentWithInput = withInput(FieldInputComponent);

export default function FieldInput(props) {
    const context = getFieldInputPropsFromFormData(useContext(FormContext), props.name);

    return <FieldInputComponentWithInput {...context} {...props} />;
}