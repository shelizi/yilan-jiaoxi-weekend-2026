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
    longtan: {name:'龍潭湖風景區',address:'宜蘭縣礁溪鄉龍潭村環湖路1號',source:'https://travel.yilan.gov.tw/zh-tw/attraction/104/'},
    tangweigou: {name:'湯圍溝溫泉公園',address:'宜蘭縣礁溪鄉德陽路99之11號',source:'https://travel.yilan.gov.tw/zh-tw/attraction/92/'},
    meihua: {name:'梅花湖風景區',address:'宜蘭縣冬山鄉得安村大埤路1號',source:'https://travel.yilan.gov.tw/zh-tw/attraction/392/'},
    sanqing: {name:'道教總廟三清宮',address:'宜蘭縣冬山鄉三清路123號',source:'https://travel.yilan.gov.tw/zh-tw/attraction/432/'},
    waiao: {name:'外澳海灘／外澳服務區',address:'宜蘭縣頭城鎮濱海路二段6號',source:'https://www.necoast-nsa.gov.tw/Attraction-Content.aspx?a=277&l=1'},
    beiguan: {name:'北關海潮公園',address:'北關海潮公園 宜蘭縣頭城鎮',source:'https://www.necoast-nsa.gov.tw/Attraction-Content.aspx?a=274&l=1'}
  };
  const meals = {
    satLunch: {
      time:'週六午餐',
      meat:{name:'拾松辦桌小吃',type:'宜蘭在地辦桌風味',desc:'西魯肉、糕渣、卜肉等經典宜蘭菜；靠近五峰旗一帶，適合中午順遊。',address:'宜蘭縣礁溪鄉奇峰街36號',hours:'11:00–14:00 / 17:00–20:00',phone:'03-988-1136',tip:'假日客多，出發前先確認現場候位。'},
      veg:{name:'Mercy 暮曦蔬食創意料理',type:'礁溪創意蔬食｜米披薩、野菇義大利麵、養生鍋物',desc:'精緻創意蔬食，品項包含米披薩、野菇食蔬番茄義大利麵、蒙古養生蔬食鍋物；Google 地圖約 4.9 星、500 則以上評論，適合旅行中安排一餐輕鬆的在地蔬食。',address:'宜蘭縣礁溪鄉玉龍路一段55號',hours:'週六 11:30–20:00（最後點餐約 19:00）',phone:'03-988-8276',price:'約 NT$200–400／人',tip:'週六營業 11:30–20:00，最晚點餐約 19:00；建議先電話確認是否可訂位、當日供餐與素別。',source:'https://www.gomaji.com/store/230002',feature:'約 500 則 Google 評論・創意蔬食・明亮用餐空間',note:'公開資料標示週六營業與約 NT$200–400／人；菜單含焗烤起司，並非全素；店內空間較適合小家庭或三五好友，並非大型宴會型；若需全素、無五辛或確認奶蛋成分，請先電話詢問。'}
    },
    satDinner: {
      time:'週六晚餐',
      meat:{name:'御園料理',type:'台式海鮮與熱炒',desc:'礁溪在地台菜、海鮮與熱炒，安排在飯店休息後用餐。',address:'宜蘭縣礁溪鄉中山路二段172號',hours:'週六 17:00–22:30（資料平台顯示）',phone:'03-987-4292',tip:'營業時間各平台略有差異，請先電話確認。'},
      veg:{name:'長春素食名人館（礁溪）',type:'礁溪在地｜宜蘭蔬食手路菜・大型餐廳',desc:'礁溪人返鄉開設的特色蔬食餐廳，以素食演繹宜蘭糕渣、西魯魚翅羹等經典台菜；有主題包廂與大型停車場。適合多人分享料理。',address:'宜蘭縣礁溪鄉礁溪路三段12號',hours:'週六晚餐 17:00–20:30；內用點餐約 19:00 截止',phone:'03-928-1236',price:'抓 NT$500–900／人（多人分食、含服務費估算）',tip:'菜單依份數單點、加收 10% 服務費。建議先訂 18:15～18:30，並請店家協助以每人 1,000 元內搭配菜色。全素／蛋奶／五辛請確認。',source:'https://gotaiwan.net/blog/changchun-veg-jiaoxi/',feature:'2026 年礁溪新店・主題包廂・大型停車場',note:'屬多人分食預算估算，依實際點菜人數及加購品項而異。'}
    }
  };
  const days = {
    sat:{
      title:'投票後先走龍潭湖，再回礁溪泡湯。',
      date:'11 / 28',
      label:'DAY 01 · SATURDAY · 投票日',
      subtitle:'泰山 → 北投國小投票 → 龍潭湖 → 礁溪午餐 → 飯店溫泉',
      endnote:'龍潭湖與礁溪市區同屬礁溪生活圈，先短走湖畔、再到附近午餐，最後回飯店入住，不必繞去頭城。短版停留約50–60分鐘；想完整環湖可拉長到90–120分鐘。國5塞車時可直接跳過龍潭湖，按「塞車直達午餐」。',
      rainEndnote:'雨天跳過龍潭湖湖畔與木棧道，改金車室內海洋生態館；午餐後回飯店休息，15:00後入住與泡湯。晚間湯圍溝視雨勢決定是否前往。',
      stops:[
        {time:'08:30',kind:'move',title:'泰山仁愛路出發｜先到北投國小',duration:'車程約 25–35 分鐘，依市區路況',description:'08:30 從泰山仁愛路出發前往北投國小；預估約09:00抵達，實際依當天市區路況調整。泰山仁愛路未提供門牌，請先確認實際上車定位與停車安排。',place:'departure'},
        {time:'09:00',kind:'vote',title:'北投國小｜先投票',duration:'預留 45–60 分鐘',description:'預估09:00抵達北投國小後投票。投票時間 08:00–16:00；請先核對通知單上的投票所及教室，排隊時間依現場為準，不必為趕行程縮短投票時間。',place:'beitou',locked:true,alert:'這裡是預定的投票地點，不代表已核實個人投票資格或所屬投票所；請以中選會查詢及通知單為準。'},
        {time:'09:45',kind:'move',title:'投票後從北投國小開往礁溪',duration:'預計09:45–10:00離開，依投票排隊情況調整',description:'預計09:45–10:00完成投票後從北投國小啟程往礁溪；若排隊較久，依實際完成時間出發。11/28 國5南向09:00–16:00預估易壅塞，龍潭湖抵達時間以當日導航為準，交通延誤時優先略過湖區直達午餐。',place:'beitou'},
        {time:'12:00',kind:'nature',title:'龍潭湖｜湖畔步道與木棧道',duration:'短版約 40–50 分鐘',description:'預留約12:00抵達，實際依北投投票與國5車流調整。宜蘭五大名湖中面積最大的天然湖泊，三面環山；這次只走湖畔精華段，若交通延誤就直接跳過，不壓縮午餐與入住時間。',place:'longtan',alert:'湖畔與木棧道雨後濕滑；湖區無明確閉園時間，停車及現場設施依管理站公告。'},
        {time:'12:45',kind:'food',meal:'satLunch',duration:'約 60–75 分鐘'},
        {time:'14:15',kind:'nature',title:'林美石磐步道｜加碼選項',duration:'約 55–65 分鐘',description:'只有選擇「加走林美」且時間充裕才安排；目前僅開放0–0.9公里，原路折返。若投票、國5或午餐延誤，直接略過，保留飯店入住與泡湯。',place:'linmei',alert:'林美石磐步道0.9K後封閉；遇大雨與雷雨請取消步道行程。'},
        {time:'15:40',kind:'stay',title:'長榮鳳凰酒店｜辦理入住',duration:'入住時間 15:00 後',description:'回到礁溪市區辦理入住，放好行李，留時間享受飯店設施。',place:'hotel'},
        {time:'16:45',kind:'relax',title:'飯店溫泉 SPA｜放鬆一下',duration:'約 80–90 分鐘',description:'享用飯店泡湯與水療設施；開放時間、入場方式與泳裝要求以館方為準。',place:'hotel'},
        {time:'18:15',kind:'food',meal:'satDinner',duration:'約 75 分鐘'},
        {time:'19:45',kind:'walk',title:'湯圍溝溫泉公園｜夜間泡腳散步',duration:'約 40–60 分鐘',description:'飯店到公園約0.8公里，建議步行約10分鐘，不必為了這一站重新移車。泡腳區免費，晚上可散步看礁溪溫泉街；泡腳池注水時水溫可能偏高，留意現場公告。',place:'tangweigou'}
      ]
    },
    sun:{
      title:'早午餐後慢遊冬山，北返台北吃晚餐。',
      date:'11 / 29',
      label:'DAY 02 · SUNDAY',
      subtitle:'飯店早午餐 → 退房／行李寄放 → 梅花湖 → 三清宮 → 台北晚餐 → 泰山',
      endnote:'週日10:00–11:30飯店早午餐，不另排午餐；11:00前退房、寄放行李，餐後領取。12:15梅花湖、13:40三清宮，14:30北返台北；17:30晚餐（餐廳待定），餐後回泰山。晚餐時間依國5及市區路況彈性調整。',
      rainEndnote:'早午餐、退房與寄放行李照常；大雨取消梅花湖與三清宮，11:30取行李後直接北返台北，下午自由活動，17:30晚餐（餐廳待定）後回泰山。',
      stops:[
        {time:'10:00',kind:'fixed',title:'長榮鳳凰酒店｜桂冠早午餐',duration:'10:00–11:30（11:00前先完成退房）',description:'10:00入席享用飯店桂冠自助早午餐。請先整理好行李，約10:45暫離餐廳辦理退房，11:00前將行李交由大廳／櫃檯寄放，再回餐廳用餐至11:30。素食者請確認調味與蛋奶成分。',place:'hotel',locked:true},
        {time:'11:00',kind:'stay',title:'辦理退房｜行李寄放大廳',duration:'11:00前完成',description:'退房後將行李寄放飯店大廳／行李櫃檯，不必提著行李逛景點；早午餐結束後再領取。行李寄存依飯店現場服務流程辦理。'},
        {time:'11:30',kind:'move',title:'領取行李・取車前往冬山',duration:'預留45分鐘含領行李、車程及停車',description:'早午餐結束後回大廳領取寄放行李，再取車直接前往梅花湖，不另安排午餐。',place:'hotel'},
        {time:'12:15',kind:'nature',title:'梅花湖｜環湖散步與湖心吊橋',duration:'約 70 分鐘',description:'三面環山的天然湖泊，環湖路約2.2公里，可步行或租自行車；湖心小島與吊橋是主要景觀。一般入園免費，停車、租車與遊湖船另計。',place:'meihua',alert:'官方景區開放時間09:00–17:30；遊湖船冬季營運時間可能調整，雨大或風浪時可能停航。'},
        {time:'13:40',kind:'culture',title:'道教總廟三清宮｜參拜與俯瞰梅花湖',duration:'約 50 分鐘',description:'位在梅花湖旁山腰，可俯瞰湖景與蘭陽平原。由梅花湖開車約7分鐘；也可步行上山約15分鐘，但坡度較陡，這次自駕建議直接開上去並使用廟方停車場。',place:'sanqing',alert:'週日開放05:00–22:00；參拜時尊重廟方動線與安靜規範。'},
        {time:'14:30',kind:'move',title:'離開冬山｜北返台北',duration:'預留約3小時含假日車流緩衝',description:'由三清宮直接北返台北；晚餐時間依國5／雪隧及市區路況調整。'},
        {time:'17:30',kind:'food',title:'台北晚餐｜餐廳待定',duration:'約60–75分鐘，抵達後彈性調整',description:'回到台北再吃晚餐；葷食與素食均可，餐廳尚未指定、未訂位。'},
        {time:'18:45',kind:'move',title:'晚餐後返回泰山仁愛路',duration:'依餐廳位置及路況',description:'台北晚餐後返家；餐廳尚未確定，使用目前位置導航返回泰山。',place:'departure'}
      ]
    }
  };
  // 雨天時只調整戶外景點；週日早午餐、退房與行李寄放流程，以及葷素餐廳皆保留。
  function getStops(day){
    const base=days[day].stops.map(s=>({...s}));
    if(state.mode!=='rain'){
      // 週六預設少繞路：龍潭湖＋午餐＋飯店；加走林美需另留時間。
      if(day==='sat'&&state.pace==='relaxed'){
        base[5]={time:'14:15',kind:'relax',title:'回飯店周邊休息・寄放行李',duration:'自由安排約 40–60 分鐘',description:'午餐後直接回飯店，不再加走林美石磐；可詢問寄放行李，客房仍以15:00後入住為準。',place:'hotel'};
        base[6].time='15:15';
        base[7].time='16:15';
      }
      return adjustVegetarianTiming(base,day,false);
    }
    if(day==='sat'){
      base[3]={time:'12:00',kind:'indoor',title:'金車生技｜全室內海洋生態館',duration:'約 60–80 分鐘',description:'室內參觀海洋生物、鯊魚與魟魚展示，園區官方資訊為每日08:00–17:00；建議依天氣及現場入場規定調整。',place:'marine'};
      base[4].time='13:00';
      base[5]={time:'14:30',kind:'relax',title:'飯店室內休息・等待入住',duration:'約 40–60 分鐘',description:'午後雨勢若持續，直接回飯店。可先詢問寄放行李、在公共空間休息；不預設可提早取得客房。',place:'hotel'};
      base[6].time='15:30';      base[7].time='16:20';
      base[9]={time:'19:45',kind:'relax',title:'雨夜留在飯店放鬆',duration:'自由安排',description:'取消戶外湯圍溝散步，留在飯店休息；雨若停再依現場情況安排。',place:'hotel'};
      return adjustVegetarianTiming(base,day,true);
    }
    // 週日大雨取消冬山景點，早午餐後直接北返，保留台北晚餐。
    return [
      ...base.slice(0,2),
      {time:'11:30',kind:'move',title:'領取行李・取車直接北返台北',duration:'依即時路況',description:'早午餐後領取寄放行李；大雨取消梅花湖與三清宮，不另排午餐。',place:'hotel'},
      {time:'14:00',kind:'relax',title:'台北自由活動・室內休息',duration:'抵達後彈性安排',description:'提早回台北避雨，晚餐前自由安排。'},
      ...base.slice(-2)
    ];
  }
  // 精緻套餐需較長用餐時間；素食版的停留時間一併調整。
  function adjustVegetarianTiming(stops,day,isRain){
    if(state.diet!=='veg')return stops;
    function set(meal,when,duration){const e=stops.find(x=>x.meal===meal);if(e){e.time=when;e.duration=duration;}}
    if(day==='sat'){
      set('satLunch',isRain?'13:00':'12:45','約 60–75 分鐘');
      set('satDinner','18:15','約 70–80 分鐘（預訂制）');
      if(isRain){
        if(stops[5]){stops[5].time='14:30';stops[5].duration='約 30–45 分鐘';}
        if(stops[6])stops[6].time='15:30';
        if(stops[7])stops[7].time='16:20';
      }else if(state.pace==='relaxed'){
        if(stops[5]){stops[5].time='14:15';stops[5].duration='自由安排約 30–50 分鐘';}
        if(stops[6])stops[6].time='15:15';
        if(stops[7]){stops[7].time='16:15';stops[7].duration='約 80–90 分鐘';}
      }else{
        if(stops[5]){stops[5].time='14:15';stops[5].duration='約 55–65 分鐘';}
        if(stops[6])stops[6].time='15:40';
        if(stops[7]){stops[7].time='16:45';stops[7].duration='約 60–70 分鐘';}
      }
    }
    return stops;
  }
  const icons={move:'↗',vote:'✓',nature:'✿',culture:'🏯',indoor:'⌂',food:'♨',stay:'⌂',relax:'♨',walk:'☾',fixed:'✓',coast:'≈'};
  const kindLabels={move:'交通',vote:'選舉投票',nature:'自然景觀',culture:'寺廟文化',indoor:'室內生態',food:'在地美食',stay:'住宿',relax:'溫泉時光',walk:'慢步調',fixed:'已固定',coast:'海岸景觀'};
  const state={diet:'meat',day:'all',mode:'sunny',pace:'relaxed'};
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
      if(phase==='traffic')return directionsUrl(hotel,places.beitou.address,[meals.satLunch[chosen].address]);
      const between=state.mode==='rain'?[places.marine.address,meals.satLunch[chosen].address]:(state.pace==='relaxed'?[places.longtan.address,meals.satLunch[chosen].address]:[places.longtan.address,meals.satLunch[chosen].address,places.linmei.address]);
      return directionsUrl(hotel,places.beitou.address,between);
    }
    if(phase==='home')return directionsUrl(places.departure.address);
    const between=state.mode==='rain'?[]:[places.meihua.address,places.sanqing.address];
    return directionsUrl('台北市, 台灣',hotel,between);
  }
  function eventHtml(e,index,stops,day){
    let title=e.title||'',desc=e.description||'',place=e.place?places[e.place]:null;
    let mealTag='',tip='',tel='',mealPrice='',infoSource='';
    if(e.meal){
      const m=meals[e.meal][state.diet];title=m.name;desc=m.desc;
      mealTag='<span class="diet-pill '+(state.diet==='veg'?'veg':'')+'">'+(state.diet==='veg'?'🌿 素食版':'🍖 葷食版')+'</span>';
      place={name:m.name,address:m.address,source:null};tip=m.tip;tel=m.phone;mealPrice=m.price||'';infoSource=m.source||'';
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
    if(infoSource)links.push('<a href="'+esc(infoSource)+'" target="_blank" rel="noopener">餐廳菜單／資訊 ↗</a>');
    const note=e.alert||tip||'';
    return '<article class="timeline-event event-'+esc(e.kind)+'">'+
      '<time class="event-time">'+esc(e.time)+'</time>'+
      '<div class="timeline-marker"><span class="marker-dot">'+(icons[e.kind]||'✳')+'</span></div>'+
      '<div class="event-detail">'+
        '<div class="event-meta"><span class="event-category">'+esc(kindLabels[e.kind]||'旅行')+'</span><span class="event-duration">/ '+esc(e.duration||'')+'</span></div>'+
        '<div class="event-title"><h4>'+esc(title)+'</h4>'+(e.locked?'<span class="locked-pill">✓ '+(e.kind==='vote'?'先投票再出發':(title.indexOf('早午餐')>=0?'週日早午餐已固定':'週日行程已固定'))+'</span>':'')+mealTag+'</div>'+
        '<p>'+esc(desc)+'</p>'+
        (mealPrice?'<div class="meal-price-pill">✦ '+esc(mealPrice)+'</div>':'')+
        (here?'<div class="event-place">📍 '+esc(here)+'</div>':'')+
        (note?'<div class="event-alert"><span>!</span><span>'+esc(note)+'</span></div>':'')+
        (links.length?'<div class="event-links">'+links.join('')+'</div>':'')+
      '</div></article>';
  }
  function routeRail(day){
    const labels=day==='sat'?(state.mode==='rain'?['泰山','北投投票','金車海洋館','午餐','飯店','晚餐']:(state.pace==='relaxed'?['泰山','北投投票','龍潭湖','午餐','飯店','晚餐','湯圍溝']:['泰山','北投投票','龍潭湖','午餐','林美','飯店','晚餐','湯圍溝'])):(state.mode==='rain'?['飯店早午餐','退房／行李寄放','台北晚餐','泰山']:['飯店早午餐','退房／行李寄放','梅花湖','三清宮','台北晚餐','泰山']);
    return '<div class="route-rail"><div class="route-rail-title"><span>ROAD TRIP / '+(state.mode==='rain'?'☔ 雨天備案':(day==='sat'?(state.pace==='relaxed'?'✿ 礁溪湖景慢遊':'☀️ 湖景＋加碼步道'):'✿ 冬山湖景＋三清宮'))+'</span><span>地圖依葷素・天氣・節奏同步更新</span></div><div class="route-rail-track">'+
      labels.map(function(n,i){return '<div class="route-rail-stop"><span class="route-rail-dot">'+(i+1)+'</span><span>'+esc(n)+'</span></div>';}).join('')+'</div></div>';
  }
  function dayHtml(day){
    const d=days[day],stops=getStops(day),rain=state.mode==='rain';
    const title=rain?(day==='sat'?'先投票，再進室內慢慢玩。':'早午餐後直接北返，台北晚餐。'):(day==='sat'&&state.pace==='relaxed'?'投票後先走龍潭湖，再回礁溪泡湯。':d.title);
    return '<section class="itinerary-day" aria-label="'+(day==='sat'?'週六':'週日')+'行程">'+
      '<div class="day-banner '+(day==='sun'?'sunday':'')+'"><div><small>'+esc(d.label)+(rain?' · RAIN PLAN':'')+'</small><h3>'+esc(title)+'</h3><p>'+esc(day==='sun'&&rain?'飯店早午餐 → 退房／行李寄放 → 直接北返台北 → 台北晚餐 → 泰山':d.subtitle)+'</p></div>'+
      '<div class="day-banner-right"><strong>'+esc(d.date)+'</strong>'+
      (day==='sat'?'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'poll'))+'">泰山 → 北投投票 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'day'))+'">北投 → 龍潭湖 → 午餐 → 飯店 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'evening'))+'">晚間／湯圍溝導航 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'traffic'))+'">塞車直達午餐 ↗</a>':'<a target="_blank" rel="noopener" href="'+esc(routeUrl(day))+'">'+(rain?'飯店 → 台北':'飯店 → 梅花湖 → 三清宮 → 台北')+'區域路線 ↗</a><a target="_blank" rel="noopener" href="'+esc(routeUrl(day,'home'))+'">晚餐後返回泰山 ↗</a>')+
      '</div></div>'+
      '<div class="timeline">'+stops.map(function(e,i){return eventHtml(e,i,stops,day);}).join('')+'</div>'+routeRail(day)+
      '<div class="day-endnote">✳ '+esc(rain?d.rainEndnote:(day==='sat'?'11/28 國5 南向 09:00–16:00 預估易塞。若延誤午餐預約，按「塞車直達午餐」略過龍潭湖；選擇「加走林美」會延後入住與泡湯。':d.endnote))+'</div></section>';
  }
  function compareHtml(){
    const data=[meals.satLunch,meals.satDinner];
    const names=[['DAY 01','週六午餐'],['DAY 01','週六晚餐']];
    const rows=data.map(function(m,i){
      function cell(k){
        const c=m[k],hl=state.diet===k?' active':'';
        return '<div class="compare-item'+hl+'"><h3>'+esc(c.name)+'</h3><p>'+esc(c.type)+'<br>'+esc(c.hours)+'</p>'+(c.price?'<div class="meal-cell-price">'+esc(c.price)+'</div>':'')+'<a href="'+esc(directionsUrl(c.address))+'" target="_blank" rel="noopener">導航前往 ↗</a>　<a href="'+esc(mapUrl(c.address))+'" target="_blank" rel="noopener">查看地點 ↗</a>'+(c.source?'　<a href="'+esc(c.source)+'" target="_blank" rel="noopener">店家資訊 ↗</a>':'')+'</div>';
      }
      return '<div class="meal-row"><div class="meal-name">'+names[i][1]+'<span>'+names[i][0]+'</span></div>'+cell('meat')+cell('veg')+'</div>';
    }).join('');
    return '<div class="meal-comparison"><div class="compare-heading"><div>MEAL PLAN</div><div>🍖 葷食選擇</div><div>🌿 素食選擇</div></div>'+rows+'</div>'+
       '<div class="breakfast-fixed"><span>☼</span><div><strong>週日早午餐｜長榮鳳凰酒店・桂冠自助餐廳</strong><small>10:00–11:30 用餐；11:00前辦理退房、行李寄放大廳，早午餐結束後再領取；週日不另排午餐。</small></div></div>'+ '<div class="breakfast-fixed"><span>♨</span><div><strong>週日 17:30｜台北晚餐</strong><small>葷素皆在台北用餐；餐廳待定，未訂位，時間依返程路況調整。</small></div></div>';
  }

  function featuredVegHtml(){
    const arr=[['satLunch','週六・午餐','礁溪創意蔬食'],['satDinner','週六・晚餐','宜蘭手路菜']];
    return arr.map(function(item,i){
      const m=meals[item[0]].veg;
      const buttons='<div class="veggie-feature-actions"><a href="'+esc(directionsUrl(m.address))+'" target="_blank" rel="noopener">導航前往 ↗</a><a href="tel:'+esc(m.phone.replace(/\D/g,''))+'">☎ 電話訂位</a><a href="'+esc(m.source)+'" target="_blank" rel="noopener">菜單／資訊 ↗</a></div>';
      return '<article class="veggie-feature-card"><div class="veggie-feature-top"><span class="veggie-feature-index">'+String(i+1).padStart(2,'0')+'</span><span class="veggie-feature-label">'+esc(item[1])+'</span></div><h3>'+esc(m.name)+'</h3><div class="veggie-feature-tag">'+esc(item[2])+'</div><p>'+esc(m.desc)+'</p><strong class="veggie-feature-price">'+esc(m.price)+'</strong><div class="veggie-feature-detail">⌂ '+esc(m.feature)+'<br>◷ '+esc(m.hours)+'<br>⚲ '+esc(m.address)+'</div><p class="veggie-feature-note">'+esc(m.note)+'</p>'+buttons+'</article>';
    }).join('');
  }
  function render(){
    document.getElementById('itinerary').innerHTML=(state.day==='all'?['sat','sun']:[state.day]).map(dayHtml).join('');
    document.getElementById('mealComparison').innerHTML=compareHtml();
    document.getElementById('featuredVegRestaurants').innerHTML=featuredVegHtml();
    document.getElementById('activeModeText').textContent='目前顯示：'+(state.diet==='veg'?'🌿 素食':'🍖 葷食')+'・'+(state.mode==='rain'?'☔ 雨天備案':(state.pace==='relaxed'?'✿ 少繞路':'☀️ 加走林美'));
    document.querySelectorAll('[data-diet]').forEach(function(b){const v=b.dataset.diet===state.diet;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-day]').forEach(function(b){const v=b.dataset.day===state.day;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-mode]').forEach(function(b){const v=b.dataset.mode===state.mode;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
    document.querySelectorAll('[data-pace]').forEach(function(b){const v=b.dataset.pace===state.pace;b.classList.toggle('active',v);b.setAttribute('aria-pressed',String(v));});
  }
  function setPace(mode){
    if(mode!=='relaxed'&&mode!=='full')return;
    state.pace=mode;
    try{localStorage.setItem('yilan_pace',mode);}catch(e){}
    render();showToast(mode==='relaxed'?'已切為少繞路・保留泡湯時間':'已切為完整雙步道・請注意塞車與訂位時間');
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
    const lines=['宜蘭礁溪兩天一夜｜2026/11/28（六）～11/29（日）｜'+label+'｜'+(state.mode==='rain'?'雨天備案':(state.pace==='relaxed'?'少繞路／單步道':'雙步道完整版')),
       '週六 08:30 從新北市泰山區仁愛路出發，約09:00抵達北投國小投票（北投區中央北路一段73號），預計09:45–10:00投票後離開北投往礁溪。',
       '投票時間 08:00–16:00；請核對本人投票通知單與投票教室。',
       '住宿：礁溪長榮鳳凰酒店；週日10:00–11:30飯店早午餐，11:00前退房並將行李寄放大廳','',''];
    ['sat','sun'].forEach(function(k){
      lines.push(k==='sat'?'【週六・投票後龍潭湖、礁溪溫泉】':'【週日・早午餐、冬山湖景、台北晚餐】');
      getStops(k).forEach(function(e){
        const m=e.meal?meals[e.meal][state.diet]:null;
        lines.push(e.time+'  '+(m?m.name:e.title)+(m?'｜'+m.address:''));
      });
      if(k==='sat'){lines.push('泰山→北投國小投票導航：'+routeUrl(k,'poll'));lines.push('北投國小→礁溪導航：'+routeUrl(k,'day'));lines.push('塞車直達午餐導航：'+routeUrl(k,'traffic'));lines.push('週六晚間導航：'+routeUrl(k,'evening'));}
      else{lines.push('週日北返台北（區域路線，餐廳待定）：'+routeUrl(k));lines.push('晚餐後回泰山：'+routeUrl(k,'home'));}
      lines.push('');
    });
    lines.push('最新天氣可在網頁「天氣預報」區更新（未能即時取得時顯示 2026/11/21 的 AccuWeather 55%／0% 備援）。');
    lines.push('週六：泰山08:30出發→北投投票→龍潭湖（交通順暢才停留）→礁溪午餐→飯店→湯圍溝。週日：飯店10:00–11:30早午餐→11:00前退房、行李寄放大廳→11:30領行李出發→不另排午餐→'+(state.mode==='rain'?'直接北返台北':'12:15梅花湖→13:40三清宮→14:30北返台北')+'→17:30台北晚餐（餐廳待定）→18:45回泰山。');
    lines.push('提醒：11/28 國5 南向 09:00–16:00 易塞；投票排隊或交通延誤時先跳過龍潭湖，並留意拾松午餐14:00收餐時間。梅花湖遇大雨、三清宮上坡濕滑時取消。');
    lines.push('資料：中選會、中央氣象署、AccuWeather、Open-Meteo、宜蘭縣政府觀光網、金車生技與飯店官網。');
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
  document.getElementById('paceControls').addEventListener('click',function(ev){const b=ev.target.closest('button[data-pace]');if(!b)return;setPace(b.dataset.pace);});
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
  try{const saved=localStorage.getItem('yilan_diet');if(saved==='veg'||saved==='meat')state.diet=saved;const mode=localStorage.getItem('yilan_route_mode');if(mode==='rain'||mode==='sunny')state.mode=mode;const pace=localStorage.getItem('yilan_pace');if(pace==='relaxed'||pace==='full')state.pace=pace;}catch(e){}
  render();
  if(typeof fetch==='function')refreshWeather();
})();