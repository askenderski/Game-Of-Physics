import style from "../../Input.module.scss";
import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";

export default function executeTests(
    {createFormWithInputComponent, renderInputComponentWithPropGetter}
    ) {
    describe("Input works correctly with specific type", () => {
        test("Input renders corresponding element when inputType field is given", () => {
            const {getInnerInputElement} = renderInputComponentWithPropGetter();

            expect(getInnerInputElement()).toHaveLength(1);
        });

        test("Input passes props to specific type correctly", () => {
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

        test("Input passes context to specific type correctly", () => {
            const formValue = "form a";
            const formProps = {value: formValue};

            const {getProp} = createFormWithInputComponent({propsToPassManually: {}, formProps});

            expect(getProp("value")).toBe(formValue);
        });

        test("Input works with no name passed", () => {
            expect(renderInputComponentWithPropGetter).not.toThrow();
        });

        test("Direct input props overwrite props gotten from form context", () => {
            const [formValue, manuallyPassedValue] = ["form a", "manual a"];
            const formProps = {value: formValue};
            const propsToPassManually = {value: manuallyPassedValue, name: "a"};

            const {getProp} = createFormWithInputComponent({propsToPassManually, formProps});

            expect(getProp("value")).toBe(manuallyPassedValue);
        });

        test("Input passes className correctly to input of specific type", () => {
            const className = "someClassName";

            const {getInnerInputElement} = renderInputComponentWithPropGetter({className});

            const inputElement = getInnerInputElement();
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(className);
        });

        test("Input passes default className correctly to input of specific type", () => {
            const {getInnerInputElement} = renderInputComponentWithPropGetter();

            const inputElement = getInnerInputElement();
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(style.input);
        });
    });
};