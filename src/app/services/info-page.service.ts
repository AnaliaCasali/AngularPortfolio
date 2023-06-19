import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-page.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
info: InfoPagina = {};
equipo: any[] =[];
cargada=false;
  constructor(private http:HttpClient) { 
    this.cargarInfo();
    this.cargarEquipo();

      }
  private cargarInfo() {
    console.log("servicio de Info listo");
    this.http.get('assets/data/data-page.json')
       .subscribe((resp: InfoPagina)  => {
        this.cargada=true;
        this.info=resp;
        console.log(this.info);
        //console.log(resp['email']);
      
      })
    
  }

  private cargarEquipo(){
    console.log("servicio de equipo listo");
    this.http.get('https://angular-html-f6b2d-default-rtdb.firebaseio.com/equipo.json')
       .subscribe((resp: any)  => {
//        this.cargada=true;
        this.equipo=resp;
        console.log(this.equipo);
        //console.log(resp['email']);
      
      })


  }

}

