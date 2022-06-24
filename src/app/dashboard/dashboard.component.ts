import { Component, OnInit } from '@angular/core';
import { Matricula } from '../matricula';
import { MatriculaService } from '../matricula.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  matriculas: Matricula[] = [];

  constructor(private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.getMatriculas();
  }

  getMatriculas(): void {
    this.matriculaService.getMatriculas()
      .subscribe(matriculas => this.matriculas = matriculas.slice(1, 5));
  }
}