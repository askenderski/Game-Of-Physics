export default function getInputPropsFromFormData(formData, name, inputType) {
    const propsToReturn = {};

    propsToReturn.value = formData.values[name];

    switch (inputType) {
        case "input": {
            propsToReturn.onChange = e => formData.setFieldValue(name, e.target.value);
        }
    }

    return propsToReturn;
};