import runTests from "./getInputPropsFromFormDataTests";
import getInputPropsFromFormData from "./getInputPropsFromFormData";

function getPropExtractorByFormData(formData, name, inputType) {
    const inputProps = getInputPropsFromFormData(formData, name, inputType);

    return {
        get(propName) {
            return inputProps[propName];
        }
    };
}

runTests({getPropExtractorByFormData});