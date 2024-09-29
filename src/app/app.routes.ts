import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'agregar/:idLista',
    loadComponent: () => import('./agregar/agregar.page').then( m => m.AgregarPage)
  },

];
