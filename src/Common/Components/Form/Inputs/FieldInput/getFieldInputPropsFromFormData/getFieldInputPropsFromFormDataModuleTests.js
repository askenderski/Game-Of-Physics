import executeTests from "./getFieldInputPropsFromFormDataTests";

const executeModuleTests = ({getPropExtractor}) =>
    describe('integration with all', () => {
        executeTests({getPropExtractor})
    });

export default executeModuleTests;