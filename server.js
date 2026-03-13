const express=require('express'),http=require('http'),{Server}=require('socket.io'),path=require('path');
const app=express(),server=http.createServer(app);
const io=new Server(server,{cors:{origin:'*'},transports:['websocket','polling'],pingTimeout:60000,pingInterval:25000});

// Static files with cache
app.use(express.static(path.join(__dirname,'public'),{
  maxAge:'7d',
  etag:true,
  lastModified:true,
  setHeaders:(res,fp)=>{
    if(fp.match(/\.(png|mp3|wav|ttf|woff)$/))res.setHeader('Cache-Control','public, max-age=2592000, immutable');
    else if(fp.match(/\.(js|css|json)$/))res.setHeader('Cache-Control','public, max-age=86400');
    else if(fp.match(/\.html$/))res.setHeader('Cache-Control','no-cache');
  }
}));

app.get('/health',(req,res)=>res.send('ok'));

const TEAM={'Bryan':{pokemon:'Lucario',pokeId:448,color:'#5B8FE8',sprite:'ash'},'Jérémy':{pokemon:'Dialga',pokeId:483,color:'#4A6FA5',sprite:'b'},'Louis':{pokemon:'Salamèche',pokeId:4,color:'#FF6B35',sprite:'c'},'Thomas':{pokemon:'Malvalame',pokeId:937,color:'#8B2FC9',sprite:'d'},'Dylan':{pokemon:'Dracaufeu',pokeId:6,color:'#E85D2C',sprite:'e'},'Martin':{pokemon:'Léviator',pokeId:130,color:'#2980B9',sprite:'f'},'Lucas':{pokemon:'Tortipouss',pokeId:387,color:'#27AE60',sprite:'g'}};
const ZONES=[{id:'kanto'},{id:'johto'},{id:'hoenn'},{id:'league'}];

const S={players:{},cards:[],votes:{},phase:'free',
  openArenas:{kanto:false,johto:false,hoenn:false,league:false},
  badges:{},battles:{},playerHp:{},catches:{},pvpWins:{}};

function fSid(name){return Object.keys(S.players).find(s=>S.players[s].name===name);}
function updBadges(n){if(!S.badges[n])S.badges[n]={};['kanto','johto','hoenn','league'].forEach(z=>{if(S.cards.some(c=>c.zone===z&&c.author===n))S.badges[n][z]=true;});if(['kanto','johto','hoenn','league'].every(z=>S.badges[n][z])&&!S.badges[n].master){S.badges[n].master=true;io.emit('badge:master',{player:n});}io.emit('badges:update',S.badges);}

io.on('connection',socket=>{
  socket.on('join',({name,isAdmin})=>{
    const td=TEAM[name];if(!td)return;
    const p={id:socket.id,name,...td,isAdmin:!!isAdmin,x:19,y:26,dir:'down'};
    S.players[socket.id]=p;
    if(!S.playerHp[name])S.playerHp[name]=-1;
    if(!S.catches[name])S.catches[name]=[];
    if(!S.pvpWins[name])S.pvpWins[name]=0;
    socket.emit('joined',{you:p,players:S.players,cards:S.cards,votes:S.votes,phase:S.phase,openArenas:S.openArenas,badges:S.badges,hp:S.playerHp[name],catches:S.catches[name],pvpWins:S.pvpWins,allCatches:S.catches});
    socket.broadcast.emit('player:joined',p);
  });

  socket.on('move',({x,y,dir})=>{const p=S.players[socket.id];if(!p)return;p.x=x;p.y=y;p.dir=dir;socket.broadcast.emit('player:moved',{id:socket.id,x,y,dir});});
  socket.on('card:add',({zone,text})=>{const p=S.players[socket.id];if(!p||!text.trim())return;S.cards.push({id:`c${Date.now()}`,zone,author:p.name,text:text.trim(),time:Date.now()});io.emit('cards:update',S.cards);updBadges(p.name);});
  socket.on('vote:submit',({ranking})=>{const p=S.players[socket.id];if(!p)return;S.votes[p.name]=ranking;io.emit('votes:update',S.votes);});
  socket.on('admin:arena',({zone,open})=>{const p=S.players[socket.id];if(!p||!p.isAdmin)return;S.openArenas[zone]=open;io.emit('arenas:update',S.openArenas);});
  socket.on('admin:phase',({phase})=>{const p=S.players[socket.id];if(!p||!p.isAdmin)return;S.phase=phase;io.emit('phase:change',{phase});});
  socket.on('admin:teleport',({zone})=>{const p=S.players[socket.id];if(!p||!p.isAdmin)return;io.emit('teleport',{zone});});
  socket.on('admin:reset',()=>{const p=S.players[socket.id];if(!p||!p.isAdmin)return;S.cards=[];S.votes={};S.badges={};S.openArenas={kanto:false,johto:false,hoenn:false,league:false};S.catches={};S.pvpWins={};io.emit('reset');});

  socket.on('heal',()=>{const p=S.players[socket.id];if(!p)return;S.playerHp[p.name]=-1;socket.emit('healed');});
  socket.on('saveHp',({hp})=>{const p=S.players[socket.id];if(!p)return;S.playerHp[p.name]=hp;});

  // Catch tracking
  socket.on('pokemon:caught',({pokeId})=>{
    const p=S.players[socket.id];if(!p)return;
    if(!S.catches[p.name])S.catches[p.name]=[];
    if(!S.catches[p.name].includes(pokeId))S.catches[p.name].push(pokeId);
    io.emit('catches:update',{name:p.name,catches:S.catches[p.name],allCatches:S.catches});
  });

  // PvP
  socket.on('battle:challenge',({target})=>{const p=S.players[socket.id];if(!p)return;const tid=fSid(target);if(!tid)return;io.to(tid).emit('battle:challenged',{from:p.name,fromId:socket.id});});
  socket.on('battle:accept',({challengerId})=>{
    const me=S.players[socket.id],opp=S.players[challengerId];if(!me||!opp)return;
    const bid=`pvp_${Date.now()}`;
    S.battles[bid]={p1id:challengerId,p2id:socket.id,p1name:opp.name,p2name:me.name,p1pokeId:opp.pokeId,p2pokeId:me.pokeId,p1move:null,p2move:null};
    io.to(challengerId).emit('battle:start',{battleId:bid,opp:me.name,oppPokeId:me.pokeId,side:'p1'});
    io.to(socket.id).emit('battle:start',{battleId:bid,opp:opp.name,oppPokeId:opp.pokeId,side:'p2'});
  });
  socket.on('battle:decline',({challengerId})=>{io.to(challengerId).emit('battle:declined',{by:S.players[socket.id]?.name||'?'});});
  socket.on('battle:move',({battleId,moveIdx})=>{
    const b=S.battles[battleId];if(!b)return;
    if(socket.id===b.p1id)b.p1move=moveIdx;else if(socket.id===b.p2id)b.p2move=moveIdx;else return;
    if(b.p1move===null||b.p2move===null)return;
    io.to(b.p1id).emit('battle:resolve',{battleId,p1move:b.p1move,p2move:b.p2move});
    io.to(b.p2id).emit('battle:resolve',{battleId,p1move:b.p1move,p2move:b.p2move});
    b.p1move=null;b.p2move=null;
  });
  // Battle end: notify BOTH players
  socket.on('battle:end',({battleId,winner})=>{
    const b=S.battles[battleId];if(!b)return;
    if(winner){
      if(!S.pvpWins[winner])S.pvpWins[winner]=0;
      S.pvpWins[winner]++;
      io.emit('pvp:update',S.pvpWins);
    }
    // Notify both players to exit battle
    io.to(b.p1id).emit('battle:finished',{battleId,winner});
    io.to(b.p2id).emit('battle:finished',{battleId,winner});
    delete S.battles[battleId];
  });

  socket.on('disconnect',()=>{
    const p=S.players[socket.id];if(!p)return;
    Object.entries(S.battles).forEach(([bid,b])=>{
      if(b.p1id===socket.id||b.p2id===socket.id){
        const oid=b.p1id===socket.id?b.p2id:b.p1id;
        io.to(oid).emit('battle:finished',{battleId:bid,winner:null,reason:`${p.name} déconnecté`});
        delete S.battles[bid];
      }
    });
    delete S.players[socket.id];io.emit('player:left',{id:socket.id});
  });
});

server.listen(process.env.PORT||3000,'0.0.0.0',()=>{console.log(`\n🎮 Rétro Sprint Pokémon — http://localhost:${process.env.PORT||3000}\n`);});
