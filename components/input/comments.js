import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NoticationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const noficationCtx = useContext(NoticationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [isFetchingCom, setIsFetchingCom] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  // show comments when it is available
  useEffect(() => {
    if (showComments) {
      setIsFetchingCom(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingCom(false);
        });
    }
  }, [showComments]);

  function addCommentHandler(commentData) {
    noficationCtx.showNotification({
      title: "Comment",
      message: "Adding new comment...",
      status: "pending",
    });

    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        // y not work in this catch error block?
        // return response.json().then(err => {
        //   throw new Error(err.message || 'Something went wrong!')
        // })
      })
      .then((data) => {
        noficationCtx.showNotification({
          title: "New comment",
          message: "Adding new comment successfully.",
          status: "success",
        });
      })
      .catch((err) => {
        noficationCtx.showNotification({
          title: "Error",
          message: err.message || "Adding new comment failed.",
          status: "error",
        });
      });
  }

  // if (comments) console.log('comments', comments);
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingCom && <p>Loading...</p>}
      {showComments && !isFetchingCom && (
        <CommentList items={comments} eventid={eventId} />
      )}
    </section>
  );
}

export default Comments;
