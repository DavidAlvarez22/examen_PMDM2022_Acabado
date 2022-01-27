import { cuestionario } from './../interfaces/interface';
import { CuestionarioService } from './../servicios/cuestionario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {

  constructor(public leer : CuestionarioService) {

  }
  
 public onClick(datos: cuestionario){
    this.leer.responder(datos);
    
  }
  public guardardo(){
    this.leer.guardar();
  }


}
