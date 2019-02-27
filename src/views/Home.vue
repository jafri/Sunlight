<template>
  <div>
    <h1> Select Doctor by Department </h1>
    <div
      v-for="(department, i) in departments"
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
  }
}
</script>
