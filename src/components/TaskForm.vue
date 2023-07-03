<template>
  <div class="task-form">
    <Popup
      @reloadPresets="reloadPresets"
      @closePresetModal="presetModal"
      :showModal="presetShow"
    />
    <!-- <div class="form-info">
      <FormError :formError="form_info" :error="errorBool" />
    </div> -->
    <form id="myform">
      <div class="content-box">
        <div class="box">
          <div class="input-control">
            <label for="taskname">Task Name</label>
            <input
              class="txt-input"
              type="text"
              name="taskname"
              id="taskname"
              v-model="form_data.task_name"
            />
            <div class="error"></div>
          </div>

          <label for="domain-name">Enter the domain names (one per line)</label>
          <textarea
            class="form-control"
            placeholder="hubspot.com"
            autocomplete="off"
            autocapitalize="on"
            autocorrect="on"
            spellcheck="true"
            name="domain-name"
            v-model="temp_domains"
          ></textarea>

          <div class="mt-4">
            <label for="filename"
              >Or load domain names (CSV,Exel,Txt file)</label
            >
            <input
              class="txt-input"
              type="file"
              id="myFile"
              name="filename"
              hidden
              @change="changeInput"
            />

            <label class="choose-photo" for="myFile">
              <i class="fa fa-file" style="font-size: 24px"></i
              ><span id="myFileName" class="uuu">select a file</span>
            </label>
          </div>
          <!-- <label for="myFileName">Selected File:</label>
          <input id="myFileName" readonly type="text" /> -->
          <div class="mt-4">
            <!-- <div class="input-control row"> -->
            <div class="row presetdd">
              <div class="col-5">
                <label class="preset-label"
                  >Fill in details or select preset details:</label
                >
              </div>
              <div class="col-4">
                <div class="dropdown">
                  <div class="select">
                    <span class="selected">-------</span>
                    <div class="caret"></div>
                  </div>

                  <ul class="menu" id="menu"></ul>
                </div>
              </div>
              <div class="col-3">
                <button @click="presetModal" type="button" class="create-btn">
                  Create Preset
                </button>
              </div>
            </div>

            <!-- </div> -->

            <div class="input-control row">
              <div class="col-6 data-cols">
                <label for="fname">First Name</label> <br />
                <input
                  class="txt-input"
                  type="text"
                  name="fname"
                  id="firstname"
                  v-model="form_data.first_name"
                />
                <div class="error"></div>
              </div>
              <div class="col-6 data-cols">
                <label for="lname">Last Name</label> <br />
                <input
                  class="txt-input"
                  type="text"
                  name="lname"
                  id="lastname"
                  v-model="form_data.last_name"
                />
                <div class="error"></div>
              </div>
            </div>
            <div class="input-control row">
              <div class="col-6 data-cols">
                <label for="email">Email</label> <br />
                <input
                  v-model="form_data.email"
                  class="txt-input"
                  type="text"
                  name="email"
                  id="email"
                />
                <div class="error"></div>
              </div>
              <div class="col-6 data-cols">
                <label for="subject">Subject</label> <br />
                <input
                  class="txt-input"
                  type="text"
                  name="subject"
                  id="subject"
                  v-model="form_data.subject"
                />
                <div class="error"></div>
              </div>
            </div>
            <div class="input-control row">
              <div class="col-6 data-cols">
                <label for="pnum">Phone Number</label> <br />
                <input
                  class="txt-input"
                  type="number"
                  name="pnum"
                  id="phonenumber"
                  v-model="form_data.phone_number"
                />
                <div class="error"></div>
              </div>
              <div class="col-6 data-cols">
                <label for="company">Company</label> <br />
                <input
                  class="txt-input"
                  type="text"
                  name="company"
                  id="company"
                  v-model="form_data.company"
                />
                <div class="error"></div>
              </div>
            </div>
            <div class="input-control row">
              <div class="col-6 data-cols">
                <label for="dep">Department</label> <br />
                <input
                  v-model="form_data.department"
                  class="txt-input"
                  type="text"
                  name="dep"
                  id="department"
                />
                <div class="error"></div>
              </div>
              <div class="col-6 data-cols">
                <label for="address">Address</label> <br />
                <input
                  class="txt-input"
                  type="text"
                  name="address"
                  id="address"
                  v-model="form_data.address"
                />
                <div class="error"></div>
              </div>
            </div>
          </div>
          <button type="button" @click="checkForm" class="sub-btn">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import FormError from './FormError.vue';
import router from '@/router';
import Popup from './Popup.vue';

export default {
  name: 'TaskForm',
  data() {
    return {
      temp_domains: '',
      error: false,
      // form_info: '',
      // errorBool: false,
      form_data: {
        task_name: '',
        domains: [],
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        phone_number: '',
        company: '',
        department: '',
        address: '',
      },
      preset_data: null,
      preset_names: [],
      presetShow: false,
    };
  },
  methods: {
    reloadPresets() {
      this.fetchPresets(false);
    },
    presetModal() {
      this.presetShow = !this.presetShow;
    },
    checkForm() {
      this.validateInputs();

      if (!this.error) {
        this.setDomains();
        this.submitForm();
      }
    },
    setDomains() {
      var fileExtension = ['xlsx'];
      if ($('#myFile')[0].files.length == 0) {
      } else if (
        $.inArray(
          $($('#myFile')).val().split('.').pop().toLowerCase(),
          fileExtension
        ) == -1
      ) {
        alert('Only formats are allowed : ' + fileExtension.join(', '));
        $('#myFile').val('');
      } else {
        const myFile = document.getElementById('myFile');

        readXlsxFile(myFile.files[0]).then((data) => {
          for (let i = 0; i < data.length; i++) {
            this.form_data.domains.push(data[i][0]);
          }
        });
      }
      this.form_data.domains = this.form_data.domains.concat(
        this.temp_domains.split(/\r?\n/)
      );
      for (let i = 0; i < this.form_data.domains.length; i++) {
        if (this.form_data.domains[i] === '') {
          this.form_data.domains.splice(i, 1);
        }
      }
    },
    changeInput() {
      $('#myFileName').html(
        $('#myFile')
          .val()
          .replace(/C:\\fakepath\\/i, '')
      );
    },
    isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateInputs() {
      const taskname = document.getElementById('taskname');
      const firstname = document.getElementById('firstname');
      const lastname = document.getElementById('lastname');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const phonenumber = document.getElementById('phonenumber');
      const company = document.getElementById('company');
      const department = document.getElementById('department');
      const address = document.getElementById('address');
      const tasknameValue = taskname.value.trim();
      const firstnameValue = firstname.value.trim();
      const lastnameValue = lastname.value.trim();
      const emailValue = email.value.trim();
      const subjectValue = subject.value.trim();
      const phonenumberValue = phonenumber.value.trim();
      const companyValue = company.value.trim();
      const departmentValue = department.value.trim();
      const addressValue = address.value.trim();

      //task name
      if (tasknameValue === '') {
        this.setError(taskname, 'Task Name is required');
      } else if (tasknameValue.length > 30) {
        this.setError(taskname, 'Task Name must be less than 30 characters');
      } else {
        this.setSuccess(taskname);
      }

      // firstname
      if (firstnameValue === '') {
        this.setError(firstname, 'First Name is required');
      } else if (firstnameValue.length > 30) {
        this.setError(firstname, 'First Name must be less than 30 characters');
      } else {
        this.setSuccess(firstname);
      }

      // lastname

      if (lastnameValue === '') {
        this.setError(lastname, 'Last Name is required');
      } else if (lastnameValue.length > 30) {
        this.setError(lastname, 'Last Name must be less than 30 characters');
      } else {
        this.setSuccess(lastname);
      }

      // email

      if (emailValue === '') {
        this.setError(email, 'Email is required');
      } else if (!this.isValidEmail(emailValue)) {
        this.setError(email, 'Provide a valid email address');
      } else {
        this.setSuccess(email);
      }

      // subject

      if (subjectValue === '') {
        this.setError(subject, 'Subject is required');
      } else if (subjectValue.length > 1000) {
        this.setError(subject, 'Subject must be less than 1000 characters');
      } else {
        this.setSuccess(subject);
      }

      // number

      if (phonenumberValue === '') {
        this.setError(phonenumber, 'Phone Number is required');
      } else {
        this.setSuccess(phonenumber);
      }

      // company

      if (companyValue === '') {
        this.setError(company, 'Company name is required');
      } else if (companyValue.length > 50) {
        this.setError(company, 'Company name must be less than 50 characters');
      } else {
        this.setSuccess(company);
      }

      // department

      if (departmentValue === '') {
        this.setError(department, 'Department name is required');
      } else if (departmentValue.length > 50) {
        this.setError(
          department,
          'Department name must be less than 50 characters'
        );
      } else {
        this.setSuccess(department);
      }

      // address

      if (addressValue === '') {
        this.setError(address, 'Address name is required');
      } else if (addressValue.length > 100) {
        this.setError(address, 'Address must be less than 50 characters');
      } else {
        this.setSuccess(address);
      }
    },
    setError(element, message) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');

      errorDisplay.innerText = message;
      inputControl.classList.add('error');
      inputControl.classList.remove('success');
      this.error = true;
    },
    setSuccess(element) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');
      errorDisplay.innerText = '';
      inputControl.classList.add('success');
      inputControl.classList.remove('error');
      this.error = false;
    },
    async submitForm() {
      const headers = {
        Authorization: this.$store.state.user_token,
      };
      await axios
        .post(`${this.$store.state.backend_url}/api/tasks/`, this.form_data, {
          headers: headers,
        })
        .then((response) => {
          // this.form_info = 'Form Submitted!';
          // this.errorBool = false;

          document.getElementById('myform').reset();
          $(window).scrollTop(0);
          alert('Task Submitted!');
          router.push({ path: `/tasks` });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
    fetchPresets(set = true) {
      const headers = {
        Authorization: this.$store.state.user_token,
      };

      try {
        const preset_response = axios.get(
          `${this.$store.state.backend_url}/api/presets/`,
          {
            headers: headers,
          }
        );

        const menu = document.getElementById('menu');

        let lis = '';

        preset_response.then((response) => {
          this.preset_data = response.data;
          for (let i = 0; i < this.preset_data.length; i++) {
            lis += `<li class="menu-li">${this.preset_data[i].preset_name}</li>`;
          }
          menu.innerHTML = `<li class="active menu-li">-------</li>${lis} <style>.menu li,.menu-li {padding: 0.7em 0.5em;margin: 0.3em 0;border-radius: 0.5em;cursor: pointer;}.menu li:hover,.menu-li:hover {  background: #aae1ff;}</style>`;

          this.setDropdown(set);
        });
      } catch (error) {
        console.log('Error:', error);
      }
    },
    setDropdown(set) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach((dropdown) => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');

        if (set) {
          select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
          });
        }

        options.forEach((option) => {
          option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach((option) => {
              option.classList.remove('active');
            });

            option.classList.add('active');

            let tempData = null;
            if (option.innerHTML !== '-------') {
              for (let i = 0; i < this.preset_data.length; i++) {
                if (option.innerHTML === this.preset_data[i].preset_name) {
                  tempData = this.preset_data[i];
                  break;
                }
              }

              this.form_data.first_name = tempData.first_name;
              this.form_data.last_name = tempData.last_name;
              this.form_data.email = tempData.email;
              this.form_data.subject = tempData.subject;
              this.form_data.phone_number = tempData.phone_number;
              this.form_data.company = tempData.company;
              this.form_data.department = tempData.department;
              this.form_data.address = tempData.address;
            } else {
              this.form_data.first_name = '';
              this.form_data.last_name = '';
              this.form_data.email = '';
              this.form_data.subject = '';
              this.form_data.phone_number = '';
              this.form_data.company = '';
              this.form_data.department = '';
              this.form_data.address = '';
            }
          });
        });
      });
    },
  },
  mounted() {
    this.fetchPresets();
  },
  components: { FormError, Popup },
};
</script>

<style scoped>
.task-form {
  margin-top: 50px;
}

.data-cols {
  height: 70px;
}

.preset-label {
  font-size: 12px;
}

.form-info {
  padding: 0px 0px 20px 50px;
}

.create-btn {
  border: 2px solid #3cbaff;
  color: #fff;
  font-size: 14px;
  /* margin-top: 30px; */
  font-weight: 500;
  background-color: #3cbaff;
  border-radius: 6px;
  padding: 3px 33px;
  /* margin-left: 17px;
  margin-bottom: 40px; */
}

.dropdown * {
  box-sizing: border-box;
}

.presetdd {
  margin: 20px 0 20px;
}

.presetdd label {
  padding-top: 12%;
}

.select {
  background: #3cbaff;
  width: 80%;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #3cbaff solid;
  border-radius: 0.5em;
  padding: 1em;
  cursor: pointer;
  transition: background 0.3s;
  right: 0;
}

.select-clicked {
  border: 2px #3cbaff solid;
  box-shadow: 0 0 0.8em #3cbaff;
}

.select:hover {
  background: #0e81be;
  border: 2px #0e81be solid;
}

.caret {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid white;
  transition: 0.3s;
}

.caret-rotate {
  transform: rotate(180deg);
}

.menu {
  list-style: none;
  padding: 0.2em 0.5em;
  background: #e6e6e6;
  border: 1px #e6e6e6 solid;
  box-shadow: 0 0.5em 1em #b1b1b1;
  border-radius: 0.5em;
  color: #4a4a4a;
  position: absolute;
  top: 3em;
  left: 40%;
  width: 80%;
  transform: translateX(-50%);
  opacity: 0;
  display: none;
  transition: 0.2s;
  z-index: 1;
}

.menu li,
.menu-li {
  padding: 0.7em 0.5em;
  margin: 0.3em 0;
  border-radius: 0.5em;
  cursor: pointer;
}

.menu li:hover,
.menu-li:hover {
  background: #aae1ff;
}

.active {
  background: #aae1ff;
}

.menu-open {
  display: block;
  opacity: 1;
}

.content-box {
  margin: auto;
  max-width: 500px;
}

.box {
  background-color: #f4f4f4;
  padding-top: 20px;
  border-radius: 5px;
}

/*  */

input {
  padding: 10px;
}

.txt-input {
  margin-bottom: 30px;
  margin-top: -10px;
  margin-left: 17px;
  border: 1px solid #ccc;
  border-radius: 6px;
  /* width: 40%; */
  height: 35px;
}

.box label {
  margin-bottom: 13px;
  margin-left: 17px;
  font-weight: 700;
}

.form-control {
  display: block;
  width: 93% !important;
  min-height: 200px;

  margin-left: 17px;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: #262626;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
}

.form-control:focus {
  outline: none;
  box-shadow: none !important;
  border: 2px solid #3cbaff;
}

input:focus {
  outline: none;
  box-shadow: none !important;
  border: 2px solid #3cbaff;
}

.choose-photo {
  text-align: center;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  border: 1px dashed #828282;
  margin-left: 17px;
  margin-bottom: 20px;
  line-height: 500%;
  width: 93%;
  cursor: pointer;
  height: 100px;
}

.uuu {
  margin-left: 6px;
}

.sub-btn {
  border: 2px solid #3cbaff;
  color: #fff;
  font-size: 15px;
  margin-top: 30px;
  font-weight: 500;
  transition: all 0.4s ease-in-out;
  background-color: #3cbaff;
  border-radius: 6px;
  padding: 9px 33px;
  margin-left: 17px;
  margin-bottom: 40px;
}

.sub-btn:hover {
  background-color: white;
  color: #0d6efd;
}

.input-control.success input {
  border-color: #3cbaff;
}

.input-control.error input {
  border-color: #ff3860 !important;
}

.input-control .error {
  color: #ff3860 !important;
  font-size: 12px;
  margin-top: -20px;
  margin-bottom: 30px;
  margin-left: 20px;
}

/* for numer dial remove */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
/* ends */
</style>
