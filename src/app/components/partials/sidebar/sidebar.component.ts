import { Component, OnInit } from '@angular/core';
import { UsuarioLogado } from 'app/model/usuarioLogado';
import { SharedService } from 'app/services/shared.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/measurement-list', title: 'Medições',  icon:'assessment', class: '' },
    { path: '/user-profile', title: 'Perfil de Usuário',  icon:'person', class: '' },
    { path: '/companies-list', title: 'Empresas',  icon:'store', class: '' },
    { path: '/users-list', title: 'Usuários',  icon:'supervisor_account', class: '' },
    { path: '/factors-list', title: 'Fatores',  icon:'adjust', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuarioLogado: UsuarioLogado;
  menuItems: any[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    // this.menuItems = ROUTES.filter(menuItem => menuItem);

    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();

      ROUTES.forEach(route => {
        if (this.usuarioLogado.email === 'jhemesonmotta@gmail.com' || this.usuarioLogado.email === 'jhemeson@gmail.com') {
          this.menuItems.push(route);
        } else {
          if (route.path === '/dashboard' || route.path === '/measurement-list' || route.path === '/user-profile') {
            this.menuItems.push(route);
          }
        }
      });
    }
  }
}
