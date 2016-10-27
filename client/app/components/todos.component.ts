import {Component, OnInit} from '@angular/core';
import {TodoService} from '../service/todo.service';

import {Todo} from '../Todo';

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})

export class TodosComponent implements OnInit {
    todos: Todo[];
    constructor(private _todoService: TodoService){}

    ngOnInit(){
        this.todos = [];
        this._todoService.getTodos()
            .map(res => res.json())
            .subscribe(
                todos => this.todos = todos
            )
    }

  

    createTodo($event, TodoText){
        if($event.which === 1 || $event.which === 13) {
            var result;
            var new_todo = {
                text: TodoText.value,
                isCompleted: false
            };

            result = this._todoService.saveTodo(new_todo);
            result.subscribe(
                x => this.todos.push(new_todo)
            );

            TodoText.value = '';

        }
    }


    updateStatus(todo){
           var _todo = {               
                _id: todo._id,
                text: todo.text,
                isCompleted: !todo.isCompleted          
           } 

            this._todoService.updateTodo(_todo)
                .map(res => res.json())
                .subscribe(
                   data =>  todo.isCompleted = !todo.isCompleted
                )

    }

    setEditStatus(todo, status) {
        if (status) {
            todo.isEditMode = status
        } else {
            delete todo.isEditMode
        }
    }



    updateTodoText($event, todo) {
        if ($event.which === 13) {         
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            }
            console.log(_todo);

            this._todoService.updateTodo(_todo)
                .map(res => res.json())
                .subscribe(
                    data => {
                        console.log(data);
                        this.setEditStatus(todo, false)}
                )

        }
    }


    deleteTodo(todo) {
        var todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data);
                    if (data.n === 1) {
                        for (var i = 0; i < todos.length; i++) {
                            if (todos[i]._id === todo._id) {
                                todos.splice(i, 1);
                            }
                        }
                       
                    }
                }
            )
    }

}