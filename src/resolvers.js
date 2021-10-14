const data = require("./db.json");

const { v4: uuidv4 } = require("uuid");

module.exports.resolvers = {
  Query: {
    apps: () => data.apps,
    stages: () => data.stages,
    events: () => data.events,
    stage(_, args) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    app(_, args) {
      return data.apps.find((app) => app.id === args.id);
    },
    event(_, args) {
      return data.events.find((event) => event.id === args.id);
    },
    stageViaName(_, args) {
      return data.stages.find((stage) => stage.name === args.name);
    },
    eventViaName(_, args) {
      return data.events.find((event) => event.name === args.name);
    },
    allEventsViaStage(_, args) {
      return data.events.filter((event) => event.stageId === args.id);
    },
    stageViaEvent(_, args) {
      return data.stages.find((stage) => stage.id === args.id);
    },
    eventsViaTime(_, args) {
      return data.events.filter(
        (event) =>
          event.startsAt >= parseInt(args.startsAt) &&
          event.endsAt <= parseInt(args.endsAt)
      );
    },
  },
  Mutation: {
    addStage(_, args) {
      let newStage = { id: uuidv4(), name: args.name };
      data.stages.push(newStage);
      return data.stages;
    },
    addEvent(_, args) {
      let newEvent = {
        id: uuidv4(),
        appId: uuidv4(),
        stageId: uuidv4(),
        name: args.name,
        description: args.description,
        image: args.image,
        startsAt: args.startsAt,
        endsAt: args.endsAt,
      };
      data.events.push(newEvent);
      return data.events;
    },

    updateStage(_, args) {
      let foundStage = data.stages.find((stage) => stage.id === args.id);
      foundStage.name = args.name;
      return foundStage;
    },

    updateEvent(_, args) {
      let foundEvent = data.events.find((event) => event.id === args.id);
      if (args.appId) {
        foundEvent.appId = args.appId;
      }
      if (args.stageId) {
        foundEvent.stageId = args.stageId;
      }
      if (args.name) {
        foundEvent.name = args.name;
      }
      if (args.description) {
        foundEvent.description = args.description;
      }
      if (args.image) {
        foundEvent.image = args.image;
      }
      if (args.startsAt) {
        foundEvent.startsAt = args.startsAt;
      }
      if (args.endsAt) {
        foundEvent.endsAt = args.endsAt;
      }
      return foundEvent;
    },

    deleteStage(_, args) {
      let foundStage = data.stages.findIndex((stage) => stage.id === args.id);
      if (foundStage > -1) {
        const element = data.stages.splice(foundStage, 1)[0];
        return data.stages;
      }
    },
    deleteEvent(_, args) {
      let foundEvent = data.events.findIndex((event) => event.id === args.id);
      if (foundEvent > -1) {
        const element = data.events.splice(foundEvent, 1)[0];
        return data.events;
      }
    },
  },
};
