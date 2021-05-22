export default ({getFieldInput, getFieldInputWithPropGetter}) => {
//Since FieldInput currently has no functionality other than to render the React input component, it is enough to show the
// input component is rendered, props are passed to it and show an example of functionality.
    test("FieldInput renders input component", () => {
        const {doesInputElementExist} = getFieldInputWithPropGetter();

        expect(doesInputElementExist()).toBe(true);
    });

    test("FieldInput passes props to input", () => {
        const [propName, propValue] = ["a", 1];
        const props = {[propName]: propValue};

        const {getPropInInnerInputElement} = getFieldInputWithPropGetter(props);

        expect(getPropInInnerInputElement(propName)).toBe(propValue);
    });

    test("FieldInput calls onChange correctly", () => {
        const value = "1";
        const fieldText = "a";

        let valueFromOnChange;
        const {changeValue} = getFieldInput({value: fieldText, onChange: e => valueFromOnChange = e.target.value});
        changeValue(value);

        expect(valueFromOnChange).toBe(value);
    });
};