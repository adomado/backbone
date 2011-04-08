var Storage = new JS.Module({
    
  getItem : function(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  
  
  setItem : function(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    
    if(this.storageSize() > 1500)
      this.cleanupStorage(["fbAccessToken"]); // cleanup all but save the fbAccessToken
  },
  
  removeItem : function(key) {
    localStorage.removeItem(key);
  },
  
  
  // Clears up localStorage but save a set of specified keys 
  cleanupStorage : function(saveKeysArray) {
    var savedData = {};
    // Save
    for(var i=0; i<saveKeysArray.length; i++) {
      savedData[saveKeysArray[i]] = this.getItem(saveKeysArray[i]);
    }
    
    localStorage.clear(); // Cleanup
    
    // Restore
    for(var i=0; i<saveKeysArray.length; i++) {
      this.setItem(saveKeysArray[i], savedData[saveKeysArray[i]]);
    }      
  },
  
  
  storageSize : function() {
    return localStorage.length;
  }
});
