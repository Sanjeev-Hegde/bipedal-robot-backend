import * as config from './bipedal-robot-db.datasource.config.json';
var DataSource = require('loopback-datasource-juggler').DataSource;
var mysqlDs = new DataSource('mssql', config);

var Servo = app.models.Servo;
var ServoType = app.models.ServoType;
mysqlDs.autoupdate(Servo, function (err) {
  if (err) throw err;
  console.log('\nAutoupdated table `Servo`.');
});

mysqlDs.autoupdate(ServoType, function (err) {
  if (err) throw err;
  console.log('\nAutoupdated table `ServoType`.');
});
