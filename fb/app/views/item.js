// View
var ItemView = Backbone.View.extend({

  initialize : function(feedItemId) {
    _.bindAll(this, "onLikeChanged", "onCommentCountChanged"); // proxy the 'this' context back to the ItemView object
    
    this.feedItemId = feedItemId;
    this.feedItem = window.FeedList.get(feedItemId)
    this.graphItem = this.feedItem.get("graphItem");
    
    this.feedItem.bind("change:liked", this.onLikeChanged);
    this.feedItem.bind("change:commentCount", this.onCommentCountChanged);

    this.renderItemDetail();
    
    $('#fb-feed-item-page').live('pagehide', function(event, ui) {
      $("#fb-feed-item-comments").hide();
      $("#like-button").die("click"); // so that we saftely disconnect from a previously viewed feedItem
      $("#fb-item-new-comment-button").die("click");
      return true;
    });    
  },
  
  
  renderItemDetail : function() {
    // this should point to the item clicked
    var likeCount = this.feedItem.get("likeCount");
    var commentCount = this.feedItem.get("commentCount");
    var feedItemData = {
      title: this.graphItem.message || this.graphItem.name,
      fromUserPic : "http://graph.facebook.com/" + this.graphItem.from.id + "/picture?type=normal",
      fromUserName : this.graphItem.from.name,      
      description : this.graphItem.description || this.graphItem.caption,
      picture : this.graphItem.picture || false,
      likeCount : likeCount ? likeCount : false,
      likeText : (likeCount > 1) ? "Likes" : "Like",
      commentCount : commentCount ? commentCount : false,
      commentText : (commentCount > 1) ? "Comments" : "Comment",
      fromUserProfile : "http://www.facebook.com/profile.php?id=" + this.graphItem.from.id,
      permalink : this.graphItem.actions[0].link,
      itemId : this.graphItem.id,
      linkTo : this.graphItem.link
    };    
    $("#fb-feed-item-detail").html(ich.fbFeedItemDetail(feedItemData));  
    
    this.renderItemComments();
    $("#fb-feed-item-detail").autolink();
    
    $("#like-button").live("click", jQuery.proxy(this.like, this));  // proxy saves the 'this' context
    $("#fb-item-new-comment-button").live("click", jQuery.proxy(this.newComment, this));  // proxy saves the 'this' context
  },
  
  
  renderItemComments : function() {
    var appendToId = "#comments";
    $(appendToId).html(""); // cleanup
    var graphItem = this.feedItem.get("graphItem"); // fetch fresh as comments can be added by user.
    
    if(graphItem.comments && graphItem.comments.data && graphItem.comments.data.length > 0)
    {
      var comments = graphItem.comments.data;
      for(var i=0; i<comments.length; i++)
        this.renderComment(comments[i], appendToId);
        
      if(graphItem.comments.count > graphItem.comments.data.length)
        $("#more-comments").attr("href", graphItem.actions[0].link).show();
    }
    
    $("#fb-feed-item-comments").show(); // show anyways (so that user can add a new comment)
    this.feedItem.isLiked() == true ? $("#fb-like-ok").show() : $("#fb-like-ok").hide();    
  },
  
  
  renderComment : function(commentItem, appendToId) {
    var commentHtml;
    var commentData = {
      commentFromUserId : commentItem.from.id,
      commentText : commentItem.message,
      userProfleLink : "http://www.facebook.com/profile.php?id=" + commentItem.from.id,
    }
    
    commentHtml = ich.fbFeedItemComment(commentData);
    $(appendToId).append(commentHtml);
  },
  
  
  like : function() {
    $("#fb-like-spinner").show();
    this.feedItem.like();
  },
  
  
  onLikeChanged : function() {
    if(this.feedItem.isLiked() == true) {
      $("#fb-like-spinner").hide();
      $("#fb-like-ok").show();
      $("#item-likes").show();
    }
    $("#like-count").html(this.feedItem.get("likeCount"));
  },


  newComment : function() {
    $("#fb-comment-spinner").show();
    this.feedItem.addComment($("#fb-item-new-comment").val());
  },

  onCommentCountChanged : function() {
    $("#item-comments").show();
    this.renderItemComments();
    $("#comment-count").html(this.feedItem.get("commentCount"));
    $("#fb-comment-spinner").hide();
    $("#fb-item-new-comment").val("");
  }
  
});
