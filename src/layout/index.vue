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
    value="true"
  >
    <v-list class="pt-0">
      <v-list-tile @click="$router.push('/')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Search Doctors</v-list-tile-title>
      </v-list-tile>

      <v-list-tile @click="$router.push('/calendar')">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Doctor Schedule</v-list-tile-title>
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
    </v-list>
  </v-navigation-drawer>

    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile>
          <v-list-tile-content @click="$router.push('/')">
            <v-list-tile-title>Sunlight Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content @click="$router.push('/calendar')">
            <v-list-tile-title>Calendar</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-content @click="$router.push('/login')">
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

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
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    drawer: null,
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
  props: {
    source: String
  }
}
</script>
