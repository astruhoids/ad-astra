import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { HealthStatus } from '../../api/healthstatus/HealthStatus.js'
import { UserInformation } from '../../api/userinformation/UserInformation.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addCheckIn(data) {
  console.log(`\tRecording health check-in at ${data.date} for ${data.user}`);
  HealthStatus.collection.insert(data);
}

function addUserInfo(data) {
  console.log(`\tAdd UserInformation for ${data.user}`);
  UserInformation.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
