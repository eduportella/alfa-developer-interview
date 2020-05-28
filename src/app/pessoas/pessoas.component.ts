import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../services/pessoas.service';
import { PessoasOutputModel, PessoasInputModel, AddressData, cityData } from '../models/pessoas.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;
  data: any[] = [];
  public pessoasLista: any;
  public usernameBusca: string;
  public pessoaData: PessoasInputModel = new PessoasInputModel();
  public pessoaEndereco: AddressData = new AddressData();
  public cityData: cityData = new cityData();
  public email: string;

  // validadores
  invalidUserName: boolean = false;
  invalidFirstName: boolean = false;
  invalidLastName: boolean = false;
  invalidEmails: boolean = false;

  constructor(private pessoasService: PessoasService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {
    this.usernameBusca = 'henry';
    this.pesquisarNome();
  }

  carregarLista() {
    this.pessoasService.recuperarTodasPessoas().subscribe((res: any) => {
      this.data = res.value;
      console.log(this.data);
    }, err => {
      console.log(err);
    });
  }

  pesquisarNome() {
    if (this.usernameBusca) {
      this.pessoasService.recuperarPessoa(this.usernameBusca).subscribe((res: any) => {
        this.data = res.value;
        console.log(this.data);
      }, err => {
        console.log(err);
      });
    } else {
      this.carregarLista();
    }
  }

  RemoverPessoa(userName) {
    this.pessoasService.deletePessoa(userName).subscribe((res: any) => {
      this.data = res.value;
      console.log(this.data);
      alert('removido com sucesso')
    }, err => {
      console.log(err);
    });
    this.carregarLista();
  }

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public SalvarPessoa() {
    if (this.validar()) {
      this.pessoaData.AddressInfo = [];
      this.pessoaData.Emails = [];
      this.pessoaEndereco.City = this.cityData;
      this.pessoaData.AddressInfo.push(this.pessoaEndereco);
      this.pessoaData.Emails.push(this.email);
      this.pessoasService.adicionarPessoa(this.pessoaData).subscribe((res: any) => {
        this.data = res.value;
        console.log(this.data);
        this.modalService.dismissAll();
        alert('incluido com sucesso');
      }, err => {
        console.log(err);
      });
      this.carregarLista();
    } else {
      alert('campos obrigatórios nao foram preenchidos')
    }
  }

  validar() {
    if (this.pessoaData.UserName === undefined || this.pessoaData.UserName === "") {
      this.invalidUserName = true;
    } else {
      this.invalidUserName = false;
    }
    if (this.pessoaData.FirstName === undefined || this.pessoaData.FirstName === "") {
      this.invalidFirstName = true;
    } else {
      this.invalidFirstName = false;
    }
    if (this.pessoaData.LastName === undefined || this.pessoaData.LastName === "") {
      this.invalidLastName = true;
    } else {
      this.invalidLastName = false;
    }
    if (this.email === undefined || this.email === "") {
      this.invalidEmails = true;
    } else {
      this.invalidEmails = false;
    }
    if (this.invalidFirstName === true || this.invalidLastName === true || this.invalidEmails === true || this.invalidUserName === true) {
      return false;
    } else {
      return true;
    }
  }

}
