/* 宜蘭山海慢旅：完全本地運作，不需框架或 API Key */
'use strict';
(function () {
  const hotel = '宜蘭縣礁溪鄉健康路77號 長榮鳳凰酒店';
  const places = {
    departure: {name:'泰山仁愛路',address:'新北市泰山區仁愛路, 台灣',note:'出發／返家起點為新北市泰山區仁愛路；未提供門牌，請在 Google 地圖確認實際上車位置。'},
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
      title:'先進山裡，再泡進溫泉。',
      date:'11 / 21',
      label:'DAY 01 · SATURDAY',
      subtitle:'礁溪山線｜五峰旗・林美石磐・長榮鳳凰',
      endnote:'今天的重點不是爬完所有步道，而是把森林與溫泉好好享受。五峰旗若有現場落石管制，不要進入封閉區。',
      stops:[
        {time:'09:10',kind:'move',title:'泰山仁愛路出發',duration:'依國五路況調整',description:'從新北市泰山區仁愛路出發，往國道 5 號前進。起點未指定門牌，請在 Google 地圖確認導航定位；假日車流以即時資訊為準。',place:'departure'},
        {time:'10:35',kind:'nature',title:'五峰旗瀑布｜聽森林的聲音',duration:'約 50–60 分鐘',description:'從風景區入口沿步道賞瀑，輕鬆走到開放的觀景點；瀑布水氣與山林很適合拍照。',place:'wufengqi',alert:'近期有上層賞瀑平台坍方／管制資訊；以當日現場公告及實際開放範圍為準。'},
        {time:'12:05',kind:'food',meal:'satLunch',duration:'約 60–70 分鐘'},
        {time:'13:30',kind:'nature',title:'林美石磐步道｜溪谷輕健行',duration:'約 60–70 分鐘',description:'沿溪谷走進森林與水圳步道，欣賞綠蔭、岩壁與溪流。路線到 0.9K 封閉點就折返，不走全環線。',place:'linmei',alert:'官方公告 2026/09/11 起只開放 0–0.9K，後段邊坡不穩，務必原路折返。'},
        {time:'15:00',kind:'stay',title:'長榮鳳凰酒店｜辦理入住',duration:'入住時間 15:00 後',description:'回到礁溪市區，入住酒店、放好行李。週六下午留給自己一段慢慢放鬆的時間。',place:'hotel'},
        {time:'16:10',kind:'relax',title:'飯店溫泉 SPA｜暖暖放鬆',duration:'約 90 分鐘',description:'享受飯店泡湯、水療與休憩設施；使用規定與泳裝泳帽需求依飯店現場公告。',place:'hotel'},
        {time:'18:00',kind:'food',meal:'satDinner',duration:'約 75 分鐘'},
        {time:'19:45',kind:'walk',title:'湯圍溝溫泉公園｜夜間散步',duration:'約 30–45 分鐘',description:'在礁溪街區散步看溫泉夜景，回酒店後早點休息。可按體力直接跳過。',place:'tangweigou'}
      ]
    },
    sun:{
      title:'早餐慢慢吃，然後去看海。',
      date:'11 / 22',
      label:'DAY 02 · SUNDAY',
      subtitle:'頭城海線｜飯店早餐・外澳海灘・北關海潮',
      endnote:'外澳與北關靠海，東北季風時風浪較強；以看海、拍照、輕鬆漫步為主，不安排下水。',
      stops:[
        {time:'08:30',kind:'fixed',title:'長榮鳳凰酒店｜桂冠早餐',duration:'建議 08:30–09:30',description:'已確認使用飯店早餐。桂冠自助餐廳早午餐有 08:30–10:00 時段；實際入場時段以訂房專案及飯店安排為準。素食者請確認湯底、調味與蛋奶成分。',place:'hotel',locked:true},
        {time:'10:30',kind:'stay',title:'整理行李・辦理退房',duration:'11:00 前完成',description:'把泳衣、手機充電器與隨身物品收好，再出發前往頭城海岸線。',place:'hotel'},
        {time:'11:20',kind:'coast',title:'外澳海灘｜望向龜山島',duration:'約 60 分鐘',description:'漫步黑沙海岸與海堤，欣賞龜山島與太平洋。外澳服務區有公廁、休憩及咖啡。',place:'waiao'},
        {time:'12:40',kind:'food',meal:'sunLunch',duration:'約 60–75 分鐘'},
        {time:'14:15',kind:'coast',title:'北關海潮公園｜礁岩觀浪',duration:'約 50–60 分鐘',description:'沿著海蝕地形步道看浪花拍打礁岩，從高處欣賞東北角海岸。步道有階梯，步伐放慢。',place:'beiguan',alert:'2026/10–2027/12 賣店施工；園區步道、停車場及公廁照常開放。'},
        {time:'15:20',kind:'move',title:'返回泰山仁愛路',duration:'依國五及沿海路況',description:'旅程結束，從北關海潮公園開導航返回新北市泰山區仁愛路。以即時路況挑選北返路線與休息站。',place:'departure'}
      ]
    }
  };
  const icons={move:'↗',nature:'✿',food:'♨',stay:'⌂',relax:'♨',walk:'☾',fixed:'✓',coast:'≈'};
  const kindLabels={move:'交通',nature:'自然景觀',food:'在地美食',stay:'住宿',relax:'溫泉時光',walk:'慢步調',fixed:'已固定',coast:'海岸景觀'};
  const state={diet:'meat',day:'all'};
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
    if(day==='sat'&&phase==='evening')return directionsUrl(hotel,hotel,[meals.satDinner[chosen].address,places.tangweigou.address]);
    if(day==='sat')return directionsUrl(hotel,places.departure.address,[places.wufengqi.address,meals.satLunch[chosen].address,places.linmei.address]);
    return directionsUrl(places.departure.address,hotel,[places.waiao.address,meals.sunLunch[chosen].address,places.beiguan.address]);
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
        '<div class="event-title"><h4>'+esc(title)+'</h4>'+(e.locked?'<span class="locked-pill">✓ 週日早餐已固定</span>':'')+mealTag+'</div>'+
        '<p>'+esc(desc)+'</p>'+
        (here?'<div class="event-place">📍 '+esc(here)+'</div>':'')+
        (note?'<div class="event-alert"><span>!</span><span>'+esc(note)+'</span></div>':'')+
        (links.length?'<div class="event-links">'+links.join('')+'</div>':'')+
      '</div></article>';
  }
  function routeRail(day){
    const labels=day==='sat'?['泰山仁愛路','五峰旗','午餐','林美石磐','飯店','晚餐','湯圍溝','飯店']:['飯店早餐','外澳','午餐','北關','泰山仁愛路'];
    return '<div class="route-rail"><div class="route-rail-title"><span>ROAD TRIP / 路線順序</span><span>點上方「山線／晚間／海線」開啟 Google 地圖</span></div><div class="route-rail-track">'+
      labels.map(function(n,i){return '<div class="route-rail-stop"><span class="route-rail-dot">'+(i+1)+'</span><span>'+esc(n)+'</span></div>';}).join('')+'</div></div>';
  }
  function dayHtml(day){
    const d=days[day];
    return '<section class="itinerary-day" aria-label="'+(day==='sat'?'週六':'週日')+'行程">'+
      '<div class="day-banner '+(day==='sun'?'sunday':'')+'"><div><small>'+esc(d.label)+'</small><h3>'+esc(d.title)+'</h3><p>'+esc(d.subtitle)+'</p></div>'+
      '<div class="day-banner-right"><strong>'+esc(d.date)+'</strong>'+
      (day==='sat'?'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'day'))+'">山線導航 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'evening'))+'">晚間導航 ↗</a>':'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day))+'">海線＋返家導航 ↗</a>')+
      '</div></div>'+
      '<div class="timeline">'+d.stops.map(function(e,i){return eventHtml(e,i,d.stops,day);}).join('')+'</div>'+routeRail(day)+
      '<div class="day-endnote">✳ '+esc(d.endnote)+'</div></section>';
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
    document.getElementById('activeModeText').textContent='目前顯示：'+(state.diet==='veg'?'🌿 素食版':'🍖 葷食版');
    document.querySelectorAll('[data-diet]').forEach(function(b){const v=b.dataset.diet===state.diet;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-day]').forEach(function(b){const v=b.dataset.day===state.day;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
  }
  function textPlan(){
    const label=state.diet==='veg'?'素食':'葷食';
    const lines=['宜蘭礁溪兩天一夜｜2026/11/21（六）～11/22（日）｜'+label+'版本','出發及返程：新北市泰山區仁愛路（未指定門牌，請確認 Google 地圖定位）','住宿：礁溪長榮鳳凰酒店；週日早餐已固定在飯店','',''];
    ['sat','sun'].forEach(function(k){
      lines.push(k==='sat'?'【週六・山林與溫泉】':'【週日・海岸與早餐】');
      days[k].stops.forEach(function(e){
        const m=e.meal?meals[e.meal][state.diet]:null;
        lines.push(e.time+'  '+(m?m.name:e.title)+(m?'｜'+m.address:''));
      });
      if(k==='sat'){lines.push('週六山線導航（泰山→飯店）：'+routeUrl(k,'day'));lines.push('週六晚間導航（飯店→晚餐→湯圍溝→飯店）：'+routeUrl(k,'evening'));}else{lines.push('週日海線與返家導航（飯店→泰山）：'+routeUrl(k));}
      lines.push('');
    });
    lines.push('提醒：林美石磐只開放 0–0.9K；五峰旗以現場開放為準；北關賣店施工但步道開放。');
    lines.push('來源：飯店官網、林業保育署、東北角風景區管理處、宜蘭縣觀光資訊。');
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
  document.getElementById('dietControls').addEventListener('click',function(ev){
    const b=ev.target.closest('button[data-diet]');if(!b)return;
    state.diet=b.dataset.diet;try{localStorage.setItem('yilan_diet',state.diet);}catch(e){}render();showToast('已切換為'+(state.diet==='veg'?'素食':'葷食')+'版，餐廳與路線同步更新');
  });
  document.getElementById('dayControls').addEventListener('click',function(ev){const b=ev.target.closest('button[data-day]');if(!b)return;state.day=b.dataset.day;render();});
  document.getElementById('copyBtn').addEventListener('click',async function(){
    const s=textPlan();let ok=false;
    if(navigator.clipboard&&navigator.clipboard.writeText){try{await navigator.clipboard.writeText(s);ok=true;}catch(e){}}
    if(!ok)ok=fallbackCopy(s);
    showToast(ok?'已複製兩天行程與導航連結':'瀏覽器限制複製；可用列印／PDF 保存');
  });
  document.getElementById('printBtn').addEventListener('click',function(){window.print();});
  try{const saved=localStorage.getItem('yilan_diet');if(saved==='veg'||saved==='meat')state.diet=saved;}catch(e){}
  render();
})();