function runTests({getPropExtractorByFormData}) {
    const defaultPropsForAllTests = { setFieldValue: () => {}, values: {} };

    const defaultInputType = "input";

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
}

export default runTests;