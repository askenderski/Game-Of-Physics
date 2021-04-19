import {combineClassNames} from "./components";

const getType = variable => Array.isArray(variable) ? "array" : "string";

[
    ["class1", "class2", "class1 class2"],
    ["class1", ["class2", "class3"], "class1 class2 class3"],
    [["class1", "class2"], "class3", "class1 class2 class3"],
    [["class1", "class2"], ["class3", "class4"], "class1 class2 class3 class4"]
]
    .forEach(([classNameA, classNameB, result]) => {
        test(`combineClassNames combines classNameA of type ${getType(classNameA)} ` +
            `and classNameB of type ${getType(classNameB)} correctly`, () => {
            expect(combineClassNames(classNameA, classNameB)).toBe(result);
        });
    });

test("combineClassNames handles first parameter of undefined as empty string", () => {
    const className = "className";

    expect(combineClassNames(undefined, className)).toContain(className);
});

test("combineClassNames handles second parameter of undefined as empty string", () => {
    const className = "className";

    expect(combineClassNames(className, undefined)).toContain(className);
});

test("combineClassNames handles both parameters of undefined as empty strings", () => {
    const combinedClassName = combineClassNames(undefined, undefined);
    const nonSpaceSymbolsInCombinedClassName = combinedClassName.match(/[^ ]+/);

    expect(nonSpaceSymbolsInCombinedClassName).toBeNull();
});