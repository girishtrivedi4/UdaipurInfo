import { Component, OnInit } from '@angular/core';
import { FireDbService } from '../Service/fireDb.service';
import { HttpapiService } from '../Service/httpapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit   {
  data: any[] = [];
  imageUrls: any[] = []; 
  imageUrl: string[] = [];
  imageDta:any;
  newsLatterEmail: string = "";

  constructor(private firebaseService: FireDbService, private apiService : HttpapiService) { this.loadImages()}

  async ngOnInit() {
    // debugger
    this.LoadPixabayImage();
    this.data = await this.firebaseService.getCollectionDataOnce('Attraction');
    // debugger
    console.log('ddddddddddddddddd',this.data);
       
  }

  LoadPixabayImage(){
    this.apiService.getNewsData('udaipur').subscribe((data) => {
      this.imageDta = JSON.parse(JSON.stringify(data)).hits
      console.log('pppppppppppppp', this.imageDta); // Handle the data as needed
    });
  }

  public getUrl(id:any){
    const idata = this.imageDta.find((url:any) => url.id == id)
    console.log('iiiiiiiiiiiiiii',idata);
    return idata.webformatURL
  }

  loadImages() {
    const folderPath = 'images'; // Replace with your folder path
    this.firebaseService.getAllImageUrls('gs://tourudaipur-8b419.appspot.com/Pichhola')
      .then((urls) => {
        this.imageUrls = urls; // Assign the URLs to the component property
      }).catch((error) => {
        console.error(error);
      });
  }

  addNewsLatterEmail(){
    const nEmail = { Email : this.newsLatterEmail}
    const resp = this.firebaseService.insertData("NewsLetter", nEmail)
  }

}
