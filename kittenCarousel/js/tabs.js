$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIndex = 0;
  this.$activeEl = this.$el.find(".items").find("li").eq(0);
  this.$activeEl.addClass("active");

  this.$el.find(".slide-left").on("click", function() {
    this.$activeEl.addClass("left");

    this.activeIndex -= 1;
    if (this.activeIndex < 0) {
      this.activeIndex += 4;
    }

    var transitioningEl = this.$el.find(".items").find("li").eq(this.activeIndex);
    transitioningEl.addClass("right");
    transitioningEl.addClass("active");
    setTimeout(function () {
      transitioningEl.removeClass("right");
    }.bind(this), 0);

    this.$activeEl.one("transitionend", function() {

      this.$activeEl.removeClass("left");
      this.$activeEl.removeClass("active");

      this.$activeEl = this.$el.find(".items").find("li").eq(this.activeIndex);

    }.bind(this));
  }.bind(this));

  this.$el.find(".slide-right").on("click", function() {
    this.$activeEl.addClass("right");
    this.activeIndex += 1;
    if (this.activeIndex > 3) {
      this.activeIndex -= 4;
    }

    var $transitioningEl = this.$el.find(".items").find("li").eq(this.activeIndex);
    $transitioningEl.addClass("left");
    $transitioningEl.addClass("active");

    setTimeout(function(){
      $transitioningEl.removeClass("left");
    }.bind(this), 0);

    this.$activeEl.one("transitionend", function(){
      this.$activeEl.removeClass("right");
      this.$activeEl.removeClass("active");
      this.$activeEl = this.$el.find(".items").find("li").eq(this.activeIndex);
    }.bind(this));
  }.bind(this));
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
