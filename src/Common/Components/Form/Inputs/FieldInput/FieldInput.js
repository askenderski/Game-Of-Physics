import getFieldInputPropsFromFormData from "./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData";
import withInput from "../Input/withInputTests/withInput";
import FieldInputComponent from "./FieldInputComponent/FieldInputComponent";

const FieldInputComponentWithInput = withInput(FieldInputComponent, {getFormProps: getFieldInputPropsFromFormData});

export default function FieldInput(props) {
    return <FieldInputComponentWithInput {...props} />;
}