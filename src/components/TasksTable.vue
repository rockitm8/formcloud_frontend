<template>
  <div class="tasks-table">
    <div class="container">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-xs-5">
                <h2>Task <b>Detail</b></h2>
              </div>
              <div class="col-xs-7">
                <router-link to="/create-task" class="btn btn-primary"
                  ><i class="material-icons">&#xE147;</i>
                  <span>Add New Task</span></router-link
                >
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Finished Date</th>
                <th>Status</th>
                <th>Contact Pages</th>
                <th>Contact Forms</th>
                <th>Forms Sent</th>
                <th>Went Manually</th>
                <th>Action</th>
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
</template>

<script>
import j from 'jquery';
import axios from 'axios';
import ajax from 'ajax';
import router from '@/router';
import moment from 'moment';

export default {
  name: 'TasksTable',
  data() {
    return {
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
          table_body.innerHTML += `<tr><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].task_name}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].finished_date}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].status}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].contact_pages}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].contact_forms}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].forms_sent}</td><td class='show-task' id="${this.table_data[i].id}">${this.table_data[i].went_manually}</td><td><a id='${this.table_data[i].id}' href='${this.$store.state.backend_url}/api/deletetask/${this.table_data[i].id}' class="delete delete-task"title="Delete"data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a></td></tr> <style>table.table tr th,table.table tr td {border-color: #e9e9e9;padding: 12px 15px;vertical-align: middle;}table.table tr th:first-child {width: 60px;}table.table tr th:last-child {width: 100px;}table.table-striped tbody tr:nth-of-type(odd) {background-color: #fcfcfc;}table.table-striped.table-hover tbody tr:hover {background: #f5f5f5;}table.table td button.settings {color: #2196f3;}table.table th i {font-size: 13px;margin: 0 5px;cursor: pointer;}table.table td:last-child i {opacity: 0.9;font-size: 22px;margin: 0 5px;}table.table td button {font-weight: bold;color: #566787;display: inline-block;text-decoration: none;}table.table td button:hover {color: #2196f3;}table.table td button.settings {color: #2196f3;}table.table td button.delete {color: #f44336;border: none; background: transparent;}table.table td i {font-size: 19px;}table.table .avatar {border-radius: 50%;vertical-align: middle;margin-right: 10px;}table.table td:last-child i {opacity: 0.9;font-size: 22px;margin: 0 5px;}table.table td button {font-weight: bold;color: #566787;display: inline-block;text-decoration: none;}table.table td button:hover {color: #2196f3;}table.table td button.settings {color: #2196f3;}table.table td button.delete {color: #f44336;}table.table td i {font-size: 19px;}.show-task{cursor:pointer; }</style>`;
      }
    },
    setPagination(active_page) {
      let table_length = this.table_data.length;
      this.pagination.pages = Math.floor(table_length / 10) + 1;

      const allPageLinks = document.getElementsByClassName('page-item');
      for (let i = 0; i < allPageLinks.length; i++) {
        allPageLinks[i].classList.remove('active');
      }
      const activePage = document.getElementById(active_page);
      activePage.classList.add('active');
      this.showRows(this.pagination.current_page);
      $('.show-task').on('click', function () {
        var sel = getSelection().toString();
        if (!sel) {
          if (this.id != '') {
            router.push({ path: `/task-info/${this.id}/` });
          }
        }
      });
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
    async deleteTask() {
      await axios
        .delete(`${this.$store.state.backend_url}/api/deletetask/${this.id}`)
        .then((response) => {
          alert('Task deleted!');
          // router.push({ path: `/tasks` });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },

    async fetchTableData() {
      const headers = {
        Authorization: this.$store.state.user_token,
      };

      try {
        const response = await axios.get(
          `${this.$store.state.backend_url}/api/tasks/`,
          {
            headers: headers,
          }
        );
        this.table_data = response.data;
        if (this.table_data != {}) {
          let fetch_arr = [];
          for (let i = 0; i < Object.keys(this.table_data).length; i++) {
            this.table_data[i].finished_date = moment(
              this.table_data[i].finished_date
            ).format('MMMM Do YYYY, h:mm:ss a');
            if (this.table_data[i].finished_date == "Invalid date")
            {
              this.table_data[i].finished_date = "In progress";
            }
            fetch_arr.push(
              axios.get(
                `${this.$store.state.backend_url}/api/taskdetail/${this.table_data[i].id}`
              )
            );
          }
          try {
            const res = await axios.all(fetch_arr);

            for (let i = 0; i < Object.keys(this.table_data).length; i++) {
              this.table_data[i] = { ...this.table_data[i], ...res[i].data };
            }
            this.setPagination(this.pagination.current_page);
            this.showRows(this.pagination.current_page);

            // let elements = document.getElementsByClassName('add-event');

            $('.show-task').on('click', function () {
              var sel = getSelection().toString();
              if (!sel) {
                if (this.id != '') {
                  router.push({ path: `/task-info/${this.id}/` });
                }
              }
            });
          } catch (error) {
            console.log('Error:', error);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    },
  },

  mounted() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    // if (localStorage.getItem('reload') == 1) {
    //   localStorage.setItem('reload', 0);
    //   location.reload();
    // } else {
    //   localStorage.setItem('reload', 1);
    // }

    this.fetchTableData();

    $('#filtertable tbody').on('click', 'tr', function () {
      if (this.id != '') {
        router.push({ path: `/task-info/${this.id}/` });
      }
    });
  },
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
</style>
