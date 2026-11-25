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
 assert.match(h,/北投國小｜先投票/);assert.match(h,/週日早午餐已固定/);
 assert.match(h,/10:00[\s\S]*長榮鳳凰酒店｜桂冠早午餐/);
 assert.match(h,/11:00[\s\S]*辦理退房｜行李寄放大廳/);
 assert.match(h,/11:30[\s\S]*領取行李・取車(前往冬山|直接北返台北)/);
 assert.match(x.compare,/10:00–11:30[\s\S]*行李寄放大廳/);
 assert.match(h,/泰山仁愛路/);
 assert.match(h,/08:30[\s\S]*泰山仁愛路出發/);
 assert.match(h,/09:00[\s\S]*北投國小｜先投票/);
 assert.match(h,/09:45[\s\S]*投票後從北投國小開往礁溪/);

 assert.match(x.active,mode==='rain'?/雨天備案/:pace==='relaxed'?/少繞路/:/加走林美/);
 assert.ok(urls.length>=18,'Per-stop Google Maps directions missing');
 assert.ok(routes(x.compare).length>=3,'Every restaurant needs navigation');
 assert.equal((x.featured.match(/class="veggie-feature-card"/g)||[]).length,2);
 assert.match(x.featured,/Mercy 暮曦蔬食創意料理/);
 assert.doesNotMatch(x.featured,/明溱禪悅/);
 assert.match(x.featured,/長春素食名人館/);
 assert.doesNotMatch(h+x.featured+x.compare,/春不老驛站|白蓮寺不二齋|冬山午餐/);
 assert.match(h,/17:30[\s\S]*台北晚餐｜餐廳待定/);
 assert.match(h,/18:45[\s\S]*晚餐後返回泰山仁愛路/);
 assert.match(x.compare,/週日 17:30｜台北晚餐/);
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
  assert.match(h,/12:00[\s\S]*金車生技｜全室內海洋生態館/);
  assert.match(h,/13:00[\s\S]*(拾松辦桌小吃|Mercy 暮曦蔬食創意料理)/);
  assert.ok(main.some(w=>w.includes('淇武蘭路162-13號')));
  assert.doesNotMatch(h,/龍潭湖｜湖畔步道/);
  assert.doesNotMatch(h,/湯圍溝溫泉公園/);
  assert.match(h,/金車生技｜全室內海洋生態館/);
  assert.doesNotMatch(h,/梅花湖｜環湖散步/);
  assert.doesNotMatch(h,/三清宮｜參拜/);
 }else{
  assert.match(h,/12:00[\s\S]*龍潭湖/);
  assert.match(h,/12:45[\s\S]*(拾松辦桌小吃|Mercy 暮曦蔬食創意料理)/);
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
 const back=urls.find(u=>u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')==='台北市, 台灣');
 assert.ok(back,'Return to Taipei region missing');
 const sunStops=back.searchParams.get('waypoints')?.split('|')||[];
 assert.ok(urls.some(u=>u.searchParams.get('destination')?.includes(TAISHAN)&&!u.searchParams.has('origin')),'Dinner to home navigation missing');
 if(mode==='rain'){
  assert.deepEqual(sunStops,[],'Rain plan must return directly to Taipei');
  assert.match(h,/11:30[\s\S]*領取行李・取車直接北返台北/);
  assert.match(h,/14:00[\s\S]*台北自由活動/);
 }else{
  assert.deepEqual(sunStops,[MEIHUA,SANQING],'Sunday route should be Meihua Lake → Sanqing Temple → Taipei');
  assert.match(h,/12:15[\s\S]*梅花湖｜環湖散步/);
  assert.match(h,/13:40[\s\S]*道教總廟三清宮/);
  assert.match(h,/14:30[\s\S]*離開冬山｜北返台北/);
 }
 console.log('PASS '+diet+'/'+mode+'/'+pace+' '+urls.length+' Google Maps links; Longtan, Tangweigou, Meihua, Sanqing, lunch, return');
}
assert.match(html,/id="paceControls"/);
assert.match(html,/route-audit-note/);
assert.match(html,/id="featuredVegRestaurants"/);
assert.match(html,/id="routeModeControls"/);
assert.match(html,/id="rainSat"/);
assert.match(html,/11\.28/);
assert.match(html,/08:30 從泰山仁愛路出發/);
assert.match(html,/週日 10:00–11:30 飯店早午餐/);
assert.match(html,/11:00前退房，行李寄放大廳/);
assert.doesNotMatch(html,/08:30 完成投票後/);
assert.match(html,/龍潭湖/);
assert.match(html,/梅花湖/);
assert.match(html,/三清宮/);
assert.doesNotMatch(html+script,/冬山午餐|春不老驛站|白蓮寺不二齋|sunLunch/);
assert.match(html,/17:30台北晚餐/);
assert.doesNotMatch(script,/明溱禪悅/);
assert.doesNotMatch(html,/明溱禪悅/);
console.log('PASS route audit notice, new attractions, pace controls, rainy-day and weather UI');
console.log('All 8 routing combinations passed.');
