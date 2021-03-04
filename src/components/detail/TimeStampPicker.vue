<template>
  <!-- <v-dialog
    ref="dialogRef"
    v-model="timeModal"
    :return-value.sync="time"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="시간을 선택해주세요"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
        :disabled="isRsvDisable"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="timeModal"
      v-model="time"
      full-width
      format="24hr"
      min="10:00"
      max="18:00"
      :allowed-minutes="allowedMinutes"
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="timeModal = false"> 취소 </v-btn>
      <v-btn text color="primary" @click="setTime"> 확인 </v-btn>
    </v-time-picker>
  </v-dialog> -->
  <!-- <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-select
          v-model="date"
          label="날짜"
          :items="dates"
          :disabled="isRsvDisable"
          @input="setDate"
        >
        </v-select>
      </v-col>

      <v-col cols="3">
        <v-select
          id="hour"
          v-model="hour"
          label="시간"
          :items="hours"
          :disabled="isRsvDisable"
          @input="setDate"
          width="175px"
        >
        </v-select>
      </v-col>

      <v-col cols="3">
        <v-select
          id="minute"
          v-model="minute"
          label="분"
          :items="minutes"
          :disabled="isRsvDisable"
          @input="setDate"
        >
        </v-select>
      </v-col>
    </v-row>
  </v-container> -->
  <div>
    <v-select
      v-model="date"
      label="날짜"
      :items="dates"
      :disabled="isRsvDisable"
      @input="setDate"
    >
    </v-select>
    <div class="inlineDiv">
      <v-select
        id="hour"
        v-model="hour"
        label="시간"
        :items="hours"
        :disabled="isRsvDisable"
        width="175px"
      >
      </v-select>
      <div style="width: min(2vw, 14px)"></div>
      <v-select
        id="minute"
        v-model="minute"
        label="분"
        :items="minutes"
        :disabled="isRsvDisable"
      >
      </v-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeStampPicker",
  props: ["rsvInfo"],
  data: function () {
    this.rsvInfo.dates = ["2021-03-10", "2021-03-11", "2021-03-12"];
    this.rsvInfo.hours = ["10", "11", "12", "13", "14", "15", "16", "17", "18"];
    this.rsvInfo.minutes = ["00", "10", "20", "30", "40", "50"];
    return this.rsvInfo;
  },
  methods: {
    setDate() {
      var re = new RegExp("[0-9]+-[0-9]+-[0-9]+-");
      this.rsvList.splice(0, this.rsvList.length);
      for (let i = 0; i < this.rsvRawList.length; i++) {
        if (this.rsvRawList[i].time.includes(this.date)) {
          let timeText = this.rsvRawList[i].time
            .replace(re, "")
            .replace("-", ":");
          if (timeText.length == 2) {
            timeText += ":00";
          }
          this.rsvList.push(timeText);
        }
      }
    },
  },
};
</script>

<style scoped>
.inlineDiv {
  display: inline-flex;
}
</style>