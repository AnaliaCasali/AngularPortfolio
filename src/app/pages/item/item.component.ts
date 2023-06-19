import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  
  producto: ProductoDescripcion | undefined;
  id: String | undefined;
  constructor(private route: ActivatedRoute,
    public productoService: ProductoService) { 


    }


  ngOnInit(): void {

    /*chequea los parametros de la url*/
    this.route.params.subscribe(parametros=>{
      this.productoService.getProducto(parametros ['id'])
      .subscribe((producto:any  )=> {
        this.id = parametros['id'];
         this.producto=producto;
       });
      
    });
  }

}
