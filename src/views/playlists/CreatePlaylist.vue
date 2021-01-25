<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <input
        type="text"
        required
        placeholder="Playlist title"
        v-model="title"
      />
      <textarea
        required
        placeholder="Playlist description..."
        v-model="description"
      ></textarea>

      <label>Upload Playlist Cover Image</label>
      <input type="file" @change="handleChange" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/config/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CreatePlayList",
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");
    const { user } = getUser();
    const router = useRouter();
    const title = ref<string>("");
    const description = ref<string>("");
    const file = ref<File | null>(null);
    const fileError = ref<string | null>(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (!user.value) return;
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;

        if (!res) return;

        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      }
    };

    const types = ["image/png", "image/jpeg"];
    const handleChange = (e: any) => {
      const files = e.target.files as FileList;
      if (!files) return;
      const tmpfile = files[0];
      if (types.includes(tmpfile.type)) {
        file.value = tmpfile;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
    };
  },
});
</script>

<style>
form {
  background: white;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
