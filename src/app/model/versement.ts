import {Client} from "./client";
import {AnneeMois} from "./anneeMois";

export class Versement {
  idVersement: number = 0;
  montant: number = 0;
  date?: any;
  heure?: any;
  solde?: number;
  client: Client = new Client();
  mois?: AnneeMois;
}
