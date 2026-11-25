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
 assert.match(h,/09:30[\s\S]*辦理退房｜行李寄放大廳/);
 assert.ok(h.indexOf('辦理退房｜行李寄放大廳')<h.indexOf('長榮鳳凰酒店｜桂冠早午餐'),'Checkout must precede brunch');
 assert.match(h,/11:30[\s\S]*領取行李・取車(前往冬山|直接北返台北)/);
 assert.match(x.compare,/10:00–11:30[\s\S]*行李寄放大廳/);
 assert.match(h,/泰山仁愛路/);
 assert.match(h,/08:30[\s\S]*泰山仁愛路出發/);
 assert.match(h,/09:00[\s\S]*北投國小｜先投票/);
 assert.match(h,/10:15[\s\S]*投票後從北投國小開往礁溪/);

 assert.match(x.active,mode==='rain'?/雨天備案/:pace==='relaxed'?/少繞路/:/改走林美/);
 assert.ok(urls.length>=18,'Per-stop Google Maps directions missing');
 assert.ok(routes(x.compare).length>=3,'Every restaurant needs navigation');
 assert.equal((x.featured.match(/class="veggie-feature-card"/g)||[]).length,2);
 assert.match(x.featured,/Mercy 暮曦蔬食創意料理/);
 assert.doesNotMatch(x.featured,/明溱禪悅/);
 assert.match(x.featured,/長春素食名人館/);
 assert.match(x.compare,/礁溪漁田村/);
 assert.match(x.compare,/礁溪膳館/);
 assert.match(x.compare,/約 1\.2 公里/);
 assert.match(x.compare,/約 840 公尺/);
 const pairRoutes=routes(x.compare);
 for(const [meat,veg] of [['宜蘭縣礁溪鄉玉龍路一段498號','宜蘭縣礁溪鄉玉龍路一段55號'],['宜蘭縣礁溪鄉礁溪路三段96號','宜蘭縣礁溪鄉礁溪路三段12號']]){
  assert.ok(pairRoutes.some(u=>u.searchParams.get('origin')===meat&&u.searchParams.get('destination')===veg),'Meat to vegetarian transfer missing');
  assert.ok(pairRoutes.some(u=>u.searchParams.get('origin')===veg&&u.searchParams.get('destination')===meat),'Vegetarian to meat transfer missing');
 }
 assert.doesNotMatch(h+x.compare,/拾松辦桌小吃|御園料理/);
 assert.doesNotMatch(h+x.featured+x.compare,/春不老驛站|白蓮寺不二齋|冬山午餐/);
 assert.match(h,/18:00[\s\S]*明都大自然素食館｜台北素食合菜/);
 assert.match(h,/19:30[\s\S]*晚餐後返回泰山仁愛路/);
 assert.match(x.compare,/週日 18:00｜明都大自然素食館/);
 assert.ok(x.featured.includes('約 NT$200–400／人'));
 assert.doesNotMatch(h,/石港春帆/);
 for(const url of urls){
  assert.equal(url.searchParams.get('api'),'1');
  assert.ok(['driving','walking'].includes(url.searchParams.get('travelmode')));
  assert.equal(url.searchParams.get('dir_action'),'navigate');
  const waypoints=url.searchParams.get('waypoints');
  if(waypoints)assert.ok(waypoints.split('|').length<=3,'Mobile waypoint limit exceeded');
 }
 const poll=urls.find(u=>u.searchParams.get('origin')?.includes(TAISHAN)&&u.searchParams.get('destination')?.includes(BEITOU));
 assert.ok(poll,'Taishan → Beitou vote route missing');
 const lunch=diet==='veg'?'宜蘭縣礁溪鄉玉龍路一段55號':'宜蘭縣礁溪鄉玉龍路一段498號';
 const fromVote=urls.filter(u=>u.searchParams.get('origin')?.includes(BEITOU)&&u.searchParams.get('destination')?.includes('長榮鳳凰酒店')&&u.searchParams.has('waypoints'));
 assert.equal(fromVote.length,2,'Both normal and traffic fallback routes required');
 const stopList=fromVote.map(u=>u.searchParams.get('waypoints').split('|'));
 const shortest=stopList.find(a=>a.length===1);
 assert.deepEqual(shortest,[lunch],'Traffic fallback must go directly to lunch');
 const main=stopList.find(a=>a.length>1);
 assert.equal(main[0],lunch,'Lunch must be the first stop after voting');
 assert.equal(main.length,2,'Only one optional attraction before the hotel');
 assert.match(h,/13:00[\s\S]*(礁溪漁田村|Mercy 暮曦蔬食創意料理)/);
 if(mode==='rain'){
  assert.match(h,/14:30[\s\S]*金車生技｜全室內海洋生態館/);
  assert.ok(main[1].includes('淇武蘭路162-13號'));
  assert.doesNotMatch(h,/龍潭湖｜湖畔步道|林美石磐步道｜替代龍潭湖|湯圍溝溫泉公園｜夜間泡腳散步|梅花湖｜環湖散步|三清宮｜參拜/);
  assert.ok(!urls.some(u=>u.searchParams.get('travelmode')==='walking'),'Rain plan must not include walking route');
 }else{
  assert.match(h,/湯圍溝溫泉公園｜夜間泡腳散步/);
  assert.match(h,/梅花湖｜環湖散步/);
  assert.match(h,/三清宮｜參拜/);
  if(pace==='relaxed'){
   assert.equal(main[1],LONGTAN);
   assert.match(h,/14:30[\s\S]*龍潭湖｜湖畔步道/);
   assert.doesNotMatch(h,/林美石磐步道｜替代龍潭湖/);
  }else{
   assert.ok(main[1].includes('林美石磐步道'));
   assert.match(h,/14:30[\s\S]*林美石磐步道｜替代龍潭湖/);
   assert.doesNotMatch(h,/龍潭湖｜湖畔步道/);
  }
  assert.ok(urls.some(u=>u.searchParams.get('travelmode')==='walking'&&u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')?.includes('德陽路99之11號')),'Hotel to Tangweigou walking directions missing');
 }
 assert.ok(h.indexOf('晚餐後返回飯店停車')>=0,'Dinner to hotel parking stop missing');
 const dinner=diet==='veg'?'宜蘭縣礁溪鄉礁溪路三段12號':'宜蘭縣礁溪鄉礁溪路三段96號';
 assert.ok(urls.some(u=>u.searchParams.get('waypoints')===dinner&&u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')?.includes('長榮鳳凰酒店')),'Saturday dinner round trip must return to the hotel');
 const back=urls.find(u=>u.searchParams.get('origin')?.includes('長榮鳳凰酒店')&&u.searchParams.get('destination')==='台北市士林區重慶北路四段148號');
 assert.ok(back,'Route to Mingdu restaurant missing');
 const sunStops=back.searchParams.get('waypoints')?.split('|')||[];
 assert.ok(urls.some(u=>u.searchParams.get('destination')?.includes(TAISHAN)&&u.searchParams.get('origin')==='台北市士林區重慶北路四段148號'),'Mingdu to home navigation missing');
 assert.match(h,/tel:0228127891/);
 if(mode==='rain'){
  assert.deepEqual(sunStops,[],'Rain plan must return directly to Taipei');
  assert.match(h,/11:30[\s\S]*領取行李・取車直接北返台北/);
  assert.match(h,/14:30[\s\S]*台北自由活動/);
 }else{
  assert.deepEqual(sunStops,[MEIHUA,SANQING],'Sunday route should be Meihua Lake → Sanqing Temple → Taipei');
  assert.match(h,/12:40[\s\S]*梅花湖｜環湖散步/);
  assert.match(h,/14:00[\s\S]*道教總廟三清宮/);
  assert.match(h,/15:00[\s\S]*離開冬山｜北返台北/);
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
assert.match(html,/10:00–11:30飯店早午餐/);
assert.match(html,/09:30先退房，行李寄放大廳/);
assert.match(html,/四人同車，符合高乘載/);
assert.doesNotMatch(html,/08:30 完成投票後/);
assert.match(html,/龍潭湖/);
assert.match(html,/梅花湖/);
assert.match(html,/三清宮/);
assert.doesNotMatch(html+script,/冬山午餐|春不老驛站|白蓮寺不二齋|sunLunch/);
assert.match(html,/18:00明都四人合菜/);
assert.match(html,/四人同行・葷素餐廳相近/);
assert.doesNotMatch(html+script,/拾松辦桌小吃|御園料理|奇峰街36號|中山路二段172號/);
assert.doesNotMatch(script,/明溱禪悅/);
assert.doesNotMatch(html,/明溱禪悅/);
console.log('PASS route audit notice, new attractions, pace controls, rainy-day and weather UI');
console.log('All 8 routing combinations passed.');
