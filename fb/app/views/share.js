// Share page...
var ShareView = Backbone.View.extend({

  initialize : function() {
    $("#share-button").live("click", jQuery.proxy(this.share, this));
    this.onPageHide();
  },


  onPageHide : function() {
    $('fb-new-post-page').live('pagehide', function(event, ui) {
      $("#fb-new-post-text").val("");
      return true;
    });
  },


  share : function() {
    var message = $("#fb-new-post-text").val();

    if(message.length > 0)
    {
      $("#fb-share-spinner").show();
      new FeedItemModel().createNewOnFb(message, function() {
        $("#fb-new-post-text").val("");
        window.FeedApp.fetchNewerFeed();
        $.mobile.changePage($("#fb-feed-page"));
      });
    }
    else
      apprise("Enter something to share...");
  }

});