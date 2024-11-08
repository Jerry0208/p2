import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss'
})
export class AddListComponent {
  constructor(private router: Router) { }

  //日期選擇範圍 : 當日 ~ 選擇日期
  toDay = new Date();
  //grtMonth 回傳範圍 : 0 ~ 11 對應 1 ~ 12 月
  mon: number = this.toDay.getMonth() + 1;
  //getDate 回傳當日日期，日期小於10時會回傳單位數
  date: number = this.toDay.getDate();
  defaultDate: string = "";

  //在頁面開啟時
  ngOnInit(): void {

    let mon: string;
    let date: string;

    //判斷月份
    if (this.mon < 10) {
      mon = "0" + (this.mon)
    } else {
      mon = this.mon.toString();
    }

    //判斷日期
    if (this.date < 10) {
      date = "0" + (this.date)
    } else {
      date = this.date.toString();
    }
    // <input  type : date> 接收日期格式 : yyyy-mm-dd
    this.defaultDate = this.toDay.getFullYear() + "-" + mon + "-" + date;
  }

  // ngAfterContentInit() {
  //   if (this.mon <= 10) {
  //     this.mon_s = "0" + (this.mon + 1)
  //   } else {
  //     this.mon_s = this.mon.toString();
  //   }
  //   if (this.date < 10) {
  //     this.date_s = "0" + (this.date)
  //   } else {
  //     this.date_s = this.date.toString();
  //   }

  //
  // }


  stratDate = '';
  endDate = ''

  backList() {
    this.router.navigate(['/list'])
  }



}
