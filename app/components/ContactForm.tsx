'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { DateTime } from 'luxon';
import { Clock, Users, Star } from 'lucide-react';

interface Slot {
  start: string;
  stop: string; 
}

export default function ConsolidatedForm() {
  const router = useRouter();
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
  const [remainingSlots, setRemainingSlots] = useState<number>(0);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    const start_time = `${selectedDate ?? ''}T09:00:00`;
    const end_time = `${selectedDate ?? ''}T17:00:00`;

    try {
      const response = await fetch(`https://crm.gestiones-empresariales-campeche.online/free_slots?start_time=${start_time}&end_time=${end_time}&company_id=1`);
      if (!response.ok) {
        throw new Error(`Error al obtener slots: ${response.status}`);
      }

      const data = await response.json();

      if (data.free_slots.length === 0) {
        setAvailableSlots([]);
        setApiMessage("No hay horarios disponibles para esta fecha.");
      } else {
        const now = DateTime.now().setZone('America/Mexico_City');
        const currentDate = now.toISODate();
        
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

        setAvailableSlots(filteredSlots);
        setRemainingSlots(filteredSlots.length);

        if (filteredSlots.length === 0) {
          setApiMessage("No hay horarios disponibles para esta fecha.");
        } else {
          setApiMessage(null);
        }
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
      company_id: 1,
      start_time: startDateTime,
      end_time: endDateTime,
      user_id: 2,
      stage_id: 1
    });

    fetch("https://crm.gestiones-empresariales-campeche.online/create_opportunity", {
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
        company_id: 1,
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

        router.push(`/thank-you?name=${encodeURIComponent(formData.name)}&date=${encodeURIComponent(selectedDate ?? '')}&slot=${encodeURIComponent(selectedSlot)}`);
      })
      .catch((error) => {
        console.error("Error creando oportunidad:", error);
        setApiMessage("Error creando oportunidad. Inténtalo de nuevo.");
      });
  };

  return (
    <section id="consultoria-form" className="py-20 bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-2xl rounded-3xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white text-center mb-10 leading-tight">Agenda tu Consultoría Hoy</h2>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-2xl text-center">
            <p className="text-2xl font-bold  mb-2">¡Aprovecha nuestra promoción!</p>
            <p className="text-xl mt-2">
              Agenda tu consultoría hoy y <span className="text-zinc font-semibold">obtén un 15% de descuento</span> en nuestros servicios de contabilidad, control interno y auditorías el primer mes.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-2xl">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-lg sm:text-xl font-medium mb-2">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-lg sm:text-xl font-medium mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                required
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white text-lg sm:text-xl font-medium mb-2">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-zinc-400"
                required
                placeholder="Tu número de teléfono"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-white text-lg sm:text-xl font-medium mb-2">Selecciona una Fecha</label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate ?? ''}
                onChange={handleDateChange}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                min={getTodayDate() ?? ''}
                required
              />
            </div>

            <div>
              <h3 className="text-white text-lg sm:text-xl font-medium mb-4">Selecciona un Horario Disponible</h3>

              {availableSlots.length > 0 && (
                <p className="text-zinc-300 text-sm mb-2">* Los horarios se muestran en hora centro de México (CDMX).</p>
              )}

              {remainingSlots > 0 && remainingSlots <= 3 && (
                <p className="text-blue-400 text-sm mb-2 font-semibold">
                  <Clock className="inline-block mr-1" size={16} />
                  ¡Solo quedan {remainingSlots} horarios disponibles para hoy!
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {availableSlots.length === 0 ? (
                  <p className="text-white col-span-2 sm:col-span-3">{apiMessage || "No hay horarios disponibles."}</p>
                ) : (
                  availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`p-3 border rounded-lg text-white text-sm sm:text-base ${
                        selectedSlot === slot
                          ? "bg-blue-600 border-blue-500"
                          : "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                      } transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {apiMessage && !apiMessage.includes("exitosamente") && (
            <div className="mt-6 p-4 rounded-lg bg-yellow-500 bg-opacity-80 text-white text-center">
              {apiMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full text-lg sm:text-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Confirmar Reunión Ahora
          </button>

          <div className="mt-6 text-center">
            <p className="text-zinc-300 text-sm">
              <Users className="inline-block mr-1" size={16} />
              Más de 113 empresas siendo acompañadas en el camino hacia el éxito empresarial,
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}