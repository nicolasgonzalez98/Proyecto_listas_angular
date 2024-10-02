import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonIcon,IonFabButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, arrowForwardCircle, text } from 'ionicons/icons';
import { AlertController, ToastController } from "@ionic/angular"
import { ListaService } from '../services/lista.service';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonFab, IonIcon, 
    IonFabButton, IonList, IonItem, IonLabel, 
    IonItemSliding, IonItemOptions, IonItemOption,
    ComponentsModule, 
    ], 
})

export class Tab1Page {
  constructor(
    public alertController:AlertController,
    public toastController:ToastController,
    public listaService:ListaService
  ) {
    addIcons({addCircleOutline,arrowForwardCircle});
  }

  async AgregarLista() {
    let alerta = await this.listaService.alertController.create({ 
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
            let esValido:boolean = this.listaService.validarInput(data);
            if(esValido){
              let creadaOk = this.listaService.crearLista(data.titulo);
              
              if(creadaOk){ //Se verifica si la variable tiene un valor, es decir, que fue creada
                this.listaService.presentToast('Lista creada correctamente!');
              }               
            }
            
          }
        }

      ]
      }) 

    await alerta.present(); 
     
  }
}
