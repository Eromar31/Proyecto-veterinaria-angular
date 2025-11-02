import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HuellitasService } from '../services/huellitas';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mascota.html',
})
export class MascotaComponent {
  nombre = '';
  especie = '';
  edad!: number;
  idDueno!: number;

  constructor(private huellitasService: HuellitasService) {}

  registrarMascota() {
    this.huellitasService.agregarMascota({
      id: 0,
      nombre: this.nombre,
      especie: this.especie,
      edad: this.edad,
      idDueno: this.idDueno
    });
    alert('Mascota registrada correctamente');
    this.nombre = this.especie = '';
    this.edad = this.idDueno = 0;
  }

  get mascotas() {
    return this.huellitasService.obtenerMascotas();
  }

  get duenos() {
    return this.huellitasService.obtenerDuenos();
  }
}
