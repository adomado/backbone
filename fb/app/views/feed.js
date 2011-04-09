// View
var FeedView = Backbone.View.extend({

  initialize : function(feedItemsCollection) {
    this.fbFeed = null;
    _.bindAll(this, "render");  // maintain context when this.render is bound as a callback
    this.collection = feedItemsCollection;
	  this.collection.bind("add", this.render);

    $("#more-feed").click(this.fetchMoreFeed);
    this.fetchMoreFeed(); // Initial fetch
  },


  fetchMoreFeed : function() {
    $("#fb-loading-bottom").show();
    // undefined feedUrl would make the initial feed fetch
    var feedUrl = (this.fbFeed == undefined) ? undefined : this.fbFeed.paging.next; 
	  this.fbFeed = new FBFeed(this, feedUrl, function(_this, graphItems, graphPaging) { // _this is a proxy to 'this'
console.log("BUGBUG - the _this context should be of FeedView class in the second run");    
      for(var i=0; i<graphItems.length; i++)
        _this.collection.add({"id" : graphItems[i].id, "graphItem" : graphItems[i]});

      $("#fb-loading-bottom").hide();        
      $("#fb-loading-top").hide();
      $("#fb-feed").show().listview("refresh");
	  });    
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



