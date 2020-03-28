import { ValidatePage } from './../validate/validate.page';
import { Component, ViewChild  } from '@angular/core';

import {ElementRef,Renderer2} from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ModalController, IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public qrCodeUrl: any;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    public plt: Platform,
    private routerOutlet: IonRouterOutlet,
    public modalController: ModalController,
    private storage: AngularFireStorage
    ) {

  }

  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file.name);

    //const filePath = 'dummyfile.pdf';
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe(downloadUrl=>{
            console.log(downloadUrl);

            if (this.plt.is("mobile")) {
              Browser.open({"url": "eidplus://did:eidplus:undefined/document?source=" + downloadUrl});
              this.qrCodeUrl = downloadUrl;  
            } else {
              this.qrCodeUrl = downloadUrl;  
            }
          });
          
         // this.qrCodeUrl = encodeURIComponent(String(this.downloadURL));

        })     )
    .subscribe()
  }

  async validieren(){

    const modal = await this.modalController.create({
      component: ValidatePage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
    

  }

}
