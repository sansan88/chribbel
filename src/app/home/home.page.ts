import { Component, ViewChild  } from '@angular/core';

import {ElementRef,Renderer2} from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public qrCodeUrl: any;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) {}
  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file.name);

    const filePath = 'dummyfile';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe(downloadUrl=>{
            console.log(downloadUrl);
            this.qrCodeUrl = downloadUrl;  
          });
          
         // this.qrCodeUrl = encodeURIComponent(String(this.downloadURL));

        })     )
    .subscribe()
  }

}
