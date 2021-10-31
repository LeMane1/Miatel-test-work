<template>
  <div class="routes">
    <!-- v-if="routes.length > 0"-->
   <ul class="one-node-routes"> 
      <li v-for="route in collection" :key="route.index" class="route">
        <div class="full-price">
          <div>{{ (route.price1 + route.price2) || route.price }}&#36;</div>
        </div>
        <div class="routing">
            <div class="node">{{ route.src }}</div>
            <div class="company"  v-if="!route.node">{{ route.company }} &#8594;</div>
            <div class="company" v-if="route.node">{{ route.company1}} ({{route.price1}}&#36;) &#8594;</div>
            <div class="node" v-if="route.node">{{ route.node }}</div>
            <div class="company" v-if="route.node">{{ route.company2 }} ({{route.price2}}&#36;) &#8594;</div>
            <div class="node">{{ route.des }}</div>
        </div>
      </li>
    </ul> 
    <div class="pagination">
      <button v-for="p in pagination.pages" :key="p.index" @click.prevent="setPage(p)" class="btn-pageinate">{{p}}</button>
      <p>{{pagination.startIndex + 1}} из {{pagination.endIndex + 1}}</p>
    </div>
  </div>

</template>

<script>
export default {
  name: "Routes",
  props: ["routes", "update"],
  data() {
    return {
          data: this.routes,
          perPage: 4,
          pagination: {}
      }
  },
  computed:{
    collection:{
      get(){
      return this.paginate(this.data)
      }
    }
  },
  methods:{
    setPage(p){
      this.pagination = this.paginator(this.data.length, p)
    },
    paginate(data){
      return _.slice(data, this.pagination.startIndex, this.pagination.endIndex + 1)
    },
    paginator(totalItems, currentPage){
      var startIndex = (currentPage - 1) * this.perPage,
      endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1)
      return{
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
      }
    }
  },
  created(){
    this.setPage(1)
  }
};
</script>

<style scoped>
.routes {
  margin-top: 25px;
  width: 100%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  padding: 10px 15px;
  margin-left: 0;
  margin-bottom: 50px;
}

.route{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgb(223, 223, 223);
  padding: 5px 15px;
  margin-bottom: 15px;
  border-radius: 8px;
}

.routing{
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  align-items: center;
}

.one-node-routes{
  padding-left: 15px;
  padding-right: 15px;
}

.full-price{
  background-color: rgb(226, 136, 0);
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 600;
}

.node{
  background-color: rgb(226, 136, 0);
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
}

.company{
  margin-right: 10px;
}

.btn-pageinate{
   background-color: rgb(226, 136, 0);
  color: rgb(255, 255, 255);
  font-size: .8rem;
  font-weight: 500;
  border: none;
  padding: 4px 15px;
  margin-right: 4px;
  border-radius: 3px;
}

.btn-pageinate:hover,
.btn-pageinate:active,
.btn-pageinate:focus{
  background-color: rgb(235, 148, 18);
}

.pagination{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>