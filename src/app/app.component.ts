import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  dataSource: any;
  rawdata: any[] = [];

  constructor(
    private http: HttpClient,
  ) { }


  title = 'noc';
  displayedColumns: string[] = ['id', 'type' /*, 'name'*/];
  _url = "https://apps.noc-innovations.co.uk/api/polpred-api/latest/get-licences?key=U2uf2HSEBrDXV2jl";

  //@ViewChild(MatSort) sort: MatSort;
  /*dataSource = this.http.get<any>(this._url).subscribe(response => {
    this.data = response.data;;
  });*/


  /*
    {
      "id": 0,
      "type": "offshore",
      "details": {
        "model": {
          "code": "CS20_15HC3",
          "name": "High Resolution CS20 Model (Depth averaged)"
        },
        "latN": "53.50",
        "lngW": "-11.50",
        "latS": "49.50",
        "lngE": "-2.50",
        "dateFrom": "2019-06-01",
        "dateTo": "2020-01-01"
      }
    }
  */


  ngOnInit() {
    this.http.get<any>(this._url).subscribe(response => {
      var array: any[] = [];

      JSON.parse(JSON.stringify(response.data.licences), function (key, value) {
        if (key === "details") {
          array = array.concat(value);
        }

        return value;
      });
      //console.log(array)
      this.rawdata = response.data.licences;
      this.dataSource = new MatTableDataSource(response.data.licences/*, ...response.data.licences.details.model*/);
      console.log(response.data.licences[0].details)

      
      //this.dataSource.sort = this.sort;
    });
  }



}
