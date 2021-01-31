const $ = (id) => {
  return document.getElementById(id);
}

var app = new Vue({
  el: '#main',
  data: {
    canvas: null
  },
  created: function() {
    
  },
  mounted: function() {
    this.canvas = $('preview');
    this.updateScreenSize();
  },
  destroyed: function () {
    window.removeEventListener('resize', this.updateScreenSize(), false);
  },
  methods: {
    loadPage() {
      window.addEventListener('resize', this.updateScreenSize);
    },
    updateScreenSize() {
      this.setPreviewSize();
    },
    setPreviewSize() {
      this.canvas.style.width = ($('preview-container').clientWidth * 0.98) + "px";
      this.canvas.style.height = ($('preview-container').clientHeight * 0.98) + "px";
    },
    pickImage() {
      var ctx = this.canvas.getContext('2d');
      ctx.fillStyle = '#ff9999';
      ctx.fillRect(0, 0, 1000, 1000);
      this.drawText();
    },
    drawText() {
      var ctx = this.canvas.getContext('2d');
      var text = "Clicked";
      ctx.font = '50px sans-serif';
      ctx.fillStyle = '#404040';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      var x = (this.canvas.width / 2);
      var y = (this.canvas.height * 0.9);
      ctx.fillText(text, x, y);
    }
  },
  computed: {
  }
});

app.loadPage();