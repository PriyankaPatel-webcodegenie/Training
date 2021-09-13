var os = require('os');
console.log("HostName"+os.hostname());
console.log('endianness : ' + os.endianness());
console.log('type : ' + os.type());
console.log('total memory : ' + os.totalmem() + " bytes.");
console.log('free memory : ' + os.freemem() + " bytes.");
console.log("os.loadavg(): \n",os.loadavg())
console.log("os.uptime(): \n",os.uptime());