import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { HealthStatus } from '../../api/healthstatus/HealthStatus';
import { UserInformation } from '../../api/healthstatus/UserInformation';

Meteor.publish(HealthStatus.userPublicationName, () => {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return HealthStatus.collection.find({ user: username });
  }
  return this.ready();
});

Meteor.publish(HealthStatus.adminPublicationName, () => {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return HealthStatus.collection.find();
  }
  return this.ready();
});

Meteor.publish(UserInformation.userPublicationName, () => {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInformation.collection.find({ user: username });
  }
  return this.ready();
});

Meteor.publish(UserInformation.adminPublicationName, () => {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return UserInformation.collection.find();
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
