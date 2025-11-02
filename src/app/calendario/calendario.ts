// src/app/calendario/calendario.ts
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservasService, ServicioVeterinario } from '../services/reservas.service';
 
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule, NgIf, NgFor],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
 
  // Wizard UI
  wizardAbierto = false;
  paso = 1;
 
  // Estado general
  fechaISO: string | null = null;
 
  // Paso 1 — Servicios veterinarios
  servicios: ServicioVeterinario[] = [];
  servicioSeleccionado: number | null = null;
 
  // Paso 2 — Horas disponibles
  horas: string[] = [];
  horaSeleccionada: string | null = null;
 
  // FullCalendar config
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: false,
    dateClick: (arg: { date: Date; dateStr: string }) => this.onDateClick(arg),
  };
 
  constructor(
    private reservasSrv: ReservasService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}
 
  // Usuario hace clic en una fecha del calendario
  async onDateClick(info: { date: Date; dateStr: string }) {
    this.zone.run(async () => {
     
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      const f   = new Date(info.date); f.setHours(0, 0, 0, 0);
 
      if (f < hoy) {
        alert('No puedes agendar en fechas pasadas.');
        return;
      }
 
      // Guardamos fecha seleccionada
      this.fechaISO = info.dateStr;
 
      // Cargamos servicios veterinarios
      this.servicios = await this.reservasSrv.getServicios();
 
      // Reset del wizard
      this.paso = 1;
      this.servicioSeleccionado = null;
      this.horas = [];
      this.horaSeleccionada = null;
 
      this.wizardAbierto = true;
      this.cdr.detectChanges();
    });
  }
 
  cerrarWizard() {
    this.wizardAbierto = false;
  }
 
  // Paso 1 → Paso 2 (luego de seleccionar servicio)
  async continuarConServicio() {
    if (!this.servicioSeleccionado || !this.fechaISO) return;
 
    this.horas = await this.reservasSrv.getHorasDisponibles(
      this.fechaISO,
      this.servicioSeleccionado
    );
 
    this.horaSeleccionada = null;
    this.paso = 2;
  }
 
  // Paso 2 → Paso 3
  continuarConHora() {
    if (!this.horaSeleccionada) return;
    this.paso = 3;
  }
 
  // Confirmación final
  confirmarReserva() {
    if (!this.fechaISO || !this.servicioSeleccionado || !this.horaSeleccionada) return;
 
    alert(
      `✅ Cita confirmada:\n
📅 Fecha: ${this.fechaISO}
🐾 Servicio ID: ${this.servicioSeleccionado}
⏰ Hora: ${this.horaSeleccionada}`
    );
    this.cerrarWizard();
  }
}