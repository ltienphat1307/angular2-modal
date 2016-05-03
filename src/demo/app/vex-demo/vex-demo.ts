import {Component, ViewEncapsulation, ViewContainerRef, ViewChild} from '@angular/core';

import {DialogRef} from '../../../components/angular2-modal';

import {
    VEXBuiltInThemes,
    VEX_MODAL_PROVIDERS,
    Modal,
    DropInPreset,
    DialogPreset,
    DialogFormModal,
    DialogPresetBuilder
} from '../../../components/angular2-modal/plugins/vex';

import {LoginDialog} from './login-dialog';
@Component({
    selector: 'vex-demo',
    styleUrls: [
        'demo/app/vex-demo//css/vex.css',
        'demo/app/vex-demo//css/vex-theme-default.css',
        'demo/app/vex-demo//css/vex-theme-os.css',
        'demo/app/vex-demo//css/vex-theme-plain.css',
        'demo/app/vex-demo//css/vex-theme-wireframe.css',
        'demo/app/vex-demo//css/vex-theme-flat-attack.css',
        'demo/app/vex-demo//css/vex-theme-top.css',
        'demo/app/vex-demo//css/vex-theme-bottom-right-corner.css'
    ],
    templateUrl: 'demo/app/vex-demo/vex-demo.tpl.html',
    providers: [...VEX_MODAL_PROVIDERS],
    encapsulation: ViewEncapsulation.None
})
export class VexDemo {
    result: any;
    theme: VEXBuiltInThemes = <VEXBuiltInThemes>'default';

    constructor(public modal: Modal, viewContainer: ViewContainerRef) {
        /**
         * A Default view container ref, usually the app root container ref.
         * Has to be set manually until we can find a way to get it automatically.
         */
        this.modal.defaultViewContainer = viewContainer;
    }

    processDialog(dialog: Promise<DialogRef<DropInPreset>>) {
        dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                this.result = result;
            }, () => this.result = 'Rejected!');
        });
    }

    dialog() {
        let dialog = new DialogPresetBuilder<DialogPreset>(this.modal)
            .className(this.theme)
            .content(LoginDialog)
            .message("Ary you coming to the event?")
            .addOkButton('Yep!')
            .addButton(
                'vex-dialog-button-primary vex-dialog-button',
                'Maybe?',
                (cmp: DialogFormModal, $event:MouseEvent) => cmp.dialog.close('Maybe')
            )
            .addCancelButton('Nope!')
            .open();
        
        this.processDialog(<any>dialog);
    }

    dropIn(type: string){
        let dialog: any;
        switch (type) {
            case 'alert':
                dialog = this.modal.alert()
                    .className(this.theme)
                    .message('This is a native alert!')
                    .showCloseButton(true)
                    .open();
                break;
            case 'prompt':
                dialog = this.modal.prompt()
                    .className(this.theme)
                    .message('This is a native prompt!')
                    .placeholder('This is a default value')
                    .open();
                break;
            case 'confirm':
                dialog = this.modal.confirm()
                    .className(this.theme)
                    .message('Yes or No?')
                    .open();
                break;
            default:
                break;
        }

        this.processDialog(dialog);
    }
}