'use client';
import React, { useState, useEffect } from "react";
import { DateTime } from 'luxon';

interface Slot {
  start: string;
  end: string;
}

const defaultAvailableTimes = [
  "10:00 AM - 11:00 AM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

const ConsolidatedForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(getTodayDate());
  const [availableSlots, setAvailableSlots] = useState<string[]>(defaultAvailableTimes);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expected_revenue: 10000,
    probability: 33,
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    const start_time = `${selectedDate ?? ''}T00:00:00`;
    const end_time = `${selectedDate ?? ''}T23:59:59`;

    try {
      const response = await fetch(`https://crm.gestpro.cloud/available_slots?start_time=${start_time}&end_time=${end_time}&company_id=2&user_id=2`);
      if (!response.ok) {
        throw new Error(`Error al obtener slots: ${response.status}`);
      }

      const data = await response.json();
      const filteredSlots = data.available_slots.map((slot: Slot) => {
        const startHour = DateTime.fromFormat(slot.start, 'yyyy-MM-dd HH:mm:ss', { zone: 'America/Mexico_City' }).toLocaleString(DateTime.TIME_SIMPLE);
        const endHour = DateTime.fromFormat(slot.end, 'yyyy-MM-dd HH:mm:ss', { zone: 'America/Mexico_City' }).toLocaleString(DateTime.TIME_SIMPLE);
        return `${startHour} - ${endHour}`;
      });

      if (filteredSlots.length > 0) {
        setAvailableSlots(filteredSlots);
      } else {
        setAvailableSlots(defaultAvailableTimes);
      }
    } catch (error) {
      setAvailableSlots(defaultAvailableTimes);
    }
  };

  function getTodayDate(): string | null {
    const now = DateTime.now().setZone('America/Mexico_City');
    return now ? now.toISODate() : null;
  }

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

  function getStartEndTime(slot: string) {
    const [start, end] = slot.split(" - ");
    return {
      start: `${selectedDate ?? ''} ${convertTo24Hour(start)}`,
      end: `${selectedDate ?? ''} ${convertTo24Hour(end)}`
    };
  }

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Por favor, selecciona un horario disponible.");
      return;
    }

    const { start, end } = getStartEndTime(selectedSlot);

    // Verificar el formato de tiempo antes de enviar
    console.log("Verificando formato de tiempo:");
    console.log("Fecha seleccionada:", selectedDate);
    console.log("Hora de inicio en formato 24 horas:", start);
    console.log("Hora de fin en formato 24 horas:", end);

    // Log de los datos que se van a enviar
    console.log("Datos del formulario:", formData);
    console.log("Slot seleccionado:", selectedSlot);

    fetch("https://crm.gestpro.cloud/create_opportunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oportunidad Consultoría",
        partner_name: formData.name,
        partner_email: formData.email,
        phone: formData.phone,
        expected_revenue: formData.expected_revenue,
        probability: formData.probability,
        company_id: 2,
        start_time: start,  // Formato corregido en 24 horas
        end_time: end,      // Formato corregido en 24 horas
        user_id: 2,
        stage_id: 1
      }),
    })
      .then((response) => {
        console.log("Respuesta de la API:", response);

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta JSON de la API:", data);
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

        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-xl xl:text-2xl font-medium mb-2">Selecciona una Fecha</label>
          <input
            type="date"
            name="date"
            value={selectedDate ?? ''}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            min={getTodayDate() ?? ''}
            required
          />
        </div>

        <div className="mb-6 mt-6">
          <h3 className="text-white text-xl xl:text-2xl font-medium mb-4">Selecciona un Horario Disponible</h3>
          <div className="grid grid-cols-2 gap-4">
            {availableSlots.length === 0 ? (
              <p className="text-white">No hay horarios disponibles.</p>
            ) : (
              availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg text-white ${selectedSlot === slot ? "bg-blue-600" : "bg-gray-600"} cursor-pointer hover:bg-blue-500`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </div>
              ))
            )}
          </div>
        </div>

        {apiMessage && (
          <div className={`mt-4 p-4 rounded-lg ${apiMessage.includes("exitosamente") ? "bg-green-500" : "bg-red-500"} text-white`}>
            {apiMessage}
          </div>
        )}

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
