import {Annee} from "./annee";
import {Mois} from "./mois";

export class AnneeMois {
  id: number = 0;
  dateDebut?: any;
  dateFin?: any;
  etat: boolean = true;
  mois : Mois = new Mois();
  annee : Annee = new Annee();
}
