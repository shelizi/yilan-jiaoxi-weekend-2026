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
const LONGTAN='宜蘭縣礁溪鄉龍潭村環湖路1號';
const MEIHUA='宜蘭縣冬山鄉得安村大埤路1號';
const SANQING='宜蘭縣冬山鄉三清路123號';
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
 assert.match(h,/北投國小｜先投票/);assert.match(h,/週日早餐已固定/);
 assert.match(h,/泰山仁愛路/);
 assert.match(h,/08:30[\s\S]*投票後從北投國小開往礁溪/);
 assert.match(x.active,mode==='rain'?/雨天備案/:pace==='relaxed'?/少繞路/:/加走林美/);
 assert.ok(urls.length>=20,'Per-stop Google Maps directions missing');
 assert.ok(routes(x.compare).length>=3,'Every restaurant needs navigation');
 assert.equal((x.featured.match(/class="veggie-feature-card"/g)||[]).length,3);
 assert.match(x.featured,/Mercy 暮曦蔬食創意料理/);
 assert.doesNotMatch(x.featured,/明溱禪悅/);
 assert.match(x.featured,/長春素食名人館/);
 assert.match(x.featured,/白蓮寺不二齋/);
 assert.ok(x.featured.includes('約 NT$200–400／人'));
 assert.doesNotMatch(h,/石港春帆/);
 for(const url of urls){
  assert.equal(url.searchParams.get('api'),'1');
  assert.equal(url.searchParams.get('travelmode'),'driving');
  assert.equal(url.searchParams.get('dir_action'),'navigate');
  const waypoints=url.searchParams.get('waypoints');
  if(waypoints)assert.ok(waypoints.split('|').length<=3,'Mobile waypoint limit exceeded');
 }
 const poll=urls.find(u=>u.searchParams.get('origin')?.includes(TAISHAN)&&u.searchParams.get('destination')?.includes(BEITOU));
 assert.ok(poll,'Taishan → Beitou vote route missing');
 const lunch=diet==='veg'?'宜蘭縣礁溪鄉玉龍路一段55號':'宜蘭縣礁溪鄉奇峰街36號';
 const fromVote=urls.filter(u=>u.searchParams.get('origin')?.includes(BEITOU)&&u.searchParams.get('destination')?.includes('長榮鳳凰酒店')&&u.searchParams.has('waypoints'));
 assert.equal(fromVote.length,2,'Both normal and traffic fallback routes required');
 const stopList=fromVote.map(u=>u.searchParams.get('waypoints').split('|'));
 const shortest=stopList.find(a=>a.length===1);
 assert.deepEqual(shortest,[lunch],'Traffic fallback must go directly to lunch');
 const main=stopList.find(a=>a.length>1);
 assert.ok(main.includes(lunch));
 if(mode==='rain'){
  assert.ok(main.some(w=>w.includes('淇武蘭路162-13號')));
  assert.doesNotMatch(h,/龍潭湖｜湖畔步道/);
  assert.doesNotMatch(h,/湯圍溝溫泉公園/);
  assert.match(h,/金車生技｜全室內海洋生態館/);
  assert.doesNotMatch(h,/梅花湖｜環湖散步/);
  assert.doesNotMatch(h,/三清宮｜參拜/);
 }else{
  assert.ok(main.some(w=>w.includes(LONGTAN)),'Saturday must route via Longtan Lake');
  assert.match(h,/龍潭湖｜湖畔步道/);
  assert.match(h,/湯圍溝溫泉公園/);
  assert.match(h,/梅花湖｜環湖散步/);
  assert.match(h,/三清宮｜參拜/);
  if(pace==='relaxed'){
   assert.equal(main.length,2);
   assert.doesNotMatch(h,/林美石磐步道｜加碼選項/);
   assert.match(h,/回飯店周邊休息/);
  }else{
   assert.equal(main.length,3);
   assert.ok(main.some(w=>w.includes('林美石磐步道')),'Full pace should include optional Linmei');
   assert.match(h,/林美石磐步道｜加碼選項/);
  }
 }
 const dinner=diet==='veg'?'宜蘭縣礁溪鄉礁溪路三段12號':'宜蘭縣礁溪鄉中山路二段172號';
 assert.ok(urls.some(u=>u.searchParams.get('waypoints')?.includes(dinner)),'Saturday dinner route must update');
 const sunMeal=diet==='veg'?'宜蘭縣冬山鄉廣興村永興路二段867號':'宜蘭縣冬山鄉丸山路259號';
 const back=urls.find(u=>u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')?.includes(TAISHAN)&&u.searchParams.has('waypoints'));
 assert.ok(back,'Return to Taishan missing');
 const sunStops=back.searchParams.get('waypoints').split('|');
 if(mode==='rain'){
  assert.deepEqual(sunStops,[sunMeal],'Rain plan should only stop for winter lunch before returning');
  assert.match(h,/雨天取消梅花湖與三清宮/);
 }else{
  assert.deepEqual(sunStops,[sunMeal,MEIHUA,SANQING],'Sunday route should be lunch → Meihua Lake → Sanqing Temple → Taishan');
 }
 console.log('PASS '+diet+'/'+mode+'/'+pace+' '+urls.length+' Google Maps links; Longtan, Tangweigou, Meihua, Sanqing, lunch, return');
}
assert.match(html,/id="paceControls"/);
assert.match(html,/route-audit-note/);
assert.match(html,/id="featuredVegRestaurants"/);
assert.match(html,/id="routeModeControls"/);
assert.match(html,/id="rainSat"/);
assert.match(html,/11\.28/);
assert.match(html,/龍潭湖/);
assert.match(html,/梅花湖/);
assert.match(html,/三清宮/);
assert.doesNotMatch(script,/明溱禪悅/);
assert.doesNotMatch(html,/明溱禪悅/);
console.log('PASS route audit notice, new attractions, pace controls, rainy-day and weather UI');
console.log('All 8 routing combinations passed.');
