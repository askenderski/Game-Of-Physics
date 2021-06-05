export default ({getFieldInputWithPropGetter}) => {
    test("FieldInput gets correct form context props", () => {
        let correctOnChangeHasBeenCalled;

        const onChange = () => correctOnChangeHasBeenCalled = true;

        const {executeOnChange} = getFieldInputWithPropGetter({
            propsToReturnFromContext: {onChange}
        });

        executeOnChange();
        expect(correctOnChangeHasBeenCalled).toBe(true);
    });

    test("FieldInput direct props override form context props", () => {
        let correctOnChangeHasBeenCalled, contextOnChangeHasBeenCalled;

        const propsToPassManually = {onChange: () => correctOnChangeHasBeenCalled = true};
        const propsToReturnFromContext = {onChange: ()=>contextOnChangeHasBeenCalled = true};

        const {executeOnChange} = getFieldInputWithPropGetter({
            propsToPassManually,
            propsToReturnFromContext
        });

        executeOnChange();

        expect(correctOnChangeHasBeenCalled).toBe(true);
        expect(contextOnChangeHasBeenCalled).toBe(undefined);
    });
};