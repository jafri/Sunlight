<template>
  <div class="home">
    <Calendar :doctor="doctor" :id="id"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  props: ['doctor', 'id'],
  name: 'home',
  components: {
    Calendar
  },

  created () {
    console.log(this.doctor, this.id)
  }
}
</script>
