import InvalidInputTypeError from "../InvalidInputTypeError";
import style from "../../Input.module.scss";
import InputTestsDataAndUtilities from "./InputTestsDataAndUtilities";

export default function executeTests({createFormWithInputComponent}) {
    describe("Input works correctly with specific type", () => {
        test("Input renders corresponding element when inputType field is given", () => {
            const input = InputTestsDataAndUtilities.renderInputWithPropGetter();

            expect(InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input)).toHaveLength(1);
        });

        test("Input passes props to specific type correctly", () => {
            const propsToPass = {
                a: "a",
                b: "b"
            };

            const input = InputTestsDataAndUtilities.renderInputWithPropGetter(propsToPass);
            const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(input);

            Object.entries(propsToPass).forEach(([propName, propValue]) => {
                expect(InputTestsDataAndUtilities.getProp(inputElement, propName)).toBe(propValue);
            });
        });

        test("Input works with no name passed", () => {
            expect(InputTestsDataAndUtilities.renderInputWithPropGetter).not.toThrow();
        });

        test("Direct input props overwrite props gotten from form context", () => {
            const [formA, manuallyPassedA] = ["form a", "manual a"];
            const formProps = {values: {a: formA}};
            const propsToPassManually = {a: manuallyPassedA, name: "a"};

            const {getProp} = createFormWithInputComponent({propsToPassManually, formProps});

            expect(getProp("a")).toBe(manuallyPassedA);
        });

        test("Input passes className correctly to input of specific type", () => {
            const className = "someClassName";

            const wrapper = InputTestsDataAndUtilities.renderInputWithPropGetter({className});

            const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(wrapper);
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(className);
        });

        test("Input passes default className correctly to input of specific type", () => {
            const wrapper = InputTestsDataAndUtilities.renderInputWithPropGetter();

            const inputElement = InputTestsDataAndUtilities.getInputElementByWrapperWithProps(wrapper);
            const classNamePassedToInput = InputTestsDataAndUtilities.getProp(inputElement, "className");

            expect(classNamePassedToInput).toBe(style.field);
        });
    });

    describe("Input works correctly with invalid inputType-s", () => {
        test("Input throws correct error when invalid inputType is given", () => {
            const renderInput = () => InputTestsDataAndUtilities.renderInputWithPropGetter({inputType: "invalidInputType"});

            expect(renderInput).toThrow(InvalidInputTypeError);
        });

        test("Input throws correct error when no inputType is given", () => {
            const renderInput = () => InputTestsDataAndUtilities.renderInputWithPropGetterByInputType({inputType: undefined});

            expect(renderInput).toThrow(InvalidInputTypeError);
        });
    });
};