import {inject, Lazy} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
import {activationStrategy} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class Create {
    hasCancel = true;
    hasSave = true;
    hasCreate = true;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.isView=false;
    }

    activate(params) {

    }
    
    bind() {
        this.data = { items: [] };
        this.error = {};
    }

    cancel(event) {
        this.router.navigateToRoute('list');
    }

    determineActivationStrategy() {
        return activationStrategy.replace; //replace the viewmodel with a new instance
        // or activationStrategy.invokeLifecycle to invoke router lifecycle methods on the existing VM
        // or activationStrategy.noChange to explicitly use the default behavior
    }

    save() {
        if(this.data.Items){
            this.data.Amount=0;
            this.data.IncomeTaxValue=0;
            this.data.DPP=0;
            this.data.VatValue=0;
            for(var item of this.data.Items){
                // if(item.Details){
                //     for(var detail of item.Details){
                        var pph=0;
                        var ppn=0;
                        if(item.IsUseIncomeTax){
                            // var rate= item.IncomeTax ? item.IncomeTax.Rate : 0;
                            // pph=parseFloat(detail.PriceTotal)*parseFloat(rate)*0.01;
                            pph = item.IncomeTaxValue;
                        }
                        if(item.IsUseVat){
                            // ppn=detail.PriceTotal*0.1;
                            ppn = item.VatValue
                        }
                        this.data.IncomeTaxValue+=pph;
                        this.data.VatValue+=ppn;
                        this.data.DPP+=item.DPPValue;
                        // if(this.data.IncomeTaxBy=="Supplier"){
                        //     this.data.Amount+=detail.PaidPrice+ppn;
                        // }
                        // else
                        //     this.data.Amount+=detail.PaidPrice+ppn+pph;
                //     }
                // }
            }
            this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;
            
        }
        this.service.create(this.data)
            .then(result => {
                alert("Data berhasil dibuat");
                this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            })
            .catch(e => {
                if (e.statusCode == 500) {
                    alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
                } else {
                    this.error = e;
                }
            })
        // console.log(this.data);
    }
}
