<template>
  <v-flex>
    <v-flex>
      <h2 style="padding-bottom: 20px;">
        <v-btn class="info" @click="$router.push('/')" style="margin-left: 0px;">
          Back to all doctors
          <v-icon right dark>keyboard_arrow_left</v-icon>
        </v-btn>
        Viewing Schedule for Dr. {{ doctor }}
      </h2>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          color="primary"
          type="week"
          v-model="start"
          :end="start"
          :first-interval="intervals.first"
          :interval-minutes="intervals.minutes"
          :interval-count="intervals.count"
          :interval-height="intervals.height"
          :weekdays="[1,2,3,4,5]"
          @click:time="clickTime"
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
                @click.stop="selectEvent(event)"
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
                @click.stop="selectEvent(event)"
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
      style="padding-top: 15px; float: right;"
    >
      <v-btn @click="lastWeek">
        <v-icon dark left>keyboard_arrow_left</v-icon>
        Prev
      </v-btn>
      <v-btn @click="nextWeek">
        Next
        <v-icon right dark>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>

    <v-navigation-drawer
      v-if="(eventSelected || addingEvent) && !isAnonymous"
      v-model="right"
      right
      clipped
      fixed
      app
    >
      <v-flex style="padding-top: 25px; padding-left: 25px;" v-if="eventSelected">
        <div v-for="([key, value]) in Object.entries(eventSelected)" style="padding-bottom: 10px;">
          <b>{{ capitalize(key) }}:</b> {{ value }}
        </div>
      </v-flex>

      <v-btn @click="cancelAppointment(eventSelected)"
             v-if="eventSelected"
             color="error"
             style="margin-left: 25px; margin-top: 15px;">
        Cancel Appointment
      </v-btn>

      <v-flex style="padding-top: 25px; padding-left: 25px;" v-if="addingEvent">
        <div style="padding-bottom: 10px;">
          <v-text-field
            v-model="addingEvent.title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="addingEvent.date"
            label="Date"
            required
          ></v-text-field>
          <v-text-field
            v-model="addingEvent.time"
            label="Time"
            required
          ></v-text-field>
          <v-text-field
            v-model="addingEvent.duration"
            label="Duration"
            required
          ></v-text-field>
          <md-field>
            <label for="patient">Patient</label>
            <md-select v-model="addingEvent.patientID" name="patient" id="movie">
              <md-option value="1">Jane Doe</md-option>
              <md-option value="2">John Doe</md-option>
              <md-option value="3">Xthulum Zuian</md-option>
            </md-select>
          </md-field>
        </div>
      </v-flex>

      <v-btn @click="addAppointment(addingEvent)"
             v-if="addingEvent"
             color="success"
             style="margin-left: 25px; margin-top: 15px;">
        Add Appointment
      </v-btn>
    </v-navigation-drawer>
  </v-flex>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'

export default {
  props: ['doctor', 'id'],
  data: () => ({
    selectedDate: null,
    addingEvent: undefined,
    right: true,
    start: moment().weekday(1).hour(0).minute(0).format('YYYY-MM-DD HH:mm:ss'),
    events: [
      {
        title: 'Booked',
        date: '2019-03-21',
        time: '09:00',
        duration: 45,
        patientID: 'NEED TO FILL'
      },
      {
        title: 'Booked',
        date: '2019-03-22',
        time: '14:00',
        duration: 45,
        patientID: 'NEED TO FILL'
      },
      {
        title: 'Booked',
        date: '2019-03-18',
        time: '09:00',
        duration: 45,
        patientID: 'NEED TO FILL'
      },
      {
        title: 'Doctor Day off',
        date: '2019-03-19',
        patientID: 'NEED TO FILL'
      }
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
      isAnonymous: 'isAnonymous'
    }),

    ...mapState({
      user: state => state.user
    }),

    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      let events = this.addingEvent ? [...this.events, this.addingEvent] : this.events
      events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    capitalize (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    },

    clickTime (clickedTime) {
      // Make sure doctor can only edit his own appointments
      if (this.user.role === 'Doctor' && this.user.id !== this.id) return

      // If eevent selected
      if (this.eventSelected || this.isAnonymous) {
        this.eventSelected = undefined
        return
      }

      // Time and date
      this.selectedDate = clickedTime
      const { date, time, year, month, day, hour, minute, past } = clickedTime
      
      // Not worried about past dates
      if (past) return

      this.addingEvent = {
        title: 'Booking',
        date: date,
        time: time,
        duration: 45
      }

      // { 
      //   "date": "2019-03-25",
      //   "time": "14:16", 
      //   "year": 2019, 
      //   "month": 3, 
      //   "day": 25,
      //   "weekday": 1,
      //   "hour": 14, 
      //   "minute": 16, 
      //   "hasDay": true,
      //   "hasTime": true,
      //   "past": true,
      //   "present": false,
      //   "future": false 
      //   } 
    },

    async addAppointment (event) {
      // Make sure doctor can only edit his own appointments
      if (this.user.role === 'Doctor' && this.user.id !== this.id) return

      const { Message } = await this.$api.addAppointment(event.title, 'empty', `${event.date} ${event.time}`, event.duration, event.patientID, this.id )
      if (Message === "Appointment was successfully added") {
        this.events.push(this.addingEvent)
        this.addingEvent = undefined
      }
    },

    async cancelAppointment (event) {
      // Make sure doctor can only edit his own appointments
      if (this.user.role === 'Doctor' && this.user.id !== this.id) return

      console.log('Cancel:', event)
      const { Message } = await this.$api.cancelAppointment(event.patientID, this.id, `${event.date} ${event.time}`)

      if (Message === "Appointment was successfully dropped") {
        this.events = this.events.filter(oldEvent => oldEvent.patientID !== event.patientID || `${oldEvent.date} ${oldEvent.time}` !== `${event.date} ${event.time}`)
        this.eventSelected = undefined
      }
    },

    selectEvent (event) {
      // Make sure doctor can only edit his own appointments
      if (this.user.role === 'Doctor' && this.user.id !== this.id) return


      if (this.eventSelected === event || event === this.addingEvent) {
        this.eventSelected = null
      } else {
        this.eventSelected = event
      }
    },

    async fetchData () {
      const startTime = moment(this.start).format('YYYY-MM-DD HH:mm:ss')
      const endTime = moment(this.start).add(7, 'd').format('YYYY-MM-DD HH:mm:ss')
      const { schedule } = await this.$api.getDoctorSchedule(this.id, startTime, endTime)
      console.log('Schedule', schedule)

      this.events = schedule.map(sched => {
        const [date, time] = sched.time.split(' ')
        if (date) sched.date = date
        if (time) sched.time = time
        return sched
      })
    },

    nextWeek () {
      this.start = moment(this.start).add(7, 'd').toISOString().split('T')[0]
      this.fetchData()
    },

    lastWeek () {
      this.start = moment(this.start).subtract(7, 'd').toISOString().split('T')[0]
      this.fetchData()
    }
  },

  created () {
    this.fetchData()
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
