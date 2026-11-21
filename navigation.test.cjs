/* Route quality and Google Maps regression tests for 2026/11/28–29. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const script=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const TAISHAN='新北市泰山區仁愛路';
const BEITOU='臺北市北投區中央北路一段73號';
function render(diet,mode,pace){
 const nodes=new Map();
 function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},disabled:false,addEventListener(){},scrollIntoView(){}});return nodes.get(id);}
 const doc={getElementById:node,querySelectorAll(){return []}};
 const context={document:doc,URLSearchParams,encodeURIComponent,navigator:{},
   localStorage:{getItem(k){return {yilan_diet:diet,yilan_route_mode:mode,yilan_pace:pace}[k]||null;},setItem(){}},
   window:{print(){}},setTimeout(){},clearTimeout(){}};
 vm.runInNewContext(script,context,{filename:'app.js'});
 return {itinerary:node('itinerary').innerHTML,compare:node('mealComparison').innerHTML,
   featured:node('featuredVegRestaurants').innerHTML,active:node('activeModeText').textContent};
}
function routes(h){
 return [...h.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'))
   .filter(link=>link.startsWith('https://www.google.com/maps/dir/?')).map(link=>new URL(link));
}
for(const diet of ['meat','veg'])for(const mode of ['sunny','rain'])for(const pace of ['relaxed','full']){
 const x=render(diet,mode,pace),h=x.itinerary,urls=routes(h);
 assert.match(h,/11 \/ 28/);assert.match(h,/11 \/ 29/);
 assert.match(h,/北投國小｜先投票/);assert.match(h,/先投票再出發/);
 assert.match(h,/週日早餐已固定/);assert.match(h,/泰山仁愛路/);
 assert.match(x.active,mode==='rain'?/雨天備案/:pace==='relaxed'?/省路線/:/完整景點/);
 assert.ok(urls.length>=20,'Per-stop Google Maps directions missing');
 assert.ok(routes(x.compare).length>=3,'Every restaurant needs navigation');
 assert.equal((x.featured.match(/class="veggie-feature-card"/g)||[]).length,3);
 assert.match(x.featured,/明溱禪悅無菜單養生料理/);
 assert.match(x.featured,/長春素食名人館/);
 assert.match(x.featured,/石港春帆精緻海鮮餐廳/);
 assert.match(x.featured,/NT\$680＋10% ≈ NT\$748/);
 for(const url of urls){
  assert.equal(url.searchParams.get('api'),'1');
  assert.equal(url.searchParams.get('travelmode'),'driving');
  assert.equal(url.searchParams.get('dir_action'),'navigate');
  const waypoints=url.searchParams.get('waypoints');
  if(waypoints)assert.ok(waypoints.split('|').length<=3,'Mobile waypoint limit exceeded');
 }
 const poll=urls.find(u=>u.searchParams.get('origin')?.includes(TAISHAN)&&u.searchParams.get('destination')?.includes(BEITOU));
 assert.ok(poll,'Taishan → Beitou vote route missing');
 const meal=diet==='veg'?'宜蘭縣礁溪鄉武暖路121之7號':'宜蘭縣礁溪鄉奇峰街36號';
 const fromVote=urls.filter(u=>u.searchParams.get('origin')?.includes(BEITOU)&&u.searchParams.get('destination')?.includes('長榮鳳凰酒店')&&u.searchParams.has('waypoints'));
 assert.equal(fromVote.length,2,'Both regular and traffic fallback route required');
 const stopList=fromVote.map(u=>u.searchParams.get('waypoints').split('|'));
 const shortest=stopList.find(a=>a.length===1);
 assert.deepEqual(shortest,[meal],'Traffic fallback must skip sightseeing and go via lunch');
 const main=stopList.find(a=>a.length>1);
 assert.equal(main.length,mode==='rain'?2:pace==='relaxed'?2:3,'Wrong number of scenic spots');
 assert.ok(main.includes(meal));
 if(mode==='rain'){
  assert.ok(main.some(w=>w.includes('淇武蘭路162-13號')));
  assert.doesNotMatch(h,/五峰旗瀑布｜山林散步/);
  assert.match(h,/金車生技｜全室內海洋生態館/);
  assert.match(h,/蘭陽博物館｜室內山海生態展/);
 }else{
  assert.ok(main.some(w=>w.includes('五峰旗')));
  assert.match(h,/五峰旗瀑布｜山林散步/);
  assert.match(h,/北關海潮公園｜礁岩觀浪/);
  if(pace==='relaxed'){
   assert.ok(!main.some(w=>w.includes('林美石磐步道')),'Relaxed route must skip the Linmei detour');
   assert.doesNotMatch(h,/林美石磐步道｜溪谷輕健行/);
   assert.match(h,/飯店周邊休息・寄放行李/);
  }else{
   assert.ok(main.some(w=>w.includes('林美石磐步道')),'Full route must include Linmei');
   assert.match(h,/林美石磐步道｜溪谷輕健行/);
  }
 }
 const dinner=diet==='veg'?'宜蘭縣礁溪鄉礁溪路三段12號':'宜蘭縣礁溪鄉中山路二段172號';
 assert.ok(urls.some(u=>u.searchParams.get('waypoints')?.includes(dinner)),'Dinner route must use correct restaurant');
 const back=urls.find(u=>u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')?.includes(TAISHAN)&&u.searchParams.has('waypoints'));
 assert.ok(back,'Return to Taishan missing');
 assert.equal(back.searchParams.get('waypoints').split('|').length,mode==='rain'?2:3);
 assert.ok(back.searchParams.get('waypoints').includes('宜蘭縣頭城鎮濱海路一段390號'));
 console.log('PASS '+diet+'/'+mode+'/'+pace+' '+urls.length+' driving links; vote, lunch, pace, hotel, return, meal pricing');
}
assert.match(html,/id="paceControls"/);
assert.match(html,/route-audit-note/);
assert.match(html,/09:00–16:00/);
assert.match(html,/id="featuredVegRestaurants"/);
assert.match(html,/id="routeModeControls"/);
assert.match(html,/id="rainSat"/);
assert.match(html,/11\.28/);
console.log('PASS route audit notice, pace controls, rainy-day and weather UI');
console.log('All 8 routing combinations passed.');
