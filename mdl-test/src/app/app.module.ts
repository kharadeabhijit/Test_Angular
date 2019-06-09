import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ActivitySectionComponent } from './activity-section/activity-section.component';
import { AddRecordPopupComponent } from './add-record-popup/add-record-popup.component';
import { AppFetchRecordService } from './app-fetch-record-service/app-fetch-record.service';



@NgModule({
  declarations: [
    AppComponent,
    AppFooterComponent,
    AppHeaderComponent,
    ActivitySectionComponent,
    AddRecordPopupComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AppFetchRecordService ],
  bootstrap: [AppComponent],
  entryComponents: [ AddRecordPopupComponent ]
})
export class AppModule { }
