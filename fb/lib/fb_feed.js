var FBFeed = new JS.Class({

  include : Storage,

  initialize: function(callingContext, feedUrl, feedReadyCallback) {
    this.callingContext = callingContext;
    this.getFeed(feedUrl, feedReadyCallback);
  },
  
  
  getMore : function() {
    window.fbFeed = new FBFeed(this.paging.next)
  },
  
  
  feedReadyCallback : function(callingContext, feed, paging) {
    console.log("BUGBUG - Generic feedReadyCallback called from FBFeed");
  },
  
  
  getFeed : function(feedUrl, feedReadyCallback) {
    if(feedUrl == undefined)
      feedUrl = 'https://graph.facebook.com/me/home?access_token=' + this.getItem("fbAccessToken");
      
    if(feedReadyCallback == undefined)
      feedReadyCallback = this.feedReadyCallback;
      
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: feedUrl,
      success : jQuery.proxy(function (jsonData) {  // save the 'this' calling context
          this.feed = jsonData.data;
          this.paging = jsonData.paging
          feedReadyCallback(this.callingContext, jsonData.data, jsonData.paging);
        }, this)
    });    
  },
  
  
  refreshFeed : function() {
    document.location.href = document.location.origin + document.location.pathname;
  }
    
});

