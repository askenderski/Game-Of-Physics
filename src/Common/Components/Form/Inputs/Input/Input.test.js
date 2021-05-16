import Input from "./Input";
import {mount} from "enzyme";
import InvalidInputTypeError from "./InvalidInputTypeError";
import style from "./Input.module.scss";
import getComponentFromType from "./typeToComponentMapping";
import FormContext from "../../FormContext";
import getInputPropsFromFormData from "./getInputPropsFromFormData";

jest.mock("./getInputPropsFromFormData", () => jest.fn());

const defaultInputType = "field";
const defaultInputElementType = getComponentFromType(defaultInputType);

const inputTypeDifferentFromDefault = "button";

const defaultContext = {props: {}};

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithPropGetterByInputType({inputType, ...rest}, context);
const renderInputWithPropGetterByInputType = (props, context=defaultContext) =>
    mount(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const getInputElementByWrapperWithProps = (wrapper, inputElementType=defaultInputElementType) => wrapper.find(inputElementType);
const getProp = (element, prop) => element.prop(prop);

function createFormWithInputComponentUnit({propsToPassManually, formProps}) {
    const name = "someName";
    const formValuesToBePassed = {};
    const inputType = inputTypeDifferentFromDefault;

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
    const inputType = inputTypeDifferentFromDefault;

    const input = renderInputWithPropGetter(
        {name, inputType: inputTypeDifferentFromDefault, ...propsToPassManually},
        formProps
    );
    const inputElement = getInputElementByWrapperWithProps(input, inputType);

    return {getProp: propName => getProp(inputElement, propName)};
}

const executeTests = ({createFormWithInputComponent}) => {
    describe("Input works correctly with specific type", () => {
        test("Input renders corresponding element when inputType field is given", () => {
            const input = renderInputWithPropGetter();

            expect(getInputElementByWrapperWithProps(input)).toHaveLength(1);
        });

        test("Input passes props to specific type correctly", () => {
            const propsToPass = {
                a: "a",
                b: "b"
            };

            const input = renderInputWithPropGetter(propsToPass);
            const inputElement = getInputElementByWrapperWithProps(input);

            Object.entries(propsToPass).forEach(([propName, propValue]) => {
                expect(getProp(inputElement, propName)).toBe(propValue);
            });
        });

        test("Input works with no name passed", () => {
            expect(renderInputWithPropGetter).not.toThrow();
        });

        test("Direct input props overwrite props gotten from form context", () => {
            const [formA, manuallyPassedA] = ["form a", "manual a"];
            const formProps = {values: {a: formA}};
            const propsToPassManually = {a: manuallyPassedA};

            const {getProp} = createFormWithInputComponent({propsToPassManually, formProps});

            expect(getProp("a")).toBe(manuallyPassedA);
        });

        test("Input passes className correctly to input of specific type", () => {
            const className = "someClassName";

            const wrapper = renderInputWithPropGetter({className});

            const inputElement = getInputElementByWrapperWithProps(wrapper);
            const classNamePassedToInput = getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(className);
        });

        test("Input passes default className correctly to input of specific type", () => {
            const wrapper = renderInputWithPropGetter();

            const inputElement = getInputElementByWrapperWithProps(wrapper);
            const classNamePassedToInput = getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(style.field);
        });
    });

    describe("Input works correctly with invalid inputType-s", () => {
        test("Input throws correct error when invalid inputType is given", () => {
            const renderInput = () => renderInputWithPropGetter({inputType: "invalidInputType"});

            expect(renderInput).toThrow(InvalidInputTypeError);
        });

        test("Input throws correct error when no inputType is given", () => {
            const renderInput = () => renderInputWithPropGetterByInputType({inputType: undefined});

            expect(renderInput).toThrow(InvalidInputTypeError);
        });
    });
};

describe("unit tests", () => {
    executeTests({createFormWithInputComponent: createFormWithInputComponentUnit});
});

describe("integration tests", () => {
    executeTests({createFormWithInputComponent: createFormWithInputComponentIntegration});
});