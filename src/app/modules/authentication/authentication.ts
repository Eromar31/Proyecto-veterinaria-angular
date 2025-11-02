import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.html',
  styleUrls: ['./authentication.css']
})
export class Authentication {
  username = '';
  password = '';
  password1 = '';
  password2 = '';
  error = '';
  showRegister = false;
  termsAccepted = false;
  mostrarAuth = true; 

  // ✅ Validar email
  validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ✅ Validar contraseña
  validarPassword(pass: string): boolean {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(pass);
  }

  // ✅ Alternar login ↔ registro
  handleShowRegister() {
    this.showRegister = !this.showRegister;
    this.error = '';
  }

  // ✅ Cerrar modal (se usa desde el botón ×)
  cerrarAuth() {
    this.mostrarAuth = false;
  }

  // ✅ Login con localStorage
  handleLogin(event: Event) {
    event.preventDefault();

    if (!this.validarEmail(this.username)) {
      this.error = 'Correo inválido. Usa un formato válido (nombre@dominio.com)';
      return;
    }

    if (!this.validarPassword(this.password)) {
      this.error = 'Contraseña inválida. Debe tener mínimo 6 caracteres, incluyendo letras y números.';
      return;
    }

    // ✅ Verificación especial para el administrador
    if (this.username === 'admin@gmail.com' && this.password === 'pmsl123') {
      const adminUser = {
        username: this.username,
        password: this.password,
        rol: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      alert('Inicio de sesión como administrador ✅');
      this.cerrarAuth();
      window.location.reload();
      return;
    }

    // 🔍 Si no es admin, buscar entre los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const user = usuarios.find(
      (u: any) => u.username === this.username && u.password === this.password
    );

    if (user) {
      const nombreLimpio = this.username.split('@')[0].replace(/\d+/g, '').replace(/\.+$/, '');
      const usuario = {
        name: nombreLimpio,
        rol: 'cliente',
        username: this.username,
        password: this.password
      };
      localStorage.setItem('user', JSON.stringify(usuario));
      alert('Inicio de sesión exitoso ✅');
      this.cerrarAuth();
      window.location.reload();
    } else {
      this.error = 'Credenciales incorrectas.';
    }
  }


  // ✅ Registro con localStorage
  handleRegister(event: Event) {
    event.preventDefault();

    if (!this.validarEmail(this.username)) {
      this.error = 'Correo inválido.';
      return;
    }

    if (!this.validarPassword(this.password1 || this.password2)) {
      this.error = 'Contraseña inválida. Debe tener mínimo 6 caracteres, incluyendo letras y números.';
      return;
    }

    if (this.password1 !== this.password2) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.some((u: any) => u.username === this.username)) {
      this.error = 'Este correo ya está registrado.';
      return;
    }

    const nuevoUsuario = {
      username: this.username,
      password: this.password1,
      rol: 'cliente'
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente ✅');
    this.username = '';
    this.password1 = '';
    this.password2 = '';
    this.error = '';
    this.showRegister = false;
  }

  // ✅ Checkbox de términos
  handleCheckboxChange() {
    this.termsAccepted = !this.termsAccepted;
  }
}
