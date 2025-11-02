import { Injectable } from '@angular/core';

export interface Dueno {
  id: number;
  nombre: string;
  dni: string;
  telefono: string;
}

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  idDueno: number;
}

@Injectable({
  providedIn: 'root'
})
export class HuellitasService {
  private duenos: Dueno[] = [];
  private mascotas: Mascota[] = [];

  agregarDueno(dueno: Dueno) {
    dueno.id = this.duenos.length + 1;
    this.duenos.push(dueno);
  }

  agregarMascota(mascota: Mascota) {
    mascota.id = this.mascotas.length + 1;
    this.mascotas.push(mascota);
  }

  obtenerDuenos(): Dueno[] {
    return this.duenos;
  }

  obtenerMascotas(): Mascota[] {
    return this.mascotas;
  }
}