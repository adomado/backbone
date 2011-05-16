// Collection
var NotificationListCollection = Backbone.Collection.extend({
  
  model : NotificationItemModel,
  localStorage : new Store("notifications")
  
});