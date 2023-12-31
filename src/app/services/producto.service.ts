import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
cargando=true;
productos: Producto[]= [];
productosFiltrado: Producto[] = [];


  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://angular-html-f6b2d-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        }, (error: any) => {
          reject(error);
        });
    });
  }

  public getProducto(id:String){
    // retorna la definicion de un observable
    return this.http.get(`https://angular-html-f6b2d-default-rtdb.firebaseio.com/productos/${id}.json`);       
  }


  buscarProducto( termino: string ) {


    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0  ) {
        this.productosFiltrado.push( prod );
      }

    });


  }


}
