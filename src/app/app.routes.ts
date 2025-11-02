import { Routes } from '@angular/router';
import { Home } from './modules/pages/home/home';
import { Gallery } from './modules/pages/gallery/gallery';
import { DuenoComponent } from './dueno/dueno';
import { MascotaComponent } from './mascota/mascota';
import { MascotaRegistro } from './mascota/mascota-registro/mascota-registro';
import { DuenoRegistro } from './dueno/dueno-registro/dueno-registro';
import { Calendario } from './calendario/calendario';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Home },                         // Página principal
  { path: 'gallery', component: Gallery },                // Galería
  

  // Rutas para dueños y mascotas
  { path: 'duenos', component: DuenoComponent },
  { path: 'duenos/registro', component: DuenoRegistro },
  { path: 'mascotas', component: MascotaComponent },
  { path: 'mascotas/registro', component: MascotaRegistro },

  // 🔹 Nueva ruta para el panel del administrador
  { path: 'admin', component: Admin },

  // Nueva ruta para el calendario de citas
  { path: 'calendario', component: Calendario },

  // Redirección por defecto (si no se encuentra la ruta)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
