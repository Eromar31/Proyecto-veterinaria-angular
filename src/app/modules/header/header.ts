import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authentication } from '../authentication/authentication';

declare var bootstrap: any;

type UserStored = {
  name?: string;
  rol?: 'admin' | 'cliente';
  email?: string;
  username?: string;
  password?: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Authentication],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, AfterViewInit {
  mostrarAuth = false;
  mostrarCalendario = false;
  mostrarSubmenu = false;
  user: { name: string; rol: 'admin' | 'cliente' } | null = null;


  private collapseRef: any | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
      this.cargarUsuario();
      this.autoCloseOnLinkClick();

      // Cerrar el menú cuando cambias de ruta
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) this.hideNavbar();
      });
    }

    ngAfterViewInit(): void {
      const navEl = document.getElementById('navbarNav');
      if (navEl) {
        // Creamos/obtenemos la instancia pero SIN abrir automáticamente
        this.collapseRef = bootstrap.Collapse.getOrCreateInstance(navEl, { toggle: false });
      }
    }

    toggleNavbar(): void {
      // Asegura que siempre haya instancia válida
      const navEl = document.getElementById('navbarNav');
      if (!this.collapseRef && navEl) {
        this.collapseRef = bootstrap.Collapse.getOrCreateInstance(navEl, { toggle: false });
      }
      this.collapseRef?.toggle();
    }

  private hideNavbar(): void {
    const navEl = document.getElementById('navbarNav');
    if (!navEl) return;
    const instance = bootstrap.Collapse.getOrCreateInstance(navEl, { toggle: false });
    instance.hide();
  }

  private autoCloseOnLinkClick(): void {
    // Cierra al hacer clic en cualquier link del menú (comportamiento móvil)
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => this.hideNavbar());
    });
  }

  private cargarUsuario(): void {
    const raw = localStorage.getItem('user');
    if (!raw) return;
    try {
      const u: UserStored = JSON.parse(raw);
      const name = u.name ?? u.username ?? (u.email ? u.email.split('@')[0] : '');
      const rol = (u.rol as 'admin' | 'cliente') ?? (u.username === 'admin@gmail.com' ? 'admin' : 'cliente');
      if (name) this.user = { name, rol };
    } catch {
      this.user = null;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']).then(() => window.location.reload());
  }

  abrirAuth() {
    this.mostrarAuth = true;
    this.mostrarCalendario = false;
  }

  cerrarAuth() {
    this.mostrarAuth = false;
  }

abrirCalendario(event?: Event) {
  if (event) event.preventDefault();

  const usuarioRegistrado = localStorage.getItem('user');

  // Si NO hay usuario -> mostramos autenticación
  if (!usuarioRegistrado) {
    alert('Debes iniciar sesión o registrarte antes de separar una cita.');
    this.mostrarAuth = true;
    return;
  }

  // Si SÍ hay usuario -> navegamos al calendario
  this.router.navigate(['/calendario']).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


    onSubmit(form: any) {
    if (form.valid) {
      const modalEl = document.getElementById('registroModal');
      if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.hide();
      }

      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      document.body.style.overflow = 'auto';

      this.router.navigate(['/calendario']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  esAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.rol === 'admin';
  }

  irAlAdmin(event?: Event) {
    if (event) event.preventDefault();
    this.mostrarSubmenu = false;
    this.router.navigate(['/admin']);
  }

  onRegister(form: any) {
  if (form.valid) {
    const { email, password, confirmPassword } = form.value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Usuario registrado:', email);
    alert('✅ Cuenta creada correctamente. Ahora puedes iniciar sesión.');
  } else {
    alert('Por favor completa todos los campos.');
  }
}

}
