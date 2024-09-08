'use client';

import React, { useState, useEffect } from "react";

// Define el tipo de los slots
interface Slot {
  start: string;
  end: string;
}

const ConsolidatedForm: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expected_revenue: 0,
    probability: 70,
  });

  // Cargar bloques de tiempo disponibles desde la API
  useEffect(() => {
    fetch("https://crm.gestpro.cloud/available_slots?start_time=2024-09-01T00:00:00&end_time=2024-09-30T23:59:59&company_id=1&user_id=2")
      .then((response) => response.json())
      .then((data) => setSlots(data.available_slots))
      .catch((error) => console.error("Error fetching slots:", error));
  }, []);

  // Manejar la selección de un bloque de tiempo
  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  // Manejar el cambio de los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      alert("Por favor, selecciona un horario disponible.");
      return;
    }

    // Aquí se envían los datos capturados a la API
    fetch("https://crm.gestpro.cloud/create_opportunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Consultoría de Inventarios",
        partner_name: formData.name,
        partner_email: formData.email,
        expected_revenue: formData.expected_revenue,
        probability: formData.probability,
        company_id: 2, // ID de la empresa
        start_time: selectedSlot,
        end_time: "2024-09-10 11:00:00", // Ajustar según el bloque de tiempo seleccionado
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log("Oportunidad creada:", data))
    .catch((error) => console.error("Error creando oportunidad:", error));
  };

  return (
    <section id="consultoria-form" className="py-20 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-xl rounded-b-xl">
      <h2 className="text-4xl xl:text-6xl font-extrabold text-white text-center mb-10">Agenda tu Consultoría</h2>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-700 p-10 rounded-lg shadow-2xl">
        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Ingresos Esperados</label>
          <input
            type="number"
            name="expected_revenue"
            value={formData.expected_revenue}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Probabilidad de Éxito (%)</label>
          <input
            type="number"
            name="probability"
            value={formData.probability}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Selector de bloque de tiempo */}
        <div className="mb-6">
          <h3 className="text-white text-xl xl:text-2xl font-medium mb-4">Selecciona un Horario Disponible</h3>
          <ul className="slot-list">
            {slots.map((slot, index) => (
              <li
                key={index}
                className={`slot-item text-white ${selectedSlot === slot.start ? "bg-blue-600" : ""} cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-500`}
                onClick={() => handleSlotClick(slot.start)}
              >
                {slot.start} - {slot.end}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
        >
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ConsolidatedForm;
