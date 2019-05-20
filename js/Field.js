import React from 'react';

const FieldWrapper = ({ id, label, children }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

export const Field = ({ id, name, type = 'text', label, value, onChange }) => (
  <FieldWrapper id={id} label={label}>
    <input type={type} id={id} name={name} value={value} onChange={onChange} />
  </FieldWrapper>
);

export const TextArea = ({ id, name, label, value, onChange }) => (
  <FieldWrapper id={id} label={label}>
    <textarea id={id} name={name} onChange={onChange}>
      {value}
    </textarea>
  </FieldWrapper>
);

export default Field;
