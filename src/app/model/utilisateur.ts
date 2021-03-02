import {Privilege} from "./privilege";

export class Utilisateur {
  idUtilisateur: number = 0;
  nom: string = "";
  prenom: string = "";
  login: string = "";
  password: string = "";
  photo: string = "";
  actif: boolean = false;
  privileges: Array<Privilege> = [];
}
