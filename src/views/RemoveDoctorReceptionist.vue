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

    <div v-if="selectedType === 'doctor'">
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Phone"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="departmentId"
        label="Department ID"
        required
      ></v-text-field>
      <v-checkbox v-model="isSurgeon" label="Is Surgeon"></v-checkbox>
    </div>
    <div v-if="selectedType === 'receptionist'">
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Phone"
        required
      ></v-text-field>
      <v-text-field
        v-model="name"
        label="Name"
        required
      ></v-text-field>
    </div>

    <v-btn
      :disabled="!valid"
      color="info"
      @click="add"
      style="margin-left: 0px;"
    >
      Add {{ selectedType }}
    </v-btn>

    <span v-if="success" style="color: green;">
      {{ success }}
    </span>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: '',
    password: '',
    phone: '',
    name: '',
    departmentId: '',
    success: '',
    isSurgeon: false,
    selectedType: 'doctor',
    typesOfUsers: ['doctor', 'receptionist']
  }),

  methods: {
    async add () {
      this.success = ''

      if (this.selectedType === 'doctor') {
        if (this.username && this.password && this.phone && this.name && this.departmentId) {
          let { Message } = await this.$api.addDoctor(this.username, this.password, this.phone, this.name, this.departmentId, this.isSurgeon)

          if (Message === 'Doctor was successfully added') {
            this.success = Message
          }
        }
      } else {
        if (this.username && this.password && this.phone && this.name) {
          let { Message } = await this.$api.addReceptionist(this.username, this.password, this.phone, this.name)

          if (Message === 'Receptionist was successfully added') {
            this.success = Message
          }
        }
      }
    }
  }
}
</script>
