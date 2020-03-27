import {
  Component,
  OnInit
} from '@angular/core';
import {
  FileUploader,
  FileLikeObject
} from 'ng2-file-upload';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.scss'],
})
export class MultiFileUploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor() {

    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      console.log(fileItem); // fileItem is the file object
    };

  }
  ngOnInit() {}

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {

      return fileItem.file;
    });
  }

  fileOverBase(ev): void {

    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {

    let element = this.uploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.uploader.queue.splice(reorderEvent.detail.to, 0, element);
  }

}