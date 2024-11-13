import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs'; //Tab 用
import { Router, RouterLink, RouterOutlet } from '@angular/router';//路由用

@Component({
  selector: 'app-control-tab',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatTabsModule,
    MatIconModule,
  ],
  templateUrl: './control-tab.component.html',
  styleUrl: './control-tab.component.scss'
})
export class ControlTabComponent {
  constructor(private router : Router){}

  activeLink = '';

  switchTab(event: string) {
    this.activeLink = event
  }

  quesStatus(status : string){
    //讓狀態是已結束和進行中的問卷內容不能被修改
    if(status == '已結束' || status == '進行中'){
      this.links.forEach(res =>{
        if(res.name == '問卷' || res.name == '題目'){
          res.stuts = true
        }else{
          res.stuts = false
        }
      })
    }

    //新增問卷狀態，讓 tab都不能被操作
    if(status == 'new'){
      this.links.forEach(res =>{
          res.stuts = true
      })
    }

  }

  links = [
    { path: '/control_tab/add_list1', name: '問卷', stuts: false },
    { path: '/control_tab/add_list2', name: '題目', stuts: false },
    { path: '/control_tab/feedback', name: '回饋', stuts: false },
    { path: '/control_tab/statistics', name: '統計', stuts: false }
  ];

  backList(){
    this.router.navigateByUrl('\list')
  }


}
