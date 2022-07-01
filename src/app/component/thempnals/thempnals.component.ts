import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, min } from 'rxjs/operators';

@Component({
  selector: 'app-thempnals',
  templateUrl: './thempnals.component.html',
  styleUrls: ['./thempnals.component.css']
})

export class ThempnalsComponent implements OnInit {

  constructor(private http: HttpClient) {}
  public storage: any = []
  public data: any = []
  private apiurl = 'https://restcountries.com/v3.1/all'
  public image: any = [];
  public name: any = []
  public searchCountry: any = ''
  public collectIndex = 0;
  public loading = true;


  // function api get data 
  public getInnitalData = async () => {
    await this.http.get(this.apiurl).forEach((res) => {
      this.storage = res
    }).then(()=> this.loading = false)
  }

  formatter = (x: { official: string }) => x.official;
  search: OperatorFunction<string, readonly {}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.storage.filter((v: any) => v.name.official.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  searchText() {
    this.searchCountry = this.searchCountry.name
  }

  public next() {
    this.collectIndex = this.collectIndex >= this.storage.length-1 ? 0 : this.collectIndex+ 1
  }
  public prev() {
    this.collectIndex = this.collectIndex < 1 ? this.storage.length-1 : this.collectIndex - 1
  }
 
  ngOnInit(): void {
    this.getInnitalData()
  }

}
