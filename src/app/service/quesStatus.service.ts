import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class QuesStatus{
  quesStatus !: string;
  hideBackButton !:boolean ;
}
