var NotificationView = Backbone.View.extend({

  initialize : function(notificationItemsCollection) {
    this.collection = notificationItemsCollection;
    this.collection.bind("add", this.render);
  },


  render : function(model, collection) {
    var notificationData = model.get("data");
    window.appApi.requestNotification({
      text : notificationData["title_text"],
      title : "Facebook Notification",
      image : "http://graph.facebook.com/" + notificationData["sender_id"] + "/picture?type=small",
      url : notificationData.href
    });
  }  
  
});