import { ref } from "vue";
import { projectFirestore } from "../config/firebase";

type Song = {
  title: string;
  userId: string;
  userName: string;
};

const useDocument = (collection: string, id: string) => {
  const error = ref<string | null>(null);
  const isPending = ref(false);
  const docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not delete the document";
    }
  };

  const updateDoc = async (updates: { songs: Song[] }) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
