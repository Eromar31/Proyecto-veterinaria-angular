import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascota-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mascota-registro.html',
  styleUrl: './mascota-registro.css'
})
export class MascotaRegistro {
  mascota = { nombre: '', especie: '', edad: 0 };
  registrar() {
    console.log('Mascota registrada:', this.mascota);
  }
}
