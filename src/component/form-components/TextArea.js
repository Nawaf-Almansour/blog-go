const TextArea = (props) => {
    return(
        <div className="mb-3">
            <label htmlFor={props.name} className="form-label">
                Description
            </label>
            <textarea
                className="form-control"
                id={props.name}
                name={props.name}
                rows={props.rows}
                value={props.value}
                onChange={props.handleChange}
            />
            <div className={props.errorDiv}>
                {props.errorMsg}
            </div>
        </div>
    );
}
export default TextArea
