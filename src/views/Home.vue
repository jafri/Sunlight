<template>
  <div>
    <h1> Select Doctor by Department </h1>
    <v-text-field
      v-model="nameFilter"
      label="Search doctor name"
      required
    ></v-text-field>
    <div
      v-for="([department, doctors], i) in filteredDepartments"
      :key="i"
      style="padding-top: 15px;"
    >
      <div>
        {{department}}
      </div>

      <div
        v-for="(doctor, ii) in doctors"
        :key="ii"
        style="padding-right: 10px; display: inline-block;"
      >
        <router-link :to="{ name: 'calendar', params: { doctor: doctor.name, id: doctor.id } }">
          <v-btn color="info">
            {{doctor.name}}
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'home',

  data () {
    return {
      nameFilter: '',
      departments: {}
    }
  },

  computed: {
    filteredDepartments () {
      let departments = {}

      for (let [department, doctors] of Object.entries(this.departments)) {
        let departmentDoctors = doctors

        if (this.nameFilter) {
          departmentDoctors = departmentDoctors.filter(
            doctor => doctor.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) !== -1
          )
        }

        if (departmentDoctors.length) {
          departments[department] = departmentDoctors
        }
      }

      return Object.entries(departments)
    }
  },

  methods: {
    async fetchData() {
      let { doctors } = await this.$api.getAllDoctors()
      this.departments = _.groupBy(doctors, (doctor) => doctor.department)
    }
  },

  created () {
    this.fetchData()
  }
}
</script>
