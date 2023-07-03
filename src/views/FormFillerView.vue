<template>
  <div class="form-filler">
    <Navigation />
    <div class="hero">
      <div class="top-area">
        <div class="name part">
          <label for="name">Name:</label>
          <input readonly id="name" type="text" />
        </div>
        <div class="email part">
          <label for="email">Email:</label>
          <input readonly id="email" type="text" />
        </div>
        <div class="select-file part">
          <label for="myFile">Select XLSX File:</label>
          <input id="myFile" type="file" />
        </div>
        <div class="selected-file part">
          <label for="myFileName">Selected File:</label>
          <input id="myFileName" readonly type="text" />
        </div>
        <div class="check-btn part">
          <button id="check-btn" type="button">Check</button>
        </div>
      </div>

      <div class="iframe-area">
        <button id="next-btn" style="font-size: 24px">
          Next <i class="fa fa-arrow-right"></i>
        </button>
        <iframe id="mainFrame" src="" frameborder="0"></iframe>
      </div>

      <div class="somediv"></div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
export default {
  components: { Navigation },
  name: 'FormFillerView',
  mounted() {
    var allowLoad = false;
    var nextBtn = false;
    $('#check-btn').click(function () {
      var fileExtension = ['xlsx'];
      if (
        $.inArray(
          $($('#myFile')).val().split('.').pop().toLowerCase(),
          fileExtension
        ) == -1
      ) {
        alert('Only formats are allowed : ' + fileExtension.join(', '));
        $('#myFile').val('');
      } else {
        $('#myFileName').val(
          $('#myFile')
            .val()
            .replace(/C:\\fakepath\\/i, '')
        );
        loadUrls();
      }
    });

    function loadUrls() {
      const myFile = document.getElementById('myFile');

      readXlsxFile(myFile.files[0]).then((data) => {
        data.shift();
        localStorage.setItem('urls', data);
        localStorage.setItem('loc', 0);
        loadIframe();
        // console.log(localStorage.getItem("urls").split(','))
      });
    }

    function loadIframe() {
      let url = localStorage.getItem('urls').split(',')[
        parseInt(localStorage.getItem('loc'))
      ];
      localStorage.setItem('loc', parseInt(localStorage.getItem('loc')) + 1);

      if (url == undefined) {
        alert('No more urls left!');
      } else {
        document.getElementById('mainFrame').src = url;

        // $.post('new.html', { url: url }, function (data) {
        // 	document.getElementById('somediv').innerHTML = data;
        // });
        // httpGet(url);
      }
      $('#next-btn').css('display', 'block');
      allowLoad = false;
    }

    $('#next-btn').click(() => {
      nextBtn = true;
      loadIframe();
    });

    function httpGet(theUrl) {
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
      } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          console.log(xmlhttp.responseText);
          return xmlhttp.responseText;
        }
      };
      xmlhttp.open('GET', theUrl, false);
      xmlhttp.send();
    }

    $('#mainFrame').on('load', () => {
      // console.log(
      // 	'load',
      // 	localStorage
      // 		.getItem('urls')
      // 		.split(',')
      // 		[parseInt(localStorage.getItem('loc')) - 1].split('//')[1]
      // );
      // document.domain = localStorage
      // 	.getItem('urls')
      // 	.split(',')
      // 	[parseInt(localStorage.getItem('loc')) - 1].split('//')[1];
      console.log('load');
      // console.log('document.domain:', document.domain);
      // console.log($('#mainFrame'));
      if (nextBtn) {
        nextBtn = false;
        allowLoad = true;
      } else {
        if (allowLoad) loadIframe();
        else allowLoad = true;
      }
      // console.log('allowLoad:', allowLoad);
      // console.log('nextBtn:', nextBtn);
      // $('#mainFrame')
      //     .contents()
      //     .find('form')
      //     .submit(function (e) {
      //         console.log('here2');
      //         e.preventDefault(); // dont submit multiple times
      //         this.submit(); // use native js submit
      //         console.log('here1');
      //         setTimeout(function () {
      //             console.log('here');
      //             loadIframe();
      //         });
      //     });
    });
  },
};
</script>

<style scoped>
.top-area {
  max-width: 700px;
  margin: 100px auto;
}

.iframe-area {
  max-width: 1000px;
  margin: auto;
}

#mainFrame {
  width: 1000px;
  height: 500px;
  margin-bottom: 100px;
}

.part {
  margin-top: 20px;
}

button {
  padding: 10px;
}

.iframe-area {
  position: relative;
}

#next-btn {
  position: absolute;
  right: 0;
  display: none;
  top: -50px;
}
</style>
