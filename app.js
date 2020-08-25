const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data ={
        members: [{

    
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName
            }

        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/2e80b1ce38";

    const options = {
        method:"POST",
        auth:"sudubaby:f3a58ac28b9c587a9fbc0350f81409b6-us17"
    }



    const request = https.request(url, options, function(response){
        
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();


});


app.post("/failure",function(req,res){
    res.redirect("/");
})






app.listen(process.env.PORT || 3000,function(){
    console.log("server 3000 is up and running:")
});




// api-key
// f3a58ac28b9c587a9fbc0350f81409b6-us17


// list-id 
// 2e80b1ce38