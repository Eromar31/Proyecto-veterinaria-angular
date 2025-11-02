// src/app/calendario/calendario.ts
import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservasService, Mesa } from '../services/reservas.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  // 👇 importa directivas usadas en el HTML
  imports: [CommonModule, FormsModule, FullCalendarModule, NgIf, NgFor, NgClass],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
  // UI / Wizard
  wizardAbierto = false;
  paso = 1;

  // Estado
  fechaISO: string | null = null;
  mesas: Mesa[] = [];
  mesaIdSeleccionada: number | null = null;
  horas: string[] = [];
  horaSeleccionada: string | null = null;

  // FullCalendar
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: false,
    // usa dateClick (clic simple) y delega a método de la clase
    dateClick: (arg: { date: Date; dateStr: string }) => this.onDateClick(arg),
  };

  constructor(
    private reservasSrv: ReservasService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  // Clic en un día
  async onDateClick(info: { date: Date; dateStr: string }) {
    // Asegura que el cambio corre dentro de Angular (FullCalendar dispara fuera)
    this.zone.run(async () => {
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      const f   = new Date(info.date); f.setHours(0, 0, 0, 0);

      if (f < hoy) { alert('No puedes agendar en fechas pasadas.'); return; }

      this.fechaISO = info.dateStr;

      // Carga mesas (fechaISO ya no es null aquí)
      this.mesas = await this.reservasSrv.getMesasDisponibles(this.fechaISO!);

      // reset y abre wizard
      this.paso = 1;
      this.mesaIdSeleccionada = null;
      this.horas = [];
      this.horaSeleccionada = null;
      this.wizardAbierto = true;

      // fuerza refresco inmediato (a veces útil con overlays)
      this.cdr.detectChanges();
    });
  }

  cerrarWizard() { this.wizardAbierto = false; }

  // Paso 1 → Paso 2
  async elegirMesa(mesaId: number) {
    this.mesaIdSeleccionada = mesaId;
    if (!this.fechaISO) return;
    this.horas = await this.reservasSrv.getHorasDisponibles(this.fechaISO, mesaId);
    this.horaSeleccionada = null;
    this.paso = 2;
  }

  // Paso 2 → Paso 3
  continuarConHora() {
    if (!this.horaSeleccionada) return;
    this.paso = 3;
  }

  // Confirmación
  confirmarReserva() {
    if (!this.fechaISO || !this.mesaIdSeleccionada || !this.horaSeleccionada) return;
    alert(`✅ Reserva confirmada para el ${this.fechaISO}, mesa ${this.mesaIdSeleccionada} a las ${this.horaSeleccionada}.`);
    this.cerrarWizard();
  }
}
