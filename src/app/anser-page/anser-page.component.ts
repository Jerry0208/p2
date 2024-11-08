import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';//ngMoudule、表單功能
import { Router,} from '@angular/router';//router
import { SurveyService } from '../service/survey.service';//暫存資料
import { CommonModule } from '@angular/common';//使用ngFor、ngIf

@Component({
  selector: 'app-anser-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './anser-page.component.html',
  styleUrl: './anser-page.component.scss'
})
export class AnserPageComponent {
  constructor(private router: Router,
    private surveyService: SurveyService) {
  }

  //假問卷
  questions = [
    {
      id: 0,
      name: 'question1',
      text: '您對過去一年公司的整體發展感到滿意嗎？',
      required: true,
      type: 'radio',
      options: ['非常滿意', '滿意', '普通', '不滿意', '非常不滿意']
    },
    {
      id: 1,
      name: 'question2',
      text: '過去一年中，您是否達成了大部分設定的工作目標？',
      required: true,
      type: 'radio',
      options: ['是', '否']
    },
    {
      id: 2,
      name: 'question3',
      text: '您認為下列哪些因素對於提升工作效率有幫助？（多選）',
      required: true,
      type: 'checkbox',
      options: ['工作環境改善', '技術設備升級', '技術設備升級', '培訓與發展機會']
    },
    {
      id: 3,
      name: 'question4',
      text: '請描述過去一年中您在工作上遇到的主要挑戰：',
      required: false,
      type: 'textarea',
      options: []
    },
    {
      id: 4,
      name: 'question5',
      text: '您對公司未來發展有什麼建議或期望？',
      required: false,
      type: 'textarea',
      options: []
    }
  ];


  //基礎問卷表單
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.autoFormAdd();
    this.answersTemplate();
    // console.log(this.answers);

    // 老師示範 : 使用空陣列接api資料
    // let aaa = [];
    //使用迴圈在每一個 JSON 資料內新增一個欄位
    // for(let question of this.questions) {
    //   aaa.push({...question, answer: ''})
    // }

    // test
    // console.log(this.answerStr)
    // console.log(JSON.parse(this.answerStr));
  }



  //以問題長度和是否必選，稱加form
  autoFormAdd() {
    this.questions.forEach((res) => {
      if (res.required) {
        this.form.addControl(res.name, new FormControl('', Validators.required))
      } else {
        this.form.addControl(res.name, new FormControl())
      }
    })
  }

  // 用來儲存問題回答的 answers 物件
  answerStr = '{'
  answers !: Record<string, any>;

  // 以問題長度將問題題目製造 answer 陣列
  answersTemplate() {
    for (let i = 0; i < this.questions.length; i++) {
      if (i == (this.questions.length - 1)) {
        this.answerStr += '"' + this.questions[i].text + '":' + 'null'
      } else {
        this.answerStr += '"' + this.questions[i].text + '":' + 'null,'
      }
    }
    this.answerStr += '}'
    this.answers = JSON.parse(this.answerStr)
  }

  //複選陣列
  onCheckboxChange(questionText: string, option: string, event: any) {
    //如果為null，則顯製作空陣列
    if (!this.answers[questionText]) {
      this.answers[questionText] = [];
    }

    if (event.target.checked) {
      // 如果勾選，將選項加入到對應的問題陣列中
      this.answers[questionText].push(option);
    } else {
      // 如果取消勾選，從對應的問題陣列中移除選項
      const index = this.answers[questionText].indexOf(option);
      if (index > -1) {
        this.answers[questionText].splice(index, 1);
      }
    }

    //test
    // console.log( this.answers);




    //測試 JSON.parse
    // let a = '{ "a" : null }'
    //  ' {" ' + 'a' + ' ":[ ' + 1 + ',' + 2 + ' ]} '
    // console.log(JSON.parse(a));


    //測試 event 和 target
    // console.log((event.target as HTMLInputElement).name);
    // console.log(event.target.name);
    // console.log(event.target.checked);
  }



  submitSurvey() {
    // 用來儲存使用者資料的 userData 物件
    let userData = {
      name: this.form.get('name')?.value,
      phone: this.form.get('phone')?.value,
      email: this.form.get('email')?.value,
      age: this.form.get('age')?.value,
    };

    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].type != "checkbox") {
        this.answers[this.questions[i].text] = this.form.get(this.questions[i].name)?.value
      }
    }

    console.log(this.answers);

    this.surveyService.questData = this.answers; // 儲存回答
    // this.router.navigate(['/check_anser']);          // 導航至確認頁面
  }

  backList() {
    this.router.navigate(['/list'])
  }


}

