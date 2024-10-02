import { Component, Input, OnInit } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  implements OnInit {
  @Input() tipo:string = ''; 

  constructor(
    public listaService: ListaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  async EditarLista(lista: Lista) {
    let alerta = await this.listaService.alertController.create({
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
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido){
              lista.titulo = data.titulo,
              this.listaService.editarLista(lista);
              this.listaService.presentToast('Lista editada correctamente!');
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

    listaSeleccionada(listaItem:Lista){
      const URL = '/agregar/' + listaItem.id
      this.router.navigateByUrl(URL);
    }

}
