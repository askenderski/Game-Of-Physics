import executeTests, {formHasCorrectInitialValues, formRendersFormViewCorrectly} from "./FormTests";
import {mount} from "enzyme";
import Form from "./Form";
import {render} from "@testing-library/react";

const TestFormView = () => null;

const renderFormWithPropGetter = props => mount(<Form getFormView={()=><TestFormView/>} {...props}/>);
const renderForm = props => render(<Form {...props}/>);
const getElementByWrapperWithProps = (wrapper, element) => wrapper.find(element);

function getFormWithPropGetter(props) {
    const form = renderFormWithPropGetter(props);

    return {
        doesElementExistAsChild(el) {
            return getElementByWrapperWithProps(form, el).length === 1;
        }
    };
}

function getTestFormViewByWatchedValuesObject(watchedValues) {
    return (props) => {
        watchedValues.props = props;

        return null;
    };
}

function getFormToUse(props) {
    const watchedValues = {};

    const TestFormView = getTestFormViewByWatchedValuesObject(watchedValues);
    const getFormView = props => <TestFormView {...props}/>;

    const form = renderForm({getFormView, ...props});
    return {watchedValues, form: {unmount: form.unmount.bind(form)}};
}

describe("unit tests", () => {
    formRendersFormViewCorrectly({getFormWithPropGetter, formView: TestFormView});

    describe("form has no initial values by default", () => {
        formHasCorrectInitialValues({getFormToUse, initialValuesToPass: undefined, expectedInitialValues: {}});
    });
    describe("form passes initial values correctly", () => {
        formHasCorrectInitialValues({getFormToUse, initialValuesToPass: {a: 1, b: 2}, expectedInitialValues: {a: 1, b: 2}});
    });

    executeTests({getFormWithPropGetter, getFormToUse, formView: TestFormView});
});