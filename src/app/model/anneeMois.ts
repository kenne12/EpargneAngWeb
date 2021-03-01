import {Annee} from "./annee";
import {Mois} from "./mois";

export class AnneeMois {
  id?: number;
  dateDebut?: string;
  dateFin?: string;
  etat?: boolean;
  mois?: Mois;
  annee?: Annee;
}
