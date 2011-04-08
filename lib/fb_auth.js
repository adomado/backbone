var FBAuth = new JS.Class({

    include : Storage,

    initialize: function(appId, returnUrl, reinforceAuthCallback) {
      this.appId = appId;
      this.returnUrl = returnUrl;
      this.reinforceAuthCallback = reinforceAuthCallback;
      this.authUrl = "https://graph.facebook.com/oauth/authorize?client_id=" + appId + "&redirect_uri=" + returnUrl +
                      "&scope=publish_stream,offline_access,email,read_stream,user_about_me,user_birthday,user_education_history," +
                      "user_hometown,user_online_presence,user_relationships,user_status&response_type=token";
                      
      if(this.needAuth() == true)
        document.location.href = this.getAuthUrl();                      
                      
      this.getAccessTokenFromUrl();                      
    },
    
    
    getAuthUrl : function() {
      return this.authUrl;
    },
    
    
    needAuth : function() {
      if(this.getItem("fbAccessToken") == null)
        return true;
      else
        return false;
    },
    
    
    reinforceAuth : function() {
      this.removeItem("fbAccessToken");
      this.reinforceAuthCallback.call();
    },
    
    
    getAccessTokenFromUrl : function() {
      try {
        var accessToken = document.location.hash.split("#access_token=")[1].split("&")[0];
        console.log(accessToken);
        this.setItem("fbAccessToken", accessToken);
        document.location.href = document.location.origin + document.location.pathname; // Trickery!
      } catch(error) {
        return false;
      }
    }
});
