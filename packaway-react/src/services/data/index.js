import * as firebase from "firebase";


export default class DataService {
  //user functions
  static async addObjectWithId(collection, objId, data) {
		console.log("TCL: DataService -> staticaddObjectWithId -> collection", collection)
    return await DataService.updateDetail(collection, objId, data);
  }

  static async getObjectDetail(collection, objId) {
	console.log("TCL: DataService -> staticgetObjectDetail -> collection", collection)
  
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
		console.log("TCL: DataService -> staticupdateDetail -> collection", collection)
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
		console.log("TCL: DataService -> staticaddItem -> collection", collection)
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

  //pack functions
  static async addPack(data) {
		console.log("TCL: DataService -> staticaddPack -> data", data)
    
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
		console.log("TCL: DataService -> staticgetPack -> packId", packId)
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

  static async deletePack(packId, userId) {
		console.log("TCL: DataService -> staticdeletePack -> packId", packId)
    const db = firebase.firestore();
    let success = true;
    try {
      const user = await DataService.getObjectDetail("users", userId);
      await db.collection("users").doc(userId).update({packs: user.packs.filter(pack => pack !== packId)})
      await db.collection("packs").doc(packId).delete();

    } catch (err) {
      success = true;
      console.log("TCL: DataService -> deletePack -> err", err);
    }
    return success;
  }

  static async updatePackData(packId, data) {
		console.log("TCL: DataService -> staticupdatePackData -> packId", packId)
    const db = firebase.firestore();
    let success = true;
    try {
      const pack = await DataService.getObjectDetail("packs", packId);
      if (pack) {
        pack.days = data.days;
        await db
          .collection("packs")
          .doc(packId)
          .update({
            days: data.days,
            unassignedPois: data.unassignedPois,
            name: data.packName
          });
      }
    } catch (err) {
      success = true;
      console.log("TCL: DataService -> staticupdatedDetail -> err", err);
    }
    return success;
  }


  //pagination
  static async getPOIPaginated(lastVisible, order, city, type) {
		console.log("TCL: DataService -> staticgetPOIPaginated -> type", type)
    
    const db = firebase.firestore();
    let results = [];
    let queryLastVisible;
    let queryFirstVisible;
    let hasNextPage;
    const totalPoisPerPage = 10;
    try {
      let query = db
        .collection("pois")
        .where("city", "==", city)

      if (type) {
        query = query.where("type", "==", type)  
      }
        query = query.orderBy("name", order);

      if (lastVisible) {
        query = query.startAfter(lastVisible);
      }
      query = query.limit(totalPoisPerPage);
      const querySnapshot = await query.get();

      let i = 0;
      querySnapshot.forEach(doc => {
        const objectResult = doc.data();
        objectResult.id = doc.id;
        results.push(objectResult);
        if (order === "desc") {
          if (i === querySnapshot.size - 2) {
            queryFirstVisible = doc;
          }
          if (i === 0) {
            queryLastVisible = doc;
          }
        } else {
          if (i === querySnapshot.size - 2) {
            queryLastVisible = doc;
          }
          if (i === 0) {
            queryFirstVisible = doc;
          }
        }
        i++;
      });
    } catch (err) {
      console.log("TCL: DataService -> getPOIPaginated -> err", err);
    }

    if (results.length === totalPoisPerPage) {
      hasNextPage = true;
      results.pop();
    } else if (order !== "desc") {
      hasNextPage = false;
    } else {
      hasNextPage = true;
    }

    if (order === "desc") {
      results = results.reverse();
    }

    return { results, queryLastVisible, queryFirstVisible, hasNextPage };
  }

}



//   static async getPoisByType(types) {
// 		console.log("TCL: DataService -> staticgetPoisByType -> types", types)
//     const filteredResults = await Promise.all(
//       types.map(type => DataService.filterResults(type))
//     );
//     let filteredArr = [];
//     filteredResults.forEach(poiArr => {
//       filteredArr = [...poiArr, ...filteredArr];
//     });
//     return filteredArr;
//   }


//   //filter queries

//   static async filterResults(type) {
// 		console.log("TCL: DataService -> staticfilterResults -> type", type)
//     //llamar a poipaginated
//     const db = firebase.firestore();
//     let success = true;
//     let resultsArray = [];
//     try {
//       const querySnapshot = await db
//         .collection("pois")
//         .where("type", "==", type)
//         .get();
//       querySnapshot.forEach(function(doc) {
//         resultsArray.push(doc.data());
//       });
//     } catch (err) {
//       success = true;
//       console.log("TCL: staticfilterResults -> err", err);
//     }
//     return resultsArray;
//   }