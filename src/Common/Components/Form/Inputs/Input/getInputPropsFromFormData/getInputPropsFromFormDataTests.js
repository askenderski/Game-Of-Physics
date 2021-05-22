function runTests({getPropExtractorByFormData}) {
    const defaultPropsForAllTests = {
        setFieldValue: () => {
        },
        values: {}
    };

    const defaultInputType = "field";

    test("field input extracts correct value", () => {
        const inputName = "a";

        const value = "some value";

        const propExtractor = getPropExtractorByFormData({
            ...defaultPropsForAllTests,
            values: {
                [inputName]: value
            }
        }, inputName, defaultInputType);

        expect(propExtractor.isValueSameAs(value)).toBe(true);
    });

    describe("field input", () => {
        const defaultPropsForFieldTests = {...defaultPropsForAllTests};
        const inputType = "field";

        test("field input works correctly with changing value", () => {
            let curValue;
            const fieldName = "a";

            const newValue = "some new value";

            const propExtractor = getPropExtractorByFormData({
                ...defaultPropsForFieldTests,
                setFieldValue: (fieldNameToChange, value) => {
                    if (fieldNameToChange === fieldName) curValue = value;
                }
            }, fieldName, inputType);

            propExtractor.changeValue(newValue);

            expect(curValue).toBe(newValue);
        });
    });
}

export default runTests;