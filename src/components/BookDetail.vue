<template>
  <div id="book_info">
    <div>
      <div id="titld_div">
        <a id="title">공학 수학</a>
        <a id="available"> 예약 가능</a>
      </div>
      <v-chip color="pink" label small id="writer" class="chips">
        <v-icon left> mdi-label </v-icon>
        저자 : 조우성
      </v-chip>
      <v-chip color="pink" label small id="publisher" class="chips">
        <v-icon left> mdi-label </v-icon>
        출판사 : 금오공대
      </v-chip>
    </div>
    <v-divider id="divider"></v-divider>
    <div id="rsv_title">
      <p>재고 리스트</p>
      <p id="stock_cnt">(남은재고 : 3)</p>
    </div>
    <div id="rsv_table_div">
      <v-simple-table id="rsv_table" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">상태</th>
              <th class="text-left">가격</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(rsv, index) in rsv_list"
              :key="(rsv, index)"
              v-bind:id="index"
            >
              <td>{{ rsv.status }}</td>
              <td>{{ rsv.price }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-divider id="divider"></v-divider>
    <div id="rsv_title">
      <p>예약하기</p>
    </div>
    <div>
      <v-sheet tile height="10vw" class="d-flex">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="100vw">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="getEvents">
          </v-calendar>
      </v-sheet>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "BookDetails",
  data() {
    return {
      rsv_list: [
        {
          status: "A",
          price: 9000,
        },
        {
          status: "B",
          price: 8000,
        },
        {
          status: "C",
          price: 7000,
        },
      ],
    };
  },
};
</script>

<style scoped>
#book_info {
  padding: 5vw;
  font-family: "SCRegular";
}
#titld_div {
  margin-bottom: 5vw;
}
#title {
  font-family: "SCBold";
  font-size: 10vw;
  margin-right: 1vw;
}
#available {
  font-size: 4vw;
}
#writer,
#publisher {
  font-size: 3vw;
  height: 5vw;
}
#writer {
  margin-right: 1vw;
}
#divider {
  margin-top: 2.5vw;
  margin-bottom: 3vw;
}
#rsv_title {
  font-family: "SCBold";
  font-size: 6.5vw;
  margin-bottom: 2.5vw;
}
#stock_cnt {
  font-size: 4vw;
  font-family: "SCRegular";
}
#rsv_table_title {
  text-align: left;
}
#rsv_table {
  text-align: center;
  font-size: 3vw;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;
  font-size: 4vw;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;
  font-size: 4vw;
}
</style>
