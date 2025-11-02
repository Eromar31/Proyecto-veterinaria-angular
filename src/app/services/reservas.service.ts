import { Injectable } from '@angular/core';
 
export interface ServicioVeterinario {
    id: number;
    nombre: string;
}
 
@Injectable({ providedIn: 'root' })
export class ReservasService {

    async getServicios(): Promise<ServicioVeterinario[]> {
        return [
        { id: 1, nombre: 'Consulta general' },
        { id: 2, nombre: 'Vacunación' },
        { id: 3, nombre: 'Baño y peluquería' },
        { id: 4, nombre: 'Desparasitación' },
        { id: 5, nombre: 'Control y chequeo' },
        { id: 6, nombre: 'Emergencia veterinaria' }
        ];
    }
    
    async getHorasDisponibles(_fechaISO: string, _servicioId: number): Promise<string[]> {
        return ['09:00', '09:30', '10:00', '10:30', '11:00'];
    }
}