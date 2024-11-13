import { FormsModule, } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select';//selcet
import { MatIconModule } from '@angular/material/icon';//Icon
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Table
import { MatCheckboxModule } from '@angular/material/checkbox'; //必選功能
import { SelectionModel } from '@angular/cdk/collections';// Table 選取功能
import { Router } from '@angular/router';
import { NewQuest } from '../service/newQuest.service';//service
import { ControlTabComponent } from '../control-tab/control-tab.component';
import { Component } from '@angular/core';

export interface questionTemp {
  questId: number;
  questName: string;
  need: boolean;
  type: string;
}

@Component({
  selector: 'app-add-list2',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-list2.component.html',
  styleUrl: './add-list2.component.scss',
})



export class AddList2Component {

  constructor(private router: Router, private newQuest: NewQuest, private tabLink: ControlTabComponent, private quesTemp: NewQuest) { }


  //接資料 ngModle
  questId: number = 0;
  questName !: string;
  need: boolean = false;
  type !: string;
  options: string = '';
  //選擇題陣列
  optionsArray : Array<string> = [];

  autoArrayGenerate(){
    this.optionsArray.push('')
  }

  deleteOption(index:number){
    this.optionsArray.splice(index,1)
  }


  //table
  displayedColumns: string[] = ['select', 'questId', 'questName', 'type', 'need', 'rewrite'];
  dataSource = new MatTableDataSource<questionTemp>();
  //table selection
  selection = new SelectionModel<questionTemp>(true, []);

  ngOnInit(): void {
    this.tabLink.switchTab('/control_tab/add_list2')
    //把寫好的資料放回去
    this.reset()
  }

  reset() {
    if (this.quesTemp) {
      this.dataSource.data = this.quesTemp.questArray
    }
  }

  //以下註解有英文的都不是很懂，要問老師。考察:類似沒全選時全選 跟 全選時取消全選
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: questionTemp): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.questId + 1}`;
  }

  //刪除列表
  deleteSelectedRows() {
    // 濾除被選取的資料列
    this.dataSource.data = this.dataSource.data.filter(row => !this.selection.isSelected(row));

    // 更新 dataSource.data
    this.dataSource.data = this.dataSource.data;
    // 清除選取狀態
    this.selection.clear();

    // questId重新排序
    this.dataSource.data = this.dataSource.data.map((element, index) => ({
      ...element,
      questId: index + 1
    }))

    //questId數字更新為當前長度
    this.questId = this.dataSource.data.length;
  }


  //將寫好的資料加入 Table 中
  addRow() {

    // 判斷是否都已填寫
    if (this.formNotComplete()) {
      return
    }


    //將陣列內的內容依序取出，做成JSON個後加入 optionsArray 陣列中
    let optionsArray: any[] = [];
    for (let i = 0; i < this.optionsArray.length; i++) {
      let toJSON = { optionName: this.optionsArray[i] }
      optionsArray.push(toJSON)
    }

    //questId 增加
    this.questId += 1;
    //將newQues 放入 Table 內
    let newQues = { questId: this.questId, questName: this.questName, need: this.need, type: this.type, options: optionsArray };

    this.dataSource.data = [...this.dataSource.data, newQues];
    this.questName = '';
    this.type = '';
    this.need = false;
    this.optionsArray = [];

  }


  //再編輯模式
  rewriteMode: boolean = false
  //再編輯
  rewrite(element: any) {
    //把值透過 ngModle 放回畫面上
    this.questId = element.questId;
    this.questName = element.questName;
    this.type = element.type;
    this.need = element.need;
    // ''+ = .toString方法，之後把變成陣列的,換成;

    for (let i = 0; i < element.options.length; i++) {
      this.optionsArray.push(element.options[i].optionName)
    }

    this.rewriteMode = true;

  }

  //再編輯加入按鍵
  reAddRow() {

    //判斷是否都已填寫
    if (this.formNotComplete()) {
      return
    }

    //將陣列內的內容依序取出，做成JSON個後加入 optionsArray 陣列中
    let optionsArray: any[] = [];
    for (let i = 0; i < this.optionsArray.length; i++) {
      let toJSON = { optionName: this.optionsArray[i] }
      optionsArray.push(toJSON)
    }

    //將newQues 放入 Table 內
    let newQues = { questId: this.questId, questName: this.questName, need: this.need, type: this.type, options: optionsArray };

    //將原本那一份資料刪除
    this.dataSource.data = this.dataSource.data.filter(data => !(data.questId == (this.questId)));
    //將數據放入Table內
    this.dataSource.data = [...this.dataSource.data, newQues];
    //重新排列 方法細節在下方
    this.refresh();

    //清空輸入欄位
    this.questName = '';
    this.type = '';
    this.need = false;
    this.optionsArray = [];
    this.questId = this.dataSource.data.length;
    this.rewriteMode = false;
  }

  //重新排列
  refresh() {
    //從 datasource 將資料取來排序後放回 dataSource
    //.sort ((a,b) => {}) 另一種寫法 與 function 作用一樣
    this.dataSource.data = this.dataSource.data.sort(function (a, b) {
      //如果 a 的 questId 比 b 的 questId 小 : 就退位
      if (a.questId < b.questId) {
        return -1;
      }
      //如果 a 的 questId 比 b 的 questId 小 : 就進位
      if (a.questId > b.questId) {
        return 1;
      }
      return 0;
    })
  }

  //必填判斷
  formNotComplete() {

    if (!this.questName) {
      alert('請填寫題目')
      return true
    }

    if (!this.type) {
      alert('請選擇題目類型')
      return true
    }

    if (this.type != '短述題') {
      if (!this.optionsArray[0]) {
        alert('請填寫題目選項')
        return true
      }
    }

    return false
  }

  //回去編輯問卷基本資訊
  backAddList1() {
    //讓上方 tab 隨著換頁移動
    this.tabLink.switchTab('/control_tab/add_list1')
    this.router.navigateByUrl('/control_tab/add_list1')
  }

  toCheck() {
    if(this.dataSource.data.length == 0){
      alert('請填寫問卷內容')
      return
    }
    this.newQuest.questArray = this.dataSource.data;
    this.router.navigateByUrl('/check_question')
  }

}
