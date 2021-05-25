import executeTests from "./getFieldInputPropsFromFormDataTests";
import getFieldInputPropsFromFormData from "./getFieldInputPropsFromFormData";

function getPropExtractor(formProps, name) {
    const res = getFieldInputPropsFromFormData(formProps, name);

    return {
        executeOnChangeByValue(value) {
            res.onChange({target: {value}});
        }
    };
}

describe("unit tests", () => {
    executeTests({getPropExtractor});
});