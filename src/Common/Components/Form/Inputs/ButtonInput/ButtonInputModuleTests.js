import executeButtonInputTests from "./ButtonInputTests";

export default function getInputPropsFromFormDataModuleTests({getButtonInput, getButtonInputWithPropGetter}) {
    describe("ButtonInput tests", () => {
        executeButtonInputTests({getButtonInput, getButtonInputWithPropGetter});
    });
};