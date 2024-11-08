import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  //要使用頁面導航時請先將RouterOutlet(預設已加入), RouterLinkActive, RouterLink這三個模板加入該畫面的import中,這樣後面才可以在HTML中使用該元件。
  imports: [RouterOutlet, FormsModule, RouterLinkActive, RouterLink,MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'p2';
  constructor(private router: Router){} // 透過TS導航，constructor建構方法
  //開啟時運行
  // ngOnInit(){
  //   //開啟時直接到問卷列表，兩種寫法二選一
  //   this.router.navigateByUrl('/list');
  //   this.router.navigate(['/list']);
  // }
}
