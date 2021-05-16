import getInputPropsFromFormData from "./getInputPropsFromFormData/getInputPropsFromFormData";
import executeTests from "./InputTests";
import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";

jest.mock("./getInputPropsFromFormData/getInputPropsFromFormData", () => jest.fn());

function createFormWithInputComponentUnit({propsToPassManually, formProps}) {
    const name = "someName";
    const formValuesToBePassed = {};
    const inputType = InputTestsDataAndUtilities.inputTypeDifferentFromDefault;

    getInputPropsFromFormData.mockImplementationOnce((formData, curName, curInputType) => {
        if (formData === formValuesToBePassed && name === curName && curInputType === inputType) {
            return formProps;
        }

        return {};
    });

    return createFormWithInputComponentIntegration({propsToPassManually,
        formProps: formValuesToBePassed});
}

function createFormWithInputComponentIntegration({propsToPassManually, formProps}) {
    const name = "someName";
    const inputType = InputTestsDataAndUtilities.inputTypeDifferentFromDefault;

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {name, inputType: InputTestsDataAndUtilities.inputTypeDifferentFromDefault, ...propsToPassManually},
        formProps
    );
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

describe("unit tests", () => {
    executeTests({createFormWithInputComponent: createFormWithInputComponentUnit});
});

describe("integration tests", () => {
    executeTests({createFormWithInputComponent: createFormWithInputComponentIntegration});
});