import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { UsuarioLogado } from 'app/model/usuarioLogado';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuarioLogado: UsuarioLogado;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    if (this.sharedService.isLoggedIn()) {
      this.usuarioLogado = this.sharedService.getCurrentLogin();
      console.log('this.usuarioLogado');
      console.log(this.usuarioLogado);
    }
  }

}
