import { watchEffect, ref } from "vue";
import { projectFirestore } from "../config/firebase";

const getDocument = (collection: string, id: string) => {
  const document = ref<any>(null);
  const error = ref<string | null>(null);

  const documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist";
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "problem fetching the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
