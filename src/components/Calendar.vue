<template>
  <v-flex>
    <v-flex>
      <h2 style="padding-bottom: 20px;">
        <v-btn class="info" @click="$router.push('/')" style="margin-left: 0px;">
          Back to all
          <v-icon right dark>keyboard_arrow_left</v-icon>
        </v-btn>
        Viewing Schedule for Doctor {{ doctor }}
      </h2>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          color="primary"
          type="week"
          :end="start"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :weekdays="[1,2,3,4,5]"
        >
          <!-- the events at the top (all-day) -->
          <template
            slot="dayHeader"
            slot-scope="{ date }"
          >
            <template v-for="event in eventsMap[date]">
              <!-- all day events don't have time -->
              <div
                v-if="!event.time"
                :key="event.title"
                class="my-event"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>

          <!-- the events at the bottom (timed) -->
          <template
            slot="dayBody"
            slot-scope="{ date, timeToY, minutesToPixels }"
          >
            <template v-for="(event, index) in eventsMap[date]">
              <!-- timed events -->
              <div
                v-if="event.time"
                :key="index"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="selectEvent(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>

    <v-flex
      sm4
      xs12
      class="text-sm-left text-xs-center"
    >
      <v-btn @click="$refs.calendar.prev()">
        <v-icon dark left>keyboard_arrow_left</v-icon>
        Prev
      </v-btn>
      <v-btn @click="$refs.calendar.next()">
        Next
        <v-icon right dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>

    <v-navigation-drawer
      v-if="eventSelected && isAdmin"
      v-model="right"
      right
      fixed
      app
    >
      <pre>
        <code>{{eventSelected}}</code>
      </pre>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['doctor'],
  data: () => ({
    right: true,
    start: new Date().toISOString().split('T')[0],
    events: [
      {
        title: 'Booked',
        date: '2019-02-26',
        time: '09:00',
        duration: 45
      },
      {
        title: 'Booked',
        date: '2019-02-27',
        time: '14:00',
        duration: 45
      },
      {
        title: 'Booked',
        date: '2019-02-27',
        time: '09:00',
        duration: 45
      },
      {
        title: 'Doctor Day off',
        date: '2019-02-28'
      },
    ],
    intervals: { 
      first: 17, 
      minutes: 30, 
      count: 18, 
      height: 30 
    },
    eventSelected: null
  }),
  computed: {
    ...mapGetters({
      isAdmin: 'isAdmin'
    }),

    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  mounted () {
    this.$refs.calendar.next()
  },
  methods: {
    selectEvent (event) {
      if (this.eventSelected === event) {
        this.eventSelected = null
      } else {
        this.eventSelected = event
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;
    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>