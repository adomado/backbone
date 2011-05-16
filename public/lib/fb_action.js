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
    var accessToken = encodeURIComponent("access_token=" + this.fbAccessToken);
    var postData = {accessToken : accessToken};
    
    this.get(postUrl, postData, postCallback);
  },


  comment : function(fbItemId, commentText, postCallback) {
    var postUrl = encodeURIComponent(this.graphUrl + fbItemId + "/comments");
    var accessToken = encodeURIComponent("access_token=" + this.fbAccessToken);
    var comment = encodeURIComponent("message=" + commentText);
    var postData = {accessToken : accessToken, data : comment};
    
    this.get(postUrl, postData, postCallback);
  },


  share : function(message, options, postCallback) {
    options = options || {};
    var postUrl = encodeURIComponent(this.graphUrl + "/me/feed");
    var accessToken = encodeURIComponent("access_token=" + this.fbAccessToken);
    options.actions = "{'name':'Visit AppStore', 'link':'http://adomado.com/appstore'}";
    
    var message = encodeURIComponent("message=" + message + "&actions=" + options.actions);
    var postData = {accessToken : accessToken, data : message};
    
    this.get(postUrl, postData, postCallback);
  },
  
  
  get : function(postUrl, postData, successCallback) {
    $.getJSON(this.postProxy, {access_token : postData.accessToken, query : postData.data, post_url : postUrl}, successCallback);
  }

});