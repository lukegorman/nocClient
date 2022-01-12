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
  lat: any[] = [];
  long: any[] = [];

  constructor(
    private http: HttpClient,
  ) { }


  title = 'noc';
  displayedColumns: string[] = ['name', 'lat', 'lng' /*, 'name'*/];
  _url = "https://apps.noc-innovations.co.uk/api/polpred-api/latest/get-port-list";

  layout = {

    autosize: false,

    width: 500,

    height: 500,

    yaxis: {

      title: 'Y-axis Title',

      ticktext: ['long label', 'Very long label', '3', 'label'],

      tickvals: [1, 2, 3, 4],

      tickmode: 'array',

      automargin: true,

      titlefont: { size: 30 },

    },

    paper_bgcolor: '#7f7f7f',

    plot_bgcolor: '#c7c7c7'

  };

  public graph = {
    data: [
      { x: this.lat, y: this.long, type: 'scatter', mode: 'markers', marker: { color: 'red' } },

    ],
    layout: this.layout
  };

  //@ViewChild(MatSort) sort: MatSort;
  /*dataSource = this.http.get<any>(this._url).subscribe(response => {
    this.data = response.data;;
  });*/


  /*
  {
  "data": {
    "items": [
      {
        "name": "St. Helier",
        "lat": 49.18333,
        "lng": -2.11667
      },
      {
        "name": "St. Mary's",
        "lat": 49.91833,
        "lng": -6.31667
      },
      {
        "name": "Newlyn",
        "lat": 50.10333,
        "lng": -5.54333
      },
      {
        "name": "Plymouth",
        "lat": 50.36833,
        "lng": -4.185
      },
      {
        "name": "Weymouth",
        "lat": 50.60833,
        "lng": -2.44833
      },
      { "etc..." },
    ]
  }
}
  */


  ngOnInit() {
    this.http.get<any>(this._url).subscribe(response => {

      //console.log(array)
      this.rawdata = response.data.items;

      this.rawdata.forEach(element => this.lat.push(element.lat));
      this.rawdata.forEach(element => this.long.push(element.lng));

      this.dataSource = new MatTableDataSource(response.data.items/*, ...response.data.licences.details.model*/);
      console.log(this.lat, this.long);
  


      //this.dataSource.sort = this.sort;
    });
  }



}
