'use client';
import React, { useState, useEffect } from "react";
import { DateTime } from 'luxon';

interface Slot {
  start: string;
  stop: string; 
}

const ConsolidatedForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(getTodayDate());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
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
    // Establecemos el rango fijo de 09:00 a 17:00 para la búsqueda
    const start_time = `${selectedDate ?? ''}T09:00:00`;
    const end_time = `${selectedDate ?? ''}T17:00:00`;

    try {
      const response = await fetch(`https://crm.gestpro.cloud/free_slots?start_time=${start_time}&end_time=${end_time}&company_id=2`);
      if (!response.ok) {
        throw new Error(`Error al obtener slots: ${response.status}`);
      }

      const data = await response.json();

      if (data.free_slots.length === 0) {
        setAvailableSlots([]);
        setApiMessage("No hay horarios disponibles para esta fecha.");
      } else {
        // Obtenemos la fecha y hora actual
        const now = DateTime.now().setZone('America/Mexico_City');
        const currentDate = now.toISODate();
        
        // Filtrar slots si la fecha seleccionada es hoy y el slot es en el pasado
        const filteredSlots = data.free_slots
          .filter((slot: Slot) => {
            const slotStart = DateTime.fromISO(slot.start, { zone: 'America/Mexico_City' });
            return selectedDate !== currentDate || slotStart > now;
          })
          .map((slot: Slot) => {
            const startHour = DateTime.fromISO(slot.start, { zone: 'America/Mexico_City' }).toFormat('HH:mm');
            const endHour = DateTime.fromISO(slot.stop, { zone: 'America/Mexico_City' }).toFormat('HH:mm');
            return `${startHour} - ${endHour}`;
          });

        setApiMessage(null);
        setAvailableSlots(filteredSlots);
      }
    } catch (error) {
      setAvailableSlots([]);
      setApiMessage("Error al obtener los horarios disponibles.");
    }
  };

  function getTodayDate(): string | null {
    const now = DateTime.now().setZone('America/Mexico_City');
    return now ? now.toISODate() : null;
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

    const [start, end] = selectedSlot.split(" - ");

    // Convertir las fechas al formato que Odoo espera: 'YYYY-MM-DD HH:MM:SS'
    const startDateTime = DateTime.fromISO(`${selectedDate}T${start}:00`, { zone: 'America/Mexico_City' })
      .toFormat('yyyy-LL-dd HH:mm:ss');
    const endDateTime = DateTime.fromISO(`${selectedDate}T${end}:00`, { zone: 'America/Mexico_City' })
      .toFormat('yyyy-LL-dd HH:mm:ss');

    console.log("Datos enviados al servidor:", {
      name: "Oportunidad Consultoría",
      partner_name: formData.name,
      partner_email: formData.email,
      phone: formData.phone,
      expected_revenue: formData.expected_revenue,
      probability: formData.probability,
      company_id: 2,
      start_time: startDateTime,
      end_time: endDateTime,
      user_id: 2,
      stage_id: 1
    });

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
        start_time: startDateTime,
        end_time: endDateTime,
        user_id: 2,
        stage_id: 1
      }),
    })
      .then(async (response) => {
        console.log("Respuesta de la API:", response);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API returned status ${response.status}: ${errorText}`);
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
              <p className="text-white">{apiMessage || "No hay horarios disponibles."}</p>
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

        {apiMessage && apiMessage.includes("exitosamente") && (
          <div className="mt-4 p-4 rounded-lg bg-green-500 text-white">
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
