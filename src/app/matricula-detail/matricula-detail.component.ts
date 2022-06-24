import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Matricula } from '../matricula';
import { MatriculaService } from '../matricula.service';

@Component({
  selector: 'app-matricula-detail',
  templateUrl: './matricula-detail.component.html',
  styleUrls: ['./matricula-detail.component.css'],
})
export class MatriculaDetailComponent implements OnInit {
  matricula: Matricula | undefined;

  constructor(
    private route: ActivatedRoute,
    private matriculaService: MatriculaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMatricula();
  }
  
  getMatricula(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.matriculaService.getMatricula(id)
      .subscribe(matricula => this.matricula = matricula);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.matricula) {
      this.matriculaService.updateMatricula(this.matricula)
        .subscribe(() => this.goBack());
    }
  }

}
