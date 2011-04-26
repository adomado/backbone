var NotificationView = Backbone.View.extend({

  initialize : function(notificationItemsCollection) {
    this.collection = notificationItemsCollection;
    this.collection.bind("add", this.render);
  },


  render : function(model, collection) {
    var notificationData = model.get("data");
    window.appApi.requestNotification({text : notificationData.title_text, title : "Notification", url : notificationData.href});
  }  
  
});