import {act, cleanup} from "@testing-library/react";
import * as sleepModule from "../../Utilities/sleep";
import Promise from "../../DataTypes/Promise";

jest.mock("../../Utilities/sleep", () => {
    const originalSleepModule = jest.requireActual("../../Utilities/sleep");

    return {
        __esModule: true,
        ...originalSleepModule,
        default: jest.fn()
    };
});

function formRendersFormViewCorrectly({getFormWithPropGetter}) {
    describe("Form renders correctly", () => {
        test("Form renders formView correctly", () => {
            const TestFormView = () => null;
            const getFormView = () => <TestFormView/>;

            const {doesElementExistAsChild} = getFormWithPropGetter({getFormView});

            expect(doesElementExistAsChild(TestFormView)).toBe(true);
        });
    });
}

function formDealsWithValuesCorrectly({getFormToUse}) {
    describe("Form has correct values and changes them correctly", () => {
        test("Form has no values by default", () => {
            const {watchedValues} = getFormToUse();

            expect(watchedValues.props.values).toEqual({});
        });

        test("Form has initial values by default if such are passed", () => {
            const initialValues = {a: 1, b: "b"};
            const {watchedValues} = getFormToUse({initialValues});

            Object.entries(initialValues).forEach(([propKey, propValue]) => {
                expect(watchedValues.props.values[propKey]).toBe(propValue);
            });
        });

        test("Form sets one value correctly", async () => {
            const [valueName, value] = ["a", "a"];
            const {watchedValues} = getFormToUse();

            await act(async () => watchedValues.props.handleChangeByName(valueName, value));

            expect(watchedValues.props.values).toEqual({[valueName]: value});
        });

        test("Form sets value correctly over initial value", async () => {
            const [initialValueName, initialValue, valueSet] = ["a", 1, 2];

            const {watchedValues} = getFormToUse({[initialValueName]: initialValue});

            await act(async () => watchedValues.props.handleChangeByName(initialValueName, valueSet));

            expect(watchedValues.props.values).toEqual({[initialValueName]: valueSet});
        });

        test("Form sets one field's value correctly multiple times", async () => {
            const [valueName, value1, value2] = ["a", "a1", "a2"];
            const {watchedValues} = getFormToUse();

            await act(async () => watchedValues.props.handleChangeByName(valueName, value1));
            await act(async () => watchedValues.props.handleChangeByName(valueName, value2));

            expect(watchedValues.props.values).toEqual({[valueName]: value2});
        });

        test("Form sets multiple fields' values correctly", async () => {

            const [value1Name, value1] = ["a", "a"];
            const [value2Name, value2] = ["b", "b"];

            const {watchedValues} = getFormToUse();

            await act(async () => watchedValues.props.handleChangeByName(value1Name, value1));
            await act(async () => watchedValues.props.handleChangeByName(value2Name, value2));

            expect(watchedValues.props.values).toEqual({[value1Name]: value1, [value2Name]: value2});
        });

        test("Form fields are not set as touched by default", async () => {
            const initialValues = {a: "a", b: "b"};

            const {watchedValues} = getFormToUse({initialValues});

            for (const field in watchedValues.props.touched) {
                expect(watchedValues.props.touched[field]).not.toBeTruthy();
            }
        });

        test("Form field is set as touched when its value is changed", async () => {
            const [propName, propValue] = ["a", 1];

            const initialValues = {[propName]: propValue};

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propName, propValue));

            expect(watchedValues.props.touched[propName]).toBeTruthy();

            const touchedCopy = {...watchedValues.props.touched};
            touchedCopy[propName] = undefined;

            for (const field in touchedCopy) {
                expect(touchedCopy[field]).not.toBeTruthy();
            }
        });

        test("Form field does not affect other fields' touched status when its value is changed", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];
            const [propToRemainUnchangedName, propToRemainUnchangedValue] = ["b", 2];

            const initialValues = {
                [propToChangeName]: propToChangeValue,
                [propToRemainUnchangedName]: propToRemainUnchangedValue
            };

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
            expect(watchedValues.props.touched[propToRemainUnchangedName]).not.toBeTruthy();
        });

        test("Form field does not change its own touched status when its value is changed multiple times", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];

            const initialValues = {[propToChangeName]: propToChangeValue};

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));
            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
        });

        test("Form field does not change other fields' touched status when its value is changed multiple times", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];
            const [propToRemainUnchangedName, propToRemainUnchangedValue] = ["b", 2];

            const initialValues = {
                [propToChangeName]: propToChangeValue,
                [propToRemainUnchangedName]: propToRemainUnchangedValue
            };

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));
            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
            expect(watchedValues.props.touched[propToRemainUnchangedName]).not.toBeTruthy();
        });

        test("Form field is set as touched when it's focused on", async () => {
            const [propName, propValue] = ["a", 1];

            const initialValues = {[propName]: propValue};

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.focusOn(propName));

            expect(watchedValues.props.touched[propName]).toBeTruthy();

            const touchedCopy = {...watchedValues.props.touched};
            touchedCopy[propName] = undefined;

            for (const field in touchedCopy) {
                expect(touchedCopy[field]).not.toBeTruthy();
            }
        });

        test("Form field does not affect other fields' touched status when it's focused on", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];
            const [propToRemainUnchangedName, propToRemainUnchangedValue] = ["b", 2];

            const initialValues = {
                [propToChangeName]: propToChangeValue,
                [propToRemainUnchangedName]: propToRemainUnchangedValue
            };

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.focusOn(propToChangeName));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
            expect(watchedValues.props.touched[propToRemainUnchangedName]).not.toBeTruthy();
        });

        test("Form field does not change its own touched status when it's focused on multiple times", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];

            const initialValues = {[propToChangeName]: propToChangeValue};

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.focusOn(propToChangeName, propToChangeValue));
            await act(async () => watchedValues.props.focusOn(propToChangeName, propToChangeValue));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
        });

        test("Form field does not change other fields' touched status when it's focused on multiple times", async () => {
            const [propToChangeName, propToChangeValue] = ["a", 1];
            const [propToRemainUnchangedName, propToRemainUnchangedValue] = ["b", 2];

            const initialValues = {
                [propToChangeName]: propToChangeValue,
                [propToRemainUnchangedName]: propToRemainUnchangedValue
            };

            const {watchedValues} = getFormToUse({initialValues});

            await act(async () => watchedValues.props.focusOn(propToChangeName, propToChangeValue));
            await act(async () => watchedValues.props.focusOn(propToChangeName, propToChangeValue));

            expect(watchedValues.props.touched[propToChangeName]).toBeTruthy();
            expect(watchedValues.props.touched[propToRemainUnchangedName]).not.toBeTruthy();
        });
    });
}

function formErrorsWorkCorrectly({getFormToUse, updateForm}) {
    describe("Form errors work correctly", () => {
        //TODO: extract this into a file, since sleep.test.js also uses it
        async function advanceTimersAndWaitForPromisesToResolve(time) {
            return act(async () => {
                jest.advanceTimersByTime(time);
            });
        }

        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.clearAllTimers();
            jest.useRealTimers();
        });

        const timeToWaitBeforeRenderingErrors = 100;
        const notEnoughTimeForErrorsToBeRendered = timeToWaitBeforeRenderingErrors - 1;
        const enoughTimeForErrorsToBeRendered = timeToWaitBeforeRenderingErrors + 1;

        const getFormWithDefaultTime = (props = {}) => getFormToUse({time: timeToWaitBeforeRenderingErrors, ...props});

        test("Form has no errors by default", () => {
            const [propName, propValue] = ["a", 1];

            const {watchedValues} = getFormWithDefaultTime({initialValues: {[propName]: propValue}});

            expect(watchedValues.props.errors).toEqual({[propName]: []});
        });

        test("Form has no errors immediately after a field's value is changed", async () => {
            const [propToChangeName, propToChangeValue] = ["b", 2];
            const initialValues = {[propToChangeName]: propToChangeValue};

            const {watchedValues} = getFormWithDefaultTime({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propToChangeName]: []});
        });

        test("Form has no errors when not enough time has passed after a field's value is changed", async () => {
            const [propToChangeName, propToChangeValue] = ["b", 2];
            const initialValues = {[propToChangeName]: propToChangeValue};

            const {watchedValues} = getFormWithDefaultTime({initialValues});

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeValue));

            await advanceTimersAndWaitForPromisesToResolve(notEnoughTimeForErrorsToBeRendered);
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propToChangeName]: []});
        });

        jest.setTimeout(10000000000);

        test("Form has correct errors when enough time passes after a field's value is changed", async () => {
            const [propToChangeName, propToChangeValue, newValue] = ["a", 1, 2];

            const propErrors = ["Some error"];

            const propValidator = () => propErrors;

            const initialValues = {[propToChangeName]: propToChangeValue};
            const {watchedValues} = getFormWithDefaultTime({
                initialValues,
                validators: {[propToChangeName]: propValidator}
            });

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, newValue));

            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propToChangeName]: propErrors});
        });

        test("Form has no errors when a field's value is changed multiple times without waiting enough time between inputs or after", async () => {
            const [propToChangeName, propToChangeOriginalValue, valueToChange1, valueToChange2] = ["a", 1, 2, 3];
            const propErrors = ["Some error"];
            //There shouldn't be enough time between inputs for the errors to render, but there should be enough time for
            //the errors to appear if for some reason the form does not stop the validation when new input is given
            const notEnoughTimeForErrorsToRenderButMoreThanHalfOfEnoughTimeForErrorsToRender =
                timeToWaitBeforeRenderingErrors / 2 + 1;

            const propValidator = () => propErrors;

            const initialValues = {[propToChangeName]: propToChangeOriginalValue};

            const {watchedValues} = getFormWithDefaultTime({
                initialValues,
                validators: {[propToChangeName]: propValidator}
            });

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, valueToChange1));
            await advanceTimersAndWaitForPromisesToResolve(notEnoughTimeForErrorsToRenderButMoreThanHalfOfEnoughTimeForErrorsToRender);
            await updateForm();

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, valueToChange2));
            await advanceTimersAndWaitForPromisesToResolve(notEnoughTimeForErrorsToRenderButMoreThanHalfOfEnoughTimeForErrorsToRender);
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propToChangeName]: []});
        });

        test("Form has correct errors when a field's value is changed multiple times without waiting enough time between inputs, but enough time passes after", async () => {
            const [propToChangeName, propToChangeOriginalValue, valueToChange1, valueToChange2] = ["a", 1, 2, 3];
            const propErrors = ["Some error"];

            const propValidator = () => propErrors;

            const initialValues = {[propToChangeName]: propToChangeOriginalValue};

            const {watchedValues} = getFormWithDefaultTime({
                initialValues,
                validators: {[propToChangeName]: propValidator}
            });

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, valueToChange1));
            await advanceTimersAndWaitForPromisesToResolve(notEnoughTimeForErrorsToBeRendered);
            await updateForm();

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, valueToChange2));
            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propToChangeName]: propErrors});
        });

        test("Form has correct errors when enough time passes after a field is focused on without input", async () => {
            const [propName, propValue] = ["a", 1];

            const propErrors = ["Some error"];

            const propValidator = () => propErrors;

            const initialValues = {[propName]: propValue};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.focusOn(propName));

            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);
            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        test("Form immediately validates errors after field is blurred", async () => {
            const [propName, propValue] = ["a", 1];

            const propErrors = ["Some error"];

            const propValidator = () => propErrors;

            const initialValues = {[propName]: propValue};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.focusOn(propName));
            await act(async () => watchedValues.props.removeFocusFrom(propName));

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        test("Form validates correct value on focusing and waiting enough time", async () => {
            const [propName, invalidValue] = ["a", 1];

            const propErrors = ["Some error"];

            const propValidator = val => val === invalidValue ? propErrors : [];

            const initialValues = {[propName]: invalidValue};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.focusOn(propName));
            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        test("Form validates correct value on blurring", async () => {
            const [propName, validValue, invalidValue] = ["a", 1, 2];

            const propErrors = ["Some error"];

            const propValidator = val => val === invalidValue ? propErrors : [];

            const initialValues = {[propName]: validValue};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.handleChangeByName(propName, invalidValue));
            await act(async () => watchedValues.props.removeFocusFrom(propName));

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        test("Form validates correct value when changing input", async () => {
            const [propName, validValue, invalidValue] = ["a", 1, 2];

            const propErrors = ["Some error"];

            const propValidator = val => val === invalidValue ? propErrors : [];

            const initialValues = {[propName]: validValue};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.handleChangeByName(propName, invalidValue));
            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        test("Form validates correct value when changing input multiple times", async () => {
            const [propName, validValue1, validValue2, invalidValue] = ["a", 1, 2, 3];

            const propErrors = ["Some error"];

            const propValidator = val => val === invalidValue ? propErrors : [];

            const initialValues = {[propName]: validValue1};
            const {watchedValues} = getFormWithDefaultTime({initialValues, validators: {[propName]: propValidator}});

            await act(async () => watchedValues.props.handleChangeByName(propName, validValue2));
            await act(async () => watchedValues.props.handleChangeByName(propName, invalidValue));
            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[propName]: propErrors});
        });

        //The motivation for this test is that there may be fields which do not have a concept of blurring or which do not
        // need to be validated at the usual DOM blur events. This way field1 may be changed and then field2 without the
        // validation happening immediately upon blurring, but rather when enough time after the inputs pass. This is why
        // the test is needed - to make sure that all fields will be validated and not just the last edited one.
        test("Form validates multiple fields' values when changed in succession (without any of the fields' having focus lost)", async () => {
            const [prop1Name, prop1DefaultValue, prop1NewValue] = ["a", 1, 2];
            const [prop2Name, prop2DefaultValue, prop2NewValue] = ["b", 3, 4];

            const prop1Errors = ["Some error1"];
            const prop2Errors = ["Some error2"];

            const prop1Validator = val => val === prop1NewValue ? prop1Errors : [];
            const prop2Validator = val => val === prop2NewValue ? prop2Errors : [];

            const initialValues = {[prop1Name]: prop1DefaultValue, [prop2Name]: prop2DefaultValue};
            const {watchedValues} = getFormWithDefaultTime({
                initialValues, validators: {[prop1Name]: prop1Validator, [prop2Name]: prop2Validator}
            });

            await act(async () => watchedValues.props.handleChangeByName(prop1Name, prop1NewValue));
            await act(async () => watchedValues.props.handleChangeByName(prop2Name, prop2NewValue));
            await advanceTimersAndWaitForPromisesToResolve(enoughTimeForErrorsToBeRendered);

            await updateForm();

            expect(watchedValues.props.errors).toEqual({[prop1Name]: prop1Errors, [prop2Name]: prop2Errors});
        });
    });
}

function formUnmountsCorrectly({getFormToUse, updateForm}) {
    describe("Form cleans up on unmounting", () => {
        test("Form cleans up validation promise on unmounting", async () => {
            const time = 1000;

            const [propToChangeName, propToChangeOriginalValue, propToChangeNewValue] = ["a", 1, 2];
            const propErrors = ["Some error"];

            const propValidator = () => propErrors;

            const initialValues = {[propToChangeName]: propToChangeOriginalValue};

            const {watchedValues, form: {unmount}} = getFormToUse(
                {time, initialValues, validators: {[propToChangeName]: propValidator}}
            );

            let cancelledSleepPromises = 0;

            sleepModule.default.mockImplementation(() => {
                return new Promise((resolve, reject, onCancel) => {
                    onCancel(() => {
                        cancelledSleepPromises++;
                    });
                });
            });

            await act(async () => watchedValues.props.handleChangeByName(propToChangeName, propToChangeNewValue));
            await updateForm();

            unmount();
            await updateForm();

            expect(cancelledSleepPromises).toBe(sleepModule.default.mock.calls.length);
        });
    });
}

export default ({getFormWithPropGetter, getForm}) => {
    beforeEach(() => {
        const originalSleepModule = jest.requireActual("../../Utilities/sleep");

        sleepModule.default.mockImplementation(function (...args) {
            return originalSleepModule.default(...args);
        });
    });

    formRendersFormViewCorrectly({getFormWithPropGetter});

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

        const form = getForm({getFormView, ...props});
        return {watchedValues, form: {unmount: form.unmount.bind(form)}};
    }

    formDealsWithValuesCorrectly({getFormToUse});

    async function updateForm() {
        return act(async () => {});
    }

    afterEach(() => {
        cleanup();
    });

    formErrorsWorkCorrectly({getFormToUse, updateForm});

    formUnmountsCorrectly({getFormToUse, updateForm});
};