import FieldInput from "./FieldInput";
import {fireEvent, render} from "@testing-library/react";
import {useState} from "react";
import {shallow} from "enzyme";
import style from "./FieldInput.module.css";

const renderFieldInput = props => {
    function WrapperComponent({value, ...rest}) {
        const [state, setState] = useState(value);

        return <FieldInput onChange={e=>setState(e.target.value)} value={state} {...rest}/>;
    }

    return render(<WrapperComponent {...props}/>);
}
const getInputByValue = (fieldInput, value) => fieldInput.getByDisplayValue(value);
const getInputElementByFieldInput = fieldInput => fieldInput.getByLabelText("input");
const getValueByFieldInput = fieldInput => getInputElementByFieldInput(fieldInput).value;
const renderFieldInputWithPropGetter = props => shallow(<FieldInput {...props}/>);
const getInputElementByWrapperWithProps = wrapper => wrapper.find("input");
const getProp = (element, prop) => element.prop(prop);

test("FieldInput by default contains an empty string", () => {
    const fieldInput = renderFieldInput();

    expect(getValueByFieldInput(fieldInput)).toBe("");
});

test("FieldInput contains correct value", () => {
    const value = 1;

    const fieldInput = renderFieldInput({value});

    expect(getInputByValue(fieldInput, value)).toBeInTheDocument();
});

test("FieldInput changes value correctly", () => {
    const [oldValue, newValue] = [1, 2];

    const fieldInput = renderFieldInput({value: oldValue});
    const inputElement = getInputElementByFieldInput(fieldInput);
    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(getInputByValue(fieldInput, newValue)).toBeInTheDocument();
});

test("FieldInput passes unexpected props correctly to input", () => {
    const [propName, propValue] = ["unexpected", 1];

    const wrapper = renderFieldInputWithPropGetter({[propName]: propValue});

    const inputElement = getInputElementByWrapperWithProps(wrapper);
    const inputUnexpectedProp = getProp(inputElement, propName);

    expect(inputUnexpectedProp).toBe(propValue);
});

test("FieldInput passes className correctly to input", () => {
    const className = "someClassName";

    const wrapper = renderFieldInputWithPropGetter({className});

    const inputElement = getInputElementByWrapperWithProps(wrapper);
    const classNamePassedToInput = getProp(inputElement, "className");

    expect(classNamePassedToInput).toBe(className);
});

test("FieldInput passes default className of style.input correctly to input", () => {
    const expectedClassName = style.input;

    const wrapper = renderFieldInputWithPropGetter({});

    const inputElement = getInputElementByWrapperWithProps(wrapper);
    const classNamePassedToInput = getProp(inputElement, "className");

    expect(classNamePassedToInput).toBe(expectedClassName);
});