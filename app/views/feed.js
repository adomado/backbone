// View
var FeedView = Backbone.View.extend({

  initialize : function(feedItemsCollection) {
    this.collection = feedItemsCollection;
	  this.collection.bind("add", this.render);
	  
	  window.fbFeed = new FBFeed(this, undefined, function(_this, graphItems, graphPaging) { // _this is a proxy to 'this'
      for(var i=0; i<graphItems.length; i++)
        _this.collection.create({id : graphItems[i].id, graphItem : graphItems[i]});
        
      $("#fb-loading-top").hide();
      $("#fb-feed").show().listview("refresh");
	  });
  },
  

  render : function(feedItem) {
    feedItem = feedItem.get("graphItem"); // get the attribute from the model
    var feedItemData = {
      title: feedItem.message || feedItem.name,
      fromUserPic : "http://graph.facebook.com/" + feedItem.from.id + "/picture?type=small",
      description : feedItem.description || feedItem.caption,
      likeCount : feedItem.likes ? feedItem.likes.count : false,
      likePlural : (feedItem.likes && feedItem.likes.count > 1) ? true : false,
      commentCount : feedItem.comments ? feedItem.comments.count : false,
      commentPlural : (feedItem.comments && feedItem.comments.count > 1) ? true : false,
      fromUserProfile : "http://www.facebook.com/profile.php?id=" + feedItem.from.id,
      itemId : feedItem.id
    };
    
	  $("#fb-feed").append(ich.fbFeedItem(feedItemData));
	  return this;
  }  
  
});



