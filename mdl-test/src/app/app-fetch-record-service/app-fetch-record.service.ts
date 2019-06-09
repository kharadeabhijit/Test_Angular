import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Record, RecordData } from '../activity-section/Record';


@Injectable()
export class AppFetchRecordService {

  private jsonUrl:string = "../../assets/json/initalRecord.json";

  private data: RecordData[] = [
    {
      "id":"record1",
      "columnName":"Column 1",
      "columnType":"String",
      "editable":"False"
    },
    {
        "id":"record2",
        "columnName":"Column 2",
        "columnType":"Number",
        "editable":"True"
    }
  ];
  public records:Record = {data:this.data};
  public error: string = "";

  recordsChanged: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    // this.init();
  }
 

  public getJsonRecords(): Observable<Record> {
    return this.http.get<Record>(this.jsonUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  public init():void{
    this.getJsonRecords().subscribe(
      records => {
        this.records = records
        console.log(this.records.data.length);
        return this.records;
      },
      error => {
        this.error = error;
        console.log(this.error+" = error");
      }
    );

  }

  public addRecord(newRecord: RecordData):void{   
    let _newRecord = newRecord;
    _newRecord.id = "record"+ (this.records.data.length+1);
    this.records.data.push(_newRecord);
    this.recordsChanged.next(this.records);    
  }

  public deleteRecord(index: number):void{   
    this.records.data.splice(index, 1);
    this.recordsChanged.next(this.records);
  }

  public getItemIndex(id:string):number{
    let _index: number;
    this.records.data.some(function(item, index) {
      if(item.id === id){        
        _index =  index;  
        return true;      
      }      
    });
    return _index;
  }

  public getRecord():Observable<Record>{    
    return this.recordsChanged.asObservable();
  }

  public getInitialRecords():Record{    
    return this.records;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
