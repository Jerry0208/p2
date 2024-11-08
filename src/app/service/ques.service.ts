// survey.service.ts
import { Injectable } from '@angular/core';

//將該類別在程式啟動時全部的TS都能夠利用或是 import 此類別，類似一種宣告(固定寫法)
@Injectable({
  providedIn: 'root'
})
export class QuesService {

  //假問卷
  private questions = [
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
      options: ['工作環境改善', '技術設備升級', '團隊合作', '培訓與發展機會']
    },
    {
      id: 3,
      name: 'question4',
      text: '請描述過去一年中您在工作上遇到的主要挑戰：',
      required: false,
      type: 'textarea'
    },
    {
      id: 4,
      name: 'question5',
      text: '您對公司未來發展有什麼建議或期望？',
      required: false,
      type: 'textarea'
    }
  ];

  private answerStr = '{'
  private answers !: JSON;

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
    return this.answers
  }

  getQuestion(){
    return this.questions
  }

}


