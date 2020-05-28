import { Component, OnInit } from '@angular/core';
import { AeroportosService } from '../services/aeroportos.service';

@Component({
  selector: 'app-aeroportos',
  templateUrl: './aeroportos.component.html',
  styleUrls: ['./aeroportos.component.scss']
})
export class AeroportosComponent implements OnInit {


  public termoBusca: string;
  public data: [] = [];

  constructor(private aeroportoService: AeroportosService) { }

  ngOnInit(): void {
    this.termoBusca = 'District';
    this.pesquisarAeroporto();
  }


  carregarLista() {
    this.aeroportoService.recuperarTodasAeroportos().subscribe((res: any) => {
      this.data = res.value;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }

  pesquisarAeroporto() {
    if (this.termoBusca) {
      this.aeroportoService.recuperarAeroportosTermo(this.termoBusca).subscribe((res: any) => {
        this.data = res.value;
        console.log(this.data);
      }, err => {
        console.log(err);
      });
    } else {
      this.carregarLista();
    }
  }

}
