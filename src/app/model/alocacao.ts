import { Pessoa } from './pessoa';
import { Empresa } from './empresa';

export class Alocacao {
    public id: number;
    public empresa: Empresa;
    public pessoa: Pessoa;
    public cargo: string;
    public dataInicio: string;
    public dataFim: string;
}
