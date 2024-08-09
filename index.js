import express, { query } from "express";
import axios from "axios";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const auth_key = "45305918-8389ed0e887031a171492320f";
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname+'/public'))
app.get('/',async(req,res)=>{

    var img = req.query.searchbar;
    if(img){
        try{
            var response = await axios.get(`https://pixabay.com/api/?key=${auth_key}&q=${img}`);
            const hits = response.data.hits;
            if(hits.length>0){
                console.log(response.data.hits[Math.floor(Math.random()*response.data.hits.length)]);
                res.render("index.ejs",{ data :hits[Math.floor(Math.random()*response.data.hits.length)].largeImageURL});
            }else{
                res.render("index.ejs",{error : "No such images found"});
            }
            
            
        }catch(err){
            res.render("index.ejs",{error : err});
        }
    }else{
        res.render("index.ejs");
    }
})
app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
})