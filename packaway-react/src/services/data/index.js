import * as firebase from "firebase";

export default class DataService {

  static async addObjectWithId(collection, objId, data) {
    return await DataService.updateDetail(collection, objId, data)
  }

  static async getObjectDetail(collection, objId) {
    const db = firebase.firestore();
    let contact = null;

    try{ 
      const contactRef = await db.collection(collection).doc(objId).get();
      if(contactRef.exists) {
        contact = contactRef.data();
      }
    } catch (err){
			console.log("TCL: DataService -> getObjectDetail -> err", err)
    } 

    return contact;
  }

  static async updateDetail(collection, id, data) {
    const db = firebase.firestore();
    let success = true;

    try {
      //arrayUnion to put pack inside array
      await db.collection(collection).doc(id).set(data, {merge: true})
    } catch (err) {
      success = true;
			console.log("TCL: DataService -> staticupdatedDetail -> err", err)
    }
    return success;
  }

  static async addItem(collection, data) {
    const db = firebase.firestore();
    let success = false;
 

    try {
      const docRef = await db.collection(collection).add(data);
   
      if(docRef && docRef.id) {
        success = true;
      }
    } catch (err) {
			console.log("TCL: DataService -> addContact -> err", err)
    }

    return success;
  }

  static async getPOI() {
    const db = firebase.firestore();
    let results = [];

    try {
      const querySnapshot = await db.collection("pois").get();

      querySnapshot.forEach(doc => {
        const objectResult = doc.data();
        objectResult.id = doc.id;
        results.push(objectResult);
      }) 
    } catch (err) {
			console.log("TCL: DataService -> getPOI -> err", err)
    }

    return results;
  }

  
  static async addPack(data) {
    const db = firebase.firestore();
    let success = false;
    try {
      const docRef = await db.collection("packs").add(data);
      if (docRef && docRef.id) {
        await DataService.updateDetail("users", data.userId, {packs: docRef.id})
        success = true;
      }
    } catch (err) {
			console.log("TCL: DataService -> addContact -> err", err)
    }

    return success;
  }


    
    

}