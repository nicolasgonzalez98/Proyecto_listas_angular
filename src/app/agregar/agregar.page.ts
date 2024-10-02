import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, 
  IonBackButton, IonButtons, IonLabel, IonItem,
  IonList, IonListHeader, IonInput, IonItemSliding,
  IonCheckbox, IonItemOption, IonItemOptions
 } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.model';
import { Actividad } from '../models/actividades.model';
import { AlertController, ToastController } from "@ionic/angular"

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
            IonBackButton, IonButtons, IonLabel, IonItem, IonList, ReactiveFormsModule,
            IonListHeader, IonInput, IonItemSliding, IonCheckbox, IonItemOption, IonItemOptions
  ]
})
export class AgregarPage implements OnInit {

  lista:Lista;
  nombreItem:string;
  

  constructor(
    private router:ActivatedRoute,
    public listaService:ListaService,
    public alertController:AlertController,
    public toastController:ToastController
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

  editar(actividad: Actividad) { 
    this.EditarActividad(actividad)
  }

  eliminar(actividad: Actividad) { 
    this.lista.item = this.lista.item.filter((item)=> item !== actividad); 
    this.listaService.guardarStorage(); 
  } 

  cambioCheck(){
    const pendientes = this.lista.item.filter((item)=> item.completado == false).length; 
    if(pendientes == 0) { 
      this.lista.completada = true; 
      this.lista.terminadaEn = new Date(); 
    } else { 
      this.lista.completada = false; 
      this.lista.terminadaEn = undefined; 
    } 
    this.listaService.guardarStorage();
  }

  validarInput(input: any):boolean {
    if(input && input.titulo) {       
      return true;
    }
    this.presentToast('Debe ingresar un valor'); 
    return false;
  }

  async presentToast(mensage:string) { 
    let toast = await this.toastController.create({ message: mensage, duration: 2000 }); 
    toast.present(); 
  }

  async EditarActividad(actividad: Actividad) {
    let alerta = await this.alertController.create({
    header: "Editar lista",
    inputs: [
        {
        type: "text",
        name: "titulo",
        placeholder: "Ingresar nuevo nombre de la actividad",
        value: actividad.descripcion
        }
      ],
    buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data:any)=> {
            let esValido: boolean = this.validarInput(data);
            if (esValido){
              actividad.descripcion = data.titulo,
              this.listaService.guardarStorage()

              this.presentToast("Lista editada correctaemnte!")
              }
            }
        }
      ]
    })
    await alerta.present(); 
  }
  

}
