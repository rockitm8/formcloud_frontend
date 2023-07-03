<template>
  <div class="navigation">
    <nav>
      <div class="container">
        <header>
          <router-link to="/" v-if="$store.state.user_token == ''">
            <img class="logo" src="../assets/logo.png" alt="" />
          </router-link>
          <router-link to="/tasks" v-else>
            <img class="logo" src="../assets/logo.png" alt="" />
          </router-link>

          <div class="nav-list" v-if="$store.state.user_token != ''">
            <div class="overlay"></div>
            <ul>
              <li><router-link to="/tasks">Tasks</router-link></li>
              <!-- <li><router-link to="/form">Form Filler</router-link></li> -->
              <!-- <li><router-link to="/preset">Create Preset</router-link></li> -->
              <!-- <li><router-link to="/messages">Messages</router-link></li> -->
            </ul>
            <router-link to="/">
              <button @click="logoutClicked" class="sub-btn">Logout</button>
            </router-link>
          </div>
          <!-- <Popup @closePresetModal="presetModal" :showModal="presetShow" /> -->
        </header>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      presetShow: false,
    };
  },
  methods: {
    presetModal() {
      this.presetShow = !this.presetShow;
    },
    logoutClicked() {
      this.$store.state.user_token = '';
      localStorage.setItem('token', '');
      // location.reload();
    },
  },
  mounted() {
    const overlay = document.querySelector('header .nav-list .overlay');
    const nav_list = document.querySelectorAll('header .nav-list ul li');

    nav_list.forEach((list) => {
      list.addEventListener('mouseover', () => {
        let position = list.getBoundingClientRect();
        overlay.classList.add('active');
        overlay.style.left = position.x + 'px';
        overlay.style.top = position.y + 'px';
        overlay.style.height = position.height + 'px';
        overlay.style.width = position.width + 'px';
      });
      list.addEventListener('mouseout', () => {
        overlay.classList.remove('active');
      });
    });
  },
};
</script>

<style scoped>
.navigation {
  margin-top: 20px;
}

.logo {
  width: 200px;
}

header {
  font-family: 'Poppins', sans-serif;
  width: auto;
  height: auto;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header .nav-list {
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
header .nav-list ul {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
header .nav-list ul li {
  list-style: none;
  height: auto;
  width: auto;
}
header .nav-list ul li a {
  text-decoration: none;
  font-size: 15px;
  color: #3cbaff;
  padding: 7.5px 33px;
  display: inline-block;
}

header .nav-list ul li a:hover {
  color: #0d6efd;
}

header .nav-list .overlay {
  position: absolute;

  background-color: #3cbaff;
  border-radius: 8px;
  z-index: -1;
  transition: 0.3s ease left, width, opacity;
  opacity: 0;
}
header .nav-list .overlay.active {
  opacity: 1;
}
/*  */
.sub-btn {
  border: 2px solid #3cbaff;
  color: #fff;
  font-size: 15px;
  justify-content: center;
  margin-top: -16px;
  font-weight: 500;
  transition: all 0.4s ease-in-out;
  background-color: #3cbaff;
  border-radius: 6px;
  padding: 9px 33px;
}

.sub-btn:hover {
  background-color: white;
  color: #0d6efd;
}
</style>
