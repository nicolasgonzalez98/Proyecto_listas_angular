import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: any[] = [];
  constructor() { };

  crearLista(nombreLista: string) { 
    let ObjetoLista = { //creamos una variable de tipo array 
      id: 0, 
      titulo: nombreLista, 
      creadaEn: new Date(), 
      terminadaEn: null, 
      completada: false, 
      item: [] //Para guardar la lista de actividades 
    }; 
    this.listas.push(ObjetoLista); //ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage();
  }
  
  guardarStorage() { 
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano 
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el segundo el contenido 
  } 
}
