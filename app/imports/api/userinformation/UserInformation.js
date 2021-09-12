import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class UserInformationCollection {
  constructor() {
    // The name of this collection.
    this.name = 'UserInformationCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      user: String,
      cleared: Boolean,
      status: {
        type: String,
        allowedValues: [
            'UH Manoa', 
            'UH Hilo',
            'UH West Oahu',
            'Leeward Community College', 
            'Kapiolani Community College',
            'Hawaii Community College', 
            'Honolulu Community College',
            'Kauai Community College', 
            'Maui Community College',
            'Windward Community College',
            'UH System',
            'RCUH Core Staff (non-UH Project)',
            'East-West Center', 
        ],
        defaultValue: 'UH Manoa',
      },
      affiliation: Boolean,
      housing: Boolean,
      online: Boolean,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const UserInformation = new UserInformationCollection();
