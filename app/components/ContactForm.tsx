'use client';
import React, { useState, useEffect } from "react";

// Define el tipo de los slots
interface Slot {
  start: string;
  end: string;
}

const ConsolidatedForm: React.FC = () => {
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expected_revenue: 10000, // Valor fijo
    probability: 33, // Valor fijo
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [showSlots, setShowSlots] = useState(false);

  // Función para manejar la selección de la fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setShowSlots(false);  // Ocultamos los slots hasta que se haga clic en el botón
  };

  // Definir horarios disponibles de 10:00 AM a 11:00 AM y de 1:00 PM a 5:00 PM
  const availableTimes = [
    "10:00 AM - 11:00 AM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  // Cargar bloques de tiempo disponibles (en este caso horarios fijos)
  const loadAvailableSlots = () => {
    if (selectedDate) {
      setSlots(availableTimes); // Solo los horarios permitidos
      setShowSlots(true);  // Mostrar slots después de que se hace clic en el botón
    }
  };

  // Manejar la selección de un horario
  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  // Obtener la fecha mínima y máxima permitidas (hoy y dentro de 7 días)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Fecha mínima es hoy
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Fecha máxima es dentro de 7 días
    return today.toISOString().split("T")[0];
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
        name: "Oportunidad Consultoría",
        partner_name: formData.name,
        partner_email: formData.email,
        expected_revenue: formData.expected_revenue,
        probability: formData.probability,
        company_id: 1,
        start_time: selectedSlot,  // Solo se envía el horario seleccionado
        end_time: selectedSlot,  // Ajustar según el bloque de tiempo seleccionado
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
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={getMinDate()}
            max={getMaxDate()}
            required
          />
        </div>

        <button
          type="button"
          onClick={loadAvailableSlots}
          className="w-full bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
        >
          Cargar Horarios Disponibles
        </button>

        {/* Mostrar los bloques de tiempo disponibles después de cargar */}
        {showSlots && slots.length > 0 && (
          <div className="mb-6 mt-6">
            <h3 className="text-white text-xl xl:text-2xl font-medium mb-4">Selecciona un Horario Disponible</h3>
            <div className="grid grid-cols-2 gap-4">
              {slots.map((slot, index) => (
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
        )}

        {/* Mensaje de la API */}
        {apiMessage && (
          <div className={`mt-4 p-4 rounded-lg ${apiMessage.includes("exitosamente") ? "bg-green-500" : "bg-red-500"} text-white`}>
            {apiMessage}
          </div>
        )}

        {/* Botón para confirmar la reunión */}
        {showSlots && slots.length > 0 && (
          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-extrabold hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-lg"
          >
            Confirmar Reunión
          </button>
        )}
      </form>
    </section>
  );
};

export default ConsolidatedForm;
