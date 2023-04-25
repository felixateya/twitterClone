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
                $("#formContainer").append(content);
              });
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
                      .collection("Comments")
                      .get()
                      .then((querryComments) => {
                        let content = " ";
                        querryComments.forEach((commentDoc) => {
                          let comment = commentDoc.data().comments;
                          let commentUserId = commentDoc.data().userId;
                          let commentid = commentDoc.data().commentId;
                          let handle = "@" + user;

                          if (userId == commentUserId) {
                            content += '<div class="comment>';
                            content +=
                              "<p>" +
                              "<img id='image' src= '/images/profile.jpg' alt=''>" +
                              user +
                              " " +
                              "<span id= 'handle' >" +
                              handle +
                              "</span>" +
                              "</p>";
                            content += "<p id='post'>" + comment + "</p>";
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
                          $("#commentContainer").append(content);
                        });
                      });
                  });
                });
            });
        });
      });
    document.getElementById("commentSubmit").onclick = function () {
      let comment = document.getElementById("comment").value;
      let sendcomment = firebase.firestore().collection("Comments").doc();
      let uid = user.uid;
      sendcomment
        .set({
          comments: comment,
          userId: uid,
          commentId: sendcomment.id,
        })
        .then(() => {
          window.location.reload();
        });
    };
  }
  // else {
  //   window.location.href = "login.html";
  // }
});
