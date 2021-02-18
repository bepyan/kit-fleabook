<template>
  <div>
    <span class="title" @click="goUrl('/')">VUE STUDY</span>
    <button @click="goUrl('/')">책 보기</button>
    <button @click="goUrl('/reserve')">예약 조회</button>
  </div>
</template>

<script>
export default {
  methods: {
    goUrl(url) {
      if (url === this.$route.path) this.$router.go();
      else this.$router.push(url);
    },
  },
};
</script>

<style scoped>
div {
  margin-top: 4px;
}
button {
  all: unset;
  cursor: pointer;
  margin-right: 10px;
  font-size: 17px;
}
button:hover {
  font-weight: 600;
}
button:active {
  transform: scale(0.97);
}
.title {
  color: #2c3e50;
  font-weight: 900;
  font-size: 27px;
  margin-right: 1rem;
  cursor: pointer;
}
</style>
