import React from "react";

const TextField = ({ name, placeholder, value, error, info, type, onChange, disabled }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={
          error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextField;
