'use client';
import React, { useState, useEffect } from "react";

// Definimos los slots de tiempo manualmente (fijos)
const availableTimes = [
  "10:00 AM - 11:00 AM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

const ConsolidatedForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expected_revenue: 10000, // Valor fijo
    probability: 33, // Valor fijo
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  // Función para obtener la fecha actual
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Retorna la fecha en formato YYYY-MM-DD
  }

  // Función para separar el rango de horas de "selectedSlot"
  function getStartEndTime(slot: string) {
    const [start, end] = slot.split(" - ");  // Divide el slot en tiempo de inicio y fin
    return {
      start: `${selectedDate} ${convertTo24Hour(start)}`,  // Convierte el tiempo a formato 24 horas
      end: `${selectedDate} ${convertTo24Hour(end)}`
    };
  }

  // Función para convertir tiempo en formato 12 horas a formato 24 horas
  function convertTo24Hour(time: string) {
    const [hours, modifier] = time.split(" ");
    let [hour, minute] = hours.split(":");
    if (modifier === "PM" && hour !== "12") {
      hour = String(Number(hour) + 12);
    }
    if (modifier === "AM" && hour === "12") {
      hour = "00";
    }
    return `${hour}:${minute}:00`;
  }

  // Manejar la selección de un horario
  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  // Manejar el cambio de la fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value); // Se actualiza la fecha seleccionada
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

    // Obtener start_time y end_time del slot seleccionado
    const { start, end } = getStartEndTime(selectedSlot);

    // Aquí se envían los datos capturados a la API
    fetch("https://crm.gestpro.cloud/create_opportunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oportunidad Consultoría",
        partner_name: formData.name,
        partner_email: formData.email,
        expected_revenue: formData.expected_revenue,
        probability: formData.probability,
        company_id: 2,  // Se ha fijado el ID de la empresa a 2
        start_time: start,  // Solo se envía el horario seleccionado con la fecha
        end_time: end,  // Ajustar según el bloque de tiempo seleccionado
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setApiMessage("Oportunidad creada exitosamente.");
      })
      .catch((error) => {
        console.error("Error creando oportunidad:", error);
        setApiMessage("Error creando oportunidad. Inténtalo de nuevo.");
      });
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

        {/* Selector de fecha */}
        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Selecciona una Fecha</label>
          <input
            type="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            min={getTodayDate()}
            required
          />
        </div>

        {/* Mostrar los bloques de tiempo disponibles */}
        <div className="mb-6 mt-6">
          <h3 className="text-white text-xl xl:text-2xl font-medium mb-4">Selecciona un Horario Disponible</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableTimes.map((slot, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg text-white ${selectedSlot === slot ? "bg-blue-600" : "bg-gray-600"} cursor-pointer hover:bg-blue-500`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje de la API */}
        {apiMessage && (
          <div className={`mt-4 p-4 rounded-lg ${apiMessage.includes("exitosamente") ? "bg-green-500" : "bg-red-500"} text-white`}>
            {apiMessage}
          </div>
        )}

        {/* Botón para confirmar la reunión */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
        >
          Confirmar Reunión
        </button>
      </form>
    </section>
  );
};

export default ConsolidatedForm;
