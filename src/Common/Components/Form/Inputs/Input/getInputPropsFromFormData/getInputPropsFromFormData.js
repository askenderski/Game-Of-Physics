export default function getInputPropsFromFormData(formData, name) {
    const propsToReturn = {};

    propsToReturn.value = formData.values[name];

    return propsToReturn;
};