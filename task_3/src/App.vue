<template>
  <div id="app">
    <div class="main-wrapper">
      <h1 class="main-title">Рассчитать дешевый маршрут</h1>
      <SideBar @countRoutes="countRoutes"/>
      <Routes :routes="this.routes" :update="this.update"/>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import Routes from "./components/Routes.vue";

export default {
  name: "App",
  components: {
    SideBar,
    Routes,
  },
  data() {
    return {
      json: "",
      dataCount: "",
      direct: [],
      oneNodeArray: [],
      update:''
    };
  },
  created() {
    fetch("./data/call-path.json")
      .then((r) => r.json())
      .then((json) => {
        JSON.parse(JSON.stringify(json));
        this.json = json;
      });
  },
  computed:{
    routes: function(){
        return this.direct.concat(this.oneNodeArray)
    }
  },
  methods: {
    countRoutes: function (data) {
      this.dataCount = data;
      //console.log( this.dataCount)

      switch (true) {
        case this.dataCount.checkedFilter.includes("direct-type"):
          this.directType();
          this.direct.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
          console.log(this.routes)
          this.update = true
          break;
        case this.dataCount.checkedFilter.includes("one-more-type"):
          this.onenode();
          this.searchOneNode();
          this.delElementsPerebor();
          this.oneNodeArray.sort((a, b) => {
            if (a.price1 + a.price2 > b.price1 + b.price2) {
              return 1;
            }
            if (a.price1 + a.price2 < b.price1 + b.price2) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
          break;
        case this.dataCount.checkedFilter.includes("all-type"):
          this.directType();
          this.direct.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });

          this.onenode();
          this.searchOneNode();
          this.delElementsPerebor();
          this.oneNodeArray.sort((a, b) => {
            if (a.price1 + a.price2 > b.price1 + b.price2) {
              return 1;
            }
            if (a.price1 + a.price2 < b.price1 + b.price2) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          });
          break;
      }
    },
    onenode: function () {
      let id = 0;
      let companies = this.json.data.company;
      for (var company in companies) {
        //console.log(company)
        let forCom = this.json.data.company[company];
        for (var key in forCom) {
          //перебор компаний
          let props = forCom[key];
          for (var prop in props) {
            //перебор свойств компаний
            if (prop === "src" && props[prop] === this.dataCount.caller) {
              let found = {
                src: props["src"],
                node: props["des"],
                des: "",
                price1: props["price"],
                price2: "",
                company1: company,
                company2: "",
                id: ++id,
              };
              this.oneNodeArray.push(found);
            }
          }
        }
      }
    },
    searchOneNode: function () {
      let companies = this.json.data.company;
      for (let company in companies) {
        //console.log(company)
        let forCom = this.json.data.company[company];
        for (let key in forCom) {
          //перебор компаний
          let props = forCom[key];
          for (let prop in props) {
            //перебор свойств компаний
            if (prop === "src") {
              for (let node in this.oneNodeArray) {
                for (let propnode in this.oneNodeArray[node]) {
                  if (
                    propnode === "node" &&
                    this.oneNodeArray[node][propnode] === props["src"]
                  ) {
                    if (props["des"] === this.dataCount.callee) {
                      this.oneNodeArray[node]["des"] = props["des"];
                      this.oneNodeArray[node]["price2"] = props["price"];
                      this.oneNodeArray[node]["company2"] = company;
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    delElements: function (arr, attr, value) {
      var i = arr.length;
      while (i--) {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          arguments.length > 2 &&
          arr[i][attr] === value
        ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    },
    delElementsPerebor: function () {
      for (let node in this.oneNodeArray) {
        for (let prop in this.oneNodeArray[node]) {
          if (!this.oneNodeArray[node]["des"]) {
            this.delElements(
              this.oneNodeArray,
              "id",
              this.oneNodeArray[node]["id"]
            );
            //console.log('del')
          }
        }
      }
    },
    directType: function () {
      let companies = this.json.data.company;
      for (var company in companies) {
        //console.log(company)
        let forCom = this.json.data.company[company];
        for (var key in forCom) {
          //перебор компаний
          let props = forCom[key];
          for (var prop in props) {
            //перебор свойств компаний
            if (prop === "src" && props[prop] === this.dataCount.caller) {
              if (props["des"] === this.dataCount.callee) {
                let found = {
                  src: props["src"],
                  des: props["des"],
                  price: props["price"],
                  company: company,
                };
                this.direct.push(found); //добавление в массив прямых путей следования
              }
            }
          }
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main-wrapper {
  padding-top: 60px;
  max-width: 965px;
  margin: 0 auto;
}
.main-title {
  text-align: center;
}
</style>
