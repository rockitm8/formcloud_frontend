<template>
  <div class="task-form">
    <!-- <div class="form-info">
      <FormError :formError="form_info" :error="errorBool" />
    </div> -->
    <form id="myform" @submit.prevent="checkForm">
      <div class="content-box">
        <div class="box">
          <div class="input-control row">
            <div class="col-12">
              <label for="presetname">Preset Name</label>
              <input
                class="txt-input"
                type="text"
                name="presetname"
                id="presetname"
                v-model="form_data.preset_name"
              />
              <div class="error"></div>
            </div>
          </div>
          <div class="mt-4">
            <div class="input-control row">
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
              <div class="col-6">
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
          <button type="submit" class="sub-btn">Save Preset</button>
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

export default {
  name: 'PresetForm',
  data() {
    return {
      error: false,
      form_data: {
        preset_name: '',
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        phone_number: '',
        company: '',
        department: '',
        address: '',
      },
    };
  },
  methods: {
    checkForm() {
      this.validateInputs();

      if (!this.error) {
        this.submitForm();
      }
    },

    isValidEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateInputs() {
      const presetname = document.getElementById('presetname');
      const firstname = document.getElementById('firstname');
      const lastname = document.getElementById('lastname');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const phonenumber = document.getElementById('phonenumber');
      const company = document.getElementById('company');
      const department = document.getElementById('department');
      const address = document.getElementById('address');
      const presetnameValue = presetname.value.trim();
      const firstnameValue = firstname.value.trim();
      const lastnameValue = lastname.value.trim();
      const emailValue = email.value.trim();
      const subjectValue = subject.value.trim();
      const phonenumberValue = phonenumber.value.trim();
      const companyValue = company.value.trim();
      const departmentValue = department.value.trim();
      const addressValue = address.value.trim();

      //preset name
      if (presetnameValue === '') {
        this.setError(presetname, 'Preset Name is required');
      } else if (presetnameValue.length > 30) {
        this.setError(
          presetname,
          'Preset Name must be less than 30 characters'
        );
      } else {
        this.setSuccess(presetname);
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
        .post(`${this.$store.state.backend_url}/api/presets/`, this.form_data, {
          headers: headers,
        })
        .then((response) => {
          $(window).scrollTop(0);
          alert('Preset Saved!');
          router.push({ path: `/tasks` });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    },
  },
  mounted() {},
  components: { FormError },
};
</script>

<style scoped>
.task-form {
  margin-top: 50px;
}

.form-info {
  padding: 0px 0px 20px 50px;
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

/*  */
.input-control {
  margin-top: 10px;
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
