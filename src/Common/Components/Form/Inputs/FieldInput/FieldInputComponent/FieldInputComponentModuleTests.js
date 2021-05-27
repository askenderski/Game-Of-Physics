import executeTests from "./FieldInputComponentTests";

export default ({getFieldInput, getFieldInputWithPropGetter}) => {
    describe("integration with all", () => {
        executeTests({getFieldInput, getFieldInputWithPropGetter});
    });
};