import React from 'react';

export default function SelectField({ label, name, options }) {
  return (
    <div className="relative">
      <label className="absolute left-3 pt-0.5 text-gray-500 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary">
        {label}
      </label>
      <select
        name={name}
        className="w-full p-2 border rounded mt-6"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}