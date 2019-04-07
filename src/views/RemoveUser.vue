<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <h1> Click a user to remove them permanently </h1>

    <div
      v-for="([type, users]) in Object.entries(allUsers)"
      :key="type"
      style="padding-top: 15px;"
    >
      <div>
        <b>{{type}}</b>
      </div>

      <div v-if="users.length > 0">
        <div
          v-for="(user, i) in users"
          :key="i"
          style="padding-right: 10px; display: inline-block;"
        >
          <v-btn color="info" @click="removeUser(user.id)">
            {{user.name}}
          </v-btn>
        </div>
      </div>
      <div v-else>
        No {{ type }} registered.
      </div>
    </div>

    <span v-if="error" style="color: red; padding-top: 15px;">
      {{ error }}
    </span>

    <span v-if="success" style="color: green;">
      {{ success }}
    </span>
  </v-form>
</template>

<script>
const defaultAllUsers = () => ({
  doctors: [],
  receptionists: [],
  admins: []
})

export default {
  data: () => ({
    valid: true,
    success: '',
    error: '',
    allUsers: defaultAllUsers()
  }),

  methods: {
    async removeUser (id) {
      this.success = ''
      this.error = ''

      let { Message } = await this.$api.removeUser(id)

      if (Message === 'User was successfully removed') {
        await this.fetchData()
        this.success = Message
      } else {
        this.error = Message
      }
    },

    async fetchData () {
      const { credentials } = await this.$api.getAllUsers()
      console.log(credentials)
      
      this.allUsers = credentials.reduce((acc, user) => {
        
        if (user.admin_role) {
          acc.admins.push(user)
        } else if (user.department) {
          acc.doctors.push(user)
        } else if (user.reception_role) {
          acc.receptionists.push(user)
        }

        return acc
      }, defaultAllUsers())
    }
  },

  created () {
    this.fetchData()
  }
}
</script>
