var later = require('later');
later.date.localTime();

console.log("Now:"+new Date());
//所定的时间就是 每个13号的16:33打印当时的时间
var composite = [
	{h:[16], m:[33], D:[13]}
];
var sched = {
	schedules:composite
};


var t = later.setInterval(function() {
			test(5);
			}, sched);

function test(val) {
	console.log(new Date());
	console.log(val);
}
