import { projectStorage } from "../config/firebase";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref<string | null>(null);
  const url = ref(null);
  const filePath = ref(null);

  // @ts-ignore
  const uploadImage = async (file) => {
    // @ts-ignore
    filePath.value = `covers/${user.value.uid}/${file.name}`;
    // @ts-ignore
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  const deleteImage = async (path: string) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { uploadImage, deleteImage, url, filePath, error };
};

export default useStorage;
