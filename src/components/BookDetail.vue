<template>
  <div id="book_info">
    <div>
      <div id="titld_div">
        <a id="title">공학 수학</a>
        <a id="available"> 예약 가능</a>
      </div>
      <v-chip color="pink" label small id="writer">
        <v-icon left> mdi-label </v-icon>
        조우성
      </v-chip>
      <v-chip color="pink" label small id="publisher">
        <v-icon left> mdi-label </v-icon>
        금오공대
      </v-chip>
    </div>
    <v-divider id="divider"></v-divider>
    <div id="rsv_title">
      <p>예약 현황</p>
    </div>
    <div id="rsv_table">
      <li id="rsv_table_title">
        재고 리스트 ( 남은 재고 :
        <a id="stock_cnt">3</a>
        )
      </li>
      <v-simple-table>
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
#rsv_table_title {
  text-align: left;
}
#rsv_table {
  text-align: center;
}
</style>
