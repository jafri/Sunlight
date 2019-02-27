<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="username"
      :counter="12"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="info"
      @click="login"
      style="margin-left: 0px;"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 12) || 'Username must be less than 12 characters'
      ],
      password: ''
    }),

    methods: {
      login () {
        if (this.$refs.form.validate()) {
          if (this.username === 'admin' && this.password === 'admin') {
            this.$store.commit('SET_USER', {
              role: 'admin'
            })
            this.$router.push('/')
          }
        }
      }
    }
  }
</script>