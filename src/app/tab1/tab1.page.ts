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
    ComponentsModule
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
}
