(function() {
  CKEDITOR.replace("editor1");

  document
    .getElementById("btn_publish")
    .addEventListener("click", publishPost, false);

  let blogpostRef = firebase.database().ref("posts/");
  blogpostRef.on("value", function(snapshot) {
    document.getElementById("blog__posts").innerHTML = "";
    snapshot.forEach(function(data) {
      showPost(data.val());
    });
  });
})();

// Create new Post
function publishPost(e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let content = CKEDITOR.instances.editor1.getData();
  let datetime = new Date().toLocaleString();

  firebase
    .database()
    .ref("posts/")
    .push({
      title: title,
      content: content,
      publishedOn: datetime
    });
}
// SHow all post blogs
function showPost(post) {
  let elem = document.createElement("div");
  elem.className = "blogpost";
  elem.innerHTML =
    '<p class="blog__title">' +
    post.title +
    "</p>" +
    "<p class='blog__time'>Published on " +
    post.publishedOn +
    "</p>" +
    "<div class='blog__content'>" +
    post.content +
    "</div><hr>";

  document.getElementById("blog__posts").appendChild(elem);
}
