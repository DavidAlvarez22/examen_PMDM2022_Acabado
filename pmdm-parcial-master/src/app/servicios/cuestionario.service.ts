import { GestionStorageService } from './gestion-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cuestionario } from '../interfaces/interface';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  

 arrayPregunta : cuestionario[] =[];

  constructor(private leer: HttpClient, private almacen: GestionStorageService, private alerta: AlertController ) { 
    this.cargarDatos();
  }

  // Método que devolverá todas las preguntas del cuestionario en un array
  public getPreguntas() {
    return this.arrayPregunta
   }

  // Recupera las preguntas de Storage. Si no hay ninguna almacenada, las lee del fichero
  public cargarDatos() {
    let datosPromesa : Promise <cuestionario[]> = this.almacen.getObject("arrayPregunta");
    datosPromesa.then(datos =>{
      if(datos) {
      this.arrayPregunta = datos}
      else{
        this.cargarFichero()
      }

      })
    
   }

  // Lee los datos de un fichero y los almacena en un array
  public cargarFichero() {
    let leerFichero : Observable <cuestionario[]>;
    leerFichero = this.leer.get<cuestionario[]>("/assets/datos/datos.json")

    leerFichero.subscribe(datos =>{
      console.log(datos);
      this.arrayPregunta.push(...datos);
    })

   }

  // Abre una alerta con el enunciado de la pregunta y comprueba la respuesta
  // En función de si es correcta o no, actualiza el valor del atributo "contestada"
  public async responder(dato: cuestionario) {
        
      const alert = await this.alerta.create({
        cssClass: 'my-custom-class',
        header: 'PREGUNTA',
        message: dato.pregunta,
        inputs: [{
          name: 'name1',
          type: 'text'
        }
        ]
        ,
        buttons: [
         {
            text: 'Okay',
            id: 'confirm-button',
            handler: (data) => {
              console.log(data.name1);
              if(data.name1 == dato.respuesta){
              console.log('Confirm Okay');
              dato.contestada = 1;
            }
              else{
                console.log('fallo');
                dato.contestada = -1;
              }
            }
          
          }
        ]
      });
  
      await alert.present();
    }
  
  // Almacena el array de preguntas en Storage
  public guardar() {

    this.almacen.setObject("arrayPregunta",this.arrayPregunta);

  }
}
