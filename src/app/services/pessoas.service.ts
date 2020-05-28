import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { PessoasOutputModel, PessoasInputModel } from '../models/pessoas.model';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class PessoasService {

  constructor(private http: HttpClient) { }

  recuperarTodasPessoas(): Observable<PessoasOutputModel[]> {
    const url = environment.apiUrl + "/People";
    return this.http.get<PessoasOutputModel[]>(url)
      .pipe(
        tap(pessoas => console.log('Pessoas Recuperadas')),
        catchError(this.handleError('RecuperarTodos', []))
      );
  }

  recuperarPessoa(username: string): Observable<any> {
    const url = environment.apiUrl + "/People?$filter=contains(UserName,'" + username + "')";
    return this.http.get<string>(url).pipe(
      tap(_ => console.log(`fetched cases id=${username}`)),
      catchError(this.handleError<PessoasOutputModel>())
    );
  }

  deletePessoa(username: string): Observable<any> {
    const url = environment.apiUrl + "/People('" + username + "')";
    return this.http.delete<string>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted`)),
      catchError(this.handleError<any>('delete'))
    );
  }

  adicionarPessoa(pessoa: PessoasInputModel): Observable<any> {
    const url = environment.apiUrl + "/People";
    return this.http.post<any>(url, pessoa, httpOptions)
      .pipe(
        tap(pessoas => console.log('Pessoa Adicionada')),
        catchError(this.handleError('AdicionarPessoa', []))
      );
  }


  // Manipulação de erros
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
