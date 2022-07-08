const fs = require("fs");

var filein = process.argv[2];

let fc = fs.readFileSync(filein);

fc = fc.toString();
fc = fc.replace(/\r?\n?\d*\r?\n\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\r?\n/g, "----");
let fcs = fc.split("----");
let nfc = [];
for(let fcl of fcs){
    nfc.push(fcl.replace(/\r?\n/g, "\\n"));
}
console.log(nfc)

var file = fs.createWriteStream(filein.replace(".srt", "")+'.txt');
file.on('error', function(err) { /* error handling */ });

for(var nfl of nfc){
    file.write(nfl+"\n");
}
file.end();
console.log("done");

setTimeout(() => {

    let fwd = fs.readFileSync(filein.replace(".srt", "")+'.txt').toString();
    fwd = fwd.replace(/\\n\r?\n/g, "\n");
    fs.writeFileSync(filein.replace(".srt", "")+'.txt', fwd)
}, 2000)