firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var selectId = decodeURIComponent(window.location.search);
    var selectTweetId = selectId.substring(1);

    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querryUser) => {
        querryUser.forEach((userDoc) => {
          let user = userDoc.data().userName;
          let userId = userDoc.data().userId;
          firebase
            .firestore()
            .collection("Tweets")
            .get()
            .then((querryTweet) => {
              let content = "";

              querryTweet.forEach((tweetDoc) => {
                let tweetUserId = tweetDoc.data().userId;
                let tweet = tweetDoc.data().tweets;
                console.log(tweet);
                let tweetid = tweetDoc.data().tweetId;
                let handle = "@" + user;

                if ((userId == tweetUserId) & (tweetid == selectTweetId)) {
                  content += '<div class="wehh" id= "wehh">';
                  content +=
                    "<p>" +
                    "<img id='image' src= '/images/profile.jpg' alt=''>" +
                    user +
                    " " +
                    "<span id= 'handle' >" +
                    handle +
                    "</span>" +
                    "</p>";
                  content += "<p id='post'>" + tweet + "</p>";
                  content +=
                    "<p id='icon'>" +
                    "<i id='click' class='fa fa-comment-o' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    "<span>" +
                    "<i id='click' class='fa fa-retweet' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    "</span>" +
                    "<span>" +
                    "<i id='click' class='fa fa-heart-o' aria-hidden='true'>" +
                    "</i>" +
                    " " +
                    "</span>" +
                    "</p>";
                  content += "</div>";
                }
              });
              $("#formContainer").append(content);
              firebase
                .firestore()
                .collection("Users")
                .get()
                .then((querryUser) => {
                  querryUser.forEach((userDoc) => {
                    let user = userDoc.data().userName;
                    let userId = userDoc.data().userId;
                  });
                });
              document.getElementById("commentSubmit").onclick = function () {
                let comment = document.getElementById("comment").value;
                let sendComment = firebase
                  .firestore()
                  .collection("Comments")
                  .doc();
                sendComment
                  .set({
                    comments: comment,
                    tweetid: tweetId,
                    commentId: sendComment.id,
                  })
                  .then(() => {
                    window.location.reload();
                  });
              };
            });
        });
      });
  }
  // else {
  //   window.location.href = "login.html";
  // }
});
