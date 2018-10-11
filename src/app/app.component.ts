import { Component, ViewChild ,ViewContainerRef} from '@angular/core';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalDialogService,SimpleModalComponent } from 'ngx-modal-dialog';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  title = 'Humedad en USA';
  newyork =  "https://query.yahooapis.com/v1/public/yql?q=select%20atmosphere%20from%20weather.forecast%20where%20woeid=2459115&format=json";
  orlando =  "https://query.yahooapis.com/v1/public/yql?q=select%20atmosphere%20from%20weather.forecast%20where%20woeid=2466256&format=json";
  miami =  "https://query.yahooapis.com/v1/public/yql?q=select%20atmosphere%20from%20weather.forecast%20where%20woeid=2450022&format=json";
  createApiUrl = "http://localhost/phpyiiapi/yii2-app-basic-master/web/index.php?r=history/create";
  nyResult = "";
  orResult= "";
  miResult= "";
  AllResult = [];
  constructor(
    public http: HttpClient,
   public modalService: ModalDialogService,
    public viewRef: ViewContainerRef

){}
ngOnInit(){
  this.getHumidity(this.newyork).subscribe(result =>{
    if(result.code != 200){
      this.nyResult = result.query.results.channel.atmosphere;
      let merged = Object.assign(this.nyResult, {ciudad:"Nueva York"});
      this.AllResult.push(merged);
      this.saveHumidity(merged).subscribe(result2 =>{
      });   
  }
  else{
    alert("algo anda mal cuando se consulta  New York");
  }
  });
  this.getHumidity(this.orlando).subscribe(result =>{
    if(result.code != 200){
      this.orResult = result.query.results.channel.atmosphere;
      let merged = Object.assign(this.orResult, {ciudad:"Orlando"});
      this.AllResult.push(merged);
      this.saveHumidity(merged).subscribe(result2 =>{
      });   
      
  }else{
    alert("algo anda mal cuando se consulta  orlando");
  }
  });
  this.getHumidity(this.miami).subscribe(result =>{
    if(result.code != 200){
      this.miResult = result.query.results.channel.atmosphere;
      let merged = Object.assign(this.miResult, {ciudad:"Miami"});
      this.AllResult.push(merged);
      this.saveHumidity(merged).subscribe(result2 =>{
      });  
  }else{
    alert("algo anda mal cuando se consulta  florida");
  }
  });
  console.log(this.AllResult);
}
display(event: any): void {
}
getHumidity(url): any{
  return this.http.get(url);
}
saveHumidity(body): any{
  return this.http.post(this.createApiUrl,body);
}

}

