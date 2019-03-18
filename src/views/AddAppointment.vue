<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  
    <v-radio-group v-model="selectedType">
      <v-radio
        v-for="n in typesOfUsers"
        :key="n"
        :label="n"
        :value="n"
      ></v-radio>
    </v-radio-group>

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
      @click="addAppointment"
      style="margin-left: 0px;"
    >
      Add Appointment
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
    password: '',
    selectedType: 'doctor',
    typesOfUsers: ['doctor', 'receptionist']
  }),

  methods: {
    addAppointment () {
      // TODO
    }
  }
}
</script>
