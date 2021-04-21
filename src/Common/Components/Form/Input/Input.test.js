import Input from "./Input";
import FieldInput from "../FieldInput/FieldInput";
import {shallow} from "enzyme";
import InvalidInputTypeError from "./InvalidInputTypeError";

const renderFieldInputWithPropGetter = props => shallow(<Input {...props}/>);
const getFieldInputElementByWrapperWithProps = wrapper => wrapper.find(FieldInput);
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

        Object.entries(propsToPass).forEach(([propName, propValue]) => {
            expect(getProp(input, propName)).toBe(propValue);
        });
    });
});

describe("Input works correctly with invalid inputType-s", () => {
    test("Input throws correct error when invalid inputType is given", () => {
        const renderInput = () => renderFieldInputWithPropGetter({ inputType: "invalidInputType" });

        expect(renderInput).toThrow(InvalidInputTypeError);
    });
});