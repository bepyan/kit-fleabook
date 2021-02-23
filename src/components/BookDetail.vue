<template>
  <div id="book_info_wrap">
    <div id="book_info">
      <div style="width: min(90vw, 360px)"></div>
      <div>
        <div id="titld_div">
          <a id="title">공학 수학</a>
          <a id="available"> 예약 가능</a>
        </div>
        <v-chip color="gray" label small id="writer" class="chips">
          <v-icon left> mdi-label </v-icon>
          저자 : 조우성
        </v-chip>
        <v-chip color="gray" label small id="publisher" class="chips">
          <v-icon left> mdi-label </v-icon>
          출판사 : 금오공대
        </v-chip>
      </div>
      <v-divider id="divider"></v-divider>
      <div id="stock_title">
        <p>재고 리스트</p>
        <p id="stock_cnt">(남은재고 : 3)</p>
      </div>
      <div id="stock_table_div">
        <v-simple-table id="stock_table" dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th>상태</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stock, index) in stock_list"
                :key="(stock, index)"
                v-bind:id="index"
              >
                <td>{{ stock.status }}</td>
                <td>{{ stock.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <v-divider id="divider"></v-divider>
      <div id="stock_title">
        <p>예약하기</p>
      </div>
      <div data-app>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="dates"
              label="날짜를 선택해주세요"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-combobox>
          </template>
          <v-date-picker
            v-model="dates"
            no-title
            scrollable
            min="2021-03-01"
            max="2021-03-31"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                $refs.menu.save(dates);
                isClickedDate = true;
              "
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-simple-table dense v-if="isClickedDate">
          <template v-slot:default>
            <thead>
              <tr>
                <th>선택한 날짜에 예약된 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="time_list">
                  <span
                    v-for="(rsv, index) in rsv_list"
                    :key="(rsv, index)"
                    v-bind:id="index"
                  >
                    {{ rsv.time }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-dialog
          ref="dialog"
          v-model="modal"
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
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal"
            v-model="time"
            full-width
            format="24hr"
            min="10:00"
            max="17:00"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
      </div>
      <div id="rsv_btn_div">
        <v-btn elevation="2" @click="rsv_btn">예약하기</v-btn>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "BookDetails",
  data() {
    return {
      stock_list: [
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
      rsv_list: [
        {
          time: "15:30",
        },
        {
          time: "16:30",
        },
        {
          time: "17:30",
        },
      ],
      menu: false,
      dates: null,
      time: null,
      modal: false,
      isClickedDate: null,
    };
  },
  methods: {
    rsv_btn: function () {
      this.rsv_list = [
        {
          time: "14:30",
        },
        {
          time: "16:30",
        },
        {
          time: "17:30",
        },
      ];
    },
  },
};
</script>

<style scoped>
#book_info_wrap {
  display: flex;
  justify-content: center;
}
#book_info {
  max-width: 400px;
  padding-top: min(5vw, 20px);
  font-family: "SCRegular";
}
#titld_div {
  margin-bottom: min(5vw, 20px);
}
#title {
  font-family: "SCBold";
  font-size: min(10vw, 40px);
  margin-right: min(1vw, 4px);
}
#available {
  font-size: min(4vw, 16px);
}
#writer,
#publisher {
  font-size: min(3vw, 12px);
  height: min(5vw, 20px);
}
#writer {
  margin-right: min(1vw, 4px);
}
#divider {
  margin-top: min(2.5vw, 10px);
  margin-bottom: min(3vw, 12px);
}
#stock_title {
  font-family: "SCBold";
  font-size: min(6.5vw, 26px);
}
#stock_cnt {
  font-size: min(4vw, 16px);
  font-family: "SCRegular";
  margin-bottom: min(2.5vw, 10px);
}
#stock_table_title {
  text-align: center;
}
#stock_table {
  text-align: center;
  font-size: min(3vw, 12px);
}
#time_list {
  text-align: center;
}
#rsv_btn_div {
  text-align: right;
}

/* vuetify 설정 부분 건드리는 css */
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  padding-top: min(1.5vw, 6px);
  padding-bottom: min(1.5vw, 6px);
  font-size: min(4vw, 16px);
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding-top: min(1.5vw, 6px);
  padding-bottom: min(1.5vw, 6px);
  font-size: min(4vw, 16px);
}
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th,
.v-application--is-ltr
  .v-data-table
  > .v-data-table__wrapper
  > table
  > tfoot
  > tr
  > th {
  text-align: center;
}
.v-application p {
  margin-bottom: 0;
}
</style>
