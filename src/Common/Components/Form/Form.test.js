import executeTests from "./FormTests";
import {mount} from "enzyme";
import Form from "./Form";
import {render} from "@testing-library/react";

const renderFormWithPropGetter = props => mount(<Form {...props}/>);
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

function getForm(props) {
    const form = renderForm(props);

    return form;
}

describe("unit tests", () => {
    executeTests({getFormWithPropGetter, getForm});
});