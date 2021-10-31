<template>
  <div class="wrapper">
    <div class="caller-and-callee">
      <div class="caller">
        <span class="caller-title">Звонящая сторона(Caller)</span>
        <select v-model="caller" class="caller-menu">
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="callee">
        <span class="callee-title">Принимающая сторона(Callee)</span>
        <select v-model="callee" class="callee-menu">
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="types">
      <div class="type">
        <input
          type="checkbox"
          id="all-type"
          value="all-type"
          v-model="checkedFilter"
        />
        <label for="all-type">Все</label>
      </div>
      <div class="type">
        <input
          type="checkbox"
          id="direct-type"
          value="direct-type"
          v-model="checkedFilter"
        />
        <label for="direct-type">Прямое соединение</label>
      </div>
      <div class="type">
        <input
          type="checkbox"
          id="one-more-type"
          value="one-more-type"
          v-model="checkedFilter"
        />
        <label for="one-more-type">Один дополнительный узел</label>
      </div>
      <div class="type">
        <input
          type="checkbox"
          id="two-more-type"
          value="two-more-type"
          v-model="checkedFilter"
        />
        <label for="two-more-type">Два дополнительных узела</label>
      </div>
    </div>
    <button @click="count" class="btn-count">Рассчитать</button>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      caller: "ru",
      callee: "ru",
      checkedFilter: [],
      options: [
        { text: "Россия", value: "ru", id: 1 },
        { text: "Казахстан", value: "kz", id: 2 },
        { text: "Германия", value: "de", id: 3 },
        { text: "США", value: "usa", id: 4 },
      ],
    };
  },
  methods:{
      count: function(){
          this.$emit('countRoutes', {
           caller: this.caller,
           callee: this.callee,
           checkedFilter: this.checkedFilter
    })

      }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  padding: 10px 15px;
}
.caller-and-callee {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.caller {
  width: 49%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 10px;
}
.callee {
  width: 49%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 10px;
}

.caller-title {
  width: 100%;
}

.callee-title {
  width: 100%;
}

.caller-menu {
  border: none;
  border-bottom: 1px solid rgb(184, 184, 184);
  width: 70%;
  padding: 5px 10px;
  margin-top: 15px;
  font-family: Helvetica, sans-serif;
  font-size: 1rem;
}

.callee-menu {
  border: none;
  border-bottom: 1px solid rgb(184, 184, 184);
  width: 70%;
  padding: 5px 10px;
  margin-top: 15px;
  font-family: Helvetica, sans-serif;
  font-size: 1rem;
}

.types {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}

.type {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn-count{
  background-color: rgb(226, 136, 0);
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  padding: 9px 30px;
  border-radius: 5px;
}

.btn-count:hover,
.btn-count:focus,
.btn-count:active{
  background-color: rgb(235, 148, 18);
}
</style>