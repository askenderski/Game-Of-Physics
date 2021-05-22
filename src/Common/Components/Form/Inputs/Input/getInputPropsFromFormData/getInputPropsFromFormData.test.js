import getInputPropsFromFormData from "./getInputPropsFromFormData";
import getInputPropsFromFormDataTests from "./getInputPropsFromFormDataTests";

function getPropExtractorByFormData(formData, name, inputType) {
    const inputProps = getInputPropsFromFormData(formData, name, inputType);

    const getProp = propName => inputProps[propName];

    return {
        isValueSameAs(value) {
            return getProp("value") === value;
        },
        changeValue(value) {
            getProp("onChange")({target: {value}});
        }
    };
}

describe("unit tests", () => {
    getInputPropsFromFormDataTests({getPropExtractorByFormData});
});