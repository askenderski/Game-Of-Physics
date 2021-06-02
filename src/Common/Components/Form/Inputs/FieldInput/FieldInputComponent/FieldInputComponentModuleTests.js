import executeTests from "./FieldInputComponentTests";
import {fireEvent} from "@testing-library/react";

export default ({getFieldInput, getFieldInputWithPropGetter}) => {
    describe("integration with all", () => {
        executeTests({
            getFieldInput: ({value, ...rest}) => {
                const {outerElement} = getFieldInput({value, ...rest});
                const innerInputElement = outerElement.getByDisplayValue(value);

                return {changeValue: value => fireEvent.change(innerInputElement, {target: {value}})};
            },
            getFieldInputWithPropGetter
        });
    });
};