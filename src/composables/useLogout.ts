import { ref } from "vue";
import { projectAuth } from "../config/firebase";

const error = ref<string | null>(null);
const isPending = ref(false);

const logout = async () => {
  error.value = null;
  isPending.value = true;

  try {
    await projectAuth.signOut();
    isPending.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
