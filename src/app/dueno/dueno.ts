import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HuellitasService } from '../services/huellitas';

@Component({
  selector: 'app-dueno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dueno.html',
})
export class DuenoComponent {
  nombre = '';
  dni = '';
  telefono = '';

  constructor(private huellitasService: HuellitasService) {}

  registrarDueno() {
    this.huellitasService.agregarDueno({
      id: 0,
      nombre: this.nombre,
      dni: this.dni,
      telefono: this.telefono
    });
    alert('Dueño registrado correctamente');
    this.nombre = this.dni = this.telefono = '';
  }

  get duenos() {
    return this.huellitasService.obtenerDuenos();
  }
}
