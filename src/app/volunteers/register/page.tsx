"use client"; // Ensure this is at the top of the file

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import VolunteerTextarea from "@/components/ui/volunteer/volunteerTextarea";
import VolunteerButton from "@/components/ui/volunteer/volunteerButton";

const RegisterVolunteer = () => {
  const router = useRouter(); // Ensure useRouter is correctly imported
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Se cadastre como voluntário</h1>
      <form onSubmit={handleSubmit}>
        <VolunteerInput
          label="Nome"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="Email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="Número de celular"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="CPF"
          id="cpf"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <VolunteerTextarea
          label="Habilidades"
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          required
        />
        <div className="flex space-x-4">
          <VolunteerButton type="submit">Register</VolunteerButton>
          <VolunteerButton type="button" onClick={() => router.push("/volunteers/add-vehicle")}>
            Add Vehicle
          </VolunteerButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterVolunteer;
