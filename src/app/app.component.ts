import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


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
  displayedColumns: string[] = ['name', 'lat', 'lng'];
  _url = "https://apps.noc-innovations.co.uk/api/polpred-api/latest/get-port-list";

  layout = {
    autosize: false,
    width: 500,
    height: 500,
    yaxis: {
      title: 'longitude',
      automargin: true,
      titlefont: { size: 30 },
    },
    xaxis: {
      title: 'latitude',
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

  ngOnInit() {
    this.http.get<any>(this._url).subscribe(response => {
      this.rawdata = response.data.items;
      this.rawdata.forEach(element => this.lat.push(element.lat));
      this.rawdata.forEach(element => this.long.push(element.lng));
      this.dataSource = new MatTableDataSource(response.data.items);
    });
  }



}
