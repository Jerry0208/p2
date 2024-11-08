
import { Component, Optional } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';//selcet
import { MatFormFieldModule } from '@angular/material/form-field';//selcet
import { MatSelectModule } from '@angular/material/select';//selcet
import { MatIconModule } from '@angular/material/icon';//Icon
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

export interface questionTemp {
  text: string;
  need: boolean;
  type: string;
  options: Array<string>;
}

const ELEMENT_DATA : questionTemp[] = [];

@Component({
  selector: 'app-add-list2',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './add-list2.component.html',
  styleUrl: './add-list2.component.scss'
})
export class AddList2Component {
  constructor(private router: Router) { }

  form: FormGroup = new FormGroup({

  })

  //table
  displayedColumns: string[] = ['select', 'text', 'need', 'type', 'options'];
  dataSource = ELEMENT_DATA;

  //接資料 ngModle
  text !: string;
  need !: boolean;
  type !: string;
  options !: string;
  questionType !: string;

  needchenge(event: any) {
    this.need = event.target.checked
  }

  test() {
    //.replace(/\s/g, "") 去除空白建,再以.split(";")分割
    let options = this.options.replace(/\s/g, "").split(";");
    //將newQues 放入 Table 內
    let newQues = {  text: this.text, need: this.need, type: this.type, options: options };

    ELEMENT_DATA.push(newQues)
    console.log(ELEMENT_DATA);
    console.log(newQues);
    this.dataSource = ELEMENT_DATA

  }

  toCheck() {
    // this.router.navigateByUrl('')
  }

}
