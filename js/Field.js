import React from 'react';

export default function Field({ id, name, type = 'text', label, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} />
    </div>
  );
}
