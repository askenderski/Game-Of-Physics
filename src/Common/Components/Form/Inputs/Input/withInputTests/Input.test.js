import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";
import getInputPropsFromFormData from "../getInputPropsFromFormData/getInputPropsFromFormData";
import executeTests from "./InputTests";
import executeGetInputPropsFromFormDataModuleTests
    from "../getInputPropsFromFormData/getInputPropsFromFormDataModuleTests";
import {fireEvent} from "@testing-library/react";

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
    const input = createFormWithInputComponentIntegrationWithoutPropGetter({
        propsToPassManually: {name, inputType}, formProps: formData
    });

    return {
        isValueSameAs(value) {
            return input.isValueSameAs(value);
        },
        changeValue(value) {
            input.changeValue(value);
        }
    };
}

function createFormWithInputComponentUnit({propsToPassManually={}, formProps, options}={}) {
    const name = propsToPassManually.name || "someName";
    const inputType = propsToPassManually.inputType || InputTestsDataAndUtilities.defaultInputType;

    getInputPropsFromFormData.mockImplementationOnce((formData, curName, curInputType) => {
        if (name === curName && curInputType === inputType) {
            return formProps;
        }

        return {};
    });

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {
            propsToPassManually: {name, inputType, ...propsToPassManually},
            formProps,
            options
        });
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

function createFormWithInputComponentIntegrationWithPropGetter({propsToPassManually={}, formProps, options}={}) {
    const name = propsToPassManually.name || "someName";
    const inputType = propsToPassManually.inputType || InputTestsDataAndUtilities.defaultInputType;

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {
            propsToPassManually: {name, inputType, ...propsToPassManually},
            formProps: {values: {[name]: formProps.value}},
            options
        }
    );
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

function createFormWithInputComponentIntegrationWithoutPropGetter({propsToPassManually, formProps}) {
    const name = propsToPassManually.name || "someName";
    const inputType = propsToPassManually.inputType || InputTestsDataAndUtilities.defaultInputType;

    const input = InputTestsDataAndUtilities.renderInput(
        {name, inputType, "data-testid": "input", ...propsToPassManually},
        formProps
    );

    return {
        isValueSameAs: value => input.getByDisplayValue(value) !== undefined,
        changeValue: value => fireEvent.change(input.getByTestId("input"), {target: {value}})
    };
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
        }
    });
});

//This tests the integration of the WithInput component with the getInputPropsFromFormData function
describe('integration tests', () => {
    beforeEach(() => {
        getInputPropsFromFormData.mockImplementation(function (...props) {
            return jest.requireActual("../getInputPropsFromFormData/getInputPropsFromFormData")
                .default.call(this, ...props);
        });
    });

    describe("integration with all", () => {
        executeTests({
            createFormWithInputComponent: createFormWithInputComponentIntegrationWithPropGetter,
            renderInputComponentWithPropGetter: (...args) => {
                const InputWithPropGetter = InputTestsDataAndUtilities.renderInputWithPropGetter(...args);

                return {getInnerInputElement: ()=>
                        InputTestsDataAndUtilities.getInputElementByWrapperWithProps(InputWithPropGetter)};
            }
        });
    });

    describe("integration with getInputPropsFromFormData", () => {
        executeGetInputPropsFromFormDataModuleTests({getPropExtractorByFormData});
    });
});