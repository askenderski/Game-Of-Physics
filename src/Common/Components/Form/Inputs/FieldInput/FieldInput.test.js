import executeFieldInputComponentTests from "./FieldInputComponent/FieldInputComponentModuleTests";
import {render} from "@testing-library/react";
import FieldInput from "./FieldInput";
import {mount} from "enzyme";
import FormContext from "../../FormContext";
import executeGetFieldInputPropsFromFormDataTests
    from "./getFieldInputPropsFromFormData/getFieldInputPropsFromFormDataModuleTests";
import executeWithInputTests from "../Input/withInputTests/InputModuleTests";
import getFieldInputPropsFromFormData from "./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData";
import FieldInputComponent from "./FieldInputComponent/FieldInputComponent";
import executeUnitTests from "./FieldInputTests";

jest.mock("./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData",
    () => jest.fn().mockImplementation(function (...props) {
        return jest.requireActual("./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData")
            .default.call(this, ...props);
    })
);

beforeEach(()=> {
    getFieldInputPropsFromFormData.mockImplementation(function (...props) {
        return jest.requireActual("./getFieldInputPropsFromFormData/getFieldInputPropsFromFormData")
            .default.call(this, ...props);
    });
});

describe("unit tests", () => {
    const renderFieldInputWithPropGetter = ({propsToPassManually, formProps}) =>
        mount(<FormContext.Provider
            value={{values: {}, ...formProps}}><FieldInput {...propsToPassManually}/></FormContext.Provider>)
            .find(FieldInputComponent);

    function getFieldInputWithPropGetter({propsToPassManually = {}, formProps = {}, propsToReturnFromContext}) {
        const name = propsToPassManually.name || "someName";
        const contextPropsIdentifier = formProps.contextPropsIdentifier || {};

        getFieldInputPropsFromFormData.mockImplementation((contextPropsPassedToFieldInput, namePassedToFieldInput) => {
            if (
                contextPropsIdentifier === contextPropsPassedToFieldInput.contextPropsIdentifier
                && name === namePassedToFieldInput
            ) {
                return propsToReturnFromContext;
            }
        });

        const fieldInput = renderFieldInputWithPropGetter({
            propsToPassManually: {name, ...propsToPassManually},
            formProps: {contextPropsIdentifier, ...formProps}
        });

        return {executeOnChange: value => fieldInput.prop("onChange")({target: {value}})};
    }

    executeUnitTests({getFieldInputWithPropGetter});
});

const renderFieldInput = ({propsToPassManually, formProps}) => render(
    <FormContext.Provider value={{values: {}, ...formProps}}>
         <FieldInput {...propsToPassManually} />
     </FormContext.Provider>
);
const renderFieldInputWithPropGetter = ({propsToPassManually, formProps}) => mount(
    <FormContext.Provider value={{values: {}, ...formProps}}>
        <FieldInput {...propsToPassManually} />
    </FormContext.Provider>
);

describe("integration tests", () => {
    describe("integration with all", () => {
        executeUnitTests({
            getFieldInputWithPropGetter({propsToPassManually = {}, propsToReturnFromContext}) {
                const fieldInput = renderFieldInputWithPropGetter({
                    propsToPassManually,
                    formProps: {setFieldValue: (name, value) => propsToReturnFromContext.onChange(name, value)}
                });
                const onChange = fieldInput.find(FieldInputComponent).prop("onChange");

                return {executeOnChange: value => onChange({target: {value}})};
            }
        });
    });

    describe("integration with FieldInputComponent", () => {
        executeFieldInputComponentTests({
            getFieldInputWithPropGetter: props => {
                const fieldInput = renderFieldInputWithPropGetter({propsToPassManually: props});
                const innerInputElement = fieldInput.find("input");

                return {
                    doesInnerInputElementExist: () => innerInputElement.length === 1,
                    getPropInInnerInputElement: propName => innerInputElement.prop(propName)
                };
            },
            getFieldInput: ({value, ...rest}) => {
                const fieldInput = renderFieldInput({propsToPassManually: {value, ...rest}});

                return {outerElement: fieldInput};
            }
        });
    });

    describe("integration with getFieldInputPropsFromFormData", () => {
        executeGetFieldInputPropsFromFormDataTests({
            getPropExtractor(formProps, name) {
                const fieldInput = renderFieldInputWithPropGetter({formProps, propsToPassManually: {name}});
                const innerFieldInputComponentElement = fieldInput.find(FieldInputComponent);

                return {
                    executeOnChangeByValue(value) {
                        innerFieldInputComponentElement.prop("onChange")({target: {value}});
                    }
                };
            }
        });
    });

    describe("integration with withInput", () => {
        executeWithInputTests({
            createFormWithInputComponent({propsToPassManually = {}, formProps = {}} = {}) {
                const name = propsToPassManually.name || "someName";

                const input = renderFieldInputWithPropGetter({
                    propsToPassManually: {name, ...propsToPassManually},
                    formProps: {values: {[name]: formProps.value}}
                });
                const inputElement = input.find(FieldInputComponent);

                return {getProp: propName => inputElement.prop(propName)};
            },
            renderInputComponentWithPropGetter({propsToPassManually, formProps} = {}) {
                const inputWithPropGetter = renderFieldInputWithPropGetter({
                    propsToPassManually, formProps
                });

                return {getInnerInputElement: () => inputWithPropGetter.find(FieldInputComponent)};
            },
            renderInputComponentWithoutPropGetter(formData, name) {
                const input = renderFieldInput({
                    propsToPassManually: {"data-testid": "input", name}, formProps: formData
                });

                return {
                    isValueSameAs(value) {
                        return input.getByTestId("input").value === value;
                    },
                    innerInputElement: input.getByTestId("input")
                };
            }
        });
    });
});