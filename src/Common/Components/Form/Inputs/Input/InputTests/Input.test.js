import {executeIntegrationTests, executeUnitTests} from "./InputModuleTests";

describe("unit tests", () => {
    executeUnitTests();
});

//This tests the integration of the Input component with the getInputPropsFromFormData function
describe("integration tests", () => {
    executeIntegrationTests();
});