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
    isSurgeon: false,
    selectedType: 'doctor',
    typesOfUsers: ['doctor', 'receptionist']
  }),

  methods: {
    add () {
      if (this.selectedType === 'doctor') {
        if (this.username && this.password && this.phone && this.name && this.departmentId && this.isSurgeon) {
          this.$api.addDoctor(this.username, this.password, this.phone, this.name, this.departmentId, this.isSurgeon)
        }
      } else {
        if (this.username && this.password && this.phone && this.name) {
          this.$api.addReceptionist(this.username, this.password, this.phone, this.name)
        }
      }
    }
  }
}
</script>
