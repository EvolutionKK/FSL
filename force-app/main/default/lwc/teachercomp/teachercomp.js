import { LightningElement, wire } from 'lwc';
// import lms from '@salesforce/messageChannel/lms__c';
// import {publish, MessageContext} from 'lightning/messageService';
import getclasses from '@salesforce/apex/classes.getclasses';
import getstudents from '@salesforce/apex/classes.getstudents';

export default class Teachercomp extends LightningElement {

    // @wire(MessageContext) msg;
    arr = [];
    openModal = false;
    stdlist;
    value = ['none'];
    tabular;
    graphical;
    classList;
    actions = [
        { label: 'Add', name: 'addstd' },
        { label: 'Delete', name: 'delstd' }
    ];
    columns = [
        { label: 'Serial No.', fieldName: 'rowNumber', type: 'number' },
        { label: 'Roll No.', fieldName: 'evolution__Roll__c' },
        { label: 'Name', fieldName: 'Name' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.actions },
        }
    ];

    get options() {
        return [
            { label: 'None', value: 'none' },
            { label: 'Tabular', value: 'tab' },
            { label: 'Graphical', value: 'graph' },
        ];
    }
    connectedCallback() {
        getclasses().then
            (res => {
                this.classList = res;
                console.log(this.classList);
            })
    }

    showtab() {
        let t = this.template.querySelector(".tabbox");
        console.log(t);
        if (t.checked == true) {
            this.tabular = true;
        }
        if (t.checked == false) {
            this.tabular = false;
        }
    }
    showgraph() {
        let t = this.template.querySelector('.graphbox');
        if (t.checked == true) {
            this.openModal = true;
        }
        if (t.checked == false) {
            this.graphical = false;
        }
    }

    closeModalandsubmit() {
        this.openModal = false;
        let num = parseInt(this.template.querySelector('[data-id="row"]').value);
        for (let i = 0; i < num; i++) {
            this.arr[i] = { num: i };
        }
        this.graphical = true;
    }

    closeModal() {
        this.openModal = false;
    }

    selclass(event) {
        console.log(event.target.value);
        getstudents({ clsid: event.target.value }).then(res => {
            let result = JSON.parse(JSON.stringify(res));
            for (var i = 0; i < result.length; i++) {
                result[i].rowNumber = i + 1;
            }
            this.stdlist = result;
            console.log(this.stdlist);
        }).catch(err => {
            console.log(err);
        })
    }

    handlerowaction(event) {
        let action = event.detail.action.name;
        let row = event.detail.row;
        console.log(row);
        if (action == 'addstd') {
            const records = this.template.querySelectorAll(".deev");
            var i = 0;
            records.forEach(rec => {
                rec.addEventListener('click', function (e) {
                    if (i == 0) {
                        e.preventDefault();
                        console.log(e);
                        e.target.innerText = row.Name;
                        if(row.evolution__Marks__c > 75)
                        {
                            e.target.style.backgroundColor = "green";
                            console.log(e.target);
                        }else if(row.evolution__Marks__c < 75)
                        {                            
                            e.target.style.backgroundColor = "red";    
                        }
                    }
                    i++;
                })
            })
        }
        else if(action == 'delstd') {
            const records = this.template.querySelectorAll(".deev");
            records.forEach(rec => {
                // console.log(rec.style); 
                if(rec.innerText == row.Name){
                    rec.innerText = '';
                    rec.style.backgroundColor = "white";
                }
            })
        }
    }
}