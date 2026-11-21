/* 宜蘭山海慢旅：完全本地運作，不需框架或 API Key */
'use strict';
(function () {
  const hotel = '宜蘭縣礁溪鄉健康路77號 長榮鳳凰酒店';
  const places = {
    departure: {name:'泰山仁愛路',address:'新北市泰山區仁愛路, 台灣',note:'出發／返家起點為新北市泰山區仁愛路；未提供門牌，請在 Google 地圖確認實際上車位置。'},
    beitou: {name:'北投國小（投票前請核對通知單）',address:'臺北市北投區中央北路一段73號 北投國小',source:'https://info.cec.gov.tw/vote2026/'},
    marine: {name:'金車生技水產養殖研發中心',address:'宜蘭縣礁溪鄉淇武蘭路162-13號',source:'https://www.kingcarbiotech.com.tw/mk01'},
    museum: {name:'蘭陽博物館',address:'宜蘭縣頭城鎮青雲路三段750號',source:'https://www.lym.gov.tw/ch/audience-service/visit/lym/index.html'},
    wufengqi: {name:'五峰旗瀑布',address:'宜蘭縣礁溪鄉五峰路81巷6號 五峰旗風景區',source:'https://travel.yilan.gov.tw/zh-tw/attraction/85/'},
    linmei: {name:'林美石磐步道',address:'林美石磐步道 宜蘭縣礁溪鄉',source:'https://recreation.forest.gov.tw/Trail/RT?tr_id=008'},
    hotel: {name:'長榮鳳凰酒店（礁溪）',address:hotel,source:'https://jiaosi.evergreen-hotels.com/'},
    tangweigou: {name:'湯圍溝溫泉公園',address:'湯圍溝溫泉公園 宜蘭縣礁溪鄉'},
    waiao: {name:'外澳海灘／外澳服務區',address:'宜蘭縣頭城鎮濱海路二段6號',source:'https://www.necoast-nsa.gov.tw/Attraction-Content.aspx?a=277&l=1'},
    beiguan: {name:'北關海潮公園',address:'北關海潮公園 宜蘭縣頭城鎮',source:'https://www.necoast-nsa.gov.tw/Attraction-Content.aspx?a=274&l=1'}
  };
  const meals = {
    satLunch: {
      time:'週六午餐',
      meat:{name:'拾松辦桌小吃',type:'宜蘭在地辦桌風味',desc:'西魯肉、糕渣、卜肉等經典宜蘭菜；靠近五峰旗一帶，適合中午順遊。',address:'宜蘭縣礁溪鄉奇峰街36號',hours:'11:00–14:00 / 17:00–20:00',phone:'03-988-1136',tip:'假日客多，出發前先確認現場候位。'},
      veg:{name:'清香素食麵館',type:'在地素食麵飯',desc:'熱湯、素麵與家常蔬食，補充健行後的體力。',address:'宜蘭縣礁溪鄉中山路二段13號',hours:'週六 09:30–15:00、17:00–20:00',phone:'03-988-0601',tip:'素食餐廳；全素與蛋奶素請依實際點餐確認。'}
    },
    satDinner: {
      time:'週六晚餐',
      meat:{name:'御園料理',type:'台式海鮮與熱炒',desc:'礁溪在地台菜、海鮮與熱炒，安排在飯店休息後用餐。',address:'宜蘭縣礁溪鄉中山路二段172號',hours:'週六 17:00–22:30（資料平台顯示）',phone:'03-987-4292',tip:'營業時間各平台略有差異，請先電話確認。'},
      veg:{name:'悅德蔬食・鳳凰店',type:'創意蔬食／無菜單料理',desc:'位在飯店周邊健康路，適合住礁溪的晚上慢慢享用精緻蔬食。',address:'宜蘭縣礁溪鄉健康路50號1樓之2',hours:'週六 17:00–20:30',phone:'03-988-5373',tip:'建議預約，素別及當日價位請先確認。'}
    },
    sunLunch: {
      time:'週日午餐',
      meat:{name:'石港春帆精緻海鮮餐廳',type:'頭城海鮮套餐',desc:'靠近外澳／烏石港，主打當季海鮮套餐與主菜選擇。',address:'宜蘭縣頭城鎮濱海路一段390號',hours:'週日 11:30–20:00',phone:'03-977-6269',tip:'偏精緻套餐、預算較高；建議事前訂位。'},
      veg:{name:'來佳素麵館',type:'外澳在地蔬食小店',desc:'外澳海邊的素食麵飯、麻醬麵與家常小菜，看完海很順路。',address:'宜蘭縣頭城鎮濱海路二段16號',hours:'週日 09:00–17:00',phone:'0919-901-709',tip:'店面規模較小，確認當日是否營業。'}
    }
  };
  const days = {
    sat:{
      title:'投完票，向山林出發。',
      date:'11 / 28',
      label:'DAY 01 · SATURDAY · 投票日',
      subtitle:'泰山 → 北投國小投票 → 礁溪山線 → 飯店溫泉',
      endnote:'週六早上要先投票，行程比原版稍緊湊；投票排隊或國五塞車時，優先保留飯店入住與泡湯，山區景點可減少一站。投票所與教室以通知單及中選會查詢為準。',
      rainEndnote:'雨天請跳過山徑，改室內海洋館，午餐後至飯店室內休息，15:00 後入住。投票仍是第一優先，週日早餐不變。',
      stops:[
        {time:'07:20',kind:'move',title:'泰山仁愛路出發｜先到北投國小',duration:'車程依市區路況',description:'從泰山仁愛路出發，先前往北投國小。地圖上的泰山仁愛路沒有門牌號碼，請確認實際定位與停車安排。',place:'departure'},
        {time:'08:00',kind:'vote',title:'北投國小｜先投票',duration:'預留 30–60 分鐘',description:'投票時間 08:00–16:00。北投國小位於臺北市北投區中央北路一段73號；請先核對通知單上的投票所及教室，並留足排隊時間。',place:'beitou',locked:true,alert:'這裡是預定的投票地點，不代表已核實個人投票資格或所屬投票所；請以中選會查詢及通知單為準。'},
        {time:'08:50',kind:'move',title:'投票後從北投國小開往礁溪',duration:'國五車程彈性預留',description:'完成投票後，從北投國小正式啟程。預估抵達景點約 11:20，國五塞車則調整午餐與步道停留時間。',place:'beitou'},
        {time:'11:20',kind:'nature',title:'五峰旗瀑布｜山林散步',duration:'約 45–55 分鐘',description:'從風景區入口沿步道賞瀑，僅走開放的觀景範圍。遇雨、落石管制或塞車可直接跳過此站。',place:'wufengqi',alert:'上層賞瀑平台如有封閉或坍方管制，不可越線；大雨避免進入步道。'},
        {time:'12:35',kind:'food',meal:'satLunch',duration:'約 60 分鐘'},
        {time:'13:55',kind:'nature',title:'林美石磐步道｜溪谷輕健行',duration:'約 55–65 分鐘',description:'僅走官方目前開放的 0–0.9 公里，溪谷步道欣賞後原路折返。若出發較晚或路面濕滑，可不排此站。',place:'linmei',alert:'林美石磐步道 0.9K 後封閉；遇大雨與雷雨請取消步道行程。'},
        {time:'15:25',kind:'stay',title:'長榮鳳凰酒店｜辦理入住',duration:'入住時間 15:00 後',description:'入住後放好行李，留時間泡湯，不需要再趕戶外景點。',place:'hotel'},
        {time:'16:15',kind:'relax',title:'飯店溫泉 SPA｜放鬆一下',duration:'約 80–90 分鐘',description:'享用飯店泡湯與水療設施；開放時間、入場方式與泳裝要求以館方為準。',place:'hotel'},
        {time:'18:15',kind:'food',meal:'satDinner',duration:'約 75 分鐘'},
        {time:'19:45',kind:'walk',title:'湯圍溝溫泉公園｜夜間散步',duration:'選配 30 分鐘',description:'依體力與天氣決定是否前往，若有雨就留在飯店休息。',place:'tangweigou'}
      ]
    },
    sun:{
      title:'早餐慢慢吃，然後去看海。',
      date:'11 / 29',
      label:'DAY 02 · SUNDAY',
      subtitle:'礁溪飯店早餐 → 頭城海線 → 返回泰山',
      endnote:'外澳與北關冬季可能有大風浪；以看海與安全步道為主，不下水、不靠近溼滑礁岩。',
      rainEndnote:'雨天以室內蘭陽博物館替代外澳、北關，午餐後便能返家。週日早餐仍固定在飯店，不另排早餐店。',
      stops:[
        {time:'08:30',kind:'fixed',title:'長榮鳳凰酒店｜桂冠早餐',duration:'建議 08:30–09:30',description:'已確認使用飯店早餐。桂冠自助餐廳早午餐有 08:30–10:00 時段；實際入場以訂房專案及飯店安排為準。素食者請確認調味與蛋奶成分。',place:'hotel',locked:true},
        {time:'10:30',kind:'stay',title:'整理行李・辦理退房',duration:'11:00 前完成',description:'整理行李後開往頭城。',place:'hotel'},
        {time:'11:20',kind:'coast',title:'外澳海灘｜欣賞龜山島',duration:'約 60 分鐘',description:'在海灘與堤岸遠望龜山島，強風大雨不要靠近海邊。',place:'waiao'},
        {time:'12:40',kind:'food',meal:'sunLunch',duration:'約 60–75 分鐘'},
        {time:'14:15',kind:'coast',title:'北關海潮公園｜礁岩觀浪',duration:'約 50–60 分鐘',description:'只走園區開放的安全觀景步道，若風浪太大或雨勢明顯就跳過。',place:'beiguan',alert:'賣店施工中，步道、停車場與公廁正常開放；大風浪請遠離邊緣。'},
        {time:'15:20',kind:'move',title:'返回泰山仁愛路',duration:'依國五及沿海路況',description:'離開北關後返家，以即時導航確認國五壅塞狀況。',place:'departure'}
      ]
    }
  };
  // 雨天時只調整戶外景點；投票、入住、週日飯店早餐與葷素餐廳保留。
  function getStops(day){
    const base=days[day].stops.map(s=>({...s}));
    if(state.mode!=='rain')return base;
    if(day==='sat'){
      base[3]={time:'11:20',kind:'indoor',title:'金車生技｜全室內海洋生態館',duration:'約 60–80 分鐘',description:'室內參觀海洋生物、鯊魚與魟魚展示，園區官方資訊為每日 08:00–17:00；建議依天氣及現場入場規定調整。',place:'marine'};
      base[4].time='12:50';
      base[5]={time:'14:15',kind:'relax',title:'飯店室內休息・等待入住',duration:'約 40–60 分鐘',description:'午後雨勢若持續，直接回飯店。可先詢問寄放行李、在公共空間休息；不預設可提早取得客房。',place:'hotel'};
      base[6].time='15:10';
      base[9]={time:'19:45',kind:'relax',title:'雨夜留在飯店放鬆',duration:'自由安排',description:'取消戶外湯圍溝散步，留在飯店休息；雨若停再依現場情況安排。',place:'hotel'};
      return base;
    }
    base[2]={time:'11:25',kind:'indoor',title:'蘭陽博物館｜室內山海生態展',duration:'約 90–110 分鐘',description:'展館透過山、平原、海三大主題介紹宜蘭自然與生態；週日開放 09:00–17:00，現場售票至16:30。',place:'museum'};
    base[3].time='13:20';
    base.splice(4,1);
    base[4]={time:'14:45',kind:'move',title:'風雨中提早返回泰山',duration:'國五車程依路況',description:'取消北關海潮公園與外澳海灘，午餐後返回泰山仁愛路，避免海邊強風與浪襲。',place:'departure'};
    return base;
  }
  const icons={move:'↗',vote:'✓',nature:'✿',indoor:'⌂',food:'♨',stay:'⌂',relax:'♨',walk:'☾',fixed:'✓',coast:'≈'};
  const kindLabels={move:'交通',vote:'選舉投票',nature:'自然景觀',indoor:'室內生態',food:'在地美食',stay:'住宿',relax:'溫泉時光',walk:'慢步調',fixed:'已固定',coast:'海岸景觀'};
  const state={diet:'meat',day:'all',mode:'sunny'};
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function mapUrl(q){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);}
  // Google Maps URLs，分段路線確保手機瀏覽器不超過三個途經點。
  function directionsUrl(destination,origin,waypoints){
    const p=new URLSearchParams();p.set('api','1');p.set('destination',destination);p.set('travelmode','driving');p.set('dir_action','navigate');
    if(origin)p.set('origin',origin);
    if(waypoints&&waypoints.length)p.set('waypoints',waypoints.join('|'));
    return 'https://www.google.com/maps/dir/?'+p.toString();
  }
  function pointAddress(stop){
    if(stop.meal)return meals[stop.meal][state.diet].address;
    if(stop.place&&places[stop.place])return places[stop.place].address;
    return null;
  }
  function routeUrl(day,phase){
    const chosen=state.diet;
    if(day==='sat'){
      if(phase==='poll')return directionsUrl(places.beitou.address,places.departure.address);
      if(phase==='evening')return directionsUrl(hotel,hotel,state.mode==='rain'?[meals.satDinner[chosen].address]:[meals.satDinner[chosen].address,places.tangweigou.address]);
      const between=state.mode==='rain'?[places.marine.address,meals.satLunch[chosen].address]:[places.wufengqi.address,meals.satLunch[chosen].address,places.linmei.address];
      return directionsUrl(hotel,places.beitou.address,between);
    }
    const between=state.mode==='rain'?[places.museum.address,meals.sunLunch[chosen].address]:[places.waiao.address,meals.sunLunch[chosen].address,places.beiguan.address];
    return directionsUrl(places.departure.address,hotel,between);
  }
  function eventHtml(e,index,stops,day){
    let title=e.title||'',desc=e.description||'',place=e.place?places[e.place]:null;
    let mealTag='',tip='',tel='';
    if(e.meal){
      const m=meals[e.meal][state.diet];title=m.name;desc=m.desc;
      mealTag='<span class="diet-pill '+(state.diet==='veg'?'veg':'')+'">'+(state.diet==='veg'?'🌿 素食版':'🍖 葷食版')+'</span>';
      place={name:m.name,address:m.address,source:null};tip=m.tip;tel=m.phone;
    }
    const here=place&&place.address?place.address:null;
    const prior=index>0?pointAddress(stops[index-1]):null;
    const links=[];
    if(here){
      if(day==='sat'&&index===0){
        links.push('<a target="_blank" rel="noopener" href="'+esc(mapUrl(here))+'">⌖ 查看泰山出發點 ↗</a>');
      }else{
        links.push('<a target="_blank" rel="noopener" href="'+esc(directionsUrl(here))+'">🧭 從目前位置導航 ↗</a>');
        if(prior&&prior!==here)links.push('<a target="_blank" rel="noopener" href="'+esc(directionsUrl(here,prior))+'">↗ 前一站 → 此站路線</a>');
        links.push('<a target="_blank" rel="noopener" href="'+esc(mapUrl(here))+'">⌖ 查看地點 ↗</a>');
      }
    }
    if(place&&place.source)links.push('<a target="_blank" rel="noopener" href="'+esc(place.source)+'">查看官方資訊 ↗</a>');
    if(tel)links.push('<a href="tel:'+esc(tel.replace(/\D/g,''))+'">☎ 致電詢問 '+esc(tel)+'</a>');
    const note=e.alert||tip||'';
    return '<article class="timeline-event event-'+esc(e.kind)+'">'+
      '<time class="event-time">'+esc(e.time)+'</time>'+
      '<div class="timeline-marker"><span class="marker-dot">'+(icons[e.kind]||'✳')+'</span></div>'+
      '<div class="event-detail">'+
        '<div class="event-meta"><span class="event-category">'+esc(kindLabels[e.kind]||'旅行')+'</span><span class="event-duration">/ '+esc(e.duration||'')+'</span></div>'+
        '<div class="event-title"><h4>'+esc(title)+'</h4>'+(e.locked?'<span class="locked-pill">✓ '+(e.kind==='vote'?'先投票再出發':'週日早餐已固定')+'</span>':'')+mealTag+'</div>'+
        '<p>'+esc(desc)+'</p>'+
        (here?'<div class="event-place">📍 '+esc(here)+'</div>':'')+
        (note?'<div class="event-alert"><span>!</span><span>'+esc(note)+'</span></div>':'')+
        (links.length?'<div class="event-links">'+links.join('')+'</div>':'')+
      '</div></article>';
  }
  function routeRail(day){
    const labels=day==='sat'?(state.mode==='rain'?['泰山','北投投票','金車海洋館','午餐','飯店','晚餐']:['泰山','北投投票','五峰旗','午餐','林美','飯店','晚餐']):(state.mode==='rain'?['飯店早餐','蘭陽博物館','午餐','泰山']:['飯店早餐','外澳','午餐','北關','泰山']);
    return '<div class="route-rail"><div class="route-rail-title"><span>ROAD TRIP / '+(state.mode==='rain'?'☔ 雨天備案':'☀️ 原定路線')+'</span><span>地圖會依葷素與天氣版本更新</span></div><div class="route-rail-track">'+
      labels.map(function(n,i){return '<div class="route-rail-stop"><span class="route-rail-dot">'+(i+1)+'</span><span>'+esc(n)+'</span></div>';}).join('')+'</div></div>';
  }
  function dayHtml(day){
    const d=days[day],stops=getStops(day),rain=state.mode==='rain';
    const title=rain?(day==='sat'?'先投票，再進室內慢慢玩。':'雨天看山海，也能很舒服。'):d.title;
    return '<section class="itinerary-day" aria-label="'+(day==='sat'?'週六':'週日')+'行程">'+
      '<div class="day-banner '+(day==='sun'?'sunday':'')+'"><div><small>'+esc(d.label)+(rain?' · RAIN PLAN':'')+'</small><h3>'+esc(title)+'</h3><p>'+esc(d.subtitle)+'</p></div>'+
      '<div class="day-banner-right"><strong>'+esc(d.date)+'</strong>'+
      (day==='sat'?'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'poll'))+'">泰山 → 北投投票 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'day'))+'">北投 → 礁溪 '+(rain?'雨備':'山線')+' ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'evening'))+'">晚間導航 ↗</a>':'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day))+'">'+(rain?'雨備＋返家':'海線＋返家')+'導航 ↗</a>')+
      '</div></div>'+
      '<div class="timeline">'+stops.map(function(e,i){return eventHtml(e,i,stops,day);}).join('')+'</div>'+routeRail(day)+
      '<div class="day-endnote">✳ '+esc(rain?d.rainEndnote:d.endnote)+'</div></section>';
  }
  function compareHtml(){
    const data=[meals.satLunch,meals.satDinner,meals.sunLunch];
    const names=[['DAY 01','週六午餐'],['DAY 01','週六晚餐'],['DAY 02','週日午餐']];
    const rows=data.map(function(m,i){
      function cell(k){
        const c=m[k],hl=state.diet===k?' active':'';
        return '<div class="compare-item'+hl+'"><h3>'+esc(c.name)+'</h3><p>'+esc(c.type)+'<br>'+esc(c.hours)+'</p><a href="'+esc(directionsUrl(c.address))+'" target="_blank" rel="noopener">導航前往 ↗</a>　<a href="'+esc(mapUrl(c.address))+'" target="_blank" rel="noopener">查看地點 ↗</a></div>';
      }
      return '<div class="meal-row"><div class="meal-name">'+names[i][1]+'<span>'+names[i][0]+'</span></div>'+cell('meat')+cell('veg')+'</div>';
    }).join('');
    return '<div class="meal-comparison"><div class="compare-heading"><div>MEAL PLAN</div><div>🍖 葷食選擇</div><div>🌿 素食選擇</div></div>'+rows+'</div>'+
       '<div class="breakfast-fixed"><span>☼</span><div><strong>週日早餐｜長榮鳳凰酒店・桂冠自助餐廳</strong><small>兩種版本皆固定飯店早餐，預計 08:30–09:30 用餐（不另排外部早餐）。</small></div></div>';
  }
  function render(){
    document.getElementById('itinerary').innerHTML=(state.day==='all'?['sat','sun']:[state.day]).map(dayHtml).join('');
    document.getElementById('mealComparison').innerHTML=compareHtml();
    document.getElementById('activeModeText').textContent='目前顯示：'+(state.diet==='veg'?'🌿 素食':'🍖 葷食')+'・'+(state.mode==='rain'?'☔ 雨天備案':'☀️ 原定景觀');
    document.querySelectorAll('[data-diet]').forEach(function(b){const v=b.dataset.diet===state.diet;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-day]').forEach(function(b){const v=b.dataset.day===state.day;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-mode]').forEach(function(b){const v=b.dataset.mode===state.mode;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
  }
  function setRouteMode(mode,scrollToSchedule){
    if(mode!=='rain'&&mode!=='sunny')return;
    state.mode=mode;
    try{localStorage.setItem('yilan_route_mode',mode);}catch(e){}
    render();showToast('已切換 '+(mode==='rain'?'☔ 雨天備案':'☀️ 原定景觀')+'，導航也同步更新');
    if(scrollToSchedule&&document.getElementById('schedule').scrollIntoView)document.getElementById('schedule').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function textPlan(){
    const label=state.diet==='veg'?'素食':'葷食';
    const lines=['宜蘭礁溪兩天一夜｜2026/11/28（六）～11/29（日）｜'+label+'｜'+(state.mode==='rain'?'雨天備案':'原定景觀'),
       '週六先從新北市泰山區仁愛路到北投國小投票（北投區中央北路一段73號），再從北投開往礁溪。',
       '投票時間 08:00–16:00；請核對本人投票通知單與投票教室。',
       '住宿：礁溪長榮鳳凰酒店；週日早餐固定飯店桂冠自助餐廳','',''];
    ['sat','sun'].forEach(function(k){
      lines.push(k==='sat'?'【週六・先投票，後礁溪】':'【週日・海線或雨天室內備案】');
      getStops(k).forEach(function(e){
        const m=e.meal?meals[e.meal][state.diet]:null;
        lines.push(e.time+'  '+(m?m.name:e.title)+(m?'｜'+m.address:''));
      });
      if(k==='sat'){lines.push('泰山→北投國小投票導航：'+routeUrl(k,'poll'));lines.push('北投國小→礁溪導航：'+routeUrl(k,'day'));lines.push('週六晚間導航：'+routeUrl(k,'evening'));}
      else{lines.push('週日返家導航（飯店→泰山）：'+routeUrl(k));}
      lines.push('');
    });
    lines.push('最新天氣可在網頁「天氣預報」區更新（未能即時取得時顯示 2026/11/21 的 AccuWeather 55%／0% 備援）。');
    lines.push('提醒：林美石磐只開放 0–0.9K；五峰旗以現場開放為準；海邊強風勿靠近礁岩。');
    lines.push('資料：中選會、中央氣象署、AccuWeather、Open-Meteo、博物館、金車生技與飯店官網。');
    return lines.join('\n');
  }
  let toastTimer;
  function showToast(s){
    const t=document.getElementById('toast');t.textContent=s;t.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove('show');},2700);
  }
  function fallbackCopy(str){
    const ta=document.createElement('textarea');ta.value=str;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.focus();ta.select();
    let ok=false;try{ok=document.execCommand('copy');}catch(e){ok=false;}ta.remove();return ok;
  }

  // 公開 Open-Meteo API 可免金鑰顯示即時更新的長天期預報；失敗時保留 AccuWeather 11/21 查詢的備援數值。
  function weatherDescription(code){
    if(code===0)return '晴朗';if(code===1||code===2)return '晴時多雲';if(code===3)return '多雲';
    if(code===45||code===48)return '霧或低雲';
    if(code>=51&&code<=67)return '陰或短暫雨';
    if(code>=71&&code<=77)return '可能降雪';
    if(code>=80&&code<=82)return '陣雨';if(code>=95)return '雷陣雨';
    return '天氣多變';
  }
  function applyForecast(daily){
    for(const [date,suffix] of [['2026-11-28','Sat'],['2026-11-29','Sun']]){
      const i=daily.time.indexOf(date);
      if(i<0)throw Error('Forecast date unavailable: '+date);
      const rain=daily.precipitation_probability_max[i];
      const lo=daily.temperature_2m_min[i],hi=daily.temperature_2m_max[i];
      const code=daily.weather_code[i];
      if(!Number.isFinite(rain)||!Number.isFinite(lo)||!Number.isFinite(hi))throw Error('Forecast missing values');
      document.getElementById('rain'+suffix).textContent=Math.round(rain)+'%';
      document.getElementById('weather'+suffix+'Temp').textContent=Math.round(lo)+'–'+Math.round(hi)+'°C';
      document.getElementById('weather'+suffix+'Desc').textContent=weatherDescription(code);
      document.getElementById('rain'+suffix+'Bar').style.width=Math.min(100,Math.max(0,rain))+'%';
    }
  }
  let forecastBusy=false;
  async function refreshWeather(){
    if(typeof fetch!=='function'||forecastBusy)return;
    forecastBusy=true;
    const btn=document.getElementById('refreshWeatherBtn');
    btn.disabled=true;btn.textContent='更新中…';
    const status=document.getElementById('weatherStatus');
    try{
      const query=new URLSearchParams({latitude:'24.82',longitude:'121.77',daily:'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
        timezone:'Asia/Taipei',start_date:'2026-11-28',end_date:'2026-11-29'});
      const ctl=new AbortController();const timer=setTimeout(()=>ctl.abort(),12000);
      let response;
      try{response=await fetch('https://api.open-meteo.com/v1/forecast?'+query,{signal:ctl.signal,cache:'no-store'});}finally{clearTimeout(timer);}
      if(!response.ok)throw Error('Forecast HTTP '+response.status);
      const data=await response.json();
      if(!data.daily||!Array.isArray(data.daily.time))throw Error('No daily forecast');
      applyForecast(data.daily);
      const stamp=new Intl.DateTimeFormat('zh-TW',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
      status.textContent='已更新 '+stamp+'｜Open-Meteo 礁溪附近預報（每日最高降雨機率），長天期可能變動；與其他預報服務的數字不一定一致。';
    }catch(e){
      status.textContent='無法連線更新｜仍顯示 2026/11/21 AccuWeather 10日預報備援（11/28 約55%、11/29 約0%）。出發前請看中央氣象署。';
    }finally{forecastBusy=false;btn.disabled=false;btn.textContent='↻ 更新天氣';}
  }

  document.getElementById('dietControls').addEventListener('click',function(ev){
    const b=ev.target.closest('button[data-diet]');if(!b)return;
    state.diet=b.dataset.diet;try{localStorage.setItem('yilan_diet',state.diet);}catch(e){}render();showToast('已切換為'+(state.diet==='veg'?'素食':'葷食')+'版，餐廳與路線同步更新');
  });
  document.getElementById('dayControls').addEventListener('click',function(ev){const b=ev.target.closest('button[data-day]');if(!b)return;state.day=b.dataset.day;render();});
  document.getElementById('routeModeControls').addEventListener('click',function(ev){const b=ev.target.closest('button[data-mode]');if(!b)return;setRouteMode(b.dataset.mode,false);});
  document.getElementById('activateRainBtn').addEventListener('click',function(){setRouteMode('rain',true);});
  document.getElementById('resetDryBtn').addEventListener('click',function(){setRouteMode('sunny',true);});
  document.getElementById('refreshWeatherBtn').addEventListener('click',refreshWeather);
  document.getElementById('copyBtn').addEventListener('click',async function(){
    const s=textPlan();let ok=false;
    if(navigator.clipboard&&navigator.clipboard.writeText){try{await navigator.clipboard.writeText(s);ok=true;}catch(e){}}
    if(!ok)ok=fallbackCopy(s);
    showToast(ok?'已複製兩天行程與導航連結':'瀏覽器限制複製；可用列印／PDF 保存');
  });
  document.getElementById('printBtn').addEventListener('click',function(){window.print();});
  try{const saved=localStorage.getItem('yilan_diet');if(saved==='veg'||saved==='meat')state.diet=saved;const mode=localStorage.getItem('yilan_route_mode');if(mode==='rain'||mode==='sunny')state.mode=mode;}catch(e){}
  render();
  if(typeof fetch==='function')refreshWeather();
})();