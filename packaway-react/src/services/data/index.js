import * as firebase from "firebase";

export default class DataService {
  //user functions
  static async addObjectWithId(collection, objId, data) {
    return await DataService.updateDetail(collection, objId, data);
  }

  static async getObjectDetail(collection, objId) {
    const db = firebase.firestore();
    let contact = null;

    try {
      const contactRef = await db
        .collection(collection)
        .doc(objId)
        .get();
      if (contactRef.exists) {
        contact = contactRef.data();
      }
    } catch (err) {
      console.log("TCL: DataService -> getObjectDetail -> err", err);
    }

    return contact;
  }

  static async updateDetail(collection, id, data) {
    const db = firebase.firestore();
    let success = true;

    try {
      await db
        .collection(collection)
        .doc(id)
        .set(data, { merge: true });
    } catch (err) {
      success = true;
      console.log("TCL: DataService -> staticupdatedDetail -> err", err);
    }
    return success;
  }
  //generic item functions
  static async addItem(collection, data) {
    const db = firebase.firestore();
    let success = false;

    try {
      const docRef = await db.collection(collection).add(data);

      if (docRef && docRef.id) {
        success = true;
      }
    } catch (err) {
      console.log("TCL: DataService -> addContact -> err", err);
    }

    return success;
  }

  //poi functions
  static async getPOI() {
    const db = firebase.firestore();
    let results = [];

    try {
      const querySnapshot = await db.collection("pois").get();

      querySnapshot.forEach(doc => {
        const objectResult = doc.data();
        objectResult.id = doc.id;
        results.push(objectResult);
      });
    } catch (err) {
      console.log("TCL: DataService -> getPOI -> err", err);
    }

    return results;
  }

  //pagination
  static async getPOIPaginated(lastVisible, order) {
    const db = firebase.firestore();
    let results = [];
    let queryLastVisible;
    let queryFirstVisible;
    try {
      let query = db.collection("pois").orderBy("name", order);
      if (lastVisible) {
        query = query.startAfter(lastVisible);
      }
      query = query.limit(10);
      const querySnapshot = await query.get();

      let i = 0;
      querySnapshot.forEach(doc => {
        const objectResult = doc.data();
        objectResult.id = doc.id;
        results.push(objectResult);
        if (i === querySnapshot.size - 1) {
          queryLastVisible = doc;
        }
        if (i === 0) {
          queryFirstVisible = doc;
        }
        i++;
      });
    } catch (err) {
      console.log("TCL: DataService -> getPOI -> err", err);
    }

    if (order === "desc") {
      results = results.reverse();
      const tempVisible = queryLastVisible;
      queryLastVisible = queryFirstVisible;
      queryFirstVisible = tempVisible;
    }

    return { results, queryLastVisible, queryFirstVisible };
  }

  //pack functions
  static async addPack(data) {
    const db = firebase.firestore();
    let docRef;
    try {
      const user = await DataService.getObjectDetail("users", data.userId);

      docRef = await db.collection("packs").add(data);
      if (docRef && docRef.id) {
        if (!user.packs) {
          user.packs = [];
        }
        user.packs.push(docRef.id);
        await DataService.updateDetail("users", data.userId, {
          packs: user.packs
        });
      }
    } catch (err) {
      console.log("TCL: DataService -> addContact -> err", err);
    }

    return docRef.id;
  }

  static async getPack(packId) {
    const db = firebase.firestore();
    let pack = null;
    try {
      const packRef = await db
        .collection("packs")
        .doc(packId)
        .get();
      if (packRef.exists) {
        pack = packRef.data();
      }
    } catch (err) {
      console.log("TCL: DataService -> staticgetPack -> err", err);
    }
    return pack;
  }

  static async updatePackData(packId, data) {
    const db = firebase.firestore();
    console.log("data",data)
    let success = true;
    try {
      const pack = await DataService.getObjectDetail("packs", packId);
      if (pack) {
        pack.days = data.days;
        await db
        .collection("packs")
        .doc(packId)  
        .update({days: data.days, unassignedPois: data.unassignedPois, name:data.packName});
      }
      
    } catch (err) {
      success = true;
      console.log("TCL: DataService -> staticupdatedDetail -> err", err);
    }
    return success;
  }

  static async updatePackPois(packId, pois) {
    const db = firebase.firestore();
    let success = true;
    try {
      const pack = await DataService.getObjectDetail("packs", packId);
      if (pack) {
        await db
        .collection("packs").doc(packId).update({poiList: pois});
      }
      
    } catch (err) {
      success = true;
      console.log("TCL: DataService -> staticupdatedDetail -> err", err);
    }
    return success;
    
  }
}
