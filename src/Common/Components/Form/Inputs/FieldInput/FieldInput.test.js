import executeFieldInputComponentTests from "./FieldInputComponent/FieldInputComponentModuleTests";
import {render} from "@testing-library/react";
import FieldInput from "./FieldInput";
import {mount} from "enzyme";
import FormContext from "../../FormContext";
import executeGetFieldInputPropsFromFormDataTests from
        "./getFieldInputPropsFromFormData/getFieldInputPropsFromFormDataModuleTests";
import executeWithInputTests from "../Input/withInputTests/InputModuleTests";
import FieldInputComponent from "./FieldInputComponent/FieldInputComponent";

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