function getClassNameAsString(className) {
    return Array.isArray(className) ? className.join(" ") : className.toString();
}

export function combineClassNames(classNameA = "", classNameB = "") {
    const classNameAAsString = getClassNameAsString(classNameA);
    const classNameBAsString = getClassNameAsString(classNameB);

    return classNameAAsString + " " + classNameBAsString;
}