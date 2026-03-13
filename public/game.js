(function(){
'use strict';
const SP=id=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const SPB=id=>`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
const BALL=['/assets/battle/ball-open-1.png','/assets/battle/ball-open-2.png','/assets/battle/ball-open-3.png','/assets/battle/ball-open-4.png','/assets/battle/ball-open-5.png'];
const BALL_IDLE='/assets/battle/ball-idle.png',BALL_L='/assets/battle/ball-left.png',BALL_R='/assets/battle/ball-right.png';
const TILE=16,SC=2.5,TS=TILE*SC,MW=40,MH=36,MMS=140;
const TEAM=[
  {name:'Bryan',pokemon:'Lucario',pokeId:448,color:'#5B8FE8',sprite:'ash'},
  {name:'Jérémy',pokemon:'Dialga',pokeId:483,color:'#4A6FA5',sprite:'b'},
  {name:'Louis',pokemon:'Salamèche',pokeId:4,color:'#FF6B35',sprite:'c'},
  {name:'Thomas',pokemon:'Malvalame',pokeId:937,color:'#8B2FC9',sprite:'d'},
  {name:'Dylan',pokemon:'Dracaufeu',pokeId:6,color:'#E85D2C',sprite:'e'},
  {name:'Martin',pokemon:'Léviator',pokeId:130,color:'#2980B9',sprite:'f'},
  {name:'Lucas',pokemon:'Tortipouss',pokeId:387,color:'#27AE60',sprite:'g'}];
const ZONES=[
  {id:'kanto',name:'Arène Kanto',icon:'⚡',color:'#FFD93D',prompt:"Super efficace ce sprint ?"},
  {id:'johto',name:'Arène Johto',icon:'🌑',color:'#8E44AD',prompt:"Qu'est-ce qui n'a pas marché ?"},
  {id:'hoenn',name:'Arène Hoenn',icon:'✨',color:'#E74C3C',prompt:'Imprévus ou partages ?'},
  {id:'league',name:'Ligue Pokémon',icon:'🏆',color:'#2ECC71',prompt:'Actions sprint ?'}];
const TC={Normal:'#a8a878',Feu:'#f08030',Eau:'#6890f0',Plante:'#78c850','Électrik':'#f8d030',Glace:'#98d8d8',Combat:'#c03028',Poison:'#a040a0',Sol:'#e0c068',Vol:'#a890f0',Psy:'#f85888',Insecte:'#a8b820',Roche:'#b8a038',Spectre:'#705898',Dragon:'#7038f8','Ténèbres':'#705848',Acier:'#b8b8d0','Fée':'#ee99ac'};
// Walls
const WR={"0":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"1":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"2":[0,1,2,3,10,17,23,35,36,37,38,39],"3":[0,1,2,3,10,17,23,24,25,26,27,35,36,37,38,39],"4":[0,1,2,3,10,16,17,19,23,26,35,36,37,38,39],"5":[0,1,2,3,10,17,18,20,21,22,23,26,27,35,36,37,38,39],"6":[0,1,2,3,10,14,17,27,35,36,37,38,39],"7":[0,1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,39],"8":[0,1,2,3,35,36,37,38,39],"9":[0,1,2,3,15,35,36,37,38,39],"10":[0,1,2,3,34,35,36,37,38,39],"11":[0,1,2,3,34,35,36,37,38,39],"12":[0,1,2,3,28,29,30,31,34,35,36,37,38,39],"13":[0,1,2,3,28,30,31,34,35,36,37,38,39],"14":[0,1,2,3,12,13,14,15,16,17,22,23,24,25,34,35,36,37,38,39],"15":[0,1,2,3,12,13,14,15,16,17,22,23,24,25,34,35,36,37,38,39],"16":[0,1,2,3,12,13,14,15,16,17,22,23,24,25,35,36,37,38,39],"17":[0,1,2,3,11,12,13,14,15,17,22,24,25,36,37,38,39],"18":[0,1,2,3,18,36,37,38,39],"19":[0,1,2,3,18,33,36,37,38,39],"20":[0,1,2,3,18,34,35,36,37,38,39],"21":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,34,35,36,37,38,39],"22":[0,1,2,3,12,13,14,15,34,35,36,37,38,39],"23":[0,1,2,3,12,13,14,15,22,23,24,25,26,27,28,29,34,35,36,37,38,39],"24":[0,1,2,3,12,13,14,15,21,30,34,35,36,37,38,39],"25":[0,1,2,3,12,14,15,21,30,34,35,36,37,38,39],"26":[0,1,2,3,21,30,35,36,37,38,39],"27":[0,1,2,3,21,30,35,36,37,38,39],"28":[0,1,2,3,6,7,8,9,21,30,35,36,37,38,39],"29":[0,1,2,3,6,8,9,19,21,22,23,24,26,27,28,29,30,35,36,37,38,39],"30":[0,1,2,3,35,36,37,38,39],"31":[0,1,2,3,35,36,37,38,39],"32":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"33":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"34":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"35":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]};
const DOORS={'7_14':'kanto','13_29':'johto','17_23':'hoenn','17_16':'league','25_13':'heal','29_7':'npc'};
// Encounters happen anywhere on the map
const ENC=[{id:16,ch:10},{id:21,ch:8},{id:19,ch:8},{id:39,ch:6},{id:10,ch:5},{id:27,ch:5},{id:25,ch:5},{id:63,ch:4},{id:35,ch:4},{id:147,ch:3},{id:133,ch:3},{id:37,ch:3},{id:43,ch:3},{id:56,ch:3},{id:66,ch:3},{id:74,ch:3},{id:92,ch:3},{id:48,ch:3},{id:58,ch:2},{id:77,ch:2},{id:100,ch:2},{id:104,ch:2},{id:123,ch:2},{id:129,ch:2},{id:95,ch:1},{id:131,ch:1},{id:142,ch:1},{id:143,ch:1},{id:149,ch:1}];
const ELV=[15,18,20,22,25];
let TYPE_CHART={};

let PD={},me=null,myT=null,sk=null,isA=false;
let pls={},cards=[],votes={},badges={},openA={},catches=[],allCatches={},pvpWins={};
let px=19,py=26,dir='down',mov=false,wf=0,gs=0,myHp=-1,myMx=160;
let inB=false,batId=null,batSide=null,pvpPk=null;
let bgM=null,btM=null;

Promise.all([
  fetch('/pokemon-data.json').then(r=>r.json()),
  fetch('/type-chart.json').then(r=>r.json())
]).then(([pd,tc])=>{PD=pd;TYPE_CHART=tc;initSel();});

function playBg(){if(!bgM){bgM=new Audio('/assets/music/pewter-city.mp3');bgM.loop=true;bgM.volume=.25;}btM?.pause();bgM.play().catch(()=>{});}
function playBt(){if(!btM){btM=new Audio('/assets/music/battle.mp3');btM.loop=true;btM.volume=.35;}bgM?.pause();btM.currentTime=0;btM.play().catch(()=>{});}
function stopBt(){btM?.pause();bgM?.play().catch(()=>{});}

function getTypeEff(atkType,defTypes){
  let e=1;
  const atEN={'Normal':'normal','Feu':'fire','Eau':'water','Plante':'grass','Électrik':'electric','Glace':'ice','Combat':'fighting','Poison':'poison','Sol':'ground','Vol':'flying','Psy':'psychic','Insecte':'bug','Roche':'rock','Spectre':'ghost','Dragon':'dragon','Ténèbres':'dark','Acier':'steel','Fée':'fairy'};
  const at=atEN[atkType]||atkType;
  if(!TYPE_CHART[at])return 1;
  (defTypes||[]).forEach(dt=>{const d=atEN[dt]||dt;if(TYPE_CHART[at][d]!==undefined)e*=TYPE_CHART[at][d];});
  return e;
}


// ═══ SELECT ═══
function initSel(){
  const el=document.getElementById('select-screen');
  el.innerHTML=`<h1>RÉTRO SPRINT<br>POKÉMON</h1><h2>CDC-Apps — Choisis ton Dresseur</h2>
  <div class="pgrid">${TEAM.map(t=>`<div class="pcard" data-name="${t.name}" style="--c:${t.color}"><img src="${SP(t.pokeId)}"><div class="n">${t.name}</div><div class="p">${t.pokemon}</div></div>`).join('')}</div>
  <div class="sact"><label><input type="checkbox" id="ac"> PO</label><button class="gobtn" id="go" disabled>GO !</button></div>`;
  let sel=null;
  el.querySelectorAll('.pcard').forEach(c=>{c.onclick=()=>{el.querySelectorAll('.pcard').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=c.dataset.name;document.getElementById('go').disabled=false;}});
  document.getElementById('go').onclick=()=>{if(!sel)return;isA=document.getElementById('ac').checked;startG(sel);};
}
function startG(name){
  me=name;myT=TEAM.find(t=>t.name===name);
  const pk=PD[myT.pokeId]||{hp:160};myMx=pk.hp;
  document.getElementById('select-screen').style.display='none';
  document.getElementById('game-screen').classList.add('active');
  document.getElementById('map-bg').style.cssText=`width:${MW*TS}px;height:${MH*TS}px`;
  sk=io({transports:['polling','websocket'],upgrade:true});
  sk.on('connect',()=>{console.log('Socket connected:',sk.id);sk.emit('join',{name,isAdmin:isA});});
  sk.on('connect_error',e=>console.error('Socket error:',e.message));
  setupSk();setupCtrl();updMe();updCam();updHUD();hideT();playBg();
}

// ═══ SOCKET ═══
function setupSk(){
  sk.on('joined',d=>{pls=d.players;cards=d.cards;votes=d.votes;openA=d.openArenas||{};badges=d.badges||{};catches=d.catches||[];allCatches=d.allCatches||{};pvpWins=d.pvpWins||{};if(d.hp>0)myHp=d.hp;else myHp=myMx;updHUD();rendO();});
  sk.on('player:joined',p=>{pls[p.id]=p;rendO();updHUD();});
  sk.on('player:moved',({id,x,y,dir:d})=>{if(pls[id]){pls[id].x=x;pls[id].y=y;pls[id].dir=d;rendO();}});
  sk.on('player:left',({id})=>{delete pls[id];rendO();updHUD();});
  sk.on('cards:update',c=>{cards=c;refZ();});
  sk.on('votes:update',v=>{votes=v;});
  sk.on('arenas:update',oa=>{openA=oa;updHUD();});
  sk.on('badges:update',b=>{badges=b;updHUD();});
  sk.on('badge:master',({player})=>showT(`🎖 ${player} est Maître !`));
  sk.on('phase:change',({phase})=>{if(phase==='vote')window._ov();});
  sk.on('teleport',({zone})=>openZone(zone));
  sk.on('reset',()=>{cards=[];votes={};badges={};openA={kanto:0,johto:0,hoenn:0,league:0};catches=[];allCatches={};pvpWins={};updHUD();showT('Reset !');setTimeout(hideT,2e3);});
  sk.on('healed',()=>{myHp=myMx;updHUD();showT('♪ Pokémon en pleine forme !');setTimeout(hideT,2e3);});
  sk.on('catches:update',d=>{if(d.name===me)catches=d.catches;allCatches=d.allCatches;});
  sk.on('pvp:update',w=>{pvpWins=w;});
  sk.on('battle:challenged',({from,fromId})=>{
    showT(`${from} veut combattre !`);
    document.getElementById('text-box').innerHTML+=`<div style="display:flex;gap:6px;margin-top:4px"><button class="choice-btn" onclick="window._ba('${fromId}')">⚔️ Accepter</button><button class="choice-btn" onclick="window._bd('${fromId}')">Refuser</button></div>`;
  });
  window._ba=fid=>{sk.emit('battle:accept',{challengerId:fid});hideT();};
  window._bd=fid=>{sk.emit('battle:decline',{challengerId:fid});hideT();};
  sk.on('battle:start',d=>{batId=d.battleId;batSide=d.side;startPvp(d);});
  sk.on('battle:resolve',d=>resolvePvp(d));
  sk.on('battle:declined',({by})=>{showT(`${by} a refusé.`);setTimeout(hideT,2e3);});
  sk.on('battle:finished',({battleId:bid,winner,reason})=>{
    if(inB&&(batId===bid||!bid)){battle.close(reason||(winner===me?'Victoire ! 🎉':'Défaite...'));setTimeout(hideT,2500);}
  });
  sk.on('battle:cancelled',({reason})=>{if(inB)battle.close(reason||'Annulé');});
}
function showT(t){const b=document.getElementById('text-box');b.textContent=t;b.style.display='block';}
function hideT(){document.getElementById('text-box').style.display='none';}

// ═══ MOVEMENT ═══
function blk(x,y){if(x<0||x>=MW||y<0||y>=MH)return true;return WR[y]&&WR[y].includes(x);}
let hD=null,hTm=null;
function tryM(d){
  if(mov||inB)return;dir=d;updMe();
  const dx={left:-1,right:1,up:0,down:0}[d],dy={up:-1,down:1,left:0,right:0}[d];
  const nx=px+dx,ny=py+dy;
  if(blk(nx,ny)||Object.values(pls).some(p=>p.name!==me&&Math.round(p.x||0)===nx&&Math.round(p.y||0)===ny))return;
  mov=true;px=nx;py=ny;wf=(wf+1)%3;updMe();updCam();sk.emit('move',{x:px,y:py,dir});
  setTimeout(()=>{
    mov=false;wf=0;updMe();
    const key=`${py}_${px}`;
    if(DOORS[key]){const act=DOORS[key];
      if(act==='heal'){sk.emit('heal');return;}
      if(act==='npc'){showT('Bienvenue !');setTimeout(hideT,2e3);return;}
      if(!openA[act]){showT(`🔒 ${ZONES.find(z=>z.id===act).name} fermée !`);setTimeout(hideT,2e3);}
      else openZone(act);return;}
    gs++;if(gs>4&&Math.random()<.08){gs=0;startWild();}
  },MMS);
}
function updCam(){const vp=document.getElementById('viewport'),w=vp.clientWidth,h=vp.clientHeight;
  const tx=Math.max(0,Math.min(MW*TS-w,px*TS+TS/2-w/2)),ty=Math.max(0,Math.min(MH*TS-h,py*TS+TS/2-h/2));
  document.getElementById('map-container').style.transform=`translate(${-tx}px,${-ty}px)`;}
function updMe(){
  let el=document.getElementById('me-sp');
  if(!el){el=document.createElement('div');el.id='me-sp';el.className='psp me';el.innerHTML=`<div class="plbl"></div><img>`;document.getElementById('map-container').appendChild(el);}
  el.style.cssText=`left:${px*TS}px;top:${py*TS}px;width:${TS}px;height:${TS}px;position:absolute;z-index:15`;
  el.querySelector('img').src=`/assets/walk-sprites/${myT.sprite}-${dir}${wf>0?'-'+wf:''}.png`;
  el.querySelector('img').style.cssText=`width:${TS}px;height:${TS}px;image-rendering:pixelated`;
  el.querySelector('.plbl').textContent=me;el.querySelector('.plbl').style.color=myT.color;
}
function rendO(){
  document.querySelectorAll('.oth').forEach(e=>e.remove());
  Object.values(pls).forEach(p=>{if(p.name===me)return;const t=TEAM.find(tt=>tt.name===p.name);if(!t)return;
    const el=document.createElement('div');el.className='psp oth';
    el.style.cssText=`left:${(p.x||19)*TS}px;top:${(p.y||26)*TS}px;width:${TS}px;height:${TS}px;position:absolute;z-index:10`;
    el.innerHTML=`<div class="plbl" style="color:${t.color}">${p.name}</div><img src="/assets/walk-sprites/${t.sprite}-${p.dir||'down'}.png" style="width:${TS}px;height:${TS}px;image-rendering:pixelated">`;
    document.getElementById('map-container').appendChild(el);
  });
}

// ═══ CONTROLS ═══
function setupCtrl(){
  document.querySelectorAll('.dbtn').forEach(b=>{
    const d=b.dataset.dir;
    const st=()=>{hD=d;tryM(d);clearInterval(hTm);hTm=setInterval(()=>{if(hD)tryM(hD);},MMS+20);};
    const sp=()=>{if(hD===d){hD=null;clearInterval(hTm);}};
    b.addEventListener('touchstart',e=>{e.preventDefault();st();},{passive:false});
    b.addEventListener('touchend',e=>{e.preventDefault();sp();},{passive:false});
    b.addEventListener('touchcancel',e=>{e.preventDefault();sp();},{passive:false});
    b.onmousedown=st;b.onmouseup=sp;b.onmouseleave=sp;
  });
  document.getElementById('btn-a').onclick=pressA;
  document.getElementById('btn-b').onclick=pressB;
  document.getElementById('btn-start').onclick=()=>{if(isA)window._oa();else window._ov();};
  document.getElementById('btn-select').onclick=()=>window._dex();
  const km={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
  let kH={};
  window.onkeydown=e=>{if(document.activeElement?.tagName==='INPUT')return;
    if(km[e.key]&&!kH[e.key]){kH[e.key]=true;hD=km[e.key];tryM(km[e.key]);clearInterval(hTm);hTm=setInterval(()=>{if(hD)tryM(hD);},MMS+20);}
    if(e.key==='z'||e.key===' ')pressA();if(e.key==='x'||e.key==='Escape')pressB();if(e.key==='p')window._dex();};
  window.onkeyup=e=>{if(km[e.key]){delete kH[e.key];if(hD===km[e.key]){hD=null;clearInterval(hTm);}}};
}
function pressA(){
  if(inB)return;
  const dx={left:-1,right:1,up:0,down:0}[dir],dy={up:-1,down:1,left:0,right:0}[dir];
  for(const p of Object.values(pls)){
    if(p.name!==me&&Math.round(p.x||0)===px+dx&&Math.round(p.y||0)===py+dy){
      const t=TEAM.find(tt=>tt.name===p.name);
      showT(`${p.name} (${t?t.pokemon:'?'})`);
      document.getElementById('text-box').innerHTML+=`<div style="display:flex;gap:6px;margin-top:4px"><button class="choice-btn" onclick="window._ch('${p.name}')">⚔️ Combat</button><button class="choice-btn" onclick="window._ct('${p.name}')">💬 Parler</button></div>`;
      return;
    }
  }
}
window._ch=n=>{sk.emit('battle:challenge',{target:n});showT('Demande...');};
window._ct=n=>{showT(`${n}: Bonne rétro !`);setTimeout(hideT,2e3);};
function pressB(){window._close();hideT();}

// ═══ CANVAS BATTLE ENGINE (matching battle.js from pokemon-js) ═══
const battle={
  overlay:null,canvas:null,ctx:null,msgEl:null,movesEl:null,
  active:false,animFrame:null,
  myPk:null,oppPk:null,mySprite:null,oppSprite:null,
  myHpCur:0,myHpMax:0,oppHpCur:0,oppHpMax:0,
  flashTimer:0,flashTarget:null,shakeX:0,
  entryPhase:'none',entryAnim:0,cw:0,ch:0,
  isPvp:false,oppName:'',catchBallImg:null,
  
  init(){
    this.overlay=document.getElementById('battle-overlay');
    this.canvas=document.getElementById('battle-canvas');
    this.ctx=this.canvas.getContext('2d');
    this.msgEl=document.getElementById('battle-msg');
    this.movesEl=document.getElementById('battle-moves');
  },

  start(myPkData,oppPkData,oppId,oppLv,isPvp,pvpName){
    this.init();this.active=true;inB=true;this.isPvp=isPvp;this.oppName=pvpName||'';
    this.myPk=myPkData;this.oppPk={...oppPkData,id:oppId,lv:oppLv};
    this.myHpMax=myPkData.hp;this.myHpCur=myHp;
    this.oppHpMax=isPvp?oppPkData.hp:Math.round((2*(oppPkData.baseHp||50)*oppLv)/100+oppLv+10);
    this.oppHpCur=this.oppHpMax;
    this.flashTimer=0;this.flashTarget=null;this.shakeX=0;
    this.movesEl.innerHTML='';this.msgEl.textContent='';
    playBt();
    // Load sprites
    this.mySprite=new Image();this.mySprite.crossOrigin='anonymous';this.mySprite.src=SPB(myT.pokeId);
    this.oppSprite=new Image();this.oppSprite.crossOrigin='anonymous';this.oppSprite.src=SP(oppId);
    // Show overlay with transition
    this.overlay.classList.add('active');
    this._resize();
    this.entryPhase='flash';this.entryAnim=0;
    this._msg(isPvp?`${pvpName} veut combattre !`:`${oppPkData.name.toUpperCase()} sauvage apparaît !`);
    this._drawLoop();
    setTimeout(()=>{this.entryPhase='slide';this.entryAnim=0;
      setTimeout(()=>{this.entryPhase='ready';
        this._msg(isPvp?`Que doit faire ${myPkData.name.toUpperCase()} ?`:`Que faire ?`);
        if(isPvp)this._showPvpMoves();else this._showActions();
      },1200);
    },800);
  },

  _resize(){
    const r=window.devicePixelRatio||1;
    const w=this.canvas.clientWidth||window.innerWidth;
    const h=this.canvas.clientHeight||1;
    this.canvas.width=w*r;this.canvas.height=h*r;
    this.ctx.scale(r,r);
    this.cw=w;this.ch=h;
  },

  _msg(t){this.msgEl.textContent=t;},

  _drawLoop(){
    if(!this.active)return;
    // Re-measure in case of resize
    const w=this.canvas.clientWidth,h=this.canvas.clientHeight;
    if(w!==this.cw||h!==this.ch)this._resize();
    this._drawScene();
    this.animFrame=requestAnimationFrame(()=>this._drawLoop());
  },

  _drawScene(){
    const ctx=this.ctx,w=this.cw,h=this.ch;
    if(w<=0||h<=0)return;ctx.clearRect(0,0,w,h);
    const S=Math.min(w/400,h/240,2); // scale factor, 400x240 is reference
    if(this.entryPhase==='flash'){
      this.entryAnim+=.06;
      ctx.fillStyle=Math.sin(this.entryAnim*10)>0?'#fff':'#000';
      ctx.fillRect(0,0,w,h);return;
    }
    // Background
    const bg=ctx.createLinearGradient(0,0,0,h);
    bg.addColorStop(0,'#78b8e8');bg.addColorStop(.35,'#a0d0f0');bg.addColorStop(.38,'#68a848');bg.addColorStop(1,'#508838');
    ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    // Ground shadows
    ctx.fillStyle='rgba(0,0,0,.10)';
    ctx.beginPath();ctx.ellipse(w*.72,h*.42,w*.15,h*.05,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(w*.28,h*.72,w*.14,h*.045,0,0,Math.PI*2);ctx.fill();
    // Grass
    ctx.fillStyle='rgba(80,140,60,.15)';
    for(let i=0;i<8;i++)ctx.fillRect(i*w/8+4*S,h*.50+Math.sin(i*1.5)*6*S,12*S,2*S);

    let oppOff=0,myOff=0;
    if(this.entryPhase==='slide'){
      this.entryAnim+=.03;const t=Math.min(1,this.entryAnim);
      oppOff=(1-t)*w*.6;myOff=(1-t)*-w*.6;
    }
    if(this.flashTimer>0){this.flashTimer--;this.shakeX=this.flashTimer>12?(this.flashTimer%2===0?4*S:-4*S):0;}

    // Opponent sprite — upper right, size scales with canvas
    const os=Math.min(w*.22,h*.38,80*S);
    if(this.oppSprite?.complete&&this.oppSprite.naturalWidth>0&&this.oppHpCur>0){
      const ox=w*.62+oppOff+(this.flashTarget==='opp'?this.shakeX:0),oy=h*.06;
      if(this.flashTarget==='opp'&&this.flashTimer>0&&this.flashTimer%4<2)ctx.globalAlpha=.3;
      ctx.drawImage(this.oppSprite,ox,oy,os,os);ctx.globalAlpha=1;
    }
    // Catch ball
    if(this.catchBallImg?.complete&&this.catchBallImg.naturalWidth>0&&this.oppHpCur>0){
      ctx.drawImage(this.catchBallImg,w*.65,h*.12,20*S,20*S);
    }
    // Player sprite — lower left, bigger
    const ms=Math.min(w*.28,h*.48,100*S);
    if(this.mySprite?.complete&&this.mySprite.naturalWidth>0&&this.myHpCur>0){
      const mx=w*.06+myOff+(this.flashTarget==='my'?this.shakeX:0),my=h*.40;
      if(this.flashTarget==='my'&&this.flashTimer>0&&this.flashTimer%4<2)ctx.globalAlpha=.3;
      ctx.drawImage(this.mySprite,mx,my,ms,ms);ctx.globalAlpha=1;
    }
    // HP bars — scale with canvas
    const bw=Math.min(w*.44,180*S);
    const pH=Math.round(14*S); // panel text size
    this._drawHP(ctx,4*S,4*S,bw,S,this.oppPk?.name||'???',this.oppHpCur,this.oppHpMax,false,this.oppPk?.lv||50);
    this._drawHP(ctx,w-bw-4*S,h*.56,bw,S,this.myPk?.name||'???',this.myHpCur,this.myHpMax,true,50);
  },

  _drawHP(ctx,x,y,w,S,name,hp,maxHp,showExact,lv){
    const ph=showExact?Math.round(48*S):Math.round(38*S);
    const fs1=Math.round(10*S),fs2=Math.round(7*S),fs3=Math.round(6*S),fs4=Math.round(8*S);
    const pad=Math.round(6*S),barTop=Math.round(20*S),barH=Math.round(10*S);
    // Panel
    ctx.fillStyle='#f8f0d8';
    ctx.beginPath();ctx.roundRect(x,y,w,ph,4*S);ctx.fill();
    ctx.strokeStyle='#484848';ctx.lineWidth=Math.max(1,1.5*S);
    ctx.beginPath();ctx.roundRect(x,y,w,ph,4*S);ctx.stroke();
    // Dark HP area
    ctx.fillStyle='#484848';ctx.fillRect(x+pad,y+barTop,w-pad*2,barH+2*S);
    // Name
    ctx.font=`bold ${fs1}px "PressStart2P","Press Start 2P",monospace`;ctx.fillStyle='#303030';ctx.textAlign='left';
    ctx.fillText(name.toUpperCase(),x+pad,y+barTop-Math.round(3*S));
    // Level
    ctx.font=`${fs2}px "PressStart2P","Press Start 2P",monospace`;ctx.fillStyle='#606060';ctx.textAlign='right';
    ctx.fillText(':L'+lv,x+w-pad,y+barTop-Math.round(3*S));
    // HP label
    ctx.font=`bold ${fs3}px "PressStart2P","Press Start 2P",monospace`;ctx.fillStyle='#f8d030';ctx.textAlign='left';
    ctx.fillText('HP',x+pad,y+barTop+barH-Math.round(1*S));
    // HP bar fill
    const bx=x+pad+Math.round(22*S),by=y+barTop+Math.round(1*S),bw=w-pad*2-Math.round(24*S),bh=barH;
    ctx.fillStyle='#282828';ctx.fillRect(bx,by,bw,bh);
    const pct=maxHp>0?Math.max(0,hp/maxHp):0;
    const hc=pct>.5?'#30d848':pct>.2?'#f8c830':'#f03030';
    if(pct>0){ctx.fillStyle=hc;ctx.fillRect(bx,by,bw*pct,bh);
      ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(bx,by,bw*pct,Math.round(bh*.35));}
    // Exact HP
    if(showExact){ctx.font=`${fs4}px "PressStart2P","Press Start 2P",monospace`;ctx.fillStyle='#303030';ctx.textAlign='right';
      ctx.fillText(`${Math.max(0,hp)} / ${maxHp}`,x+w-pad,y+barTop+barH+Math.round(12*S));}
    ctx.textAlign='left';
  },

  // ─── WILD ACTIONS ───
  _showActions(){
    this.movesEl.innerHTML='';
    const mk=(label,cb)=>{const b=document.createElement('button');b.textContent=label;b.onclick=cb;this.movesEl.appendChild(b);};
    mk('⚔️ COMBAT',()=>this._showMoves());
    mk('🔴 POKéBALL',()=>this._doCatch());
    mk('📖 POKéDEX',()=>window._dex());
    mk('🏃 FUITE',()=>{this.movesEl.innerHTML='';this._msg('Fuite réussie !');setTimeout(()=>this.close(),800);});
  },

  _showMoves(){
    this.movesEl.innerHTML='';
    const pk=this.myPk;if(!pk)return;
    pk.moves.forEach((mv,i)=>{
      const b=document.createElement('button');
      b.style.borderLeft=`4px solid ${TC[mv.t]||'#888'}`;
      b.innerHTML=`<span style="color:${TC[mv.t]};font-size:8px;display:block">${mv.t}</span>${mv.n}<span class="move-pp">${mv.p>0?'P.'+mv.p+' / Pr.'+mv.a:'Statut'}</span>`;
      b.onclick=()=>this._doAttack(i);
      this.movesEl.appendChild(b);
    });
    const back=document.createElement('button');back.textContent='← Retour';back.onclick=()=>this._showActions();
    this.movesEl.appendChild(back);
  },

  _calcDmg(atk,def,mv,lv,atkTypes,defTypes){
    if(!mv.p)return{dmg:0,eff:1};
    const a=mv.c==='phy'?atk.atk:atk.spa;
    const d=mv.c==='phy'?def.def:def.spd;
    const base=Math.floor(((2*lv/5+2)*mv.p*a/d)/50+2);
    const eff=getTypeEff(mv.t,defTypes||[]);
    const crit=Math.random()<0.0625?1.5:1;
    const rand=.85+Math.random()*.15;
    const stab=(atkTypes||[]).includes(mv.t)?1.5:1;
    return{dmg:Math.max(1,Math.floor(base*rand*crit*eff*stab)),eff,crit:crit>1};
  },

  async _doAttack(i){
    const pk=this.myPk,mv=pk.moves[i];
    this.movesEl.innerHTML='';
    this._msg(`${pk.name.toUpperCase()} utilise ${mv.n} !`);
    await this._wait(600);
    const{dmg,eff,crit}=this._calcDmg(pk,this.oppPk,mv,50,pk.types,this.oppPk.types);
    if(mv.p>0){this.oppHpCur=Math.max(0,this.oppHpCur-dmg);this.flashTarget='opp';this.flashTimer=24;
      await this._wait(500);
      let msg=`${dmg} dégâts !`;if(crit)msg+=' Coup critique !';if(eff>=2)msg+=' Super efficace !';else if(eff>0&&eff<1)msg+=' Pas très efficace...';else if(eff===0)msg+=' Aucun effet...';
      this._msg(msg);
    }else{this.myHpCur=Math.min(this.myHpMax,this.myHpCur+Math.floor(this.myHpMax*.4));this._msg('PV récupérés !');}
    await this._wait(800);
    if(this.oppHpCur<=0){this._msg(`${this.oppPk.name.toUpperCase()} est K.O. !`);await this._wait(1500);this.close();return;}
    // Enemy turn
    const em=this.oppPk.moves[Math.floor(Math.random()*this.oppPk.moves.length)];
    this._msg(`${this.oppPk.name.toUpperCase()} utilise ${em.n} !`);
    await this._wait(600);
    const{dmg:ed}=this._calcDmg(this.oppPk,pk,em,this.oppPk.lv||50,this.oppPk.types,pk.types);
    if(em.p>0){this.myHpCur=Math.max(0,this.myHpCur-ed);this.flashTarget='my';this.flashTimer=24;
      await this._wait(500);this._msg(`${ed} dégâts !`);}
    await this._wait(800);
    if(this.myHpCur<=0){this._msg(`${pk.name.toUpperCase()} est K.O. !`);await this._wait(1500);this.close();return;}
    this._msg('Que faire ?');this._showActions();
  },

  // ─── CATCH ───
  async _doCatch(){
    this.movesEl.innerHTML='';this._msg('Tu lances une POKéBALL !');
    const rate=.3+(1-this.oppHpCur/this.oppHpMax)*.5;
    const caught=Math.random()<rate;
    const shakes=caught?3:Math.floor(Math.random()*3)+1;
    // Ball open animation
    for(let f=0;f<5;f++){
      this.catchBallImg=new Image();this.catchBallImg.src=BALL[f];
      this.oppSprite=this.catchBallImg;
      await this._wait(100);
    }
    this.catchBallImg=null;
    const idle=new Image();idle.src=BALL_IDLE;
    const left=new Image();left.src=BALL_L;
    const right=new Image();right.src=BALL_R;
    this.oppSprite=idle;
    // Shake animation
    for(let s=0;s<shakes;s++){
      await this._wait(800);
      this.oppSprite=left;await this._wait(150);
      this.oppSprite=idle;await this._wait(150);
      this.oppSprite=right;await this._wait(150);
      this.oppSprite=idle;
    }
    await this._wait(500);
    if(caught){
      this._msg(`Gotcha ! ${this.oppPk.name.toUpperCase()} est capturé ! 🎉`);
      sk.emit('pokemon:caught',{pokeId:this.oppPk.id});
      if(!catches.includes(this.oppPk.id))catches.push(this.oppPk.id);
      await this._wait(2000);this.close();
    }else{
      // Break free
      this.oppSprite=new Image();this.oppSprite.crossOrigin='anonymous';this.oppSprite.src=SP(this.oppPk.id);
      this.flashTarget='opp';this.flashTimer=24;
      this._msg('Raté ! Il s\'est échappé !');
      await this._wait(1200);
      // Enemy counterattack
      const em=this.oppPk.moves[Math.floor(Math.random()*this.oppPk.moves.length)];
      this._msg(`${this.oppPk.name.toUpperCase()} utilise ${em.n} !`);
      await this._wait(600);
      if(em.p>0){const{dmg:ed}=this._calcDmg(this.oppPk,this.myPk,em,this.oppPk.lv||50,this.oppPk.types,this.myPk.types);
        this.myHpCur=Math.max(0,this.myHpCur-ed);this.flashTarget='my';this.flashTimer=24;
        await this._wait(500);this._msg(`${ed} dégâts !`);}
      await this._wait(800);
      if(this.myHpCur<=0){this._msg(`${this.myPk.name.toUpperCase()} est K.O. !`);await this._wait(1500);this.close();return;}
      this._msg('Que faire ?');this._showActions();
    }
  },

  // ─── PVP MOVES ───
  _showPvpMoves(){
    this.movesEl.innerHTML='';
    const pk=this.myPk;if(!pk)return;
    this._msg(`Que doit faire ${pk.name.toUpperCase()} ?`);
    pk.moves.forEach((mv,i)=>{
      const b=document.createElement('button');
      b.style.borderLeft=`4px solid ${TC[mv.t]||'#888'}`;
      b.innerHTML=`<span style="color:${TC[mv.t]};font-size:8px;display:block">${mv.t}</span>${mv.n}<span class="move-pp">${mv.p>0?'P.'+mv.p:'Statut'}</span>`;
      b.onclick=()=>{
        sk.emit('battle:move',{battleId:batId,moveIdx:i});
        this.movesEl.innerHTML='';this._msg('En attente...');
      };
      this.movesEl.appendChild(b);
    });
  },

  _wait(ms){return new Promise(r=>setTimeout(r,ms));},

  close(msg){
    myHp=Math.max(1,this.myHpCur);sk.emit('saveHp',{hp:myHp});
    inB=false;batId=null;batSide=null;pvpPk=null;this.active=false;this.catchBallImg=null;
    if(this.animFrame)cancelAnimationFrame(this.animFrame);
    this.overlay.classList.remove('active');
    this.movesEl.innerHTML='';this.msgEl.textContent='';
    stopBt();updHUD();
    if(msg){showT(msg);setTimeout(hideT,2500);}
  }
};

// PvP resolve
function resolvePvp(d){
  if(!battle.active||!pvpPk)return;
  const pk=battle.myPk;
  const myMv=pk.moves[batSide==='p1'?d.p1move:d.p2move];
  const opMv=pvpPk.moves[batSide==='p1'?d.p2move:d.p1move];
  if(!myMv||!opMv){battle._showPvpMoves();return;}
  const meF=pk.speed>=pvpPk.speed;
  const run=async()=>{
    const a=meF?{m:myMv,me:true}:{m:opMv,me:false};
    const b=meF?{m:opMv,me:false}:{m:myMv,me:true};
    // Turn 1
    const src1=a.me?pk:pvpPk, tgt1=a.me?pvpPk:pk;
    battle._msg(`${src1.name.toUpperCase()} utilise ${a.m.n} !`);
    await battle._wait(600);
    const{dmg:d1,eff:e1}=battle._calcDmg(src1,tgt1,a.m,50,src1.types,tgt1.types);
    if(a.m.p>0){if(a.me)battle.oppHpCur=Math.max(0,battle.oppHpCur-d1);else battle.myHpCur=Math.max(0,battle.myHpCur-d1);
      battle.flashTarget=a.me?'opp':'my';battle.flashTimer=24;await battle._wait(500);
      let msg=`${d1} dégâts !`;if(e1>=2)msg+=' Super efficace !';battle._msg(msg);}
    await battle._wait(800);
    if(battle.oppHpCur<=0||battle.myHpCur<=0){
      const w=battle.oppHpCur<=0?me:null;
      battle._msg(battle.oppHpCur<=0?'Victoire ! 🎉':'Défaite...');
      sk.emit('battle:end',{battleId:batId,winner:w||(Object.values(pls).find(p=>p.name!==me)?.name)});return;
    }
    // Turn 2
    const src2=b.me?pk:pvpPk,tgt2=b.me?pvpPk:pk;
    battle._msg(`${src2.name.toUpperCase()} utilise ${b.m.n} !`);
    await battle._wait(600);
    const{dmg:d2}=battle._calcDmg(src2,tgt2,b.m,50,src2.types,tgt2.types);
    if(b.m.p>0){if(b.me)battle.oppHpCur=Math.max(0,battle.oppHpCur-d2);else battle.myHpCur=Math.max(0,battle.myHpCur-d2);
      battle.flashTarget=b.me?'opp':'my';battle.flashTimer=24;await battle._wait(500);battle._msg(`${d2} dégâts !`);}
    await battle._wait(800);
    if(battle.oppHpCur<=0||battle.myHpCur<=0){
      const w=battle.oppHpCur<=0?me:null;
      battle._msg(battle.oppHpCur<=0?'Victoire ! 🎉':'Défaite...');
      sk.emit('battle:end',{battleId:batId,winner:w||(Object.values(pls).find(p=>p.name!==me)?.name)});return;
    }
    battle._showPvpMoves();
  };
  run();
}

function startWild(){
  let r=Math.random()*100,c=0,eid=16;for(const e of ENC){c+=e.ch;if(r<c){eid=e.id;break;}}
  const ep=PD[eid];if(!ep)return;
  const lv=ELV[Math.floor(Math.random()*ELV.length)];
  const oppData={...ep,baseHp:ep.hp-60,id:eid,lv}; // baseHp = reverse the formula
  battle.start(PD[myT.pokeId],oppData,eid,lv,false,null);
}
function startPvp(d){
  pvpPk=PD[d.oppPokeId]||{name:'???',hp:130,atk:80,def:70,spa:80,spd:70,speed:70,types:['Normal'],moves:[{n:'Tackle',p:40,a:100,t:'Normal',c:'phy'}]};
  battle.start(PD[myT.pokeId],{...pvpPk,baseHp:999},d.oppPokeId,50,true,d.opp);
}

// ═══ HUD ═══
function updHUD(){
  if(!myT)return;const h=document.getElementById('hud');
  let bt=ZONES.map(z=>{const o=openA[z.id];return `<button class="hb" onclick="window._oz('${z.id}')" style="background:${o?z.color:'#555'}">${o?'':'🔒'}${z.icon}</button>`;}).join('');
  bt+=`<button class="hb" onclick="window._dex()">📖</button>`;
  bt+=`<button class="hb" onclick="window._ov()">🏆</button>`;
  if(isA)bt+=`<button class="hb" onclick="window._oa()" style="background:#c0392b">PO</button>`;
  const dots=Object.values(pls).filter(p=>p.name!==me).map(p=>{const t=TEAM.find(tt=>tt.name===p.name);return `<div class="hd" style="background:${t?t.color:'#888'}" title="${p.name}"></div>`;}).join('');
  h.innerHTML=`<img src="${SP(myT.pokeId)}" style="width:18px;height:18px"><span style="color:${myT.color};font-size:7px">${me}</span><span style="font-size:6px;color:#aaa">❤${myHp>0?myHp:myMx} 📖${catches.length}</span>${bt}<div style="margin-left:auto;display:flex;gap:3px">${dots}</div>`;
}

// ═══ POKEDEX ═══
window._dex=function(){
  const p=document.getElementById('zone-panel');
  const sorted=[...catches].sort((a,b)=>a-b);
  const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};
  p.innerHTML=`<div class="oph"><button class="opb" onclick="window._close()">←</button><div class="opt" style="color:#e74c3c">📖 POKéDEX (${sorted.length})</div></div>
  <div class="opbd"><div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center">${sorted.length===0?'<p style="color:#555;font-size:8px;padding:20px">Aucun Pokémon capturé</p>':sorted.map(id=>{
    const pk=PD[id];return `<div style="text-align:center;width:56px;background:rgba(255,255,255,.05);border-radius:6px;padding:3px"><img src="${SP(id)}" style="width:36px;height:36px"><div style="font-size:5px;color:#ddd">${pk?pk.name:'#'+id}</div></div>`;
  }).join('')}</div>
  <div style="margin-top:10px;padding:8px;background:rgba(255,255,255,.04);border-radius:6px">
  <div style="font-size:8px;color:#FFD93D;margin-bottom:6px">🏆 Classement PvP</div>${
    Object.entries(pvpWins).sort((a,b)=>b[1]-a[1]).map(([n,w],i)=>{
      const t=TEAM.find(tt=>tt.name===n);
      return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;font-size:8px;color:#ccc"><span style="color:#FFD93D;width:16px">${['🥇','🥈','🥉'][i]||'#'+(i+1)}</span><img src="${SP(t?.pokeId||25)}" style="width:16px;height:16px"><span style="color:${t?.color||'#fff'}">${esc(n)}</span><span style="margin-left:auto">${w} win${w>1?'s':''}</span></div>`;
    }).join('')||'<p style="color:#555;font-size:7px">Aucun combat</p>'
  }</div>
  <div style="margin-top:8px;padding:8px;background:rgba(255,255,255,.04);border-radius:6px">
  <div style="font-size:8px;color:#8E44AD;margin-bottom:6px">📋 Captures par joueur</div>${
    Object.entries(allCatches).filter(([,c])=>c.length>0).sort((a,b)=>b[1].length-a[1].length).map(([n,c])=>{
      const t=TEAM.find(tt=>tt.name===n);
      return `<div style="font-size:7px;color:#aaa;margin-top:3px"><span style="color:${t?.color||'#fff'}">${esc(n)}</span>: ${c.length} capturé${c.length>1?'s':''}</div>`;
    }).join('')||'<p style="color:#555;font-size:7px">Aucune capture</p>'
  }</div></div>`;
  p.classList.add('open');
};

// ═══ ZONE ═══
window._oz=z=>{if(!openA[z]){showT('🔒 Fermée !');setTimeout(hideT,2e3);return;}openZone(z);};
function openZone(zId){
  const z=ZONES.find(zz=>zz.id===zId);if(!z)return;
  const p=document.getElementById('zone-panel');p.dataset.zone=zId;
  const zc=cards.filter(c=>c.zone===zId);
  const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};
  p.innerHTML=`<div class="oph"><button class="opb" onclick="window._close()">←</button><div class="opt" style="color:${z.color}">${z.icon} ${z.name}</div><span style="font-size:9px;color:#888">${zc.length}</span></div><div style="font-size:8px;color:#bbb;text-align:center;padding:6px">${z.prompt}</div><div class="opbd" id="zl">${zc.length===0?'<p style="text-align:center;color:#555;font-size:8px;padding:20px">Aucune carte</p>':zc.map(c=>{const t=TEAM.find(tt=>tt.name===c.author)||TEAM[0];return `<div class="opc" style="--ac:${t.color}"><div class="oa"><img src="${SP(t.pokeId)}" style="width:14px;height:14px">${esc(c.author)}</div><div class="ot">${esc(c.text)}</div></div>`;}).join('')}</div><div class="opi" style="--zc:${z.color}"><input id="zi" placeholder="Ton idée..." maxlength="200"><button id="za">+</button></div>`;
  p.classList.add('open');
  document.getElementById('za').onclick=()=>{const i=document.getElementById('zi');const t=i.value.trim();if(!t)return;sk.emit('card:add',{zone:zId,text:t});i.value='';};
  document.getElementById('zi').onkeydown=ev=>{if(ev.key==='Enter')document.getElementById('za').click();};
  const l=document.getElementById('zl');if(l)setTimeout(()=>l.scrollTop=l.scrollHeight,100);
}
function refZ(){const p=document.getElementById('zone-panel');if(p.classList.contains('open')&&p.dataset.zone)openZone(p.dataset.zone);}

// ═══ VOTE ═══
window._ov=function(){
  const ac=cards.filter(c=>c.zone==='league'),p=document.getElementById('vote-panel');
  const av=Object.values(votes),tp=Object.keys(pls).length;
  const sc={};ac.forEach(c=>{sc[c.id]=0;});av.forEach(v=>{v.forEach((cid,i)=>{sc[cid]=(sc[cid]||0)+(ac.length-i);});});const mx=Math.max(...Object.values(sc),1);
  const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};
  p.innerHTML=`<div class="oph"><button class="opb" onclick="window._close()">←</button><div class="opt" style="color:#FFD93D">🏆 Vote</div><span style="font-size:8px;color:#2ecc71">${av.length}/${tp}</span></div><div class="opbd">${ac.length===0?'<p style="text-align:center;color:#555;font-size:8px;padding:20px">Aucune action</p>':ac.map(c=>{const t=TEAM.find(tt=>tt.name===c.author)||TEAM[0];return `<div class="opc" style="--ac:${t.color}"><div class="oa">${esc(c.author)}</div><div class="ot">${esc(c.text)}</div></div>`;}).join('')}${av.length>0?'<div style="margin-top:8px;padding:6px;background:rgba(255,255,255,.04);border-radius:4px;font-size:7px"><div style="color:#FFD93D;margin-bottom:4px">📊 Résultats</div>'+[...ac].sort((a,b)=>(sc[b.id]||0)-(sc[a.id]||0)).map((c,i)=>{const t=TEAM.find(tt=>tt.name===c.author)||TEAM[0];const pct=((sc[c.id]||0)/mx)*100;return `<div style="color:#aaa;display:flex;justify-content:space-between"><span>${['🥇','🥈','🥉'][i]||''} ${esc(c.text).slice(0,18)}</span><span style="color:${t.color}">${sc[c.id]||0}</span></div><div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;margin:2px 0 4px"><div style="height:100%;width:${pct}%;background:${t.color};border-radius:2px"></div></div>`;}).join('')+'</div>':''}</div>`;
  p.classList.add('open');
};

// ═══ ADMIN ═══
window._oa=function(){
  const p=document.getElementById('admin-panel');
  const ab=ZONES.map(z=>{const o=openA[z.id];return `<button class="arb" data-z="${z.id}" style="color:${o?'#2ecc71':'#e74c3c'};border-color:${o?'#2ecc71':'#e74c3c'}">${o?'🔓':'🔒'} ${z.icon} ${z.name}</button>`;}).join('');
  p.innerHTML=`<div class="ap"><h3>🎯 PO</h3>${ab}<div class="sep"></div>${ZONES.map(z=>`<button class="tpb" data-z="${z.id}">${z.icon} Téléporter</button>`).join('')}<div class="sep"></div><button id="adv" style="color:#FFD93D;border-color:#FFD93D">🏆 Vote</button><button id="adf" style="color:#2ecc71;border-color:#2ecc71">🗺️ Libre</button><div class="sep"></div><button id="adr" style="border-color:#c0392b;color:#c0392b">🔄 Reset</button><button id="adc" style="color:#888;text-align:center">✕</button></div>`;
  p.classList.add('open');
  p.querySelectorAll('.arb').forEach(b=>{b.onclick=()=>{const z=b.dataset.z;sk.emit('admin:arena',{zone:z,open:!openA[z]});openA[z]=!openA[z];window._oa();};});
  p.querySelectorAll('.tpb').forEach(b=>{b.onclick=()=>{sk.emit('admin:teleport',{zone:b.dataset.z});p.classList.remove('open');};});
  document.getElementById('adv').onclick=()=>{sk.emit('admin:phase',{phase:'vote'});p.classList.remove('open');window._ov();};
  document.getElementById('adf').onclick=()=>{sk.emit('admin:phase',{phase:'free'});p.classList.remove('open');};
  document.getElementById('adr').onclick=()=>{if(confirm('Reset ?')){sk.emit('admin:reset');p.classList.remove('open');}};
  document.getElementById('adc').onclick=()=>p.classList.remove('open');
  p.onclick=ev=>{if(ev.target===p)p.classList.remove('open');};
};

// ═══ CLOSE ALL PANELS (exposed on window) ═══
window._close=function(){['zone-panel','vote-panel','admin-panel'].forEach(id=>document.getElementById(id).classList.remove('open'));};

})();
