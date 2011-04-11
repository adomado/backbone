// View
var FeedView = Backbone.View.extend({

  initialize : function(feedItemsCollection) {
    this.fbFeed = null;
    _.bindAll(this, "render");  // maintain context when this.render is bound as a callback
    this.collection = feedItemsCollection;
	  this.collection.bind("add", this.render);
  
    $("#more-feed").click(jQuery.proxy(this.fetchMoreFeed, this));  // save the 'this' calling context
    this.fetchMoreFeed(); // Initial fetch
  },


  fetchMoreFeed : function() {
    if(this.fbFeed == null)
  	  this.fbFeed = new FBFeed(this, undefined, this.feedReadyCallback);
  	else
  	{
      $("#fb-loading-bottom").show();
  	  this.fbFeed.getMoreFeed();
	  }
  },
  
  
  feedReadyCallback : function(_this, graphItems, graphPaging) { // _this is a proxy to 'this' of FeedView.js
    for(var i=0; i<graphItems.length; i++)
      _this.collection.add({"id" : graphItems[i].id, "graphItem" : graphItems[i]});

    $("#fb-loading-bottom").hide();        
    $("#fb-loading-top").hide();
    $("#fb-feed").show().listview("refresh");
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
    
	  $("#fb-feed").append(ich.fbFeedItem(feedItemData));
	  return this;
  }
  
});



