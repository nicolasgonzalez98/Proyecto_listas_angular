import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon,IonFabButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, arrowForwardCircle, text } from 'ionicons/icons';
import { AlertController, ToastController } from "@ionic/angular"
import { ListaService } from '../services/lista.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonFab, IonIcon, IonFabButton],
  
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
              this.listaService.crearLista(data.titulo)
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
}
