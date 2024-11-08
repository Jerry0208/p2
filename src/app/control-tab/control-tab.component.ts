import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';//Tab 用(增加tab分頁)
import { MatTabsModule } from '@angular/material/tabs'; //Tab 用
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';//路由用

@Component({
  selector: 'app-control-tab',
  standalone: true,
  imports: [MatTabsModule, RouterLink, RouterLinkActive, RouterOutlet, MatTabsModule, MatButtonModule],
  templateUrl: './control-tab.component.html',
  styleUrl: './control-tab.component.scss'
})
export class ControlTabComponent {

  constructor(private router: Router) { }

  links = [
    { path: '/control_tab/add_list1', name: '問卷' },
    { path: '/control_tab/add_list2', name: '題目' },
    { path: '/control_tab/feedback', name: '回饋' },
    { path: '/control_tab/statistics', name: '統計' }
  ];
  activeLink = this.links[0];

}
