const Select = (props) => {
    return(
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                {props.title}
            </label>
            <select name={props.name} id={props.name}
                    value={props.value} className="form-select"
                    onChange={props.handleChange}>
                <option className="form-select">{props.placeholder}</option>
                {props.options.map((option) =>{
                    return(
                        <option
                            className="form-select"
                            value={option.id}
                            label={option.label}
                            key={option.id}
                        >
                            {option.value}
                        </option>
                    )
                })}
            </select>
            <div className={props.errorDiv}>
                {props.errorMsg}
            </div>
        </div>
    );
}
export default Select
