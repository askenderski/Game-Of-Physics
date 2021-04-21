import style from "./FieldInput.module.scss";

function FieldInput({value, onChange, className=style.input, ...rest}) {
    return (
        <input className={className} value={value} onChange={onChange} aria-label="input" {...rest}></input>
    );
}

export default FieldInput;