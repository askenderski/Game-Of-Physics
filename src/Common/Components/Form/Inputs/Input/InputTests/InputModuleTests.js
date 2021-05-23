import executeTests from "./InputTests";
import executeGetInputPropsFromFormDataModuleTests
    from "../getInputPropsFromFormData/getInputPropsFromFormDataModuleTests";

const executeModuleTests = () => {
    describe('Input tests', () => {
        describe("integration with all", () => {
            executeTests(
                {createFormWithInputComponent: ()=>throw new Error()}
            );
        });

        describe("integration with getInputPropsFromFormData", () => {
            executeGetInputPropsFromFormDataModuleTests(
                {getPropExtractorByFormData: ()=>throw new Error()}
                );
        });
    });
};

export default executeModuleTests;