<template>
  <div id="bookInfoWrap">
    <div id="bookInfo">
      <div style="width: min(90vw, 360px)"></div>
      <div>
        <div id="titleDiv">
          <span id="title">{{ bookTitle }}</span>
          <span id="available">{{ isRsv }}</span>
        </div>
        <v-chip color="gray" label small id="writer" class="chips">
          <v-icon left> mdi-label </v-icon>
          저자 : {{ bookWriter }}
        </v-chip>
        <v-chip color="gray" label small id="publisher" class="chips">
          <v-icon left> mdi-label </v-icon>
          출판사 : {{ bookPublisher }}
        </v-chip>
      </div>
      <v-divider id="divider"></v-divider>
      <div id="stockTitle">
        <p>재고 리스트</p>
        <p id="stockCnt">(남은재고 : {{ stockList.length }})</p>
      </div>
      <div id="stockTableDiv" v-if="isExistStock">
        <v-simple-table id="stockTable" dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th>상태</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(stock, index) in stockList"
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
      <div id="stockTitle">
        <p>예약하기</p>
      </div>
      <div data-app :disabled="isRsvDisable">
        <v-menu
          ref="menuRef"
          v-model="dateMenu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="date"
              label="날짜를 선택해주세요"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="isRsvDisable"
            ></v-combobox>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
            min="2021-03-08"
            max="2021-03-31"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="
                $refs.menuRef.save(date);
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
                <td id="timeList">
                  <span
                    v-for="(rsv, index) in rsvList"
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
            max="17:00"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="timeModal = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialogRef.save(time)">
              OK
            </v-btn>
          </v-time-picker>
        </v-dialog>
        <v-text-field
          v-model="studentId"
          label="학번입력"
          hide-details="auto"
          :disabled="isRsvDisable"
          :rules="[rules.sIdReq]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="예약 비밀번호 입력"
          hint="적어도 8자리 이상 입력해주세요"
          @click:append="isDisplayPasswd = !isDisplayPasswd"
          :append-icon="isDisplayPasswd ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.passwdReq, rules.passwdMin]"
          :type="isDisplayPasswd ? 'text' : 'password'"
          :disabled="isRsvDisable"
        ></v-text-field>
      </div>
      <v-alert v-model="alert" dense type="error" dark dismissible id="alert">
        올바른 예약 정보를 입력해주세요!
      </v-alert>
      <div id="rsvBtnDiv">
        <v-btn elevation="2" @click="rsvBtn" :disabled="isRsvDisable">
          예약하기
        </v-btn>
      </div>
    </div>
  </div>
</template>
  
<script>
//라이브러리 추가
import axios from "axios";

//BookDetail.vue 컴포넌트 관리
export default {
  name: "BookDetails",
  //컴포넌트가 사용하는 변수 정의 및 초기화(비동기 사용 불가능)
  data() {
    return {
      //책 정보 변수
      bookTitle: "로딩 중",
      bookWriter: "로딩 중",
      bookPublisher: "로딩 중",
      bookId: null,
      //예약 가능한 지
      isRsv: "로딩 중",
      //재고 변수
      stockList: [],
      rsvList: [],
      isExistStock: true,
      isRsvDisable: false,
      //예약 관련 변수
      dateMenu: false,
      timeModal: false,
      date: null,
      time: null,
      isClickedDate: false,
      isDisplayPasswd: false,
      studentId: "",
      password: "",
      alert: false,
      //input 요소 관련 규칙 설정
      rules: {
        sIdReq: () => this.sIdRule() || "학번을 제대로 입력해주세요",
        passwdReq: () => this.passwdRule()[0] || "비밀번호를 입력해주세요.",
        passwdMin: () =>
          this.passwdRule()[1] || "적어도 8자리 이상 입력해주세요",
      },
    };
  },
  //컴포넌트가 사용하는 메소드 정의
  methods: {
    //예약버튼
    rsvBtn: function () {
      if (!(this.sIdRule() && this.passwdRule()[0] && this.passwdRule()[1])) {
        this.alert = true;
      } else {
        this.alert = false;
      }
    },
    //각종 rule 함수
    sIdRule: function () {
      return this.studentId.length == 8 && this.isStudentId();
    },
    passwdRule: function () {
      return [this.password != 0, this.password.length >= 8];
    },
    isStudentId: function () {
      var re = new RegExp("^[0-9]+$");
      return re.test(this.studentId);
    },
    //api 책 정보 받아오기
    getBookInfo: function () {
      let urlBody =
        "https://us-central1-kit-fleamarket.cloudfunctions.net/books?title=";
      let title = "디지털 시스템 실험";
      axios
        .get(urlBody + title)
        .then((Response) => {
          let bookInfo = Response.data[0];
          this.bookId = bookInfo.id;
          this.bookTitle = bookInfo.title;
          this.bookWriter = bookInfo.auther;
          this.bookPublisher = bookInfo.publisher;
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
    //api 책 재고 받아오기
    getBookStock: function () {
      let urlBody =
        "https://us-central1-kit-fleamarket.cloudfunctions.net/books/" +
        this.bookId +
        "/stocks";
      axios
        .get(urlBody)
        .then((Response) => {
          this.stockList = Response.data;
          if (this.stockList.length == 0) {
            this.isRsv = "매물 없음";
            this.isExistStock = false;
            //this.isRsvDisable = true;
          }
        })
        .catch((Error) => {
          console.log(Error);
        });
    },
  },
  //DOM을 업데이트 해서 view refresh하는 부분(비동기 사용 가능)
  mounted: function () {
    this.getBookInfo();
    this.getBookStock();
  },
};
</script>

<style scoped>
#bookInfoWrap {
  display: flex;
  justify-content: center;
}
#bookInfo {
  max-width: 400px;
  padding-top: min(5vw, 20px);
  font-family: "SCRegular";
}
#titleDiv {
  margin-bottom: min(5vw, 20px);
}
#title,
#available {
  display: inline-flex;
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
#stockTitle {
  font-family: "SCBold";
  font-size: min(6.5vw, 26px);
}
#stockCnt {
  font-size: min(4vw, 16px);
  font-family: "SCRegular";
  margin-bottom: min(2.5vw, 10px);
}
#stockTableTitle {
  text-align: center;
}
#stockTable {
  text-align: center;
  font-size: min(3vw, 12px);
}
#timeList {
  text-align: center;
}
#rsvBtnDiv {
  margin-top: min(2vw, 8px);
  margin-bottom: min(8vw, 32px);
  text-align: right;
}
#alert {
  margin-top: min(1.5vw, 6px);
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
