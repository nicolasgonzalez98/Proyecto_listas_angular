import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
            IonBackButton, IonButtons
  ]
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem:String; 

  constructor(
    private router:ActivatedRoute,
    public listaService:ListaService
  ) { 
    let idLista = this.router.snapshot.paramMap.get('idLista');
    this.lista = new Lista('');
    this.nombreItem = ""

    if(idLista) {
      let ObjetoLista = this.listaService.obtenerLista(idLista);
      if(ObjetoLista){
        this.lista = ObjetoLista;
      }
    }
  }

  ngOnInit() {
  }

}
