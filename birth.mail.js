#!/usr/bin/env node
var pg = require('pg');
var shell = require('shelljs');
var sendMail = require('./sendMail.js');
var _ = require('underscore')

var tmpmonth = shell.exec('date +%m').output;
tmpmonth = tmpmonth.substring(0, tmpmonth.length -1);
var tmpday = shell.exec('date +%d').output;
tmpday = tmpday.substring(0, tmpday.length -1);
var today = shell.exec('date +%m%d').output;
today = today.substring(0, today.length -1);
var nextmonth = shell.exec('date +%m --date next-month').output;
nextmonth = nextmonth.substring(0, nextmonth.length -1);




var conString = "postgres://postgres:xxxxx@xxxxxx/custom_server";


var argv1 = nextmonth + ".0";
var argv2 = nextmonth + ".9";
var allBirthday = "";
var updateCash = "select custom_name,birthday,telnum,email  FROM custom_info  WHERE birthday > $1 and birthday < $2;";
pg.connect(conString, function(err, client, done) {
			if(err) {
			throw err;
			}
			
			client.query(updateCash,
					[argv1, argv2], 
					function(err, result) {
						done();
						if(err) {
						console.log(err);
						throw err;
						}
						var compiled = _.template("<%=custom_name%>\t<%=birthday%>\t<%=telnum%>\t<%=email%>");
						for(var i in result.rows) {
							var a = compiled({
								custom_name: result.rows[i].custom_name,
								birthday: result.rows[i].birthday,
								telnum: result.rows[i].telnum,
								email: result.rows[i].email
							});
							allBirthday += a + "<br/>";
						}
						console.log(allBirthday);
						sendMail.timedSend(allBirthday);
					});
});
 
