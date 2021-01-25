import { ref } from "vue";
import { projectAuth } from "../config/firebase";

const error = ref<string | null>(null);
const isPending = ref(false);

const signup = async (email: string, password: string, displayName: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Could not complete signup");
    }
    if (!res.user) {
      throw new Error("Could not complete signup");
    }
    await res.user.updateProfile({ displayName });
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
