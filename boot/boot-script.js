module.exports = function (app) {
  var mysqlDs = app.dataSources.mysqlDS;
  var Servo = app.models.Servo;

  mysqlDs.autoupdate('Servo', function (err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Servo`.');
  });
};
