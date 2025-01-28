var posts=["2025/01/24/java小游戏/","2025/01/23/第一个文章/","2025/01/23/hello-world/","2025/01/28/如何在本地部署Deepseek/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };