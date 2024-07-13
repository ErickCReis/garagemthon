import React from "react";
import { Input } from "../input";
import { Label } from "../label";

interface VolunteerInputProps {
  label?: string;
  id: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const VolunteerInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
}: VolunteerInputProps) => {
  return (
    <div className="mb-4">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default VolunteerInput;
