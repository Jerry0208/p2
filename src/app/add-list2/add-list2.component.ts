import { FormsModule,} from '@angular/forms'
import { MatSelectModule } from '@angular/material/select';//selcet
import { MatIconModule } from '@angular/material/icon';//Icon
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Table
import { MatCheckboxModule } from '@angular/material/checkbox'; //必選功能
import { SelectionModel } from '@angular/cdk/collections';// Table 選取功能
import { Router } from '@angular/router';
import { NewQuest } from '../service/newQuest.service';//service
import { ControlTabComponent } from '../control-tab/control-tab.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';//Dialog
import { MatButtonModule } from '@angular/material/button';//Dialog
import { MatDialog, MatDialogModule } from '@angular/material/dialog';//Dialog
import { CheckQuestionComponent } from '../check-question/check-question.component';

export interface questionTemp {
  id: number;
  questName: string;
  need: boolean;
  type: string;
  options: Array<string>;
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
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-list2.component.html',
  styleUrl: './add-list2.component.scss',
  //Dialog
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AddList2Component {
  constructor(private router: Router, private quesTemp: NewQuest, private tabLink: ControlTabComponent) { }

  //Dialof
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CheckQuestionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //table
  displayedColumns: string[] = ['select', 'id', 'questName', 'type', 'options', 'need', 'rewrite'];
  dataSource = new MatTableDataSource<questionTemp>();
  //table selection
  selection = new SelectionModel<questionTemp>(true, []);

  //接資料 ngModle
  id: number = 0;
  questName !: string;
  need: boolean = false;
  type !: string;
  options: string = '';


  //以下註解有英文的都不是很懂，要問老師。考察:類似沒全選時全選 跟 全選時取消全選
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: questionTemp): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  //刪除列表
  deleteSelectedRows() {
    // 濾除被選取的資料列
    this.dataSource.data = this.dataSource.data.filter(row => !this.selection.isSelected(row));

    // 更新 dataSource.data 並
    this.dataSource.data = this.dataSource.data;
    // 清除選取狀態
    this.selection.clear();

    // ID重新排序
    this.dataSource.data = this.dataSource.data.map((element, index) => ({
      ...element,
      id: index + 1
    }))

    //ID數字更新為當前長度
    this.id = this.dataSource.data.length;
  }


  //將寫好的資料加入 Table 中
  addRow() {

    //判斷是否都已填寫
    if (this.formNotComplete()) {
      return
    }

    //.replace(/\s/g, "") 去除空白建,再以.split(";")分割
    let options = this.options.replace(' ', "").split(";");
    //ID 增加
    this.id += 1;
    //將newQues 放入 Table 內
    let newQues = { id: this.id, questName: this.questName, need: this.need, type: this.type, options: options };

    //失敗 可能要問老師
    // ELEMENT_DATA.push(newQues)
    // this.dataSource = ELEMENT_DATA

    this.dataSource.data = [...this.dataSource.data, newQues];
    this.questName = '';
    this.type = '';
    this.need = false;
    this.options = '';

  }


  //再編輯模式
  rewriteMode: boolean = false
  //再編輯
  rewrite(element: any) {
    //把值透過 ngModle 放回畫面上
    this.id = element.id;
    this.questName = element.questName;
    this.type = element.type;
    this.need = element.need;
    // ''+ = .toString方法，之後把變成陣列的,換成;

    for (let i = 0; i < element.options.length; i++) {
      if (i == element.options.length - 1) {
        this.options += element.options[i];
      } else {
        this.options += element.options[i] + ';';
      }
    }

    this.rewriteMode = true;

  }

  //再編輯加入按鍵
  reAddRow() {

    //判斷是否都已填寫
    if (this.formNotComplete()) {
      return
    }

    //.replace(/\s/g, "") 去除空白建,再以.split(";")分割
    let options = this.options.replace(/\s/g, "").split(";");

    //將newQues 放入 Table 內
    let newQues = { id: this.id, questName: this.questName, need: this.need, type: this.type, options: options };

    //失敗 可能要問老師
    // ELEMENT_DATA.push(newQues)
    // this.dataSource = ELEMENT_DATA
    this.dataSource.data = this.dataSource.data.filter(data => !(data.id == (this.id)));
    //將數據放入Table內
    this.dataSource.data = [...this.dataSource.data, newQues];
    //重新排列 方法細節在下方
    this.refresh();

    //清空輸入欄位
    this.questName = '';
    this.type = '';
    this.need = false;
    this.options = '';
    this.id = this.dataSource.data.length;
    this.rewriteMode = false;
  }

  //重新排列
  refresh() {
    //從 datasource 將資料取來排序後放回 dataSource
    //.sort ((a,b) => {}) 另一種寫法 與 function 作用一樣
    this.dataSource.data = this.dataSource.data.sort(function (a, b) {
      //如果 a 的 id 比 b 的 id 小 : 就退位
      if (a.id < b.id) {
        return -1;
      }
      //如果 a 的 id 比 b 的 id 小 : 就進位
      if (a.id > b.id) {
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
      if (!this.options) {
        alert('請填寫題目內容')
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
    // this.router.navigateByUrl('')
    console.log(this.dataSource.data);
  }

}
