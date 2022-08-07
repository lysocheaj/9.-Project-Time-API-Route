import classes from "./newsletter-registration.module.css";
import ErrorAlert from "../ui/error-alert";

import { Fragment, useRef, useState } from "react";

function NewsletterRegistration() {
  const enteredRef = useRef();
  const [signedData, setSignedData] = useState();

  function registrationHandler(event) {
    const enteredEmail = enteredRef.current.value;
    event.preventDefault();

    fetch("/api/newletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSignedData(data));
  }

  return (
    <Fragment>
      <section className={classes.newsletter}>
        <h2>Sign up to stay updated!</h2>
        <form onSubmit={registrationHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              aria-label="Your email"
              ref={enteredRef}
            />
            <button>Register</button>
          </div>
        </form>
        {signedData && <ErrorAlert><p>{signedData.message}</p></ErrorAlert>}
      </section>
    </Fragment>
  );
}

export default NewsletterRegistration;
