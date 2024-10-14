'use client';

import React, { useState, useEffect } from "react";

// Define el tipo de los slots
interface Slot {
  start: string;
  end: string;
}

const CalendarSelector: React.FC<{ onSlotSelect: (slot: string) => void }> = ({ onSlotSelect }) => {
  // Inicializa slots con el tipo Slot[]
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    // Llamada a la API para obtener bloques de tiempo disponibles
    fetch("https://crm.gestiones-empresariales-campeche.online/available_slots?start_time=2024-09-01T00:00:00&end_time=2024-09-30T23:59:59&company_id=1&user_id=2")
      .then((response) => response.json())
      .then((data) => setSlots(data.available_slots))
      .catch((error) => console.error("Error fetching slots:", error));
  }, []);

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  };

  return (
    <div className="calendar-selector">
      <h3 className="text-2xl mb-4">Selecciona un horario disponible</h3>
      <ul className="slot-list">
        {slots.map((slot, index) => (
          <li
            key={index}
            className={`slot-item ${selectedSlot === slot.start ? "selected" : ""}`}
            onClick={() => handleSlotClick(slot.start)}
          >
            {slot.start} - {slot.end}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarSelector;
