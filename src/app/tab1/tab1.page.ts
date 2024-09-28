import { Component, NgModule } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon,IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, arrowForwardCircle, text } from 'ionicons/icons';
import { AlertController, ToastController } from "@ionic/angular"
import { ListaService } from '../services/lista.service';
import { CommonModule } from '@angular/common';
import { Lista } from '../models/lista.model';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonFab, IonIcon, IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption],
  
  
})

export class Tab1Page {
  constructor(
    public alertController:AlertController,
    public toastController:ToastController,
    public listaService:ListaService
  ) {
    addIcons({addCircleOutline,arrowForwardCircle});
  }

  /** 
   * * @function AgregarLista 
   * * @description La función será ejecutada cuando el usuario haga click en el botón Agregar 
   * * Muestra una alerta donde solicita el nombre de la lista 
   */ 
  async AgregarLista() {
    let alerta = await this.alertController.create({ 
      header: "Agregar lista", 
      inputs: [ 
        { 
          type: "text", 
          name: "titulo", 
          placeholder: "Ingresar nombre de la lista" 
        } 
      ],
      buttons: [
        {
          text:"Cancelar",
          role:"cancel"
        },
        {
          text:"Crear",
          handler:(data:any)=>{
            let esValido:boolean = this.validarInput(data);
            if(esValido){
              let creadaOk = this.listaService.crearLista(data.titulo);
              
              if(creadaOk){ //Se verifica si la variable tiene un valor, es decir, que fue creada
                this.presentToast('Lista creada correctamente!');
              }               
            }
            
          }
        }

      ]
      }) 

    await alerta.present(); 
     
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

  async EditarLista(lista: Lista) {
    let alerta = await this.alertController.create({
    header: "Editar lista",
    inputs: [
        {
        type: "text",
        name: "titulo",
        placeholder: "Ingresar nuevo nombre de la lista",
        value: lista.titulo
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
              lista.titulo = data.titulo,
              this.listaService.editarLista(lista);
              this.presentToast('Lista editada correctamente!');
              }
            }
        }
      ]
    })
    await alerta.present(); 
  }

    eliminarLista(listaItem: Lista) {
      this.listaService.eliminarLista(listaItem);
      
    }

    editarLista(listaItem:Lista){
      this.EditarLista(listaItem)
    }
   
}
