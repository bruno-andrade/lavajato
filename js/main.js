if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        
        console.log('1- ServiceWorker registration successful with scope: ', registration);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });

    Notification.requestPermission(function(status) {
        console.log('Notification permission status:', status);
    });
}