import { ref } from "vue";
import { projectFirestore } from "../config/firebase";

type Doc = {
  title: string;
  description: string;
  userId: string;
  userName: string | null;
  coverUrl: string | null;
  filePath: string | null;
  songs: string[];
  createdAt: any;
};

const useCollection = (collection: string) => {
  const error = ref<string | null>(null);
  const isPending = ref(false);

  const addDoc = async (doc: Doc) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
