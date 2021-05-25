import ButtonInput from "./ButtonInput";
import {fireEvent, render} from "@testing-library/react";
import {mount} from "enzyme";
import executeButtonInputTests from "./ButtonInputTests";

const defaultButtonType = "input";

function getButtonInput(props = {}) {
    let numberOfClicks = 0;
    function WrapperComponent({type = defaultButtonType, ...rest}) {
        return <ButtonInput type={type} {...rest} onClick={e=>numberOfClicks++}/>;
    }

    const component = <WrapperComponent {...props} />;
    const buttonInput = renderButtonInput(component);
    const innerButtonElement = getInnerButtonElementByButtonInput(buttonInput);

    return {
        getNumberOfClicks: () => numberOfClicks,
        click: () => fireEvent.click(innerButtonElement)
    };
}

const renderButtonInput = buttonInput => render(buttonInput);
const getInnerButtonElementByButtonInput = buttonInput => buttonInput.getByLabelText("input");

function getButtonInputWithPropGetter(props, {expectedButtonType}={}) {
    const buttonInput = renderButtonInputWithPropGetter(props);
    const innerButtonElement = getInnerButtonElementByWrapperWithProps(buttonInput, expectedButtonType);

    return {
        doesInnerElementExist: () => innerButtonElement.length === 1,
        getInnerElementProp: prop => getProp(innerButtonElement, prop)
    };
}

//mount is used since shallow doesn't work with ComponentType gotten dynamically
const renderButtonInputWithPropGetter = ({type=defaultButtonType, ...rest}) =>
    mount(<ButtonInput type={type} {...rest}/>);
const getInnerButtonElementByWrapperWithProps = (wrapper, buttonType = defaultButtonType) =>
    wrapper.find(buttonType);

const getProp = (element, prop) => element.prop(prop);

describe("unit", ()=>{
    executeButtonInputTests({getButtonInput, getButtonInputWithPropGetter});
});