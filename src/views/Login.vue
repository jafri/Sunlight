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

    <span v-if="error" style="color: red; padding-top: 15px;">{{error}}</span>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: '',
    error: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 12) || 'Username must be less than 12 characters'
    ],
    password: ''
  }),

  methods: {
    async login () {
      this.error = ''

      if (this.$refs.form.validate()) {
        let { role, loginValid } = await this.$api.loginUser(this.username, this.password)

        console.log(role, loginValid)
        if (loginValid) {
          this.$store.commit('SET_USER', {
            role: role
          })
          this.$router.push('/')
        } else {
          this.error = 'Invalid username/pass combo.'
        }
      }
    }
  }
}
</script>
