<template>
  <div class="graph-data">
    <div class="">
      <h1 class="heading-txt">Task {{ task_name }}</h1>
      <div class="row">
        <div class="col-4 task-info">
          <span class="top-txt"><b>Name:</b> {{ task_name }}</span> <br />
          <span class="top-txt"><b>Status:</b> {{ task_status }}</span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 d-flex">
          <div class="bor-left">
            <div class="infos">
              <h1 class="mb-5">{{ table_data.domains }}</h1>
              <h4>Websites</h4>
            </div>
          </div>
          <div class="bor-left">
            <div class="infos">
              <h1 class="mb-5">{{ table_data.contact_forms }}</h1>
              <h4>Contact Forms</h4>
            </div>
          </div>
          <div class="bor-left">
            <div class="infos">
              <h1 class="mb-5">{{ table_data.forms_sent }}</h1>
              <h4>Forms Sent</h4>
            </div>
          </div>
          <div class="bor-left">
            <div class="infos">
              <h1 class="mb-5">{{ table_data.sent_manually }}</h1>
              <h4>Sent Manually</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'GraphData',
  props: {
    task_id: Number,
    task_name: String,
    task_status: String,
  },
  data() {
    return {
      table_data: [],
    };
  },
  methods: {
    fetchTableDetails() {
      axios
        .get(`${this.$store.state.backend_url}/api/taskdetail/${this.task_id}`)
        .then((response) => {
          this.table_data = response.data;
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
  },
  mounted() {
    this.fetchTableDetails();
  },
};
</script>

<style scoped>
.top-txt {
  font-size: 22px;
}

.heading-txt {
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
}

.chart-info {
  margin-top: 3%;
}

.circle {
  position: relative !important;
  display: flex !important;
  width: 70% !important;
  /* max-width: 100% !important; */
  height: auto !important;
}

hr {
  border: 1px solid grey !important;
}

.lists ul li {
  list-style: none;
  margin-bottom: 40px;
  font-size: 20px;
  margin-left: 30px !important;
  margin-top: 20px;
}

.lists h1 {
  font-size: 20px;
  font-weight: 700;
  color: rgb(63, 61, 61);
}

.list1::before {
  content: ' ';
  display: inline-block;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 100%;
}

.list2::before {
  content: ' ';
  display: inline-block;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: #f7a23a;
  border-radius: 100%;
}
.list3::before {
  content: ' ';
  display: inline-block;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 100%;
}
.list4::before {
  content: ' ';
  display: inline-block;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: purple;
  border-radius: 100%;
  border: none;
}
.list5::before {
  content: ' ';
  display: inline-block;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: grey;
  border-radius: 100%;
}

.task-info {
  margin-left: 15px;
}

.bor-left {
  border-left: 1px solid rgb(233, 230, 230);
  height: 100%;
  margin-left: 20px;
}

.infos {
  padding-left: 20px;
  margin-top: 20px;
}

.infos h1 {
  font-size: 30px;
  font-weight: 550;
}

.infos h4 {
  color: rgb(31, 29, 29);
  font-size: 25px;

  /* align-items: center !important; */
}

.infos p {
  color: grey;
  /* text-align: center; */
}

.topinfo-m {
  margin-top: 100px !important;
}

@media screen and (max-width: 992px) {
  .infos,
  .infos h4 {
    font-size: 15px;
  }

  .infos h1 {
    font-size: 20px;
  }
}

@media screen and (max-width: 768px) {
  .infos,
  .infos h4 {
    font-size: 10px;
  }

  .infos h1 {
    font-size: 18px;
  }
}
</style>
