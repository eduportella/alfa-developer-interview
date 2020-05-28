import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AeroportoOutputModel } from '../models/aeroportos.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AeroportosService {

  constructor(private http: HttpClient) { }

  recuperarTodasAeroportos(): Observable<AeroportoOutputModel[]> {
    const url = environment.apiUrl + "/Airports";
    return this.http.get<AeroportoOutputModel[]>(url)
      .pipe(
        tap(pessoas => console.log('Recuperados todos')),
        catchError(this.handleError('RecuperarTodos', []))
      );
  }

  recuperarAeroportosTermo(termo: string): Observable<any> {
    const url = environment.apiUrl + "/Airports?$filter=contains(Location/Address,'" + termo + "')";
    return this.http.get<string>(url).pipe(
      tap(_ => console.log(`localizados para o termo =${termo}`)),
      catchError(this.handleError<AeroportoOutputModel>())
    );
  }

  // Manipulação de erros
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
