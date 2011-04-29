// View
var FeedView = Backbone.View.extend({

  initialize : function(feedItemsCollection) {
    this.fbFeed = null;
    _.bindAll(this, "render", "renderLikeForItem");  // maintain context when this.render is bound as a callback
    this.collection = feedItemsCollection;
	  this.collection.bind("add", this.render);
	  this.collection.bind("change:liked", this.renderLikeForItem);    
  
    $("#more-feed").click(jQuery.proxy(this.fetchOlderFeed, this));  // save the 'this' calling context
    this.fbFeed = new FBFeed(this, undefined, this.feedReadyCallbackPrepend, this.feedReadyCallbackAppend);  // Initial fetch
    this.fetchNewerFeed();  // continuesly loop to check for any newer feeds
  },


  // Keeps looping every N minutes...
  fetchNewerFeed : function() {
    this.fbFeed.getNewerFeed();
    var timeout = 0.5 * 60 * 1000;
    setTimeout(jQuery.proxy(this.fetchNewerFeed, this), timeout);
  },


  fetchOlderFeed : function() {
    $("#fb-loading-bottom").show();
    this.fbFeed.getOlderFeed();  // uses callback passed to fbFeed's constructor
  },
  
  
  feedReadyCallbackAppend : function(_this, graphItems, graphPaging) { // _this is a proxy to 'this' of FeedView.js
    _this.addItemsToList(graphItems, "append");
    _this.refreshUiAfterCallback();    
  },


  feedReadyCallbackPrepend : function(_this, graphItems, graphPaging) { // _this is a proxy to 'this' of FeedView.js
    _this.addItemsToList(graphItems, "prepend");
    $("#fb-feed").listview("refresh");
  },
  

  addItemsToList : function(graphItems, direction) {
    for(var i=0; i<graphItems.length; i++) {
      if(! this.collection.get(graphItems[i].id))  // don't add to FeedList collection if the graphItem already exists in it.. (or it will duplicate content on UI)
        this.collection.add({"id" : graphItems[i].id, "graphItem" : graphItems[i], "direction" : direction});
    }
  },
  
  
  refreshUiAfterCallback : function() {
    $("#fb-loading-bottom").hide();
    $("#fb-loading-top").hide();
    $("#fb-feed").show();
    $("#fb-feed").listview("refresh");
  },
  

  // Renders the feed list, one item at a time
  render : function(model, collection) {
    var feedItem = model.get("graphItem"); // get the attribute from the model
    var feedItemData = {
      title: feedItem.message || feedItem.name,
      fromUserPic : "http://graph.facebook.com/" + feedItem.from.id + "/picture?type=small",
      description : feedItem.description || feedItem.caption,
      likeCount : feedItem.likes ? feedItem.likes.count : false,
      likeText : (feedItem.likes && feedItem.likes.count > 1) ? "Likes" : "Like",
      commentCount : feedItem.comments ? feedItem.comments.count : false,
      commentText : (feedItem.comments && feedItem.comments.count > 1) ? "Comments" : "Comment",
      fromUserProfile : "http://www.facebook.com/profile.php?id=" + feedItem.from.id,
      itemId : feedItem.id
    };

    if(model.get("direction") == "append")
      $("#fb-feed").append(ich.fbFeedItem(feedItemData));
    else
      $("#fb-feed").prepend(ich.fbFeedItem(feedItemData));
	  return this;
  },
  
  
  renderLikeForItem : function(model, collection) {
    var likeCount = model.get("likeCount");
    if(likeCount > 0)
    {
      $("#" + model.id + "__like-count-infeed").html(likeCount);
      $("#" + model.id + "__item-likes-infeed").show();
    }
  }
  
});



