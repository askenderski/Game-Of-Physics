import ButtonInput from "./ButtonInput";
import {fireEvent, render} from "@testing-library/react";
import {mount} from "enzyme";
import ButtonInputTests from "./ButtonInputTests";

const defaultButtonType = "input";

function getButtonInput(props = {}) {
    let numberOfClicks = 0;
    function WrapperComponent({type = defaultButtonType, ...rest}) {
        return <ButtonInput type={type} onClick={e=>numberOfClicks++} {...rest}/>;
    }

    const component = <WrapperComponent {...props} />;
    const buttonInput = render(component);
    const buttonElement = getButtonElementByButtonInput(buttonInput);

    return {
        getNumberOfClicks: () => numberOfClicks, click: ()=>fireEvent.click(buttonElement)
    };
}

const getButtonElementByButtonInput = buttonInput => buttonInput.getByLabelText("input");

function getButtonInputWithPropGetter(props, {expectedButtonType}={}) {
    const buttonInput = renderButtonInputWithPropGetter(props);
    const buttonElement = getButtonElementByWrapperWithProps(buttonInput, expectedButtonType);

    return {
        doesInnerElementExist: () => buttonElement.length === 1,
        getInnerElementProp: prop => getProp(buttonElement, prop)
    };
}

//mount is used since shallow doesn't work with ComponentType gotten dynamically
const renderButtonInputWithPropGetter = ({type=defaultButtonType, ...rest}) =>
    mount(<ButtonInput type={type} {...rest}/>);
const getButtonElementByWrapperWithProps = (wrapper, buttonType = defaultButtonType) => wrapper.find(buttonType);

const getProp = (element, prop) => element.prop(prop);

describe("unit", ()=>{
    ButtonInputTests({getButtonInput, getButtonInputWithPropGetter});
});