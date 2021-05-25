import getFieldInputPropsFromFormData from "./getFieldInputPropsFromFormData";

const executeTests = () => {
    test("getFieldInputPropsFromFormDataTests gets correct onChange", () => {
        const fieldName = "name of field";
        let hasInvokedSetFieldValueWithCorrectParams = false;
        const valueToCallOnChangeWith = "some value";

        const fieldInputProps = getFieldInputPropsFromFormData({
            setFieldValue: (name, value) => {
                if (name === fieldName && value === valueToCallOnChangeWith) {
                    hasInvokedSetFieldValueWithCorrectParams = true;
                }
            }
        }, fieldName);

        fieldInputProps.onChange({target: {value: valueToCallOnChangeWith}});

        expect(hasInvokedSetFieldValueWithCorrectParams).toBe(true);
    });
};

export default executeTests;