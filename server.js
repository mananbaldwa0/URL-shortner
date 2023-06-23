const express= require('express')
const mongoose=require('mongoose')
const ShortUrl=require('./models/shorturl')
mongoose.connect('mongodb://127.0.0.1/urlshortner',{
    useNewUrlParser: true, useUnifiedTopology: true
})
const app=express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',async (req,res)=>{
    const shortUrls= await ShortUrl.find()
    res.render('index',{shortUrls:shortUrls })
})

app.post('/shortUrls',async (req,res)=>{
 await ShortUrl.create({full:req.body.fullurl})
 res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })

app.listen(process.env.PORT||27017);