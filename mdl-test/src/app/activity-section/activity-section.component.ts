import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { AddRecordPopupComponent } from '../add-record-popup/add-record-popup.component';
import { AppFetchRecordService } from '../app-fetch-record-service/app-fetch-record.service';
import { Record, RecordData } from './Record';

@Component({
  selector: 'activity-section',
  templateUrl: './activity-section.component.html',
  styleUrls: ['./activity-section.component.scss']
})
export class ActivitySectionComponent implements OnInit {

  private bsModalRef: BsModalRef;
  private error: string = "";
  private data: RecordData[] = [];
  private initalRecords:Record = {data: this.data};
  
  subscription: Subscription;
  private checkBoxSelected: string[] = [];

  constructor(private modalService: BsModalService, private fetchRecordService:AppFetchRecordService) {}
 
  ngOnInit() {
    this.getInitialRecords();
  }

  private openAddRecordPopup() {    
    this.bsModalRef = this.modalService.show(AddRecordPopupComponent, {});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  private getInitialRecords() {    

    this.initalRecords =  this.fetchRecordService.records;
    
    this.subscription = this.fetchRecordService.getRecord().subscribe(record => {
      if (record) {
        this.initalRecords = record;
      } 
    });
  }

  private getInputType(type:string):string{
    
    if(type==="String"){
      return "text";
    } else if(type==="Number"){
      return "number";
    }else if(type==="Date"){
      return "date";
    }else{
      return "text";
    }
  }

  private updateCheckedOptions(id: string, index:number, event){
    if(event.target.checked){
      this.checkBoxSelected[index] = id; 
    }else{
      this.checkBoxSelected.splice(index, 1);
    }
  }

  private deleteRecord():void{
    for (let id of this.checkBoxSelected) {      
      if(id){
        let index = this.fetchRecordService.getItemIndex(id);
        this.fetchRecordService.deleteRecord(index);
      }      
    }
    this.checkBoxSelected = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
