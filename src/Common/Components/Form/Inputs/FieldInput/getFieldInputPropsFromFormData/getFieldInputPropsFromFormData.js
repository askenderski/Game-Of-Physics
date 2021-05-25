export default function getInputPropsFromFormData(formData, name) {
    const propsToReturn = {};

    propsToReturn.onChange = e => formData.setFieldValue(name, e.target.value);

    return propsToReturn;
};