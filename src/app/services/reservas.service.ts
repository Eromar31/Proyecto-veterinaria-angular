import { Injectable } from '@angular/core';

export interface Mesa { id: number; nombre: string; }

@Injectable({ providedIn: 'root' })
export class ReservasService {
    async getMesasDisponibles(_fechaISO: string): Promise<Mesa[]> {
        return [
        { id: 1, nombre: 'reservación' },
        { id: 2, nombre: 'reservación' },
        { id: 3, nombre: 'reservación' },
        ];
    }
    async getHorasDisponibles(_fechaISO: string, _mesaId: number): Promise<string[]> {
        return ['12:00', '12:30', '13:00', '13:30', '14:00'];
    }
}
