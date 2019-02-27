<template>
  <div class="home">
    <Calendar :doctor="doctor"/>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

export default {
  props: ['doctor'],
  name: 'home',
  components: {
    Calendar
  }
}
</script>
