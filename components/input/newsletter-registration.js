import classes from "./newsletter-registration.module.css";
// import ErrorAlert from "../ui/error-alert";
import NotificationContext from "../../store/notification-context";

import { Fragment, useContext, useRef, useState } from "react";
// import { useAmp } from "next/amp";

function NewsletterRegistration() {
  const enteredRef = useRef();
  // const [signedData, setSignedData] = useState();
  const notifiacationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    const enteredEmail = enteredRef.current.value;
    notifiacationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    event.preventDefault();

    fetch("/api/newletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notifiacationCtx.showNotification({
          title: "Success!",
          message: "Registered successfully for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notifiacationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
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
      {/* {signedData && (
          <ErrorAlert>
            <p>{signedData.message}</p>
          </ErrorAlert>
        )} */}
    </section>
  );
}

export default NewsletterRegistration;
