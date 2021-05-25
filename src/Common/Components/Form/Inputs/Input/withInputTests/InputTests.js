import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";

export default function executeTests(
    {createFormWithInputComponent, renderInputComponentWithPropGetter}
    ) {
    describe("WithInput works correctly with specific type", () => {
        test("WithInput renders corresponding element when inputType field is given", () => {
            const {getInnerInputElement} = renderInputComponentWithPropGetter();

            expect(getInnerInputElement()).toHaveLength(1);
        });

        test("WithInput passes props to specific type correctly", () => {
            const propsToPassManually = {
                a: "a",
                b: "b"
            };

            const {getInnerInputElement} = renderInputComponentWithPropGetter({propsToPassManually});
            const inputElement = getInnerInputElement();

            Object.entries(propsToPassManually).forEach(([propName, propValue]) => {
                expect(InputTestsDataAndUtilities.getProp(inputElement, propName)).toBe(propValue);
            });
        });

        test("WithInput works with no name passed", () => {
            expect(
                renderInputComponentWithPropGetter.bind(renderInputComponentWithPropGetter, {propsToPassManually: {}})
            ).not.toThrow();
        });

        test("WithInput passes context props to specific type correctly", () => {
            const formValue = "form a";
            const formProps = {value: formValue};

            const {getProp} = createFormWithInputComponent({formProps});

            expect(getProp("value")).toBe(formValue);
        });

        test("Direct input props overwrite props gotten from form context", () => {
            const [formValue, manuallyPassedValue] = ["form a", "manual a"];
            const formProps = {value: formValue};
            const propsToPassManually = {value: manuallyPassedValue, name: "a"};

            const {getProp} = createFormWithInputComponent({propsToPassManually, formProps});

            expect(getProp("value")).toBe(manuallyPassedValue);
        });

        test("WithInput passes default props correctly to input of specific type", () => {
            const defaultProps = {a: "1", b: "2"};

            const {getInnerInputElement} = renderInputComponentWithPropGetter({options: {defaultProps}});

            const inputElement = getInnerInputElement();

            for (const defaultPropName in defaultProps) {
                const defaultPropPassedToInput = InputTestsDataAndUtilities.getProp(inputElement, defaultPropName);

                expect(defaultPropPassedToInput).toBe(defaultProps[defaultPropName]);
            }
        });

        test("Form props overwrite default props", () => {
            const [defaultValue, formValue] = ["default a", "form a"];
            const defaultProps = {value: defaultValue};
            const formProps = {value: formValue};

            const {getProp} = createFormWithInputComponent({defaultProps, formProps});

            expect(getProp("value")).toBe(formValue);
        });

        test("Direct input props overwrite default props", () => {
            const [defaultValue, manuallyPassedValue] = ["default a", "manual a"];
            const defaultProps = {value: defaultValue};
            const propsToPassManually = {value: manuallyPassedValue, name: "a"};

            const {getInnerInputElement} = renderInputComponentWithPropGetter({defaultProps, propsToPassManually});

            expect(InputTestsDataAndUtilities.getProp(getInnerInputElement(), "value")).toBe(manuallyPassedValue);
        });
    });
};