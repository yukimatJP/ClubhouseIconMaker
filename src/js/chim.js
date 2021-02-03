const $ = (id) => {
  return document.getElementById(id);
}

var app = new Vue({
  el: '#main',
  data: {
    cw: 1000,
    ch: 1000,
    preview: null,
    canvas: null,
    userImg: null,
    userImgSrc: null,
    verticalAlignSetting: "middle",
    textSizeSetting: "medium",
  },
  created: function() {
    
  },
  mounted: function() {
    this.preview = $('preview');
    this.canvas = $('canvas');
    this.userImg = $('user-img');
    this.updateScreenSize();
  },
  destroyed: function () {
    window.removeEventListener('resize', this.updateScreenSize(), false);
  },
  methods: {
    loadPage() {
      window.addEventListener('resize', this.updateScreenSize);
      this.userImg.addEventListener('change', this.loadUserImg, false);
      this.loadDefault();
    },
    updateScreenSize() {
      this.setPreviewSize();
    },
    setPreviewSize() {
      this.cw = $('preview-container').clientWidth * 0.98;
      this.ch = $('preview-container').clientHeight * 0.98;
      this.canvas.style.width = this.cw + "px";
      this.canvas.style.height = this.ch + "px";
    },
    loadDefault() {
      this.drawLoadingImage();
      this.userImgSrc = "img/sample/deer.jpg";
      $("overlay-text").value = "🎉 Click me!";
      setTimeout(this.drawImage, 1000);
    },
    drawLoadingImage() {
      var ctx = this.canvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 1000, 1000);
      var text = "loading...";
      ctx.font = '400 100px "Nunito", sans-serif';
      ctx.fillStyle = '#666666';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      var x = (this.canvas.width / 2);
      var y = (this.canvas.height / 2);
      ctx.fillText(text, x, y);
      this.preview.src = this.canvas.toDataURL();
    },
    pickImage() {
      $("user-img").click();
    },
    loadUserImg(e) {
      var fileData = e.target.files[0];
      if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
      }
      var reader = new FileReader();
      reader.onload = function() {
        this.userImgSrc = reader.result;
        this.drawImage();
      }.bind(this);
      // ファイル読み込みを実行
      reader.readAsDataURL(fileData);
    },
    drawImage() {
      this.drawLoadingImage();
      var ctx = this.canvas.getContext('2d');
      var img = new Image();
      img.src = this.userImgSrc;
      img.onload = function() {
        var ix = img.width > img.height ? (img.width - img.height) / 2 : 0;
        var iy = img.width > img.height ? 0 : (img.height - img.width) / 2;
        var size = Math.min(img.width, img.height);
        ctx.drawImage(img, ix, iy, size, size, 0, 0, 1000, 1000);
        this.drawText();
      }.bind(this);
    },
    drawText() {
      var ctx = this.canvas.getContext('2d');
      var text = $("overlay-text").value;
      var fontSize;
      switch(this.textSizeSetting) {
        case "small":  fontSize = 70; break;
        case "medium": fontSize = 100; break;
        case "large":  fontSize = 130; break;
      }
      var lineHeight = 1.15;
      ctx.font = 'bold ' + fontSize + 'px "Nunito", "Kosugi Maru", sans-serif';
      ctx.fillStyle = '#404040';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 15;
      ctx.textBaseline = "middle";
      ctx.textAlign = 'center';
      var lines = text.split("\n");
      var x = (this.canvas.width / 2);
      var y = 0;
      switch(this.verticalAlignSetting) {
        case "top":    y = fontSize * lineHeight + 50; break;
        case "middle": y = (this.canvas.height / 2 + 20 - (lines.length - 1) * fontSize * lineHeight / 2); break;
        case "bottom": y = this.canvas.height - (lines.length * fontSize * lineHeight + 50); break;
      }
      for(var i=0; i<lines.length; i++) {
        ctx.strokeText(lines[i], x, y);
        ctx.fillText(lines[i], x, y);
        y += fontSize * lineHeight;
      }
      this.preview.src = this.canvas.toDataURL();
    },
    adjustHeight(e){
      e.target.style.height = Math.max(e.target.scrollHeight, e.target.clientHeight) + "px";
      this.drawImage();
    },
    changeText() {
      this.drawImage();
    },
    showOptionSelector(e) {
      e.target.classList.add("selecting");
    },
    changeTextVerticalAlign(mode) {
      this.verticalAlignSetting = mode;
      this.drawImage();
    },
    changeTextSize(mode) {
      this.textSizeSetting = mode;
      this.drawImage();
    },
  },
  computed: {
    textVerticalPositionClass: function() { return "v-" + this.verticalAlignSetting; },
    textSizeClass: function() { return "size-" + this.textSizeSetting; }
  }
});

app.loadPage();