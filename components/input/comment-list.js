import { Fragment } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items, eventid } = props;
  // console.log("items", items);

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((comment) => (
        <li key={comment._id}>
          {comment.eventId === eventid && (
            <Fragment>
              <p>{comment.text}</p>
              <div>
                By: <address>{comment.name}</address>
              </div>
            </Fragment>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
