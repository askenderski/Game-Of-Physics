import getFieldInputPropsFromFormData from "../../../../../../../../Desktop/gameOfPhysicsDefaults/FieldInput/getFieldInputPropsFromFormData/getFieldInputPropsFromFormData";
import withInput from "../Input/withInputTests/withInput";
import FieldInputComponent from "../../../../../../../../Desktop/gameOfPhysicsDefaults/FieldInput/FieldInputComponent/FieldInputComponent";

const FieldInputComponentWithInput = withInput(FieldInputComponent, {getFormProps: getFieldInputPropsFromFormData});

export default function FieldInput(props) {
    return <FieldInputComponentWithInput {...props} />;
}