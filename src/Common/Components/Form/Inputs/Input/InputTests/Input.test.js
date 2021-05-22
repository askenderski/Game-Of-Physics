import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";
import getComponentFromType from "../typeToComponentMapping";
import executeTests from "./InputTests";
import executeGetInputPropsFromFormDataModuleTests
    from "../getInputPropsFromFormData/getInputPropsFromFormDataModuleTests";

jest.mock("../getInputPropsFromFormData/getInputPropsFromFormData", () => {
    return {
        __esModule: true,
        default: jest.fn(function (...props) {
            return jest.requireActual("../getInputPropsFromFormData/getInputPropsFromFormData")
                .default.call(this, ...props);
        })
    };
});

function getPropExtractorByFormData(formData, name, inputType) {
    const {getProp} =
        createFormWithInputComponentIntegration({
            propsToPassManually: {name, inputType}, formProps: formData
        });

    return {
        getValue() {
            return getProp("value");
        },
        changeValue(value) {
            getProp("onChange")({target: {value}});
        }
    };
}

function createFormWithInputComponentUnit({propsToPassManually, formProps}) {
    const name = propsToPassManually.name || "someName";
    const formValuesToBePassed = {};
    const inputType = propsToPassManually.inputType || InputTestsDataAndUtilities.inputTypeDifferentFromDefault;

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
    const name = propsToPassManually.name || "someName";
    const inputType = propsToPassManually.inputType || InputTestsDataAndUtilities.inputTypeDifferentFromDefault;
    const inputElementType = getComponentFromType(inputType);

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {name, inputType, ...propsToPassManually},
        formProps
    );
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputElementType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

describe('unit tests', () => {
    beforeEach(() => {
        getInputPropsFromFormData.mockImplementation(function () {
            return undefined;
        });
    });

    executeTests({
        createFormWithInputComponent: createFormWithInputComponentUnit,
        renderInputComponentWithPropGetter: (...args) => {
            const InputWithPropGetter = InputTestsDataAndUtilities.renderInputWithPropGetter(...args);

            return {getInnerInputElement: ()=>InputTestsDataAndUtilities.getInputElementByWrapperWithProps(InputWithPropGetter)};
        },
        renderInputComponentWithPropGetterWithoutDefaults: (...args) => {
            const InputWithPropGetter = InputTestsDataAndUtilities.renderInputWithPropGetterWithoutDefaults(...args);

            return {getInnerInputElement: ()=>InputTestsDataAndUtilities.getInputElementByWrapperWithProps(InputWithPropGetter)};
        }
    });
});

//This tests the integration of the Input component with the getInputPropsFromFormData function
describe('integration tests', () => {
    beforeEach(() => {
        getInputPropsFromFormData.mockImplementation(function (...props) {
            return jest.requireActual("../getInputPropsFromFormData/getInputPropsFromFormData")
                .default.call(this, ...props);
        });
    });

    describe("integration with all", () => {
        executeTests({
            createFormWithInputComponent: createFormWithInputComponentIntegration,
            renderInputComponentWithPropGetter: (...args) => {
                const InputWithPropGetter = InputTestsDataAndUtilities.renderInputWithPropGetter(...args);

                return {getInnerInputElement: ()=>InputTestsDataAndUtilities.getInputElementByWrapperWithProps(InputWithPropGetter)};
            },
            renderInputComponentWithPropGetterWithoutDefaults: (...args) => {
                const InputWithPropGetter = InputTestsDataAndUtilities.renderInputWithPropGetterWithoutDefaults(...args);

                return {getInnerInputElement: ()=>InputTestsDataAndUtilities.getInputElementByWrapperWithProps(InputWithPropGetter)};
            }
        });
    });

    describe("integration with getInputPropsFromFormData", () => {
        executeGetInputPropsFromFormDataModuleTests({getPropExtractorByFormData});
    });
});