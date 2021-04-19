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