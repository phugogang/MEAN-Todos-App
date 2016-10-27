import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {HttpModule} from '@angular/http';

import { TodosComponent } from './components/todos.component';
import { TodoService } from './service/todo.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ 
    AppComponent,
    TodosComponent
   ],
   providers: [TodoService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
