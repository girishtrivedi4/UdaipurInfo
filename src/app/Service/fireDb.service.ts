import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
// import { addDoc } from 'firebase/firestore';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  constructor(private firestore: Firestore,) { }

  async getCollectionDataOnce(collectionName: string) {
    const querySnapshot = await getDocs(collection(this.firestore, collectionName));
    return querySnapshot.docs.map(doc => doc.data());

  }


  async insertData(collectionName: string, data: any) {
    try {
      const t = await addDoc(collection(this.firestore, collectionName), data)
      return ('Data inserted successfully!');
    } catch (error) {
      return error;
    }
  }

  getAllImageUrls(folderPath: string): Promise<string[]> {
    const storage = getStorage();
    const folderRef = ref(storage, folderPath);

    return listAll(folderRef).then((result) => {
      const urlPromises = result.items.map((itemRef) => {
        return getDownloadURL(itemRef);
      });
      return Promise.all(urlPromises);
    });
  }

}
