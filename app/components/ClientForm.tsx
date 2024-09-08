'use client';

import React, { useState } from "react";

const ClientForm: React.FC<{ onSubmit: (formData: any) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expected_revenue: 0,
    probability: 70,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="client-form" onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Ingresos esperados</label>
        <input
          type="number"
          name="expected_revenue"
          value={formData.expected_revenue}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Probabilidad de éxito</label>
        <input
          type="number"
          name="probability"
          value={formData.probability}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        Agendar Sesión
      </button>
    </form>
  );
};

export default ClientForm;
