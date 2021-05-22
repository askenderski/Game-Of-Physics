import FieldInput from "./FieldInput";
import {shallow} from "enzyme";
import {fireEvent, render} from "@testing-library/react";
import executeTests from "./FieldInputTests";

describe("unit tests", () => {
    executeTests({
        getFieldInputWithPropGetter: props => {
            const fieldInput = shallow(<FieldInput {...props} />);
            const innerInputElement = fieldInput.find("input");

            return {
                fieldInput,
                doesInputElementExist: () => innerInputElement.length === 1,
                getPropInInnerInputElement: propName => innerInputElement.prop(propName)
            };
        },
        getFieldInput: ({value, ...rest}) => {
            const fieldInput = render(<FieldInput value={value} {...rest}/>);
            const innerInputElement = fieldInput.getByDisplayValue(value);

            return {changeValue: value => fireEvent.change(innerInputElement, {target: {value}})};
        }
    });
});