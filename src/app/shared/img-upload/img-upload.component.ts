import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';

interface Image {path: string; url: string; }

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnInit, OnDestroy {
  @Input() image: string;
  @Input() storageBucket: string;
  @Output() imageUploaded = new EventEmitter<Image>();
  selectedFileCount: number;
  maxFileUploadCount: number;
  imagesToBeDeleted: Image[];
  currentImage: Image;

  downloadURL: string;
  uploadPercent$: Observable<number>;
  subscription: Subscription;
  snapshot;

  constructor(private storage: AngularFireStorage) {
    this.storageBucket = 'productImages';
    this.imagesToBeDeleted = [];
    this.selectedFileCount = 0;
    this.maxFileUploadCount = 1;
   }

  ngOnInit() {
  }

  startUpload(imageFiles: FileList) {
    console.log('From fileController');
    if (imageFiles[0]) {

      const image = imageFiles[0];
      const imagePath = `${this.storageBucket}/${Date.now()}_${image.name}`;
      const storageRef = this.storage.ref(imagePath);
      const uploadTask = this.storage.upload(imagePath, image);

      // Watch file upload process...
      this.uploadPercent$ = uploadTask.percentageChanges();

      this.snapshot = uploadTask.snapshotChanges().pipe(
        tap( console.log ),
        finalize( async () => {
          this.downloadURL = await storageRef.getDownloadURL().toPromise();
          this.updateFileCount(1);
          this.currentImage = { path: imagePath, url: this.downloadURL };
          this.imageUploaded.emit(this.currentImage);
        })
      );
    }
  }

  updateFileCount(counter: number) {
    this.selectedFileCount = this.selectedFileCount + counter;
  }

  deleteImage(imgURL: string) {
    if (this.currentImage.url === imgURL) {
      this.imagesToBeDeleted.push(this.currentImage);
      this.updateFileCount(-1);
      this.downloadURL = null;
      this.imageUploaded.emit(null);
    }
  }

  cleanup(images: Image[]) {
    console.log(' #### Cleanup: Free storage for these images ####');
    images.forEach(image => {
      this.storage.ref(image.path).delete();
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Cleanup(imagesToBeDeleted)');
    this.cleanup(this.imagesToBeDeleted);
  }


}
