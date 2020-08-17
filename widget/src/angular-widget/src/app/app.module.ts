import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ActionToolComponent } from './components/action-tool/action-tool.component';
import { SelectionToolComponent } from './components/selection-tool/selection-tool.component';
import { AppComponent } from './components/widget-app/widget-app.component';

@NgModule({
  declarations: [AppComponent, SelectionToolComponent, ActionToolComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    NgxWebstorageModule.forRoot()
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: Window, useValue: window }]
})
export class AppModule {}
