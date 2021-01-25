import { ref } from "vue";
import { projectAuth } from "../config/firebase";

const error = ref<string | null>(null);
const isPending = ref(false);

const login = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = "Incorrect login credentials";
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
