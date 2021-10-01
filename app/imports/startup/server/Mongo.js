import { Meteor } from 'meteor/meteor';
import { HealthStatus } from '../../api/healthstatus/HealthStatus.js';
import { UserInformation } from '../../api/userinformation/UserInformation.js';
import { VaccineInformation } from '../../api/vaccineInformation/VaccineInformation';

function addCheckIn(data) {
  console.log(`\tRecording health check-in at ${data.date} for ${data.user}`);
  HealthStatus.collection.insert(data);
}

function addUserInfo(data) {
  console.log(`\tAdd UserInformation for ${data.user}`);
  UserInformation.collection.insert(data);
}

function addVaccineInfo(data) {
  console.log(`\tAdd Vaccine Information for ${data.user}`);
  VaccineInformation.collection.insert(data);
}

if (HealthStatus.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addCheckIn(data));
  }
}

if (UserInformation.collection.find().count() === 0) {
  if (Meteor.settings.defaultUserData) {
    console.log('Creating default user data.');
    Meteor.settings.defaultUserData.map(data => addUserInfo(data));
  }
}

if (VaccineInformation.collection.find().count() === 0) {
  if (Meteor.settings.defaultVaccineData) {
    console.log('Creating default user data.');
    Meteor.settings.defaultVaccineData.map(data => addVaccineInfo(data));
  }
}
