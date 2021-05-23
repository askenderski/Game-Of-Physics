import style from "../../Input.module.scss";
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
            const propsToPass = {
                a: "a",
                b: "b"
            };

            const {getInnerInputElement} = renderInputComponentWithPropGetter(propsToPass);
            const inputElement = getInnerInputElement();

            Object.entries(propsToPass).forEach(([propName, propValue]) => {
                expect(InputTestsDataAndUtilities.getProp(inputElement, propName)).toBe(propValue);
            });
        });

        test("WithInput passes context to specific type correctly", () => {
            const formValue = "form a";
            const formProps = {value: formValue};

            const {getProp} = createFormWithInputComponent({propsToPassManually: {}, formProps});

            expect(getProp("value")).toBe(formValue);
        });

        test("WithInput works with no name passed", () => {
            expect(renderInputComponentWithPropGetter).not.toThrow();
        });

        test("Direct input props overwrite props gotten from form context", () => {
            const [formValue, manuallyPassedValue] = ["form a", "manual a"];
            const formProps = {value: formValue};
            const propsToPassManually = {value: manuallyPassedValue, name: "a"};

            const {getProp} = createFormWithInputComponent({propsToPassManually, formProps});

            expect(getProp("value")).toBe(manuallyPassedValue);
        });

        test("WithInput passes className correctly to input of specific type", () => {
            const className = "someClassName";

            const {getInnerInputElement} = renderInputComponentWithPropGetter({className});

            const inputElement = getInnerInputElement();
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(className);
        });

        test("WithInput passes default className correctly to input of specific type", () => {
            const {getInnerInputElement} = renderInputComponentWithPropGetter();

            const inputElement = getInnerInputElement();
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(style.input);
        });
    });
};