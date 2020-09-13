const express = require('express');
const axios = require('axios');
const matches = require('./data.json');
const cors = require('cors');
const facts = require('./facts.json');

const app = express();
app.use(cors());
app.use(express.static('build'));

const itContains = (key, obj) =>{
  if(obj[key]){
    obj[key]++;
  }
  else{
    obj[key] = 1;
  }
}

let years = {};

app.get('/years', (req, res) =>{
  if(Object.keys(years).length > 0){
    res.json(years);
  }
  else{
    matches.map(({season}) =>{
      itContains(season, years);
    })
    res.json(years);
  }
})

let tieMatches;
let tieYears = {};
app.get('/api/tie', (req, res) =>{
  if(Object.keys(tieYears).length > 0){
    return res.json(tieYears);
  }
  tieMatches = matches.filter( match => {
    if(match.result === 'tie'){
      return true;
    }
  })
  tieMatches.map(({season}) =>{
    itContains(season, tieYears);
  })
  res.json(tieYears);
})

let stadium = {};
app.get('/api/venue', (req, res) =>{
  if(Object.keys(stadium).length > 0){
    return res.json(stadium);
  }
  matches.map(({venue}) =>{
    itContains(venue, stadium);
  })
  res.json(stadium);
})

let manOfMatch = {};
app.get('/api/manofmatch', (req, res) =>{
  if(Object.keys(manOfMatch).length > 0){
    return res.json(manOfMatch);
  }
  matches.map(({player_of_match}) =>{
    itContains(player_of_match, manOfMatch);
  })
  res.json(manOfMatch);
})

let interruptedMatches = [];
app.get('/api/interruption', (req, res) =>{
  if(interruptedMatches.length > 0){
    return res.json(interruptedMatches);
  }
  matches.map(match =>{
    if(match.dl_applied === "1"){
      interruptedMatches.push(match);
    }
  })
  res.json(interruptedMatches);
})

let totalWins = {};
app.get('/api/winners', (req, res) =>{
  if(Object.keys(totalWins).length > 0){
    return res.json(totalWins);
  }
  matches.map( match =>{
    let winner = match.winner;
    if(winner === ""){
      winner = "No Result";
    }
    if(match.result !== "tie"){
      itContains(winner, totalWins);
    }
  })
  res.json(totalWins);
})

let cities = {};
app.get('/api/cities', (req, res) =>{
  if(Object.keys(cities).length > 0){
    return res.json(cities);
  }
  matches.map(({city}) =>{
    itContains(city, cities);
  })
  res.json(cities);
})

app.get('/api/facts', (req, res) =>{
  res.json(facts);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
  console.log(`Server running at ${PORT}`);
})
