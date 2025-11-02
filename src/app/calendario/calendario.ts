import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css'
})
export class Calendario {
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    select: this.onDateSelect.bind(this)
  };
 
  onDateSelect(info: any) {
    const fecha = info.startStr;
    const hoy = new Date();
    const seleccion = new Date(fecha);
 
    // Normalizamos las horas para comparar solo las fechas (sin hora)
    hoy.setHours(0, 0, 0, 0);
    seleccion.setHours(0, 0, 0, 0);
 
    // ✅ Validación: no permitir fechas pasadas
    if (seleccion < hoy) {
      alert('⚠️ No puedes agendar citas en fechas pasadas.');
      return;
    }
 
    // Si la fecha es válida, continúa el flujo normal
    const hora = prompt(`Has seleccionado ${fecha}. Ingresa una hora (ej: 10:30 AM):`);
    if (hora) {
      alert(`✅ Cita reservada para el ${fecha} a las ${hora}`);
    }
  }
}