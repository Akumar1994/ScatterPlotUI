import { Component } from '@angular/core';
import { DataService } from './DataService';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileToUpload!: File;
  public showScatterPlot=false;

  constructor(private dataService: DataService) { }

  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  upload() {
    this.dataService.uploadCsvFile(this.fileToUpload).subscribe(
      data => {
        this.showScatterPlot= false;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  viewDate(){
    this.showScatterPlot= true;
    //this.dataService.getAllDataPoints().subscribe(data => console.log(data));
  }
  clearPlot(): void{
    this.showScatterPlot=false;
    this.dataService.clearThePlot().subscribe(
      response=>{
        console.log(response)
      }
    )
  }
}
