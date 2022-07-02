import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thempnals',
  templateUrl: './thempnals.component.html',
  styleUrls: ['./thempnals.component.css']
})

export class ThempnalsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    config: NgbModalConfig,
    private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  public storage: any = []
  public data: any = []
  private apiurl = 'https://restcountries.com/v3.1/all'
  public image: any = [];
  public name: any = []
  public searchCountry: any = ''
  public collectIndex = 0;
  public loading = true;
  public sentData: any = {}
  public selectedContinents: any = 0
  public listContinents: any = []


  // function api get data 
  public getInnitalData = async () => {
    await this.http.get(this.apiurl).forEach((res) => {
      this.storage = res
    }).then(() => {
      this.loading = false
      this.data = this.storage
      this.data.map((val: any, index: number) => {
        let find = this.listContinents.findIndex((data: any, i: number) => data == val.continents[0])
        if (find == -1) {
          this.listContinents.push(val.continents[0])
        }
      })
    }).catch((error) => console.log(error))
  }
  // auto complate search text
  formatter = (x: { official: string }) => x.official;
  search: OperatorFunction<string, readonly {}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.data.filter((v: any) => v.name.official.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchText(e: any) {
    this.searchCountry = e.name
  }
  // Enter keydown on search input
  public onKeydown(e: any) {
    if (e.keyCode === 13) {
      this.searchInfo(e.target.value);
    }
  }
  // Search Function for change slide index
  public searchInfo(text: any) {
    typeof (text) == 'object' ? text = text.official : text
    var valIndex: any
    valIndex = this.data.findIndex((res: any) => res.name.official == text)
    if (valIndex != -1) {
      this.collectIndex = valIndex
    } else {
      this.toastrService.error('Please write name of country and select from suggestion below', 'Not Found', {
        timeOut: 5000,
        closeButton: true
      });
    }
  }
  public selectedListFromContinents(e: any) {
    let new_list: any = []
    console.log(e)
    this.selectedContinents = e
    this.data = this.storage.map((res: any) => {
      if (res.continents[0] == e) {
        new_list.push(res)
      }
    })
    this.selectedContinents == 0 ? this.data = this.storage : this.data = new_list
    if (this.data.length != this.storage.length) {
      this.toastrService.success('Your list country by continents are changes already', this.selectedContinents, {
        timeOut: 5000,
        closeButton: true
      });
    }
  }
  // Slide index control
  public next() {
    this.collectIndex = this.collectIndex >= this.data.length - 1 ? 0 : this.collectIndex + 1
  }
  public prev() {
    this.collectIndex = this.collectIndex < 1 ? this.data.length - 1 : this.collectIndex - 1
  }
  // Modal content
  open(content: any, data: object) {
    this.modalService.open(content, { size: 'lg' });
    this.sentData = data;
  }

  ngOnInit(): void {
    this.getInnitalData()
  }

}
