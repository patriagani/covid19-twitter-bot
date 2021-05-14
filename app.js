const Twit = require('twit')
const config = require('./config.js')
const schedule = require('node-schedule')
const axios = require('axios')

const T = new Twit(config);

const jobIndonesia = schedule.scheduleJob('0 9 * * *', function(){
    axios.get('https://api.kawalcorona.com/indonesia')
        .then((response) => {
            let positif = response.data[0].positif
            let sembuh = response.data[0].sembuh
            let meninggal = response.data[0].meninggal
            let dirawat = response.data[0].dirawat
    
            let tweet = `Update jumlah kasus Covid-19 Indonesia,\n\nTotal Kasus Positif ${positif}\nTotal Kasus Sembuh ${sembuh}\nTotal Meninggal ${meninggal}\nDalam Perawatan ${dirawat}`
    
            return T.post('statuses/update', { status: tweet })
        })
        .then((response) => {
            console.log("Berhasil ngetwit")
        })
        .catch((error) => {
            console.log(error)
        })
  });

  const jobWorld = schedule.scheduleJob('0 8 * * *', function(){
    let positif = ""
    let sembuh = ""
    let meninggal = ""

    axios.get('https://api.kawalcorona.com/positif')
        .then((response) => {
            positif = response.data.value
            return axios.get('https://api.kawalcorona.com/sembuh')
        })
        .then((response) => {
            sembuh = response.data.value
            return axios.get('https://api.kawalcorona.com/meninggal')
        })
        .then((response) => {
            meninggal = response.data.value
        })
        .then((response) => {
    
            let tweet = `Update jumlah kasus Covid-19 Dunia,\n\nTotal Kasus Positif ${positif}\nTotal Kasus Sembuh ${sembuh}\nTotal Meninggal ${meninggal}`
    
            return T.post('statuses/update', { status: tweet })
        })
        .then((response) => {
            console.log("Berhasil ngetwit")
        })
        .catch((error) => {
            console.log(error)
        })
  });