var FBMe = new JS.Class({

  include : Storage,

  initialize : function(callingContext, callback) {
    this.graphUrl = "https://graph.facebook.com/me?access_token=" + this.getItem("fbAccessToken");
    this.callback = callback;
    this.callingContext = callingContext;
    
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: this.graphUrl,
      success: jQuery.proxy(function(jsonDataMe) {
        window.fbMe = jsonDataMe;
        this.callback(this.callingContext, jsonDataMe);
      }, this)
    });     
  }

});