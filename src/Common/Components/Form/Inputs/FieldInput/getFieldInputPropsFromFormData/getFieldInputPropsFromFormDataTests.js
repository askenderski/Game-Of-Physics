const executeTests = ({getPropExtractor}) => {
    test("getFieldInputPropsFromFormDataTests gets correct onChange", () => {
        const fieldName = "name of field";
        let hasInvokedSetFieldValueWithCorrectParams = false;
        const valueToCallOnChangeWith = "some value";

        const propExtractor = getPropExtractor({
            setFieldValue: (name, value) => {
                if (name === fieldName && value === valueToCallOnChangeWith) {
                    hasInvokedSetFieldValueWithCorrectParams = true;
                }
            }
        }, fieldName);

        propExtractor.executeOnChangeByValue(valueToCallOnChangeWith);

        expect(hasInvokedSetFieldValueWithCorrectParams).toBe(true);
    });
};

export default executeTests;