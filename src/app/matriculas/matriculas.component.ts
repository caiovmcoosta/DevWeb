import { Component, OnInit } from '@angular/core';

import { Matricula } from '../matricula';
import { MatriculaService } from '../matricula.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
  
})
export class MatriculasComponent implements OnInit {
  matriculas: Matricula[] = [];

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }
  
  getMatriculas(): void {
    this.matriculaService.getMatriculas()
      .subscribe(matriculas => this.matriculas=matriculas);
  }
  add(nomealuno: string): void {
    nomealuno = nomealuno.trim();
    if (!nomealuno) { return; }
    this.matriculaService.addMatricula({ nomealuno } as Matricula)
      .subscribe(matricula => {
        this.matriculas.push(matricula);
      });
  }

  delete(matricula: Matricula): void {
    this.matriculas = this.matriculas.filter(m => m !== matricula);
    this.matriculaService.deleteMatricula(matricula.id).subscribe();
  }

}
