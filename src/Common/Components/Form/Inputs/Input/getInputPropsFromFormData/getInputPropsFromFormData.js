export default function getInputPropsFromFormData(formData, name, inputType) {
    const propsToReturn = {};

    propsToReturn.value = formData.values[name];

    return propsToReturn;
};