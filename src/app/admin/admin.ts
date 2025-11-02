import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  citas = JSON.parse(localStorage.getItem('citas') || '[]');

  eliminarCita(i: number) {
    this.citas.splice(i, 1);
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }
}
