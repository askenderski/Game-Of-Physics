import executeTests from "./FieldInputTests";

export default ({getFieldInput, getFieldInputWithPropGetter}) => {
    describe("integration with all", () => {
        executeTests({getFieldInput, getFieldInputWithPropGetter});
    });
};