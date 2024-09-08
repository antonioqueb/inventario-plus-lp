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
  const [selectedDate, setSelectedDate] = useState("");
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
  };

  // Cargar bloques de tiempo disponibles desde la API para la fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      const startDate = new Date(`${selectedDate}T00:00:00`);
      const endDate = new Date(`${selectedDate}T23:59:59`);

      const startTimeString = startDate.toISOString().slice(0, 19); // Mantiene el formato con "T"
      const endTimeString = endDate.toISOString().slice(0, 19);   // Mantiene el formato con "T"

      fetch(
        `https://crm.gestpro.cloud/available_slots?start_time=${startTimeString}&end_time=${endTimeString}&company_id=1&user_id=2`
      )
        .then((response) => response.json())
        .then((data) => {
          setSlots(data.available_slots);
          setShowSlots(true);
        })
        .catch((error) => {
          console.error("Error fetching slots:", error);
          setApiMessage("Error cargando los bloques de tiempo.");
        });
    }
  }, [selectedDate]);

  // Manejar la selección de un bloque de tiempo
  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  // Obtener la fecha mínima y máxima permitidas (hoy y dentro de 15 días)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Fecha mínima es hoy
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 15); // Fecha máxima es dentro de 15 días
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
        start_time: selectedSlot,
        end_time: selectedSlot, // Ajustar según el bloque de tiempo seleccionado
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

        {/* Mostrar los bloques de tiempo disponibles después de seleccionar la fecha */}
        {showSlots && slots.length > 0 && (
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
