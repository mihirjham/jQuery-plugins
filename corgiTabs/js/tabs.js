$.Tabs = function (el) {
  var that = this;
  this.$el = $(el);
  this.$contentTabs = $(this.$el.attr("data-content-tabs"));
  this.$activeTab = $(this.$contentTabs.find(".active"));
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (e){
  e.preventDefault();
  //Remove classes
  this.$activeTab.removeClass("active");
  $(this.$el.find("a.active")).removeClass("active");
  var $current = $(e.currentTarget);
  $current.addClass("active");

  this.$activeTab.addClass("transitioning");
  this.$activeTab.one("transitionend", function(){
    this.$activeTab.removeClass("transitioning");
    this.$activeTab = $(this.$contentTabs.find("#"+$current.text()));
    this.$activeTab.addClass("active");
    this.$activeTab.addClass("transitioning");
    setTimeout(function(){
      this.$activeTab.removeClass("transitioning");
    }.bind(this), 0);
  }.bind(this));
  //Add classes and reset $activeTab
  // var $current = $(e.currentTarget);
  // $current.addClass("active");
  // this.$activeTab = $(this.$contentTabs.find("#"+$current.text()));
  // this.$activeTab.addClass("active");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
