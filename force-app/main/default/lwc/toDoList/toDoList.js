import { LightningElement, wire, track } from 'lwc';
import createTask from '@salesforce/apex/toDoHandler.createTask'
import fetchTasks from '@salesforce/apex/toDoHandler.fetchTasks'
import deleteTask from '@salesforce/apex/toDoHandler.deleteTask'
import editTask from '@salesforce/apex/toDoHandler.editTask'
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const columnsJs = [
    { label: 'Title', fieldName:'Name' },
    { label: 'Due Date', fieldName:'Due_Date__c', type: 'date' },
    { label: 'Description', fieldName:'Description__c'},
    {
        type: "button", label: 'Delete', typeAttributes: {
            label: 'Delete',
            name: 'Delete',
            title: 'Delete',
            variant:'Destructive'
        }
    },
    {
        type: "button", label: 'Edit', typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            variant:'Brand'
        }
    }
];

export default class ToDoList extends LightningElement {
    title
    duedate
    description
    taskData
    columns = columnsJs
    isModalOpen = false
    recId
    @track wiredTaskList = [];


    @wire(fetchTasks)
    wireTask(result) {
        this.wiredTaskList = result;
        if (result.data) {
          this.taskData = result.data;
        } else if (result.error) {
          this.error = result.error;
        //   this.  = [];
        }
      }

    onchangeHandler(event){
        if(event.target.name == 'title'){
           this.title = event.target.value;
           console.log('this.title '+this.title);
        }else if(event.target.name == 'due date'){
            this.duedate = event.target.value;
            console.log('this.duedate '+this.duedate);
        }else if(event.target.name == 'description'){
            this.description = event.target.value;
            console.log('this.description '+this.description);
        }
    }

    handleClick(){
        createTask({titleApex:this.title, dueDateApex:this.duedate, descriptionApex:this.description})
            .then(result => {
                 console.log(result)
                 const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Task Created',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                 refreshApex(this.wiredTaskList);
            })
            .catch(error => {
                this.error = error;
            });

    }

    rowHandler(event){
        console.log(event.detail.action.name);
        console.log(event.detail.row.Id);
        this.recId = event.detail.row.Id;

        if(event.detail.action.name === 'Delete'){
            deleteTask({taskId: this.recId})
            .then(result => {
                 console.log(result)
                 const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Task Deleted',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                 refreshApex(this.wiredTaskList);
    
            })
            .catch(error => {
                this.error = error;
            });
        }
        if(event.detail.action.name === 'Edit'){
            this.isModalOpen = true
        }
       
    }

    closeModal(){
        this.isModalOpen = false
    }

    submitDetails(){
        console.log('this.title '+this.title);
        console.log('this.title '+this.duedate);
        console.log('this.title '+this.description);
        editTask({taskId: this.recId, title: this.title, dueDate: this.duedate, description: this.description })
            .then(result => {
                 console.log(result)
                 const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Task Updated',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                 refreshApex(this.wiredTaskList);
    
            })
            .catch(error => {
                this.error = error;
            });
            this.isModalOpen = false
    }
}