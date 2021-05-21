import ButtonInput from "./ButtonInput";
import {fireEvent, render} from "@testing-library/react";
import {mount} from "enzyme";

const defaultButtonType = "input";

const renderButtonInput = (props = {}) => {
    let numberOfClicks = 0;
    function WrapperComponent({type = defaultButtonType, ...rest}) {
        return <ButtonInput type={type} onClick={e=>numberOfClicks++} {...rest}/>;
    }

    const component = WrapperComponent(props);

    return {buttonInput: render(component), getNumberOfClicks: () => numberOfClicks};
}

const getButtonElementByButtonInput = buttonInput => buttonInput.getByLabelText("input");

//mount is used since shallow doesn't work with ComponentType gotten dynamically
const renderButtonInputWithPropGetter = ({type=defaultButtonType, ...rest}) =>
    mount(<ButtonInput type={type} {...rest}/>);
const getButtonElementByWrapperWithProps = (wrapper, buttonType = defaultButtonType) => wrapper.find(buttonType);
const getProp = (element, prop) => element.prop(prop);

test("ButtonInput has correct onClick functionality when clicked once", () => {
    const {buttonInput, getNumberOfClicks} = renderButtonInput();
    const buttonElement = getButtonElementByButtonInput(buttonInput);
    fireEvent.click(buttonElement);

    expect(getNumberOfClicks()).toBe(1);
});

test("ButtonInput has correct onClick functionality when clicked multiple times", () => {
    const {buttonInput, getNumberOfClicks} = renderButtonInput();
    const buttonElement = getButtonElementByButtonInput(buttonInput);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(getNumberOfClicks()).toBe(2);
});

test("ButtonInput is disabled when disabled property is passed", () => {
    const {buttonInput, getNumberOfClicks} = renderButtonInput({disabled: true});
    const buttonElement = getButtonElementByButtonInput(buttonInput);
    fireEvent.click(buttonElement);

    expect(getNumberOfClicks()).toBe(0);
});

test("ButtonInput passes unexpected props correctly to input", () => {
    const [propName, propValue] = ["unexpected", 1];

    const buttonInput = renderButtonInputWithPropGetter({[propName]: propValue});
    const buttonElement = getButtonElementByWrapperWithProps(buttonInput);

    const buttonElementUnexpectedProp = getProp(buttonElement, propName);

    expect(buttonElementUnexpectedProp).toBe(propValue);
});

test("ButtonInput renders input element with type if such is passed", () => {
    const type = "submit";
    const componentType = "input";

    const buttonInput = renderButtonInputWithPropGetter({type});
    const buttonElement = getButtonElementByWrapperWithProps(buttonInput, componentType);

    expect(buttonElement).toHaveLength(1);
});

test("ButtonInput passes correct type to input element when type is passed", () => {
    const type = "submit";
    const componentType = "input";

    const buttonInput = renderButtonInputWithPropGetter({type});
    const buttonElement = getButtonElementByWrapperWithProps(buttonInput, componentType);

    expect(getProp(buttonElement, "type")).toBe(type);
});