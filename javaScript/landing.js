const D = new Date();
console.log(D.toDateString());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);

    var userEmail = user.email;
    console.log(userEmail);

    firebase
      .firestore()
      .collection("Users")
      .doc(uid)
      .get()
      .then((doc) => {
        let userName = doc.data().userName;
        let userEmail = doc.data().emailAddress;
        document.getElementById("userName").innerText = userName;
        document.getElementById("email").innerText = userEmail;
      });
    
    document.getElementById("send").onclick = function () {
      let tweet = document.getElementById("tweet").value;
      let sendtweet = firebase.firestore().collection('Tweets').doc();
        sendtweet.set({
          tweets: tweet,
          userId: uid,
          tweetId: sendtweet.id,
          todayDate: D.toDateString(),
        })
        .then(() => {
          window.location.reload();
        });
    };
    document.getElementById("signOut").onclick = function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          window.location.href = "/login.html";
        })
        .catch((error) => {
          // An error happened.
        });
    };
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
          .then((querryTweets) => {
            let content = " ";
            
            querryTweets.forEach((tweetDoc) => {
              let tweetUserId = tweetDoc.data().userId;
                let tweet = tweetDoc.data().tweets;
                let tweetid = tweetDoc.data().tweetId;
                let handle = "@" + user;
              c = 1;
              
              if (userId === tweetUserId) {
                content +=
                  '<div class="wehh" id= "wehh" onclick="navigateToTweetPage(\'' +
                  tweetid +
                  "')\" >";
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
                  c +
                  "<span>" +
                  "<i id='click' class='fa fa-retweet' aria-hidden='true'>" +
                  "</i>" +
                  " " +
                  c +
                  "</span>" +
                  "<span>" +
                  "<i id='click' class='fa fa-heart-o' aria-hidden='true'>" +
                  "</i>" +
                  " " +
                  c +
                  "</span>" +
                  "</p>";
                content += "</div>";
              }
                $("#formContainer").append(content);
              });
            });
        });
      });
    
    window.navigateToTweetPage = function (tweetid) {
      console.log(tweetid)

      window.location.href = 'tweet.html' + '?' + tweetid;
    }
  } else {
    window.location.href = "/login.html";
  }
});
