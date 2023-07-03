<template>
  <div class="form-box">
    <div class="button-box">
      <div id="btn"></div>
      <button type="button" class="toggle-btn" @click="login">Login</button>
      <button type="button" class="toggle-btn" @click="register">
        Register
      </button>
    </div>

    <!-- <SocialIcons /> -->
    <div class="form-error">
      <FormError :formError="formError" :error="errorBool" />
    </div>

    <form
      @submit.prevent="submitLogin"
      id="login"
      class="input-groupp"
      action="/"
      method="GET"
    >
      <input
        type="email"
        class="input-field"
        placeholder="Email"
        v-model="login_form.email"
        required
      />
      <input
        type="password"
        class="input-field"
        placeholder="Password"
        v-model="login_form.password"
        required
      />
      <input type="checkbox" class="check-box" /><span class="check-span"
        >Remember Password</span
      >
      <button type="submit" class="submit-btn">Login</button>
    </form>

    <form @submit.prevent="submitRegister" id="register" class="input-groupp">
      <!-- <div id="register" class="input-group"> -->
      <nobr>
        <input
          type="text"
          class="input-field"
          placeholder="First Name"
          v-model="register_form.first_name"
          required />
        <input
          type="text"
          class="input-field right"
          placeholder="Last Name"
          v-model="register_form.last_name"
          required
      /></nobr>
      <nobr>
        <!-- <input
          type="text"
          class="input-field"
          placeholder="Username"
          v-model="register_form.user_name"
          required
        /> -->
        <input
          type="email"
          class="input-field"
          placeholder="Email ID"
          v-model="register_form.email"
          required
        />
      </nobr>

      <nobr>
        <input
          type="password"
          id="rpassword"
          class="input-field"
          placeholder="Password"
          v-model="register_form.password"
          required />
        <input
          type="password"
          id="rconfirm"
          class="input-field right"
          placeholder="Confirm Password"
          v-model="confirm_password"
          required
      /></nobr>

      <div class="last">
        <!-- <input type="checkbox" class="check-box" /><span class="check-span"
          >I agree to the terms & conditions</span
        > -->

        <div class="captcha-div">
          <!-- <h4>Enter Captcha:</h4>
          <div class="capt">
            <h2 type="text" id="mainCaptcha"></h2>
            <p><input type="button" id="refresh" @click="Captcha" /></p>
            <input type="text" id="txtInput" />
          </div> -->

          <!-- <vue-recaptcha @verify="onRecaptchaVerified" sitekey="6LcwblolAAAAAEyoNGNj3yb0_7CGivEUAINWMqWm" /> -->

          <VueRecaptcha
            sitekey="6LfgaXwlAAAAABrnOEHpXIaqCkQ59heltD1BFCjv"
            :load-recaptcha-script="true"
            @verify="handleSuccess"
            @error="handleError"
          ></VueRecaptcha>
          
        </div>
        <button type="submit" class="submit-btn">Register</button>
      </div>

      <!-- </div> -->
    </form>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import FormError from './FormError.vue';
import { VueRecaptcha } from 'vue-recaptcha';
// import { VueRecaptcha } from 'vue-recaptcha-v3';

export default {
  name: 'LoginForm',
  data() {
    return {
      formError: '',
      errorBool: false,
      captcha: false,
      register_form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      confirm_password: '',
      login_form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSuccess() {
      console.log("Captcha success function!")
      this.captcha = true;
    },
    handleError () {
      console.log("Captcha error function!")
      this.captcha = false;
    },
    async onRecaptchaVerified (token) {
      // Handle the verified token here
      console.log('captcha verified')
    },
    // Captcha() {
    //   var alpha = new Array(
    //     'A',
    //     'B',
    //     'C',
    //     'D',
    //     'E',
    //     'F',
    //     'G',
    //     'H',
    //     'I',
    //     'J',
    //     'K',
    //     'L',
    //     'M',
    //     'N',
    //     'O',
    //     'P',
    //     'Q',
    //     'R',
    //     'S',
    //     'T',
    //     'U',
    //     'V',
    //     'W',
    //     'X',
    //     'Y',
    //     'Z',
    //     'a',
    //     'b',
    //     'c',
    //     'd',
    //     'e',
    //     'f',
    //     'g',
    //     'h',
    //     'i',
    //     'j',
    //     'k',
    //     'l',
    //     'm',
    //     'n',
    //     'o',
    //     'p',
    //     'q',
    //     'r',
    //     's',
    //     't',
    //     'u',
    //     'v',
    //     'w',
    //     'x',
    //     'y',
    //     'z',
    //     '0',
    //     '1',
    //     '2',
    //     '3',
    //     '4',
    //     '5',
    //     '6',
    //     '7',
    //     '8',
    //     '9'
    //   );
    //   var i;
    //   for (i = 0; i < 6; i++) {
    //     var a = alpha[Math.floor(Math.random() * alpha.length)];
    //     var b = alpha[Math.floor(Math.random() * alpha.length)];
    //     var c = alpha[Math.floor(Math.random() * alpha.length)];
    //     var d = alpha[Math.floor(Math.random() * alpha.length)];
    //     var e = alpha[Math.floor(Math.random() * alpha.length)];
    //     var f = alpha[Math.floor(Math.random() * alpha.length)];
    //     var g = alpha[Math.floor(Math.random() * alpha.length)];
    //   }
    //   var code =
    //     a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    //   document.getElementById('mainCaptcha').innerHTML = code;
    //   document.getElementById('mainCaptcha').value = code;
    // },
    // ValidateCaptcha() {
    //   var string1 = this.removeSpaces(
    //     document.getElementById('mainCaptcha').value
    //   );
    //   var string2 = this.removeSpaces(
    //     document.getElementById('txtInput').value
    //   );
    //   if (string1 == string2) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    removeSpaces(string) {
      return string.split(' ').join('');
    },
    register() {
      $('#login').css('left', '-600px');
      $('#register').css('left', '50px');
      $('#btn').css('left', '110px');
    },
    login() {
      $('#login').css('left', '250px');
      $('#register').css('left', '900px');
      $('#btn').css('left', '0px');
    },
    checkForm(form_type) {
      if (form_type == 'register') {
        if (
          this.register_form.first_name == '' ||
          this.register_form.last_name == '' ||
          this.register_form.email == '' ||
          this.register_form.password == ''
        ) {
          this.formError = 'All fields are required!';
          this.errorBool = true;
          return false;
        }

        if (this.register_form.password.length < 8) {
          this.formError = 'Passwords must have at least 8 characters!';
          this.errorBool = true;
          return false;
        }

        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
        if (!regex.test(this.register_form.password)) {
          this.formError = 'Passwords must have at least 1 alphabet and 1 number!';
          this.errorBool = true;
          return false;
        }

        if (this.confirm_password != this.register_form.password) {
          this.formError = 'Passwords must match!';
          this.errorBool = true;
          return false;
        }

        if (!this.captcha)
        {
          this.formError = 'Please complete recaptcha!';
          this.errorBool = true;
          return false;
        }

        // if (!this.ValidateCaptcha()) {
        //   this.formError = 'Captcha is wrong!';
        //   this.errorBool = true;
        //   return false;
        // }

        return true;
      } else if (form_type == 'login') {
        if (this.login_form.password == '') {
          this.formError = 'All fields are required!';
          this.errorBool = true;
          return false;
        }

        return true;
      }
    },
    async submitRegister() {
      if (this.checkForm('register')) {
        await axios
          .post(
            `${this.$store.state.backend_url}/api/users/register/`,
            this.register_form
          )
          .then((response) => {
            this.formError = 'Account activation link sent to your email!';
            this.errorBool = false;
            this.login();
          })
          .catch((error) => {
            this.errorBool = true;
            this.formError = 'Email already in use!';
          });
      }
    },
    async submitLogin() {
      if (this.checkForm('login')) {
        await axios
          .post(
            `${this.$store.state.backend_url}/api/users/login/`,
            this.login_form
          )
          .then((response) => {
            this.formError = 'User Logged in!';
            this.errorBool = false;
            this.$store.state.user_token = response.data.token;
            localStorage.setItem('token', response.data.token);
            this.$router.push({ name: 'task_view' });
          })
          .catch((error) => {
            this.errorBool = true;
            this.formError = error.response.data.errors.non_field_errors[0];
            console.log('Error:', error);
          });
      }
    },
  },
  mounted() {
    // this.Captcha();
  },
  components: { FormError, VueRecaptcha },
};
</script>

<style scoped>
.capt {
  height: auto;
}

.captcha-div {
  margin-top: 20px;
}

#mainCaptcha {
  position: relative;
  max-width: 220px;
  margin-top: 20px;
  padding: 10px 2px;
  user-select: none;
  /* box-shadow: 0 0 20px rgba(0,139,253,0.25); */
  border: 1px solid black;
}

#refresh {
  position: relative;
  left: 230px;
  width: 30px;
  height: 25px;
  bottom: 55px;
  background-color: transparent;
  outline: none;
  background-image: url('https://img.icons8.com/android/24/000000/refresh.png');
  border: 0;
  background-repeat: no-repeat;
}

#txtInput,
#Button1 {
  position: relative;
  /* left:40px; */
  padding: 10px 10px;
  bottom: 40px;
  font-size: 18px;
}
#txtInput {
  border: 2px solid rgb(114, 176, 238);
  width: 220px;
}
#Button1 {
  background-color: rgb(7, 59, 115);
  border-color: rgb(7, 59, 115);
  color: #fff;
}
.validation-span {
  margin-bottom: 100px;
  color: red;
}

.form-error {
  margin-left: 100px;
}

.form-box {
  width: 800px;
  height: 600px;
  position: relative;
  margin: 6% auto;
  background: rgb(242, 251, 253);
  padding: 5px;
  overflow: hidden;
  border-radius: 30px;
}

form {
  display: inline-block;
}

.button-box {
  width: 220px;
  margin: 30px auto;
  position: relative;
  box-shadow: 0 0 20px 9px #248aff1f;
  border-radius: 30px;
}

button {
  font-size: 15px;
}

.toggle-btn {
  padding: 10px 30px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
}

/* .last {
    margin-left: 50%;
} */

#btn {
  top: 0;
  left: 0;
  position: absolute;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #109fff, #069bff);
  border-radius: 30px;
  transition: 0.5s;
}

.input-groupp {
  top: 180px;
  position: absolute;
  width: 280px;
  transition: 0.5s;
}

.input-field {
  width: 100%;
  padding: 10px 0;
  margin: 5px 0;
  border-left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid rgb(153, 153, 153);
  outline: none;
  background: transparent;
}

.email-field {
  width: 218% !important;
}

.submit-btn {
  width: 85%;
  padding: 10px 30px;
  cursor: pointer;
  display: block;
  margin: auto;
  background: linear-gradient(to right, #109fff, #069bff);
  border: 0;
  outline: none;
  border-radius: 30px;
}

.check-box {
  margin: 30px 10px 30px 0;
}

.right {
  margin-left: 50px;
}

.check-span {
  color: #777;
  font-size: 12px;
  bottom: 68px;
  position: absolute;
  left: auto;
  top: auto;
}

#login {
  left: 250px;
}

#register {
  left: 900px;
}
</style>
