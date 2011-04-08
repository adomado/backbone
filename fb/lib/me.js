var FBMe = new JS.Class({

  include : Storage, 

  initialize : function() {
    this.graphUrl = "https://graph.facebook.com/me?access_token=" + this.getItem("fbAccessToken");
    this.me = null;
    
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: this.graphUrl,
      success: function (jsonData) {
        this.me = jsonData;
      }
    });     
  }

});