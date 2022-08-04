import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";
import Head from 'next/head';

function AllEventsPage(props) {
  // const events = props.events;
  const { events } = props;
  const router = useRouter();

  function eventsSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Fragment>  
        <Head>
          <title>All Events</title>
          <meta
            name="description"
            content="This is the event for everyone can join."
          />
        </Head>
        <EventsSearch onSearch={eventsSearchHandler} />
        <EventList items={events} />
      </Fragment>
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
  };
}

export default AllEventsPage;
