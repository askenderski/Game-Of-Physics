import getInputPropsFromFormData from "./getInputPropsFromFormData";

const defaultPropsForAllTests = {
    setFieldValue: () => {},
    values: {}
};

const defaultInputType = "field";

test("field input extracts correct value", () => {
    const inputName = "a";

    const value = "some value";

    const props = getInputPropsFromFormData({
        ...defaultPropsForAllTests,
        values: {
            [inputName]: value
        }
    }, inputName, defaultInputType);

    expect(props.value).toBe(value);
});

describe("field input", () => {
    const defaultPropsForFieldTests = {...defaultPropsForAllTests};
    const inputType = "field";

    test("field input works correctly with changing value", () => {
        let curValue;
        const fieldName = "a";

        const newValue = "some new value";

        const props = getInputPropsFromFormData({
            ...defaultPropsForFieldTests,
            setFieldValue: (fieldNameToChange, value) => {
                if (fieldNameToChange === fieldName) curValue = value;
            }
        }, fieldName, inputType);

        props.onChange({target: {value: newValue}});

        expect(curValue).toBe(newValue);
    });
});