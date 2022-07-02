import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit,OnChanges {
 @Input() public coreData: any;
  constructor() { }

  ngOnInit(): void {
  }
  public ngOnChanges(changes:any): void {
    var new_Data:any
    if (changes.coreData != this.coreData) {
      new_Data = changes.coreData.currentValue
      new_Data = {
        ...new_Data,
        currencies:Object.values(new_Data.currencies)[0],
        languages:Object.values(new_Data.languages)
      }
      this.coreData = new_Data
      
      console.log(this.coreData)
    }
  }

}
