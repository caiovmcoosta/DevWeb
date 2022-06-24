import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Matricula } from './matricula';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root'})
export class MatriculaService {

  private matriculasUrl = 'api/matriculas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

   /** GET matriculas from the server */
   getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.matriculasUrl)
      .pipe(
        tap(_ => this.log('fetched matriculas')),
        catchError(this.handleError<Matricula[]>('getMatriculas', []))
      );
  }
  
  /** GET matricula by id. Return `undefined` when id not found */
  getMatriculaNo404<Data>(id: number): Observable<Matricula> {
    const url = `${this.matriculasUrl}/?id=${id}`;
    return this.http.get<Matricula[]>(url)
      .pipe(
        map(matriculas => matriculas[0]), // returns a {0|1} element array
        tap(m => {
          const outcome = m ? 'fetched' : 'did not find';
          this.log(`${outcome} matricula id=${id}`);
        }),
        catchError(this.handleError<Matricula>(`getMatricula id=${id}`))
      );
  }

  //** GET matricula by id. Will 404 if id not found */
  getMatricula(id: number): Observable<Matricula> {
    const url = `${this.matriculasUrl}/${id}`;
    return this.http.get<Matricula>(url).pipe(
      tap(_ => this.log(`fetched matricula id=${id}`)),
      catchError(this.handleError<Matricula>(`getMstricula id=${id}`))
    );
  }

  /* GET matriculas whose name contains search term */
  searchMatriculas(term: string): Observable<Matricula[]> {
    if (!term.trim()) {
      // if not search term, return empty matricula array.
      return of([]);
    }
    return this.http.get<Matricula[]>(`${this.matriculasUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found matriculas matching "${term}"`) :
         this.log(`no matriculas matching "${term}"`)),
      catchError(this.handleError<Matricula[]>('searchMatriculas', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new matricula to the server */
  addMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.matriculasUrl, matricula, this.httpOptions).pipe(
      tap((newMatricula: Matricula) => this.log(`added mstricula w/ id=${newMatricula.id}`)),
      catchError(this.handleError<Matricula>('addMatricula'))
    );
  }

  /** DELETE: delete the matricula from the server */
  deleteMatricula(id: number): Observable<Matricula> {
    const url = `${this.matriculasUrl}/${id}`;

    return this.http.delete<Matricula>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted matricula id=${id}`)),
      catchError(this.handleError<Matricula>('deleteMatricula'))
    );
  }

  /** PUT: update the matricula on the server */
  updateMatricula(matricula: Matricula): Observable<any> {
    return this.http.put(this.matriculasUrl, matricula, this.httpOptions).pipe(
      tap(_ => this.log(`updated matricula id=${matricula.id}`)),
      catchError(this.handleError<any>('updateMatricula'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a matriculaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MatriculaService: ${message}`);
  }
}