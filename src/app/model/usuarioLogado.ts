import { Pessoa } from "./pessoa";

export class UsuarioLogado {
    public id: number;
    public email: string;
    public senha: string;
    public pessoa: Pessoa;
}
