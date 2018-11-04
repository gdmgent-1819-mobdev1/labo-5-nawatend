let editMode = false;
let currentPostID;
CKEDITOR.replace("editor1");

document.getElementById("btn_publish").addEventListener(
  "click",
  function(e) {
    if (editMode) {
      DoneEditAndPublish(e);
      editMode = false;
    } else {
      publishPost(e);
    }
  },
  false
);

function readPosts() {
  let blogpostRef = firebase.database().ref("posts/");

  blogpostRef.on("value", function(snapshot) {
    document.getElementById("blog__posts").innerHTML = "";
    snapshot.forEach(function(data) {
      showPost(data.val());
    });
  });
}
// Create new Post
function publishPost(e) {
  e.preventDefault();

  let authorName = firebase.auth().currentUser.displayName;
  let title = document.getElementById("title").value;
  let content = CKEDITOR.instances.editor1.getData();
  let datetime = new Date().toLocaleString();
  let userID = firebase.auth().currentUser.uid;
  if (title !== "" && content !== "") {
    // Write the new post's data simultaneously in the posts list and the user's post list.

    var newPostKey = firebase
      .database()
      .ref("posts/")
      .push({}).key;

    postDataAndPostID = {
      postid: newPostKey,
      author: authorName,
      title: title,
      content: content,
      publishedOn: datetime,
      uid: userID
    };
    var updates = {};
    updates["/posts/" + newPostKey] = postDataAndPostID;
    firebase
      .database()
      .ref()
      .update(updates);
    emptyEditor();
    sendNotification("Publish Success!");
  } else {
    sendNotification("Failed To Publish, Fill title and body");
  }
}
// SHow all post blogs
function showPost(post) {
  let elem = document.createElement("div");
  elem.setAttribute("user-id", post.uid);
  elem.setAttribute("post-id", post.postid);

  elem.className = "blogpost";
  elem.innerHTML =
    '<p class="blog__title">' +
    post.title +
    "</p>" +
    "<p class='blog__time'>Published on " +
    post.publishedOn +
    " By: " +
    post.author +
    "</p>" +
    "<div class='blog__content'>" +
    post.content +
    post.uid +
    post.postid +
    "</div>";
  if (loggedIn) {
    if (post.uid === firebase.auth().currentUser.uid) {
      elem.innerHTML += `<div class='blog__edit' post-id='${
        post.postid
      }'>Edit</div>`;
    }
  }

  //<i class='fas fa-edit'></i></div>
  document.getElementById("blog__posts").appendChild(elem);
}

//Edit your own post
function editPost(postid) {
  //get one post by postid
  var ref = firebase.database().ref("posts/" + postid);
  //copy data to editor1
  ref.once("value").then(function(snapshot) {
    document.getElementById("title").value = snapshot.val().title;
    CKEDITOR.instances.editor1.setData(snapshot.val().content);
  });
}

DoneEditAndPublish = e => {
  //update data with same postID

  e.preventDefault();

  let authorName = firebase.auth().currentUser.displayName;
  let title = document.getElementById("title").value;
  let content = CKEDITOR.instances.editor1.getData();
  let datetime = new Date().toLocaleString();
  let userID = firebase.auth().currentUser.uid;
  if (title !== "" && content !== "") {
    // A post entry.
    var postData = {
      postid: currentPostID,
      author: authorName,
      title: title,
      content: content,
      publishedOn: datetime,
      uid: userID
    };

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates["/posts/" + currentPostID] = postData;

    firebase
      .database()
      .ref()
      .update(updates);

    sendNotification("Edited & Publish Success!");
    emptyEditor();
  } else {
    sendNotification("Failed To Publish, Fill title and body");
  }
};

emptyEditor = () => {
  document.getElementById("title").value = "";
  CKEDITOR.instances.editor1.setData("");
};
