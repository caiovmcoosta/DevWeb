import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Matricula } from '../matricula';
import { MatriculaService } from '../matricula.service';

@Component({
  selector: 'app-matricula-search',
  templateUrl: './matricula-search.component.html',
  styleUrls: ['./matricula-search.component.css']
})
export class MatriculaSearchComponent implements OnInit {
  matriculas$!: Observable<Matricula[]>;
  private searchTerms = new Subject<string>();

  constructor(private matriculaService: MatriculaService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.matriculas$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.matriculaService.searchMatriculas(term)),
    );
  }
}