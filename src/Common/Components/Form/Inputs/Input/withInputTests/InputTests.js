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

        test("withInput passes default props correctly to input of specific type", () => {
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

        test("withInput passes type-specific form props correctly to input of specific type", () => {
            const typeSpecificFormProps = {a: "1", b: "2"};
            const formProps = {identifierOfFormData: "a"};
            const name = "name to use";

            const {getInnerInputElement} = renderInputComponentWithPropGetter({
                formProps,
                propsToPassManually: {name},
                options: {
                    getFormProps: (formDataInFormProps, nameInFormProps) => {
                        if (formDataInFormProps.identifierOfFormData === formProps.identifierOfFormData &&
                            nameInFormProps === name) {
                            return typeSpecificFormProps;
                        }

                        return {};
                    }
                }
            });

            const inputElement = getInnerInputElement();

            for (const typeSpecificFormPropName in typeSpecificFormProps) {
                const defaultPropPassedToInput = InputTestsDataAndUtilities.getProp(inputElement, typeSpecificFormPropName);

                expect(defaultPropPassedToInput).toBe(typeSpecificFormProps[typeSpecificFormPropName]);
            }
        });

        test("Type-specific form props overwrite generic form props", () => {
            const [typeSpecificValue, formValue] = ["type-specific a", "form a"];
            const typeSpecificFormProps = {value: typeSpecificValue};
            const formProps = {value: formValue};

            const {getProp} = createFormWithInputComponent({options: {getFormProps: ()=>typeSpecificFormProps}, formProps});

            expect(getProp("value")).toBe(typeSpecificValue);
        });

        test("Type-specific form props are overwritten by default props", () => {
            const [typeSpecificValue, defaultValue] = ["type-specific a", "default a"];
            const typeSpecificFormProps = {value: typeSpecificValue};
            const defaultProps = {value: defaultValue};

            const {getProp} =
                createFormWithInputComponent({options: {getFormProps: ()=>typeSpecificFormProps, defaultProps}});

            expect(getProp("value")).toBe(defaultValue);
        });

        test("Type-specific form props are overwritten by direct props", () => {
            const [typeSpecificValue, manuallyPassedValue] = ["type-specific a", "default a"];
            const typeSpecificFormProps = {value: typeSpecificValue};
            const propsToPassManually = {value: manuallyPassedValue};

            const {getProp} =
                createFormWithInputComponent({options: {getFormProps: ()=>typeSpecificFormProps}, propsToPassManually});

            expect(getProp("value")).toBe(manuallyPassedValue);
        });
    });
};