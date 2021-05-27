import FieldInputComponent from "./FieldInputComponent";
import {shallow} from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import executeTests from "./FieldInputComponentTests";

const renderFieldInputComponentWithPropGetter = props => shallow(<FieldInputComponent {...props} />);
const getInnerInputElementByFieldInputComponent = fieldInputComponent => fieldInputComponent.find("input");
const getProp = (inputElement, propName) => inputElement.prop(propName);

describe("unit tests", () => {
    executeTests({
        getFieldInputWithPropGetter: props => {
            const fieldInput = renderFieldInputComponentWithPropGetter(props);
            const innerInputElement = getInnerInputElementByFieldInputComponent(fieldInput);

            return {
                doesInnerInputElementExist: () => innerInputElement.length === 1,
                getPropInInnerInputElement: propName => getProp(innerInputElement, propName)
            };
        },
        getFieldInput: ({value, ...rest}) => {
            const fieldInput = render(<FieldInputComponent value={value} {...rest}/>);
            const innerInputElement = fieldInput.getByDisplayValue(value);

            return {changeValue: value => fireEvent.change(innerInputElement, {target: {value}})};
        }
    });
});