import getInputPropsFromFormData from "./getInputPropsFromFormData";
import getInputPropsFromFormDataTests from "./getInputPropsFromFormDataTests";

function getPropExtractorByFormData(formData, name, inputType) {
    const inputProps = getInputPropsFromFormData(formData, name, inputType);

    return {
        get(propName) {
            return inputProps[propName];
        }
    };
}

describe("unit tests", () => {
    getInputPropsFromFormDataTests({getPropExtractorByFormData});
});