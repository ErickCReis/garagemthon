import React from "react";

interface VolunteerButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const VolunteerButton = ({ type = "button", onClick, children }: VolunteerButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default VolunteerButton;
