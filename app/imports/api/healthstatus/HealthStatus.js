import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class HealthStatusCollection {
  constructor() {
    // The name of this collection.
    this.name = 'HealthStatusCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      user: String,
      cleared: Boolean,
      status: {
        type: String,
        allowedValues: ['crewmate', 'sus', 'imposter'],
        defaultValue: 'sus',
      },
      date: {
        type: Date,
        defaultValue: new Date()
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const HealthStatus = new HealthStatusCollection();
