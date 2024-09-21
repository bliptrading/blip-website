import { getFirestore, setDoc, doc } from "firebase/firestore";
import { app } from "../utils/firebase";

class FirebaseApi {
  constructor() {
    this.app = app;
    this.db = getFirestore(app);
  }

  async pushToFirestore(id) {
    try {
      await setDoc(doc(this.db, "orders", id), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      });
      alert("Document added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add document. Please try again.");
    }
  }
}

const firebaseInstance = new FirebaseApi();

export default firebaseInstance;
