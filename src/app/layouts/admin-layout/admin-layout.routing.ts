import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AddAlocacaoComponent } from 'app/components/alocacao/add-alocacao/add-alocacao.component';
import { ListarEmpresasComponent } from 'app/listar-empresas/listar-empresas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                        component: DashboardComponent },
    { path: 'user-profile',                     component: UserProfileComponent },
    { path: 'companies-list',                        component: ListarEmpresasComponent },
    { path: 'table-list',                       component: TableListComponent },
    { path: 'notifications',                    component: NotificationsComponent },
    { path: 'user-profile/add-alocation/:id',   component: AddAlocacaoComponent },
];
