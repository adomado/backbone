var FBAction = new JS.Class({

  include : Storage,
  
  initialize : function() {
    this.graphUrl = "https://graph.facebook.com/";
    this.fbAccessToken = this.getItem("fbAccessToken");
    this.postProxy = "/post";
    this.fbItemId = null;
  },
  
  
  like : function(fbItemId, postCallback) {
    this.fbItemId = fbItemId;
    var postUrl = encodeURIComponent(this.graphUrl + fbItemId + "/likes");
    var postData = encodeURIComponent("access_token=" + this.fbAccessToken);
    
    this.get(postUrl, postData, function(){
      postCallback.call();
    });
  },
  
  
  get : function(postUrl, postData, successCallback) {
    successCallback = successCallback || function(data) {};
    $.getJSON(this.postProxy, {post_data : postData, post_url : postUrl}, successCallback);
  }

});