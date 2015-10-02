$.Zoomable = function (el) {
  this.$el = $(el);
  this.size = 100;
  this.bindEvents();
};

$.Zoomable.prototype.bindEvents = function(){
  this.$el.on("mousemove", this.showFocusBox.bind(this));
  this.$el.on("mouseleave", this.removeFocusBox.bind(this));
};

$.Zoomable.prototype.showFocusBox = function(e){
  $('div.focus-box').removeClass("hidden");
  $('div.focus-box').css('left', e.pageX - this.size/2);
  $('div.focus-box').css('top', e.pageY - this.size/2);
  // setInterval(function() {
  //   this.showFocusBox(e);
  // }.bind(this), 120);
  // debugger;
};

$.Zoomable.prototype.removeFocusBox = function(e){
  $('div.focus-box').addClass("hidden");
};

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  });
};
