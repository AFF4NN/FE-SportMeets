import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://be-sportmeets-py.onrender.com/api/sportmeets",
});

export function getAllEvents(queries) {
  const { params } = queries;
  if (params.category === "select" && params.location === "select") {
    return baseApi.get("/events").then(({ data }) => {
      return data.events;
    });
  } else {
    return baseApi.get("/events", queries).then(({ data }) => {
      return data.events;
    });
  }
}

export function getUser(username) {
  return baseApi
    .get(`/users/${username}`)
    .then(({ data }) => {
      return data["user"][0];
    })
    .catch((err) => {
      return err;
    });
}

export function getEventByOrganiser(username) {
  return baseApi
    .get(`/events`, {
      params: {
        organiser: username,
      },
    })
    .then(({ data }) => {
      return data.events;
    })
    .catch((err) => {
      return err;
    });
}

export function postUser(newUser) {
  return baseApi
    .post("/users", newUser)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

export function postEvent(newEvent) {
  return baseApi
    .post("/events", newEvent)
    .then((data) => {
      return data
    })
    .catch((err) => {
      return err;
    });
}

export function updateSpacesAvailable(event) {
  const eventID = event.event_id;
  const eventBody = {
    ...event,
    event_spaces_available: event.event_spaces_available - 1,
  };
  delete eventBody.event_id;
  return baseApi.patch(`/events/${eventID}`, eventBody).then(({ data }) => {
    return data.UpdatedEvent;
  });
}

export function deleteEvent(event_id) {
  return baseApi
    .delete(`/events/${event_id}`)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

export function joinEvent(userevent) {
  return baseApi
    .post(`/join-event`, userevent)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

export function getUserEvents() {
  return baseApi.get("/userevents").then(({ data }) => {
    return data["UserEvents"];
  });
}

export function getUserEventsByID(event_id) {
  return baseApi.get(`/userevents/${event_id}`).then(({ data }) => {
    return data["UserEvents"];
  });
}

export function getAllUsers() {
  return baseApi.get("/users").then(({ data }) => {
    return data["users"];
  });
}

export function getEventsByUsername(username) {
  return baseApi
    .get(`/user-events/${username}`)
    .then(({ data }) => {
      return data["UserEvents"];
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getEventMessages(event_id) {
  return baseApi
    .get(`/messages/${event_id}`)
    .then(({ data }) => {
      const { messages } = data;
      return messages.map((message) => {
        return {
          ...message,
          created_at: new Date(message.created_at).toLocaleString(),
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllCategories() {
  return baseApi.get(`/categories`).then(({ data }) => {
    return data.Event_Categories;
  })
  .catch((err) => {
    console.log(err);
  })
}

export function getEventLocations() {
  return baseApi.get("/locations").then(({data}) => {
    return data["Event_Locations"]
  })
}

export function getEventCategories() {
  return baseApi.get("/categories").then(({data}) => {
    return data["Event_Categories"]
  })
}