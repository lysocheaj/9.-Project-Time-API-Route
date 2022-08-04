import classes from "./newsletter-registration.module.css";

import { useRef } from "react";

function NewsletterRegistration() {
  const enteredRef = useRef();
  
  function registrationHandler(event) {
    const enteredEmail = enteredRef.current.value;
    event.preventDefault();

    fetch("/api/newletter", {
      method: "POST",
      body: { email: enteredEmail },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
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
    </section>
  );
}

export default NewsletterRegistration;
