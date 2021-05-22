import getInputPropsFromFormData from "./getInputPropsFromFormData";
import getInputPropsFromFormDataTests from "./getInputPropsFromFormDataTests";

function getPropExtractorByFormData(formData, name, inputType) {
    const inputProps = getInputPropsFromFormData(formData, name, inputType);

    const getProp = propName => inputProps[propName];

    return {
        getValue() {
            return getProp("value");
        },
        changeValue(value) {
            getProp("onChange")({target: {value}});
        }
    };
}

describe("unit tests", () => {
    getInputPropsFromFormDataTests({getPropExtractorByFormData});
});