var FBFeed = new JS.Class({

  include : Storage,

  initialize: function(callingContext, feedUrl, feedReadyCallbackPrepend, feedReadyCallbackAppend) {
    this.feedReadyCallbackPrepend = feedReadyCallbackPrepend;
    this.feedReadyCallbackAppend = feedReadyCallbackAppend;
    this.callingContext = callingContext;
    this.getFeed(feedUrl, this.feedReadyCallbackAppend); // Initiate the first feed fetch
  },


  getNewerFeed : function() {
    this.getFeed(undefined, this.feedReadyCallbackPrepend);
  },
  
  
  getOlderFeed : function() {
    this.getFeed(this.paging.next, this.feedReadyCallbackAppend);
  },
  
  
  feedReadyCallbackGeneric : function(callingContext, feed, paging) {
    console.log("BUGBUG - Generic feedReadyCallback called from FBFeed");
  },
  

  getFeed : function(feedUrl, feedReadyCallback) {
    if(feedUrl == undefined)
      feedUrl = 'https://graph.facebook.com/me/home?access_token=' + this.getItem("fbAccessToken");
      
    if(feedReadyCallback == undefined)
      feedReadyCallback = this.feedReadyCallbackGeneric;
      
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: feedUrl,
      success : jQuery.proxy(function (jsonData) {  // save the 'this' calling context
          this.feed = jsonData.data;
          this.paging = jsonData.paging
          feedReadyCallback(this.callingContext, jsonData.data, jsonData.paging); // direction tells to append or prepend in view list
        }, this)
    });    
  },
  


  // refresh a particular feedItem
  reFetchItem : function(itemId, callingContext, callback) {
    $.ajax({
      dataType: 'jsonp',
      context : this,
      url: "https://graph.facebook.com/" + itemId + "?access_token=" + this.getItem("fbAccessToken"),
      success : jQuery.proxy(function (jsonData) {  // save the 'this' calling context
          callback(callingContext, jsonData); // direction tells to append or prepend in view list
        }, this)
    });
  }


});

