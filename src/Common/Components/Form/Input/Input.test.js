import Input from "./Input";
import {shallow} from "enzyme";
import InvalidInputTypeError from "./InvalidInputTypeError";
import style from "./Input.module.scss";
import getComponentFromType from "./typeToComponentMapping";

const defaultInputType = "field";
const defaultInputElementType = getComponentFromType(defaultInputType);

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}) =>
    renderInputWithPropGetterByInputType({inputType, ...rest});
const renderInputWithPropGetterByInputType = props =>
    shallow(<Input {...props}/>);

const getInputElementByWrapperWithProps = (wrapper, inputElementType=defaultInputElementType) => wrapper.find(inputElementType);
const getProp = (element, prop) => element.prop(prop);

describe("Input works correctly with FieldInput", () => {
    test("Input returns FieldInput when inputType field is given", () => {
        const input = renderInputWithPropGetter();

        expect(getInputElementByWrapperWithProps(input)).toHaveLength(1);
    });

    test("Input passes props to FieldInput correctly", () => {
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

    test("Input passes className correctly to input", () => {
        const className = "someClassName";

        const wrapper = renderInputWithPropGetter({className});

        const inputElement = getInputElementByWrapperWithProps(wrapper);
        const classNamePassedToInput = getProp(inputElement, "className");

        expect(classNamePassedToInput).toBe(className);
    });

    test("Input passes default className correctly to input", () => {
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