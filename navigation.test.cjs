/* Local regression tests for 2026-11-28/29 Yilan static itinerary. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const script=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const TAISHAN='新北市泰山區仁愛路';
const BEITOU='臺北市北投區中央北路一段73號';
function render(diet,mode) {
 const nodes=new Map();
 function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},disabled:false,addEventListener(){},scrollIntoView(){}});return nodes.get(id);}
 const doc={getElementById:node,querySelectorAll(){return []}};
 const context={document:doc,URLSearchParams,encodeURIComponent,navigator:{},
   localStorage:{getItem(k){if(k==='yilan_diet')return diet;if(k==='yilan_route_mode')return mode;return null},setItem(){}},
   window:{print(){}},setTimeout(){},clearTimeout(){}};
 vm.runInNewContext(script,context,{filename:'app.js'});
 return {html:node('itinerary').innerHTML,compare:node('mealComparison').innerHTML,active:node('activeModeText').textContent};
}
function routes(h){
 return [...h.matchAll(/href="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'))
   .filter(link=>link.startsWith('https://www.google.com/maps/dir/?')).map(link=>new URL(link));
}
for(const diet of ['meat','veg'])for(const mode of ['sunny','rain']){
 const x=render(diet,mode);const urls=routes(x.html);
 assert.match(x.html,/11 \/ 28/);assert.match(x.html,/11 \/ 29/);
 assert.match(x.html,/北投國小｜先投票/);assert.match(x.html,/先投票再出發/);
 assert.match(x.html,/週日早餐已固定/);
 assert.match(x.html,/泰山仁愛路/);
 assert.match(x.active,mode==='rain'?/雨天備案/:/原定景觀/);
 assert.ok(urls.length>=20,'Per-stop Google Maps directions missing');
 assert.ok(routes(x.compare).length>=3,'Each restaurant should have a navigation URL');
 for(const url of urls) {
  assert.equal(url.searchParams.get('api'),'1');
  assert.equal(url.searchParams.get('travelmode'),'driving');
  assert.equal(url.searchParams.get('dir_action'),'navigate');
  const waypoints=url.searchParams.get('waypoints');
  if(waypoints)assert.ok(waypoints.split('|').length<=3,'Too many mobile waypoints');
 }
 const poll=urls.find(u=>u.searchParams.get('origin')?.includes(TAISHAN)&&u.searchParams.get('destination')?.includes(BEITOU));
 assert.ok(poll,'Taishan to polling station missing');
 const toHotel=urls.find(u=>u.searchParams.get('origin')?.includes(BEITOU)&&u.searchParams.get('destination')?.includes('長榮鳳凰酒店'));
 assert.ok(toHotel,'Beitou to Jiaoxi hotel route missing');
 const waypoints=toHotel.searchParams.get('waypoints').split('|');
 assert.equal(waypoints.length,mode==='rain'?2:3);
 const meal= diet==='veg'?'宜蘭縣礁溪鄉中山路二段13號':'宜蘭縣礁溪鄉奇峰街36號';
 assert.ok(waypoints.includes(meal),'Meal mismatch in Beitou route');
 const back=urls.find(u=>u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')?.includes(TAISHAN)&&u.searchParams.has('waypoints'));
 assert.ok(back,'Return to Taishan missing');
 const sea=back.searchParams.get('waypoints').split('|');
 assert.equal(sea.length,mode==='rain'?2:3);
 if(mode==='rain'){
  assert.match(x.html,/金車生技｜全室內海洋生態館/);
  assert.match(x.html,/蘭陽博物館｜室內山海生態展/);
  assert.doesNotMatch(x.html,/五峰旗瀑布｜山林散步/);
  assert.doesNotMatch(x.html,/北關海潮公園｜礁岩觀浪/);
  assert.ok(waypoints.some(w=>w.includes('淇武蘭路162-13號')));
  assert.ok(sea.some(w=>w.includes('青雲路三段750號')));
 } else {
  assert.match(x.html,/五峰旗瀑布｜山林散步/);
  assert.match(x.html,/北關海潮公園｜礁岩觀浪/);
  assert.ok(waypoints.some(w=>w.includes('五峰旗')));
 }
 console.log('PASS '+diet+'/'+mode+': '+urls.length+' routes, poll → hotel → Taishan, phone waypoint limits');
}
assert.match(html,/2026\/11\/21 AccuWeather/);
assert.match(html,/id="rainSat"/);
assert.match(html,/id="rainSun"/);
assert.match(html,/id="activateRainBtn"/);
assert.match(html,/id="routeModeControls"/);
assert.match(html,/11\.28/);
assert.doesNotMatch(html,/11\.21—11\.22/);
console.log('PASS forecast fallback, date, rain controls');
console.log('All itinerary tests passed.');
