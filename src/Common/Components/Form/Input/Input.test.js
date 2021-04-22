import Input from "./Input";
import {shallow} from "enzyme";
import InvalidInputTypeError from "./InvalidInputTypeError";
import style from "./Input.module.scss";

const renderFieldInputWithPropGetter = props => shallow(<Input {...props}/>);
const getFieldInputElementByWrapperWithProps = wrapper => wrapper.find("input");
const getProp = (element, prop) => element.prop(prop);

describe("Input works correctly with FieldInput", () => {
    test("Input returns FieldInput when inputType field is given", () => {
        const input = renderFieldInputWithPropGetter({inputType: "field"});

        expect(getFieldInputElementByWrapperWithProps(input)).toHaveLength(1);
    });

    test("Input passes props to FieldInput correctly", () => {
        const propsToPass = {
            a: "a",
            b: "b"
        };

        const input = renderFieldInputWithPropGetter({ ...propsToPass, inputType: "field" });
        const fieldInput = getFieldInputElementByWrapperWithProps(input);

        Object.entries(propsToPass).forEach(([propName, propValue]) => {
            expect(getProp(fieldInput, propName)).toBe(propValue);
        });
    });

    test("Input passes className correctly to input", () => {
        const className = "someClassName";

        const wrapper = renderFieldInputWithPropGetter({className, inputType: "field"});

        const inputElement = getFieldInputElementByWrapperWithProps(wrapper);
        const classNamePassedToInput = getProp(inputElement, "className");

        expect(classNamePassedToInput).toBe(className);
    });

    test("Input passes default className correctly to input", () => {
        const wrapper = renderFieldInputWithPropGetter({inputType: "field"});

        const inputElement = getFieldInputElementByWrapperWithProps(wrapper);
        const classNamePassedToInput = getProp(inputElement, "className");

        expect(classNamePassedToInput).toBe(style.field);
    });
});

describe("Input works correctly with invalid inputType-s", () => {
    test("Input throws correct error when invalid inputType is given", () => {
        const renderInput = () => renderFieldInputWithPropGetter({ inputType: "invalidInputType" });

        expect(renderInput).toThrow(InvalidInputTypeError);
    });
});