import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";

const BuyerLoader = require('../../../../../loader/garment-leftover-warehouse-buyer-loader');
const SalesNoteLoader = require('../../../../../loader/garment-shipping-local-sales-note-loader');

@inject(Service)
export class DataForm {

    constructor(service) {
        this.service = service;
    }

    @bindable readOnly = false;
    @bindable title;
    @bindable selectedType;
    @bindable selectedSalesNote;

    controlOptions = {
        label: {
            length: 3
        },
        control: {
            length: 5
        }
    };

    footerOptions = {
        label: {
            length: 3
        },
        control: {
            length: 2
        }
    };

    itemsColumnsFabric = [
        { header: "Unit Asal", value: "UnitCode" },
        { header: "Bon No", value: "AvalReceiptNo" },
        { header: "Jumlah ", value: "Quantity" },
        { header: "Jumlah Keluar ", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ];

    viewItemsColumnsFabric = [
        { header: "Unit Asal", value: "UnitCode" },
        { header: "Bon No", value: "AvalReceiptNo" },
        { header: "Jumlah Keluar ", value: "Quantity" },
        { header: "Satuan", value: "UomUnit" },
    ];

    itemsColumnsAcc= [
        { header: "Unit Asal" },
        { header: "Kode - Nama Barang" },
        { header: "Satuan" },
        { header: "Jumlah Stock" },
        { header: "Jumlah Keluar" },
    ];

    viewItemsColumnsAcc=[
        { header: "Unit Asal" },
        { header: "Kode - Nama Barang" },
        { header: "Satuan" },
        { header: "Jumlah Keluar" },
    ]

    expenditureToOptions=["JUAL LOKAL", "LAIN-LAIN"];
    avalTypes=["AVAL FABRIC", "AVAL BAHAN PENOLONG", "AVAL KOMPONEN"];

    get buyerLoader() {
        return BuyerLoader;
    }

    
    buyerView = (buyer) => {
        return `${buyer.Code} - ${buyer.Name}`;
    }

    get localSalesNoteLoader() {
        return SalesNoteLoader;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.Options = {
            isCreate: this.context.isCreate,
            isView: this.context.isView,
            isEdit: this.context.isEdit,
        }
        for(var item of this.data.Items){
            item.type=this.data.AvalType;
        }
        this.selectedType=this.data.AvalType;
        if(this.data.Id){
            this.existingItems = this.data.Items.map(i => {
                return {
                    StockId: i.StockId,
                    Quantity: i.Quantity
                };
            });
            this.Options.existingItems=this.existingItems;
            this.selectedSalesNote = {
                noteNo: this.data.LocalSalesNoteNo
            };

        }
    }

    get addItems() {
        return (event) => {
            this.data.Items.push({
                type: this.data.AvalType
            })
        };
    }

    get removeItems() {
        return (event) => {
            this.error = null;
            //this.Options.error = null;
     };
    }

    selectedTypeChanged(newValue){
        if(newValue){
            this.data.AvalType=newValue;

        }
        if(!this.data.Id){
            this.data.Items.splice(0);
        }
    }

    selectedSalesNoteChanged(newValue) {
        if (this.data.Id) return;

        this.data.LocalSalesNoteNo = null;
        this.data.LocalSalesNoteId = 0;
        if (newValue) {
            this.data.LocalSalesNoteNo = newValue.noteNo;
            this.data.LocalSalesNoteId = newValue.id;
        }
    }

}
