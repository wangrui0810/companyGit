#!/usr/bin/env node
var pg = require('pg');
var shell = require('shelljs');
var sendMail = require('./sendMail.js')

/*
my $SCRIPT=`basename $0`;
chomp $SCRIPT;
*/

var tmpmonth = shell.exec('date +%m').output;
tmpmonth = tmpmonth.substring(0, tmpmonth.length -1);
var tmpday = shell.exec('date +%d').output;
tmpday = tmpday.substring(0, tmpday.length -1);
var today = shell.exec('date +%m%d').output;
today = today.substring(0, today.length -1);
var nextmonth = shell.exec('date +%m --date next-month').output;
nextmonth = nextmonth.substring(0, nextmonth.length -1);




var conString = "postgres://postgres:xxxxx@192.168.150.27/custom_server";


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
						for(var i in result.rows)
							allBirthday += JSON.stringify(result.rows[i]) + "<br/>"  ;


						console.log(allBirthday);
						sendMail.timedSend(allBirthday);

						/*
						if(allBirthday)
						{
							var mycmd = '/home/wr/workspace/nodejs/hello.js ' + allBirthday;
							shell.exec(mycmd);
							console.log("sending mail.....");
						}
						*/


					});
});
 
