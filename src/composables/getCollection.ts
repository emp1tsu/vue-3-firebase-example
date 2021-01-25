import { ref, watchEffect } from "vue";
import { projectFirestore } from "../config/firebase";

export type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";

type Query = {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: string;
};

const getCollection = (collection: string, query: Query) => {
  const documents = ref<any>(null);
  const error = ref<string | null>(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  if (query) {
    console.log(query);
    collectionRef = collectionRef.where(
      query.fieldPath,
      query.opStr,
      query.value
    );
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      const results: any = [];
      snap.docs.forEach((doc) => {
        console.log("aaaa", doc.data());
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
