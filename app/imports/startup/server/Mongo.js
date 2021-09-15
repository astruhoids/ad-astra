import { Meteor } from 'meteor/meteor';
import { HealthStatus } from '../../api/healthstatus/HealthStatus.js';
import { UserInformation } from '../../api/userinformation/UserInformation.js';

function addCheckIn(data) {
  console.log(`\tRecording health check-in at ${data.date} for ${data.user}`);
  HealthStatus.collection.insert(data);
}

function addUserInfo(data) {
  console.log(`\tAdd UserInformation for ${data.user}`);
  UserInformation.collection.insert(data);
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
