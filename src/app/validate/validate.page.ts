import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {

  constructor(public modalController: ModalController,) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalController.dismiss();

  }

}
