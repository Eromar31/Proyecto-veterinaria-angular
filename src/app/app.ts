import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout/layout';

declare const bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mi-proyecto01');

  constructor(private router: Router) {}

  // ✅ Solo cerrar el modal y redirigir si viene desde el formulario
  onSubmit(form: any) {
    if (form.valid) {
      this.cerrarModal('registroModal');
      this.router.navigate(['/calendario']);
    }
  }

  onLogin(form: any) {
    if (form.valid) {
      this.cerrarModal('loginModal');
      this.router.navigate(['/calendario']);
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  private cerrarModal(idModal: string) {
    const modalEl = document.getElementById(idModal);
    if (modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
    }

    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    document.body.style.overflow = 'auto';
  }
}
