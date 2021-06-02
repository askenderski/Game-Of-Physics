import executeTests from "./InputTests";
import executeGetInputPropsFromFormDataModuleTests
    from "../getInputPropsFromFormData/getInputPropsFromFormDataModuleTests";

const executeModuleTests =
    ({createFormWithInputComponent, renderInputComponentWithPropGetter, renderInputComponentWithoutPropGetter}) => {
    describe('WithInput tests', () => {
        describe("integration with all", () => {
            executeTests({
                createFormWithInputComponent,
                renderInputComponentWithPropGetter
            });
        });

        describe("integration with getInputPropsFromFormData", () => {
            executeGetInputPropsFromFormDataModuleTests({
                getPropExtractorByFormData(formData, name) {
                    const {innerInputElement} = renderInputComponentWithoutPropGetter(formData, name);

                    return {
                        isValueSameAs(value) {
                            return innerInputElement.value === value;
                        }
                    };
                }
            });
        });
    });
};

export default executeModuleTests;