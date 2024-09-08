'use client';
import React, { useState, useEffect } from "react";

// Definimos el tipo de los slots recibidos de la API
interface Slot {
  start: string;
  end: string;
}

// Definimos los slots de tiempo manualmente (fijos)
const defaultAvailableTimes = [
  "10:00 AM - 11:00 AM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

const ConsolidatedForm: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
  const [availableSlots, setAvailableSlots] = useState<string[]>(defaultAvailableTimes);  // Inicializamos con los slots por defecto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  // Nuevo campo de teléfono
    expected_revenue: 10000, // Valor fijo
    probability: 33, // Valor fijo
  });
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  // Efecto para cargar slots desde la API cuando cambia la fecha
  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

  // Función para obtener los slots disponibles de la API
  const fetchAvailableSlots = async () => {
    const start_time = `${selectedDate}T00:00:00`;
    const end_time = `${selectedDate}T23:59:59`;

    try {
      console.log(`Fetching slots for date: ${selectedDate}`);
      const response = await fetch(`https://crm.gestpro.cloud/available_slots?start_time=${start_time}&end_time=${end_time}&company_id=2&user_id=2`);
      if (!response.ok) {
        throw new Error(`Error al obtener slots: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Available slots:", data.available_slots);

      // Filtrar los slots disponibles en el formato de availableTimes
      const filteredSlots = data.available_slots.map((slot: Slot) => {
        const startHour = new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endHour = new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        console.log(`Slot transformed: ${startHour} - ${endHour}`);
        return `${startHour} - ${endHour}`;
      });

      // Si la API devuelve datos, sobrescribimos los slots predefinidos
      if (filteredSlots.length > 0) {
        console.log(`Filtered slots: ${filteredSlots}`);
        // Aplicar filtro de slots futuros
        const futureSlots = filteredSlots.filter((slot: string) => isFutureSlot(slot, selectedDate));
        console.log(`Future slots: ${futureSlots}`);
        setAvailableSlots(futureSlots);
      } else {
        // Si la API no devuelve slots, usar los predefinidos
        console.log("No future slots found, using default slots.");
        setAvailableSlots(defaultAvailableTimes.filter((slot: string) => isFutureSlot(slot, selectedDate)));
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      // En caso de error, mostramos solo los slots por defecto
      setAvailableSlots(defaultAvailableTimes.filter((slot: string) => isFutureSlot(slot, selectedDate)));
    }
  };

  // Función para obtener la fecha actual
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Retorna la fecha en formato YYYY-MM-DD
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

  // Función para separar el rango de horas de "selectedSlot"
  function getStartEndTime(slot: string) {
    const [start, end] = slot.split(" - ");
    return {
      start: `${selectedDate} ${convertTo24Hour(start)}`,  // Convierte el tiempo a formato 24 horas
      end: `${selectedDate} ${convertTo24Hour(end)}`
    };
  }

  // Función para comparar la hora actual con los slots y filtrar los pasados
  function isFutureSlot(slot: string, selectedDate: string) {
    const now = new Date();
    const [startTime] = slot.split(" - "); // Solo tomar la hora de inicio
    const slotTime = new Date(`${selectedDate} ${convertTo24Hour(startTime)}`);
    const isFuture = slotTime > now;
    console.log(`Checking if slot is future: ${slotTime}, now: ${now}, isFuture: ${isFuture}`);
    return isFuture;  // Solo permite mostrar slots en el futuro
  }

  // Manejar la selección de un horario
  const handleSlotClick = (slot: string) => {
    console.log(`Selected slot: ${slot}`);
    setSelectedSlot(slot);
  };

  // Manejar el cambio de la fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Date changed: ${e.target.value}`);
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
    console.log(`Submitting form with slot: start - ${start}, end - ${end}`);

    fetch("https://crm.gestpro.cloud/create_opportunity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oportunidad Consultoría",
        partner_name: formData.name,
        partner_email: formData.email,
        phone: formData.phone,  // Enviar teléfono en la solicitud
        expected_revenue: formData.expected_revenue,
        probability: formData.probability,
        company_id: 2,  // Se ha fijado el ID de la empresa a 2
        start_time: start,
        end_time: end,
        user_id: 2,
        stage_id: 1
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }
        return response.json();
      })
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

        {/* Nuevo campo de teléfono */}
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
