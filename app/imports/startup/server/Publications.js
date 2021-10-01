import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
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

Meteor.publish(HealthStatus.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return HealthStatus.collection.find();
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

Meteor.publish(UserInformation.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInformation.collection.find();
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

Meteor.publish(VaccineInformation.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return VaccineInformation.collection.find();
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
