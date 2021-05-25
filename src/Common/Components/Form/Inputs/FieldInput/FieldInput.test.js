import FieldInput from "./FieldInput";
import {shallow} from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import executeTests from "./FieldInputTests";

const renderFieldInputWithPropGetter = props => shallow(<FieldInput {...props} />);
const getInnerInputElementByFieldInput = fieldInput => fieldInput.find("input");
const getProp = (inputElement, propName) => inputElement.prop(propName);

describe("unit tests", () => {
    executeTests({
        getFieldInputWithPropGetter: props => {
            const fieldInput = renderFieldInputWithPropGetter(props);
            const innerInputElement = getInnerInputElementByFieldInput(fieldInput);

            return {
                doesInnerInputElementExist: () => innerInputElement.length === 1,
                getPropInInnerInputElement: propName => getProp(innerInputElement, propName)
            };
        },
        getFieldInput: ({value, ...rest}) => {
            const fieldInput = render(<FieldInput value={value} {...rest}/>);
            const innerInputElement = fieldInput.getByDisplayValue(value);

            return {changeValue: value => fireEvent.change(innerInputElement, {target: {value}})};
        }
    });
});