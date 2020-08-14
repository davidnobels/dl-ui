import { inject, bindable, computedFrom } from 'aurelia-framework'
const InvoiceLoader = require('../../../../loader/garment-shipping-invoice-loader');


export class invoice {
    @bindable selectedInvoice;

    constructor() {
        
    }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };
        if(this.data.id){
            this.selectedInvoice={
                invoiceNo:this.data.invoiceNo,
                id:this.data.invoiceId
            }
        }
        
    }
    
    get invoiceLoader() {
        return InvoiceLoader;
    }

    selectedInvoiceChanged(newValue){
        if(newValue){
            this.data.invoiceNo=newValue.invoiceNo;
            this.data.invoiceId=newValue.id;
        }
    }
}