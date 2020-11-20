 const http= require('http');
 const fs= require('fs');
 var requests= require('requests');
 const p= fs.readFileSync("home.html", "utf-8");
 const giveval = (a, b)=>{
     let temp1= a.replace("{%temp%}", b.main.temp);
     temp1= temp1.replace("{%temp_min%}", b.main.temp_min);
     temp1= temp1.replace("{%temp_max%}", b.main.temp_max);
     temp1= temp1.replace("{%city%}", b.name);
     temp1= temp1.replace("{%country%}", b.sys.country);
     return temp1;
 }
 const server= http.createServer((req, res)=>{
     if(req.url=="/"){
        requests("http://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=7f1c00d1ddbacaf37acc52f377913767")
        .on("data", (chunk) =>{
            const q= JSON.parse(chunk);
            //to parse in correct manner.
            const ar= [q];
            //console.log(ar[0].main.temp);
            const r= ar.map((val) => giveval(p, val)).join(" ");
            res.write(r);
        })
        .on("end", (err) => {
        if (err) return console.log('connection closed due to errors', err);
        res.end();
        });
     }
 });
 server.listen(8000, "127.0.0.1");
 //so this request kept on printing the available data until no data is left..