const $ = (id) => {
  return document.getElementById(id);
}

var app = new Vue({
  el: '#main',
  data: {
    
  },
  created: function() {
    
  },
  mounted: function() {

  },
  destroyed: function () {

  },
  methods: {
    loadPage() {
      this.setPreviewSize();
    },
    setPreviewSize() {
      console.log($('preview-container').clientWidth);
      $('preview').style.width = $('preview-container').clientWidth + "px";
      $('preview').style.height = $('preview-container').clientHeight + "px";
    }
  },
  computed: {
  }
});

app.loadPage();