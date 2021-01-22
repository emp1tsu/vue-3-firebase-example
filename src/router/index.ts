import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import UserPlaylists from "../views/playlists/UserPlaylists.vue";

import { projectAuth } from "../config/firebase";

const requireAuth = (_to: any, _from: any, next: NavigationGuardNext) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/user",
    name: "UserPlaylists",
    component: UserPlaylists,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
