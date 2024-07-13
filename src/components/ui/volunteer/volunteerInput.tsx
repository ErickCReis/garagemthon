import React from "react";

interface VolunteerInputProps {
  label?: string;
  id: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const VolunteerInput = ({ label, id, name, type = "text", value, onChange, required }: VolunteerInputProps) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default VolunteerInput;
