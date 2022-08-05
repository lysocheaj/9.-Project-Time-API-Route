import classes from './comment-list.module.css';

function CommentList() {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>This is good.</p>
        <div>
          By: <address>Sochea</address>
        </div>
      </li>
      <li>
        <p>So bad!</p>
        <div>
          By: <address>Rith</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
