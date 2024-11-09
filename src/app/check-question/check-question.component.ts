import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewQuest } from '../service/newQuest.service';

@Component({
  selector: 'app-check-question',
  standalone: true,
  imports: [],
  templateUrl: './check-question.component.html',
  styleUrl: './check-question.component.scss',
  //dialog
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckQuestionComponent {

  constructor(private ques : NewQuest){}

   //問卷基本資訊
  //問卷名
  title!: string;
  //問卷描述
  explain!: string;
  //狀態
  status!: string;
  //起迄日期
  sDate!: string;
  eDate!: string;
  //問卷內容
  questArray!: Array<any>;
  //問卷內容
  //問題的ID
  questId!: number;
  //必填欄位
  need!: boolean;
  //問題名
  questName!: string;
  //問題類型
  type!: string;

  //題目 (短述題為空值)
  options!: JSON[];


  ngOnInit(): void {
    this.title = this.ques.title;
    this.explain = this.ques.explain;
  }

}
