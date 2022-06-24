import { CheckboxRequiredValidator, Validator } from "@angular/forms";

export interface Matricula {
    id: number;
    nomealuno: string;
    datanasc: Date;
    cpf: number;
    rg: number;
    nacionalidade: string;
    email: string;
    endereco: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: number;
    sexo: string;
    civil: string;
    ingress: string;
    periodo: string;
    conclusaomedio: Date;
    telefone: number;
    celular: number;
    autoriza: boolean;
  }