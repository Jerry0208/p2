import { SelectionModel } from '@angular/cdk/collections';//table check box
import { CommonModule } from '@angular/common';//更改按鍵顏色
import { AfterViewInit, Component, ViewChild } from '@angular/core';//table 顯示頁數:ViewChild、AfterViewInit
import { FormsModule } from '@angular/forms';//ngmodule
import { MatCheckboxModule } from '@angular/material/checkbox';//check box module
import { MatIconModule } from '@angular/material/icon';//icon
import { MatPaginator } from '@angular/material/paginator';//list換頁用
import { MatTableModule, MatTableDataSource } from '@angular/material/table';// table
import { RouterLink, RouterLinkActive } from '@angular/router';//router
import { QuesStatus } from '../service/quesStatus.service';


export interface PeriodicElement {
  id: number;
  name: string;
  status: string;
  sDate: string;
  eDate: string;
}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatTableModule,
    MatPaginator,
    MatIconModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})



export class ListComponent implements AfterViewInit {

  constructor(private quesStatus: QuesStatus) { }
  //日期選擇範圍
  startDate: string = ""
  endDate: string = ""

  //管理者模式
  mode: boolean = false;

  //假資料
  listData: PeriodicElement[] = [
    {
      id: 1, name: "市場調查01", status: "已結束", sDate: "2024-01-01", eDate: "2024-03-31",
    },
    {
      id: 2, name: "市場調查02", status: "已結束", sDate: "2024-04-01", eDate: "2024-06-30",
    },
    {
      id: 3, name: "市場調查03", status: "進行中", sDate: "2024-07-01", eDate: "2024-10-30",
    },
    {
      id: 4, name: "價格調查01", status: "已結束", sDate: "2024-01-01", eDate: "2024-03-31",
    },
    {
      id: 5, name: "價格調查02", status: "已結束", sDate: "2024-04-01", eDate: "2024-06-30",
    },
    {
      id: 6, name: "價格調查03", status: "尚未開始", sDate: "2024-11-01", eDate: "2024-12-31",
    },
    {
      id: 7, name: "興趣調查01", status: "已結束", sDate: "2024-01-01", eDate: "2024-03-31",
    },
    {
      id: 8, name: "興趣調查02", status: "已結束", sDate: "2024-04-01", eDate: "2024-06-30",
    },
    {
      id: 9, name: "興趣調查03", status: "尚未公布", sDate: "2024-11-01", eDate: "2024-12-31",
    },
    {
      id: 10, name: "年度調查01", status: "進行中", sDate: "2024-07-01", eDate: "2024-10-30"
    },
    {
      id: 11, name: "市場調查04", status: "進行中", sDate: "2024-10-15", eDate: "2025-01-15",
    },
    {
      id: 12, name: "價格調查04", status: "已結束", sDate: "2024-05-01", eDate: "2024-07-31",
    },
    {
      id: 13, name: "市場分析01", status: "進行中", sDate: "2024-09-01", eDate: "2024-12-31",
    },
    {
      id: 14, name: "興趣調查04", status: "尚未開始", sDate: "2025-01-01", eDate: "2025-03-31",
    },
    {
      id: 15, name: "市場趨勢01", status: "已結束", sDate: "2023-11-01", eDate: "2024-01-31",
    },
    {
      id: 16, name: "年度調查02", status: "進行中", sDate: "2024-08-01", eDate: "2024-12-31",
    },
    {
      id: 17, name: "需求調查01", status: "尚未開始", sDate: "2025-02-01", eDate: "2025-04-30",
    },
    {
      id: 18, name: "價格趨勢01", status: "進行中", sDate: "2024-09-01", eDate: "2024-12-01",
    },
    {
      id: 19, name: "年度調查03", status: "尚未開始", sDate: "2025-01-01", eDate: "2025-04-30",
    },
    {
      id: 20, name: "市場調查05", status: "進行中", sDate: "2024-10-01", eDate: "2025-01-01",
    }
  ];

  //table名、table資料來源
  displayedColumns: string[] = ['id', 'name', 'status', 'sDate', 'eDate', 'statistics'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.listData);

  //table check box
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  selection = new SelectionModel<PeriodicElement>(true, []);

  //顯示頁數
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  //顯示頁數、將預設顯示的英文更改成中文
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "顯示筆數:"
    this.dataSource.paginator._intl.firstPageLabel = "第一頁:"
    this.dataSource.paginator._intl.previousPageLabel = "上一頁"
    this.dataSource.paginator._intl.nextPageLabel = "下一頁"
    this.dataSource.paginator._intl.lastPageLabel = "最後一頁"
  }

  masterMode() {
    this.mode = true
    this.displayedColumns = ['select', 'id', 'name', 'status', 'sDate', 'eDate', 'statistics']
  }
  normalMode() {
    this.mode = false
    this.displayedColumns = ['id', 'name', 'status', 'sDate', 'eDate', 'statistics']
  }

  //讓按鍵換色
  changeButton1() {
    if (this.mode) {
      return true;
    } else {
      return false;
    }
  }
  changeButton2() {
    if (!this.mode) {
      return true;
    } else {
      return false;
    }
  }

  //刪除列表
  deleteSelectedRows() {
    // 濾除被選取的資料列
    this.dataSource.data = this.dataSource.data.filter(row => !this.selection.isSelected(row));

    // 更新 dataSource.data
    this.dataSource.data = this.dataSource.data;

    // 清除選取狀態
    this.selection.clear();
  }


  //模糊搜尋:只能搜尋到由API接過來的資料，沒辦法搜尋到資料庫所有資料
  //即時模糊搜尋功能 By input event
  changeInput(event: Event) {
    let data: PeriodicElement[] = []
    // as HTMLInputElement 轉型，之後才能使用.value
    // console.log((event.target as HTMLInputElement).value)
    this.listData.forEach((res) => {
      if (res.name.indexOf((event.target as HTMLInputElement).value) != -1) {
        data.push(res)
      }
    });
    //table吃的資料dataSource
    this.dataSource.data = data
  }


  //按鈕搜尋 By ngMoudle
  seachName: string = ""
  seachNameButton() {
    let data: PeriodicElement[] = []
    this.listData.forEach((res) => {
      if (res.name.indexOf(this.seachName) != -1) {
        data.push(res)
      }
    });
    //table吃的資料dataSource
    this.dataSource.data = data
  }

  //取得問卷狀態，依狀態讓問卷可編輯或是不可編輯
  status(element: any) {
    this.quesStatus.quesStatus = element.status
  }
  addQues() {
    this.quesStatus.quesStatus = 'new'
  }

  //取得問卷資訊(之後要傳到後台)
  quesInfo(element: any) {
    console.log(element);
  }

}
