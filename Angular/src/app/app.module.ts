import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ContactService} from './contact.service'
import { AppComponent } from './app.component';
import { SelectedComponent } from './selected.component';
import { EditedComponent } from './edited.component';
import { ListComponent } from './list.component';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
@NgModule({
  declarations: [
    AppComponent,
    SelectedComponent,
    ListComponent,
    EditedComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PanelModule,
    ButtonModule,
    DataGridModule,
    InputTextModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
