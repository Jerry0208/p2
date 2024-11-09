import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; //Tab 用
import { RouterLink, RouterOutlet } from '@angular/router';//路由用

@Component({
  selector: 'app-control-tab',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatTabsModule,
  ],
  templateUrl: './control-tab.component.html',
  styleUrl: './control-tab.component.scss'
})
export class ControlTabComponent {

  links = [
    { path: '/control_tab/add_list1', name: '問卷' },
    { path: '/control_tab/add_list2', name: '題目' },
    { path: '/control_tab/feedback', name: '回饋' },
    { path: '/control_tab/statistics', name: '統計' }
  ];

  activeLink = '';

  switchTab(event: string) {
    this.activeLink = event
  }

}
