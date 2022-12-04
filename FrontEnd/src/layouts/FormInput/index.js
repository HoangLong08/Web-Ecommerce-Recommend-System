import React from "react";
import "./style.css";

function FormInput({
  title,
  htmlFor,
  type,
  placeholder,
  name,
  value,
  onChange,
  onKeyDown,
  className,
  error,
  content, //could be component of antd
  ...props
}) {
  return (
    <div className="wrapper-form">
      <label className="form-label" htmlFor={htmlFor}>
        <p>{title}</p>
        {content ? (
          content
        ) : (
          <input
            type={type}
            id={htmlFor}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            // onKeyDown={onKeyDown}
            className={className}
            {...props}
          />
        )}
      </label>
      {error?.length > 0 && <small className="form-error">{error}</small>}
    </div>
  );
}

export default FormInput;
