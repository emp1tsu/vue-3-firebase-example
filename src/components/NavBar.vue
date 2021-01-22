<template>
  <div class="navbar">
    <nav>
      <!-- <img src="@/assets/ninja.png" /> -->
      <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      <div class="links">
        <div>
          <div v-if="user">
            <router-link :to="{ name: 'CreatePlaylist' }"
              >Create Playlist</router-link
            >
            <router-link :to="{ name: 'UserPlaylists' }"
              >My Playlists</router-link
            >
            <span>Hi there, {{ user.displayName }}</span>
            <button @click="handleClick">Logout</button>
          </div>
          <div v-else>
            <router-link class="btn" :to="{ name: 'Signup' }"
              >Signup</router-link
            >
            <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;

  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;

    img {
      max-height: 60px;
    }

    h1 {
      margin-left: 20px;
    }

    .links {
      margin-left: auto;

      a,
      button {
        margin-left: 16px;
        font-size: 14px;
      }
    }

    span {
      font-size: 14px;
      display: inline-block;
      margin-left: 16px;
      padding-left: 16px;
      border-left: 1px solid #eee;
    }
  }
}
</style>
