import { computedFrom } from "aurelia-framework";

export class Item {
    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;

        this.isCreate = context.context.options.isCreate;
        this.isEdit = this.context.isEdit;
        this.showOrigin = this.context.isEdit;
        
    }

    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }

}