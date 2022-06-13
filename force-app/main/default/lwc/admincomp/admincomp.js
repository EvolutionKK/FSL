import { LightningElement, wire } from 'lwc';
import lms from '@salesforce/messageChannel/lms__c';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

export default class Admincomp extends LightningElement {
    @wire(MessageContext) msg;
    subref;

    connectedCallback()
    {
        console.log('connectedCallback');
        this.subtochannel();
    }
    subtochannel()
    {
        console.log('subtochannel');
        this.subref= subscribe(this.msg, lms, (message)=>this.listenerfun(message), {scope: APPLICATION_SCOPE});
    }
    listenerfun(message)
    {
        console.log('listener');
        console.log(message);
    }
}