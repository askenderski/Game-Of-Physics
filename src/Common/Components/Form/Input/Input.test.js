import Input from "./Input";
import {mount} from "enzyme";
import InvalidInputTypeError from "./InvalidInputTypeError";
import style from "./Input.module.scss";
import getComponentFromType from "./typeToComponentMapping";
import FormContext from "../FormContext";

const defaultInputType = "field";
const defaultInputElementType = getComponentFromType(defaultInputType);

const defaultContext = {props: {}};

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithPropGetterByInputType({inputType, ...rest}, context);
const renderInputWithPropGetterByInputType = (props, context=defaultContext) =>
    mount(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const getInputElementByWrapperWithProps = (wrapper, inputElementType=defaultInputElementType) => wrapper.find(inputElementType);
const getProp = (element, prop) => element.prop(prop);

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

    test("Input passes form values to specific input type correctly", () => {
        const name = "someName";
        const formValuesToBePassed = {
            props: {
                [name]: {
                    a: 1,
                    b: 2
                }
            }
        };

        const input = renderInputWithPropGetter({name}, formValuesToBePassed);
        const inputElement = getInputElementByWrapperWithProps(input);

        Object.entries(formValuesToBePassed.props[name]).forEach(([propName, propValue]) => {
            expect(getProp(inputElement, propName)).toBe(propValue);
        });
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
        const renderInput = () => renderInputWithPropGetter({ inputType: "invalidInputType" });

        expect(renderInput).toThrow(InvalidInputTypeError);
    });

    test("Input throws correct error when no inputType is given", () => {
        const renderInput = () => renderInputWithPropGetterByInputType({ inputType: undefined });

        expect(renderInput).toThrow(InvalidInputTypeError);
    });
});