import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class Edit {
  hasCancel = true;
  hasSave = true;

  constructor(router, service) {
    this.router = router;
    this.service = service;
    this.isView=false;
  }

  bind() {
    this.data = this.data || {};
    this.error = {};
  }

  async activate(params) {
    // var id = params.id;
    // this.data = await this.service.getById(id);
    // if(this.data.Currency){
    //     this.selectedCurrency=this.data.Currency;
    // }

    // if(this.data.Supplier){
    //     this.selectedSupplier=this.data.Supplier;
    // }

    // if(this.data.Division){
    //     this.selectedDivision=this.data.Division;
    // }

    // if(this.data.Category){
    //     this.selectedCategory=this.data.Category;
    // }
    var id = params.id;
    this.data = await this.service.getById(id);
    
    if(this.data.Currency){
        this.selectedCurrency=this.data.Currency;
    }

    if(this.data.Supplier){
        this.selectedSupplier=this.data.Supplier;
    }

    if(this.data.Division){
        this.selectedDivision=this.data.Division;
    }

    if(this.data.Category){
        this.selectedCategory=this.data.Category;
    }
    if(this.data.Position !=1){
      this.hasDelete=false;
    }
    if(this.data.Position !=1 && this.data.Position !=6){
      this.hasEdit=false;
    }
    if(this.data.SupplierId){
        this.selectedSupplier = {
            _id : this.data.SupplierId,
            name : this.data.SupplierName,
            code : this.data.SupplierCode,
            import: this.data.SupplierIsImport
        }
    }

    if(this.data.CurrencyId){
        this.selectedCurrency = {
            id : this.data.CurrencyId,
            code :this.data.CurrencyCode?this.data.CurrencyCode:"",
            rate : this.data.CurrencyRate,
            name: this.data.CurrencyCode?this.data.CurrencyCode:"",
            Name :this.data.CurrencyCode?this.data.CurrencyCode:"",
            date: this.data.CurrencyDate?this.data.CurrencyDate:"",
        }
        this.data.Currency = this.selectedCurrency;
    }

    if(this.data.Items){
        var calculateDppSplit = this.data.DPP/ this.data.Items.length;
        this.data.Items = this.data.Items.map(item => {
            var mappingItem = {
                Id: item.Id,
                CurrencyCode:item.CurrencyCode,
                CurrencyRate:item.CurrencyRate,
                CurrencyId:item.CurrencyId,
                Currency: {
                    Code : item.CurrencyCode,
                    Rate : item.CurrencyRate,
                    Id :item.CurrencyId,
                },
                IncomeTax:{
                    Name : item.IncomeTaxName,
                    Id :item.IncomeTaxId,
                    Rate:item.IncomeTaxRate,
                },
                IncomeTaxName :item.IncomeTaxName,
                IncomeTaxId: item.IncomeTaxId,
                IncomeTaxRate: item.IncomeTaxRate,
                Details:item.Details,
                EPOId:item.EPOId,
                EPONo:item.EPONo,
                GarmentDispositionPurchaseId:item.GarmentDispositionPurchaseId,
                IncomeTaxValue: item.IncomeTaxValue,
                IsDispositionCreated:item.IsDispositionCreated,
                IsDispositionPaid:item.IsDispositionPaid,
                IsUseIncomeTax:item.IsUseIncomeTax,
                IsUseVat:item.IsUseVat,
                VatValue:item.VatValue,
                DispositionAmountPaid: item.DispositionAmountPaid,
                DispositionAmountCreated: item.DispositionAmountCreated,
                DispositionQuantityCreated: item.DispositionQuantityCreated,
                DispositionQuantityPaid: item.DispositionQuantityPaid,
                DPPValue : calculateDppSplit,
                Active: item.Active,
                CreatedAgent: item.CreatedAgent,
                CreatedBy: item.CreatedBy,
                CreatedUtc: item.CreatedUtc,
                LastModifiedAgent: item.LastModifiedAgent,
                LastModifiedBy: item.LastModifiedBy,
                LastModifiedUtc: item.LastModifiedUtc
            };
            return mappingItem;
        });
    }
    console.log(this);
  }

  cancel(event) {
    this.router.navigateToRoute('view', { id: this.data.Id });
  }

  save(event) {
    // if(this.data.Items){
    //     this.data.Amount=0;
    //     this.data.IncomeTaxValue=0;
    //     this.data.DPP=0;
    //     this.data.VatValue=0;
    //     for(var item of this.data.Items){
    //         if(item.Details){
    //             for(var detail of item.Details){
    //                 var pph=0;
    //                 var ppn=0;
    //                 if(item.UseIncomeTax){
    //                     var rate= item.IncomeTax.Rate ? item.IncomeTax.Rate : item.IncomeTax.rate;
    //                     pph=detail.PaidPrice*(parseFloat(rate)/100);
    //                 }
    //                 if(item.UseVat){
    //                     ppn=detail.PaidPrice*0.1;
    //                 }
    //                 this.data.IncomeTaxValue+=pph;
    //                 this.data.VatValue+=ppn;
    //                 this.data.DPP+=detail.PaidPrice;
    //                 if(this.data.IncomeTaxBy=="Supplier"){
    //                     this.data.Amount+=detail.PaidPrice+ppn;
    //                 }
    //                 else
    //                     this.data.Amount+=detail.PaidPrice+ppn+pph;
    //             }
    //         }
    //     }
    // }
    // this.service.update(this.data)
    //   .then(result => {
    //     this.cancel();
    //   })
    //   .catch(e => {
    //     this.error = e;
    //   })
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
        // this.data.Amount+=item.DPPValue+ppn+pph+this.data.MiscAmount;
        this.data.Amount =(this.data.DPP+this.data.VatValue+this.data.MiscAmount)-this.data.IncomeTaxValue;        
        
    }
    console.log("save edit",this.data);
    this.service.update(this.data)
        .then(result => {
            alert("Data berhasil dibuat");
            // this.router.navigateToRoute('create',{}, { replace: true, trigger: true });
            this.router.navigateToRoute('view', { id: this.data.Id });
            
        })
        .catch(e => {
            if (e.statusCode == 500) {
                alert("Terjadi Kesalahan Pada Sistem!\nHarap Simpan Kembali!");
            } else {
                this.error = e;
            }
        })
  }
}

