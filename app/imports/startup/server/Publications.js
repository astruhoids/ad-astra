import { Meteor } from 'meteor/meteor';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import { UserInformation } from '../../api/userinformation/UserInformation';
import { VaccineInformation } from '../../api/vaccineinformation/VaccineInformation';

Meteor.publish(HealthStatus.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return HealthStatus.collection.find({ user: username });
  }
  return this.ready();
});

Meteor.publish(UserInformation.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInformation.collection.find({ user: username });
  }
  return this.ready();
});

Meteor.publish(VaccineInformation.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return VaccineInformation.collection.find({ user: username });
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
