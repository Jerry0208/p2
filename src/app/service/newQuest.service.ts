import { Injectable } from '@angular/core';

//將該類別在程式啟動時全部的TS都能夠利用或是 import 此類別，類似一種宣告(固定寫法)
@Injectable({
  providedIn: 'root'
})

//之後這個可以做為問卷的收發的 interface 和 class
//先放置 =)


export class newQuet implements QuetTem {
  //問卷基本資訊
  id!: number;
  name!: string;
  des!: string;
  status!: string;
  sDate!: string;
  eDate!: string;
  //問卷內容
  questId!: number;
  text!: string;
  need!: boolean;
  options!: Array<JSON>;
}

interface QuetTem {
  id: number;
  name: string;
  des: string;
  status: string;
  sDate: string;
  eDate: string;
  //問卷內容
  questId: number;
  text: string;
  need: boolean;
  options: Array<JSON>;

}
