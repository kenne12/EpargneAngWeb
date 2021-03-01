import {AnneeMois} from "./anneeMois";
import {Client} from "./client";

export class Retrait {
  idRetrait: number = 0;
  montant: number = 0;
  date: any;
  heure?: any;
  commission: number = 0;
  commissionAuto?: boolean;
  solde: number = 0;
  client: Client = new Client();
  mois?: AnneeMois;
}
