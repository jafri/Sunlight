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
    async login () {
      if (this.$refs.form.validate()) {
        let user = await this.$api.loginUser(this.username, this.password)

        if (this.username === 'r' && this.password === 'r') {
          this.$store.commit('SET_USER', {
            role: 'receptionist'
          })
          this.$router.push('/')
        }

        if (this.username === 'a' && this.password === 'a') {
          this.$store.commit('SET_USER', {
            role: 'admin'
          })
          this.$router.push('/')
        }

        if (this.username === 'd' && this.password === 'd') {
          this.$store.commit('SET_USER', {
            role: 'doctor'
          })
          this.$router.push('/')
        }
        console.log(user)
      }
    }
  }
}
</script>
