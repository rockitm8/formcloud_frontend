<template>
  <div class="task-info-view">
    <Navigation />
    <div v-if="send_task_id != null">
      <GraphData
        :task_status="send_task_status"
        :task_name="send_task_name"
        :task_id="send_task_id"
      />
    </div>
    <!-- <div v-if="task_data.data != null">
      <UrlsTable :table_data="task_data" />
    </div> -->
    <div class="url-table">
      <div class="container">
        <div class="table-responsive">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="row">
                <div class="col-xs-5">
                  <h2>Domain <b>Detail</b></h2>
                </div>
                <!-- <div class="col-xs-7">
                  <router-link to="/create-task" class="btn btn-primary"
                    ><i class="material-icons">&#xE147;</i>
                    <span>Add New Task</span></router-link
                  >
                </div> -->
              </div>
            </div>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Reached At</th>
                  <th>Status</th>
                  <th>Contact Page</th>
                  <th>Contact Form</th>
                  <th>Form Sent</th>
                  <th>Went Over Manually</th>
                  <th>Sent Manually</th>
                  <th>Emails Found</th>
                </tr>
              </thead>
              <tbody id="table-body"></tbody>
            </table>
            <div class="clearfix">
              <ul class="pagination">
                <li class="page-item">
                  <button @click="previousButton">Previous</button>
                </li>
                <li
                  class="page-item"
                  v-for="i in pagination.pages"
                  :key="i"
                  :id="i"
                  @click="pageClicked(i)"
                >
                  <button class="page-link">{{ i }}</button>
                </li>
                <li class="page-item">
                  <button @click="nextButton" class="page-link">Next</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import GraphData from '@/components/GraphData.vue';
import UrlsTable from '@/components/UrlsTable.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'TaskInfoView',
  data() {
    return {
      task_data: {
        columns: null,
        data: null,
      },
      send_task_id: null,
      send_task_name: null,
      dataTablee: null,
      send_task_status: null,
      table_data: {},
      task_detail: {},
      pagination: {
        pages: 1,
        current_page: 1,
        max_rows: 10,
      },
    };
  },
  methods: {
    showRows(start) {
      let table_body = document.getElementById('table-body');
      table_body.innerHTML = '';
      let startPage = start * 10 - 9;
      for (
        let i = startPage - 1;
        i < startPage + this.pagination.max_rows - 1;
        i++
      ) {
        if (this.table_data[i] !== undefined)
          table_body.innerHTML += `<tr><td id="${this.table_data[i].id}" class='show-task'>${this.table_data[i].domain_name}</td><td>${this.table_data[i].reached_at}</td><td>${this.table_data[i].status}</td><td>${this.table_data[i].contact_page}</td><td>${this.table_data[i].contact_form}</td><td>${this.table_data[i].form_sent}</td><td>${this.table_data[i].went_over_manually}</td><td>${this.table_data[i].sent_manually}</td><td>${this.table_data[i].emails_found}</td></tr> <style>table.table tr th,table.table tr td {border-color: #e9e9e9;padding: 12px 15px;vertical-align: middle;}table.table tr th:first-child {width: 60px;}table.table tr th:last-child {width: 100px;}table.table-striped tbody tr:nth-of-type(odd) {background-color: #fcfcfc;}table.table-striped.table-hover tbody tr:hover {background: #f5f5f5;}table.table td button.settings {color: #2196f3;}table.table th i {font-size: 13px;margin: 0 5px;cursor: pointer;}table.table td:last-child i {opacity: 0.9;font-size: 22px;margin: 0 5px;}table.table td button {font-weight: bold;color: #566787;display: inline-block;text-decoration: none;}table.table td button:hover {color: #2196f3;}table.table td button.settings {color: #2196f3;}table.table td button.delete {color: #f44336;border: none; background: transparent;}table.table td i {font-size: 19px;}table.table .avatar {border-radius: 50%;vertical-align: middle;margin-right: 10px;}table.table td:last-child i {opacity: 0.9;font-size: 22px;margin: 0 5px;}table.table td button {font-weight: bold;color: #566787;display: inline-block;text-decoration: none;}table.table td button:hover {color: #2196f3;}table.table td button.settings {color: #2196f3;}table.table td button.delete {color: #f44336;}table.table td i {font-size: 19px;}</style>`;
      }
    },
    setPagination(active_page) {
      let table_length = this.table_data.length;
      this.pagination.pages = Math.floor((table_length - 1) / 10) + 1;

      const allPageLinks = document.getElementsByClassName('page-item');
      for (let i = 0; i < allPageLinks.length; i++) {
        allPageLinks[i].classList.remove('active');
      }
      const activePage = document.getElementById(active_page);
      activePage.classList.add('active');
      this.showRows(this.pagination.current_page);
    },
    pageClicked(page) {
      this.pagination.current_page = page;
      this.setPagination(page);
    },
    previousButton() {
      if (this.pagination.current_page - 1 > 0) {
        this.pagination.current_page -= 1;
        this.setPagination(this.pagination.current_page);
      }
    },
    nextButton() {
      if (this.pagination.current_page + 1 <= this.pagination.pages) {
        this.pagination.current_page += 1;
        this.setPagination(this.pagination.current_page);
      }
    },
    async fetchUrlData() {
      let task_id = this.$route.params.id;
      this.send_task_id = task_id;
      await axios
        .get(`${this.$store.state.backend_url}/api/domains/${task_id}/`)
        .then((response) => {
          this.task_data.data = response.data;
          console.log(response.data);
          this.table_data = response.data;

          for (let i = 0; i < Object.keys(this.table_data).length; i++) {
            this.table_data[i].reached_at = moment(
              this.table_data[i].reached_at
            ).format('MMMM Do YYYY, h:mm:ss a');
          }
          this.setPagination(this.pagination.current_page);
          this.showRows(this.pagination.current_page);

          const headers = {
            Authorization: this.$store.state.user_token,
          };
          axios
            .get(`${this.$store.state.backend_url}/api/tasks/`, {
              headers: headers,
            })
            .then((response) => {
              let temp_data = response.data;

              for (let i = 0; i < temp_data.length; i++) {
                if (temp_data[i].id == task_id) {
                  this.send_task_name = temp_data[i].task_name;
                  this.send_task_status = temp_data[i].status;
                }
              }
            })
            .catch((error) => {
              console.log('Error:', error);
            });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
  },
  mounted() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.fetchUrlData();
  },
  beforeMount() {
    // console.log('here');
    // this.dataTablee = null;
    // document.getElementsByClassName('task-info-view').innerHTML = '';
  },
  components: { Navigation, GraphData, UrlsTable },
};
</script>

<style scoped>
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  min-width: 1000px;
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #299be4;
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn {
  color: #299be4;
  float: right;
  font-size: 13px;
  background: #fff;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn:hover,
.table-title .btn:focus {
  color: #1c71a6;
  background: #f2f2f2;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: 60px;
}
table.table tr th:last-child {
  width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.settings {
  color: #2196f3;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.status {
  font-size: 30px;
  margin: 2px 2px 0 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}
.text-success {
  color: #10c469;
}
.text-info {
  color: #62c9e8;
}
.text-warning {
  color: #ffc107;
}
.text-danger {
  color: #ff5b5b;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li button {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
  display: inline;
  margin-right: 5px;
}
.pagination li button:hover {
  color: #666;
}
.pagination li.active button,
.pagination li.active button.page-link {
  background: #03a9f4;
}
.pagination li.active button:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

.urls-table {
  margin-top: 50px;
}
</style>
