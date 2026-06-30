var restTimer=null;
self.addEventListener('message',function(e){
  if(e.data&&e.data.type==='startRest'){
    clearTimeout(restTimer);
    restTimer=setTimeout(function(){
      self.registration.showNotification('Rest Complete!',{
        body:'Set done — start your next set now 💪',
        icon:'/ebc-app/icon.png',
        vibrate:[200,100,200],
        tag:'rest-timer',
        renotify:true,
        requireInteraction:false
      });
    },e.data.secs*1000);
  }
  if(e.data&&e.data.type==='cancel'){
    clearTimeout(restTimer);
  }
});
self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window'}).then(function(cls){
    for(var i=0;i<cls.length;i++){if(cls[i].url.indexOf('/ebc-app/')>-1)return cls[i].focus();}
    return self.clients.openWindow('/ebc-app/');
  }));
});
