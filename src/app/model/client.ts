import {Retrait} from "./retrait";
import {Versement} from "./versement";

export class Client {
  idclient: number = 0;
  nom: string = "";
  prenom: string = "";
  cni?: string;
  contact?: string;
  solde: number = 0;
  profession?: string;
  etat?: boolean = true;
  fraisCarnet: number = 0;
  numeroCarnet: number = 0;
  retraits: Array<Retrait> = [];
  versements: Array<Versement> = [];

  public constructor() {

  }
}
