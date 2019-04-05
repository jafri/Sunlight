<template>
  <v-app id="app">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Sunlight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{user.role}}</v-toolbar-title>
    </v-toolbar>

  <v-navigation-drawer
    fixed
    app
    :value="drawer"
  >
    <v-list class="pt-0">
      <v-list-tile @click="$router.push('/')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Search Doctors</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="$router.push('/login')" v-if="isAnonymous">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Login</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="$router.push('/add')" v-if="isAdmin">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Add Doctor/Receptionist</v-list-tile-title>
      </v-list-tile>  

      <v-list-tile @click="logout" v-if="!isAnonymous">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>


    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="right"
      right
      temporary
      fixed
    ></v-navigation-drawer>
    <v-footer color="blue-grey" class="white--text" app>
      <span>Sunlight</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    drawer: true,
    drawerRight: null,
    right: false
  }),
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters({
      isAnonymous: 'isAnonymous',
      isAdmin: 'isAdmin'
    })
  },

  methods: {
    ...mapActions ({
      logout: 'LOGOUT'
    })
  },

  props: {
    source: String
  }
}
</script>
