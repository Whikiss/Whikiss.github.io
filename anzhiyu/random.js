var posts=["2025/01/24/java小游戏/","2025/05/21/我一年来所积累的与学习有关的东西/","2025/01/28/如何在本地部署Deepseek/","2025/03/30/未竟之事/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };