$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find('.gutter-images').find('img');
  this.$activeImg = this.$gutterImages.eq(0);
  this.activate(this.$activeImg);
  this.gutterIdx = 0;
  this.fillGutterImages();
  this.bindEvents();
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};

$.Thumbnails.prototype.activate = function($img) {
  $('div.active').empty();
  $img.clone().appendTo("div.active");
};

$.Thumbnails.prototype.bindEvents = function() {
  $('div.gutter').on("click", "img", this.handleActivate.bind(this));
  $('div.gutter').on("mouseenter", "img", this.handleMouseEnter.bind(this));
  $('div.gutter').on("mouseleave", "img", this.handleMouseLeave.bind(this));

  this.$el.on("click", "a.nav", this.handleNav.bind(this));
};

$.Thumbnails.prototype.handleActivate = function(e) {
  var currentTarget = $(e.currentTarget);
  this.$activeImg = currentTarget;
  this.activate(currentTarget);
};

$.Thumbnails.prototype.handleMouseEnter = function(e){
  var $currentTarget = $(e.currentTarget);
  this.activate($currentTarget);
};

$.Thumbnails.prototype.handleMouseLeave = function(e){
  this.activate(this.$activeImg);
};

$.Thumbnails.prototype.fillGutterImages = function(){
  $('div.gutter-images').empty();
  for(var i = this.gutterIdx; i < this.gutterIdx + 5; i++){
    this.$gutterImages.eq(i).appendTo("div.gutter-images");
  }
};

$.Thumbnails.prototype.handleNav = function(e) {
  e.preventDefault();
  var currentTarget = $(e.currentTarget);
  var dir = currentTarget.attr("href");
  if (dir === "<") {
    this.gutterIdx -= 1;
    if (this.gutterIdx < 0) { this.gutterIdx = 0; }
  } else {
    this.gutterIdx += 1;
    if (this.gutterIdx > 14) { this.gutterIdx = 14; }
  }
  this.fillGutterImages();
};
