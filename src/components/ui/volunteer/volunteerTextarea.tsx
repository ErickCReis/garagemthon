import React from "react";

interface VolunteerTextareaProps {
  label?: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const VolunteerTextarea = ({ label, id, name, value, onChange, required }: VolunteerTextareaProps) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
      <textarea
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

export default VolunteerTextarea;
