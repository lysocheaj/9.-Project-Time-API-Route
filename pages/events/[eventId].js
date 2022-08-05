import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from '../../components/input/comments';
import Head from 'next/head';


function EventDetailPage(props) {
  const event = props.events;

  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading....</p>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <Fragment>
        <Head>
          <title>{event.title}</title>
          <meta
            name="description"
            content={event.description}
          />
        </Head>

        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
        <Comments eventId={event.id} />
      </Fragment>
    </div>
  );
}

export async function getStaticProps(constext) {
  const eventId = constext.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { events: event },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  try {
    var event = await getFeaturedEvents();
    var paths = event.map((event) => ({ params: { eventId: event.id } }));
  } catch (error) {
    error.message;
  }

  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
