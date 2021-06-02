import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";

export default function executeTests(
    {createFormWithInputComponent, renderInputComponentWithPropGetter}
    ) {
    describe("withInput works correctly with specific type", () => {
        test("withInput renders corresponding element when inputType field is given", () => {
            const {getInnerInputElement} = renderInputComponentWithPropGetter();

            expect(getInnerInputElement()).toHaveLength(1);
        });

        test("withInput passes props to specific type correctly", () => {
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

        test("withInput works with no name passed", () => {
            expect(
                renderInputComponentWithPropGetter.bind(renderInputComponentWithPropGetter, {propsToPassManually: {}})
            ).not.toThrow();
        });

        test("withInput passes context props to specific type correctly", () => {
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
    });
};