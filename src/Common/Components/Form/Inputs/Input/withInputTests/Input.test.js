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
        inputType, propsToPassManually: {name}, formProps: formData
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

function createFormWithInputComponentUnit(
    {inputType=InputTestsDataAndUtilities.defaultInputType, propsToPassManually={}, formProps, options}={}
    ) {
    getInputPropsFromFormData.mockImplementationOnce(() => formProps);

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {
            inputType,
            propsToPassManually,
            formProps,
            options
        });
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

function createFormWithInputComponentIntegrationWithPropGetter(
    {inputType=InputTestsDataAndUtilities.defaultInputType, propsToPassManually={}, formProps, options}={}
    ) {
    const name = propsToPassManually.name || "someName";

    const input = InputTestsDataAndUtilities.renderInputWithPropGetter(
        {
            inputType,
            propsToPassManually: {name, ...propsToPassManually},
            formProps: {values: {[name]: formProps.value}},
            options
        }
    );
    const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => InputTestsDataAndUtilities.getProp(inputElement, propName)};
}

function createFormWithInputComponentIntegrationWithoutPropGetter(
    {inputType=InputTestsDataAndUtilities.defaultInputType, propsToPassManually, formProps, options}
    ) {
    const input = InputTestsDataAndUtilities.renderInput(
        {
            propsToPassManually: {"data-testid": "input", ...propsToPassManually},
            inputType,
            formProps,
            options
        }
    );

    return {
        isValueSameAs: value => input.getByTestId("input").value === value,
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