export default ({getButtonInput, getButtonInputWithPropGetter}) => {
    test("ButtonInput has correct onClick functionality when clicked once", () => {
        const {getNumberOfClicks, click} = getButtonInput();
        click();

        expect(getNumberOfClicks()).toBe(1);
    });

    test("ButtonInput has correct onClick functionality when clicked multiple times", () => {
        const {click, getNumberOfClicks} = getButtonInput();
        click();
        click();

        expect(getNumberOfClicks()).toBe(2);
    });

    test("ButtonInput is disabled when disabled property is passed", () => {
        const {click, getNumberOfClicks} = getButtonInput({disabled: true});
        click();

        expect(getNumberOfClicks()).toBe(0);
    });

    test("ButtonInput passes unexpected props correctly to input", () => {
        const [propName, propValue] = ["unexpected", 1];

        const {getInnerElementProp} = getButtonInputWithPropGetter({[propName]: propValue});

        const buttonElementUnexpectedProp = getInnerElementProp(propName);

        expect(buttonElementUnexpectedProp).toBe(propValue);
    });

    test("ButtonInput renders input element with type if such is passed", () => {
        const type = "submit";
        const componentType = "input";

        const {doesInnerElementExist} = getButtonInputWithPropGetter({type}, {expectedButtonType: componentType});

        expect(doesInnerElementExist()).toBe(true);
    });

    test("ButtonInput passes correct type to input element when type is passed", () => {
        const type = "submit";
        const componentType = "input";

        const {getInnerElementProp} = getButtonInputWithPropGetter({type}, {expectedButtonType: componentType});

        expect(getInnerElementProp("type")).toBe(type);
    });
};