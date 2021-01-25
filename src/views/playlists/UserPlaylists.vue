<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a New Playlist</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

export default defineComponent({
  name: "UserPlaylists",
  components: { ListView },
  setup() {
    const { user } = getUser();
    if (!user.value) return;
    const { documents: playlists } = getCollection("playlists", {
      fieldPath: "userId",
      opStr: "==",
      value: user.value.uid,
    });
    return { playlists };
  },
});
</script>
