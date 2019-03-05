<template>
  <div>
    <h1> Select Doctor by Department </h1>
    <v-text-field
      v-model="nameFilter"
      label="Search doctor name"
      required
    ></v-text-field>
    <div
      v-for="(department, i) in filteredDepartments"
      :key="i"
      style="padding-top: 15px;"
    >
      <div>
        {{department.name}}
      </div>

      <div
        v-for="(doctor, ii) in department.doctors"
        :key="ii"
        style="padding-right: 10px; display: inline-block;"
      >
        <router-link :to="`/calendar/${doctor}`">
          <v-btn color="info">
            {{doctor}}
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      nameFilter: '',
      departments: [
        {
          name: 'Cardiology',
          doctors: ['Andy', 'Alpha']
        },
        {
          name: 'Surgery',
          doctors: ['Bill', 'Bob', 'Bryan']
        },
        {
          name: 'Orthopedics',
          doctors: ['Cathy', 'Catherine']
        }
      ]
    }
  },

  computed: {
    filteredDepartments () {
      let departments = []

      for (let department of this.departments) {
        let newDepartment = Object.assign({}, department)

        if (this.nameFilter) {
          newDepartment.doctors = newDepartment.doctors.filter(
            doctor => doctor.toLowerCase().indexOf(this.nameFilter) !== -1
          )
        }

        if (newDepartment.doctors.length) {
          departments.push(newDepartment)
        }
      }

      return departments
    }
  }
}
</script>
