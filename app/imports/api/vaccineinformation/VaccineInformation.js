import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class VaccineInformationCollection {
  constructor() {
    this.name = 'VaccineInformationCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      user: String,
      vaccine: {
        required: true,
        type: String,
        allowedValues: [
          'Moderna',
          'Pfizer',
          'Johnson',
          'AstraZeneca',
          'Sinopharm',
          'Sinovac',
          'Gamelya',
          'CanSinoBio',
          'Vector',
          'ZhifeiLongcom',
          'IMBCAMS',
          'Novavax',
        ],
        defaultValue: 'Moderna',
      },
      firstLot: {
        required: true,
        type: String,
        label: 'LOT Number',
      },
      firstDate: {
        required: true,
        type: Date,
        min: new Date(2019, 11, 1),
        max: new Date(),
        label: 'Date',
      },
      firstLocation: {
        required: true,
        type: String,
        label: 'Healthcare Professional or Clinic Site',
      },
      secondLot: {
        type: String,
        label: 'LOT Number 2',
        optional: true,
      },
      secondDate: {
        type: Date,
        min: new Date(2019, 11, 1),
        max: new Date(),
        label: 'Date 2',
        optional: true,
      },
      secondLocation: {
        type: String,
        label: 'Healthcare Professional or Clinic Site 2',
        optional: true,
      },
      card: {
        type: String,
        required: true,
      },
    }, { tracker: Tracker });

    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const VaccineInformation = new VaccineInformationCollection();
