export default function FieldInput({value, ...rest}) {
    return (
        <input value={value} aria-label="input" {...rest}></input>
    );
};