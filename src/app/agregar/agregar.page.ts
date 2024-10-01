import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonBackButton, IonButtons, IonLabel, IonItem,
  IonList, IonListHeader
 } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividades.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
            IonBackButton, IonButtons, IonLabel, IonItem, IonList, ReactiveFormsModule,
            IonListHeader
  ]
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem:string = "";
  

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

  onInput(event: any) {
    this.nombreItem = event.detail.value;  // Correctamente obtenemos el valor
    console.log('Valor de nombreItem:', this.nombreItem);
  }

  agregar() {
    
    if(this.nombreItem.length === 0) {
      
      return
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem = '';

  }
  

}
