(globalThis.webpackChunksoccer_statistic=globalThis.webpackChunksoccer_statistic||[]).push([[976],{908:(e,t,a)=>{"use strict";a.d(t,{Z:()=>u});var l=a(7294),r=a(5977),n=a(6896),s=a(9163),c=a(4751),i=a(1471),d=a(1189);const m=s.ZP.div`
  width: 100%;
`,o=s.ZP.span`
  padding: 0 0.3rem;
`,u=()=>{const{formatMessage:e}=(0,n.Z)(),{pathname:t}=(0,r.TH)(),a=t.split("/"),s=[l.createElement(d.Z,{key:"breadcrumbs-home_page",to:"/",content:(0,i.Oq)({id:"home_page",formatMessage:e})})],u=(0,c.v9)((e=>e.teams.items));let p="/";return a.forEach(((t,r)=>{let n=t.trim().toLocaleLowerCase();if(n){if(s.push(l.createElement(o,{key:`breadcrumbs-separator-${n}`},"-")),p+=`${n}/`,r&&"teams"===a[r-1]){const e=u[n]||{},{name:t}=e||{};t&&(n=t)}s.push(l.createElement(d.Z,{key:`breadcrumbs-${n}`,to:p,content:(0,i.Oq)({id:n,formatMessage:e})}))}})),l.createElement(m,null,s)}},3863:(e,t,a)=>{"use strict";a.d(t,{Z:()=>y});var l=a(2122),r=a(7294),n=a(7625),s=a(1436),c=a(4184),i=a.n(c),d=a(1471),m=a(3987),o=a(9953);const u=({children:e,theme:t})=>{const{key:a,value:l}=(0,o.gh)({theme:t,themes:{calendar:"calendar"}});return r.createElement("div",{className:i()("card",{[`card_theme_${a}`]:l})},e)};a(363),a(6355),a(4331);var p=a(9755);const h={language:"en",inline:!0,navTitles:{days:"MM yyyy",months:"yyyy",years:"yyyy1 - yyyy2"},clearButton:!0},g=({name:e,ariaLabel:t,isDisabled:a,isReadOnly:l,isHidden:n,options:s,today:c,start:i,end:m,onSelect:o,locale:g})=>{const[E,f]=(0,r.useState)(!1),y=(0,r.useMemo)((()=>"start"),[]),b=(0,r.useMemo)((()=>"end"),[]),v=(0,r.useRef)(),w=(0,r.useRef)(),k=(0,r.useRef)(),Z=(0,r.useRef)(),_=(0,r.useRef)(),x=(0,r.useCallback)((({start:e,end:t})=>{const a=(0,d.fq)(e),l=(0,d.fq)(t);if(i&&!m?(k.current=y,_.current="-hide-in-broken-range-"):k.current=m&&!i?b:"",w.current){var r;const e=[];a&&e.push(a),a&&l&&e.push(l),null===(r=w.current)||void 0===r||r.selectDate(e)}}),[y,b,w,m,i]),P=(0,r.useCallback)(((e,t)=>(({cellType:e,date:t,today:a})=>Boolean(a&&t&&"day"===e&&new Date(a).getTime()===new Date(t).getTime()))({cellType:t,date:e,today:c})?{classes:"-current-"}:(({cellType:e,date:t,rangeFromDate:a,rangeFromDateClasses:l})=>Boolean(t&&Z.current&&"day"===e&&a===new Date(t).getTime()&&l))({cellType:t,date:e,rangeFromDate:Z.current,rangeFromDateClasses:_.current})?{classes:_.current}:void 0),[c]),C=(0,r.useCallback)(((e,t)=>{let a=[];if((null==s?void 0:s.range)&&Array.isArray(t)){a=t;const{length:e}=a;if(1===e){const[e]=a;switch(Z.current=e?new Date(e).getTime():void 0,_.current=k.current?"-hide-in-broken-range-":"-hide-in-range-",k.current){case y:a[1]=void 0;break;case b:a[0]=void 0,a[1]=e;break;default:a[1]=void 0}}else Z.current=void 0,_.current="",k.current=""}else t&&!Array.isArray(t)&&a.push(t);o&&o(a)}),[o,b,y,s]);(0,r.useEffect)((()=>{s&&null!=v&&v.current&&(p(v.current).datepicker({...h,language:g,...s,onRenderCell:P,onSelect:C}),w.current=p(v.current).data("datepicker"))}),[g,s,v,w,P,C]),(0,r.useEffect)((()=>{E||(x({start:i,end:m}),f(!0))}),[i,m,x,E,f]);return r.createElement(r.Fragment,null,r.createElement(u,{theme:"calendar"},r.createElement("article",{className:"calendar"},r.createElement("input",{name:e,type:"text",className:"calendar__text-field",disabled:a,readOnly:l,ref:v,hidden:n,"aria-label":t}))))};g.defaultProps={isDisabled:!0,isReadOnly:!0,isHidden:!0,options:h};const E=(0,m.$0)()(g),f=({placeholder:e,separator:t,calendar:a,titleButtonToggleCalendar:c,ariaLabelButtonToggleCalendar:m,onSelect:o,id:u})=>{const p=(0,r.useRef)(null),[h,g]=(0,r.useState)(!1),[f,y]=(0,r.useState)((0,d.vC)((null==a?void 0:a.start)||"")),[b,v]=(0,r.useState)((0,d.vC)((null==a?void 0:a.end)||"")),w=`${f||e}${t}${b||e}`,k=(0,r.useCallback)((e=>{let[t="",a=""]=e||[];t&&(t=(0,d.vC)(t)),a&&(a=(0,d.vC)(a)),y(t),v(a),o&&o(e)}),[o]),Z=(0,r.useCallback)((()=>{g(!h)}),[h]),_=(0,r.useCallback)((()=>{g(!1)}),[]);(0,d.O3)({refs:[p],callback:_,isOpened:h});const x=f||b;return r.createElement("article",{className:i()("date-picker",{"date-picker_opened":h,"date-picker_filled":x}),ref:p},r.createElement("div",{className:"date-picker__header"},r.createElement("div",{className:"date-picker__summary-wrapper"},r.createElement("p",{className:"date-picker__summary"},w)),r.createElement("button",{name:"date-picker-toggle-calendar",type:"button",title:c,"aria-label":m,className:"date-picker__button-toggle-calendar",onClick:Z},r.createElement(n.G,{icon:h?s.qiI:s.a1i}))),r.createElement("div",{className:"date-picker__body"},r.createElement(E,(0,l.Z)({},a,{onSelect:k,id:u}))))};f.defaultProps={placeholder:"dd.mm.yyyy",separator:" - "};const y=(0,m.QV)()(f)},4454:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var l=a(7294),r=a(3987),n=a(5950);const s=(0,r.E7)()((({isOpened:e,setIsOpened:t})=>{const a=(0,l.useCallback)((()=>{t&&t(!e)}),[e,t]);return l.createElement(n.Z,{onClick:a,content:"Filters",theme:"bold"})}))},1610:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var l=a(7294);const r=({children:e,method:t,action:a,onSubmit:r})=>l.createElement("form",{className:"filter",method:t,action:a,onSubmit:r},l.Children.map(e,(e=>l.createElement("div",{className:"filter__item"},e))))},5714:(e,t,a)=>{"use strict";a.d(t,{Z:()=>i});var l=a(7294),r=a(4184),n=a.n(r),s=a(3987),c=a(5950);const i=(0,s.E7)()((({isOpened:e,setIsOpened:t,children:a,title:r})=>{const s=(0,l.useCallback)((()=>{t&&t(!1)}),[t]);return l.createElement("article",{className:n()("panel",{panel_opened:e})},l.createElement("div",{className:"panel__header"},l.createElement("span",{className:"panel__button-times"},l.createElement(c.Z,{iconType:"times",onClick:s})),r&&l.createElement("p",{className:"panel__title"},r)),a&&l.createElement("div",{className:"panel__body"},a))}))},5249:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var l=a(3935),r=a(39),n=a.n(r);const s=({title:e="",titleSite:t="football-statistic"})=>{const a=document.getElementsByTagName("title")[0]||null,r=n()((e||"").trim());let s=n()(t);return r&&(s+=` - ${r}`),a&&s&&l.createPortal(s,a)||null}},976:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>se});var l=a(7294),r=a(4751),n=a(5977),s=a(6896),c=a(39),i=a.n(c),d=a(5120),m=a(9952),o=a(9163),u=a(523),p=a(1471),h=a(908);const g=o.ZP.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${u.J7.xs}) {
    flex-wrap: initial;
  }
`,E=o.ZP.span`
  width: 5.714rem;
`,f=o.ZP.span`
  width: 3.571rem;
  margin-left: 0.5rem;
`,y=o.ZP.span`
  padding: 0.3rem 0.5rem;
  margin-left: 0.5rem;
  text-transform: uppercase;
  background-color: ${({status:e})=>{switch(e){case"SCHEDULED":return u.O9.blue;case"IN_PLAY":return u.O9.green;case"HALF_TIME":return u.O9.yellow;default:return u.O9.grey}}};
  color: ${u.O9.white}};
  border-radius: 4px;
  display: none;

  @media(min-width: ${u.J7.xs}) {
    display: initial;
  }
`,b=e=>{const{status:t,utcDate:a}=e,r=(0,l.useMemo)((()=>{var e;return(null===p.Do||void 0===p.Do||null===(e=p.Do[t])||void 0===e?void 0:e.name)||"-"}),[t]);return l.createElement(g,null,l.createElement(E,null,(0,p.vC)(a)),l.createElement(f,null,(0,p.pL)(a)),l.createElement(y,{status:t},r))},v=o.ZP.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${u.J7.xs}) {
    flex-wrap: nowrap;
  }
`,w=o.ZP.span`
  width: 2rem;
`,k=o.ZP.span`
  width: 1.428rem;
  height: 1.071rem;
`,Z=o.ZP.img`
  width: 100%;
  height: 100%;
`,_=e=>{const{formatMessage:t}=(0,s.Z)(),{matchday:a="-",competition:r}=e,{area:n}=r,{ensignUrl:c,name:i,code:d=""}=n||{};let m=c;if(!m){const e=d.toLocaleLowerCase();m=p.id[e]}const o=m?l.createElement(Z,{src:m,alt:i}):null;return l.createElement(v,null,l.createElement(w,null,a||(0,p.Oq)({id:"n_a",formatMessage:t})),l.createElement(k,null,o))};var x=a(1189);const P=o.ZP.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`,C=o.ZP.span`
  display: flex;
  align-items: center;
  min-width: 0;
`,S=o.ZP.span`
  width: 1.429rem;
  height: 1.071rem;
  margin-right: 0.5rem;
  display: none;
  border-radius: 4px;

  @media (min-width: ${u.J7.xs}) {
    display: ${({src:e})=>e?"initial":""};
  }
`,M=o.ZP.img`
  width: 100%;
  height: 100%;
  &[src=''] {
    visibility: hidden;
  }
`,$=(0,o.ZP)(x.Z)`
  color: ${u.O9.black};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`,O=o.ZP.span`
  padding: 0 0.5rem;
`,T=e=>{const{awayTeam:t,homeTeam:a}=e,{name:n,id:s}=t,{name:c,id:i}=a,d=(0,l.useMemo)((()=>(0,p.sQ)()),[]),m=(0,r.v9)((e=>e.teams.items)),o=m[s]||{},u=m[i]||{},{logo:h}=o,{logo:g}=u;return l.createElement(P,null,l.createElement(C,null,g&&l.createElement(S,{src:g},l.createElement(M,{src:g,alt:c})),l.createElement($,{to:`${d.TEAMS}/${i}`,title:c},c)),l.createElement(O,null,"-"),l.createElement(C,null,h&&l.createElement(S,{src:h},l.createElement(M,{src:h,alt:n})),l.createElement($,{to:`${d.TEAMS}/${s}`,title:n},n)))},N=o.ZP.tr`
  font-size: 0.9rem;
  color: ${u.O9.black};
  &:nth-child(even) {
    background-color: ${u.O9.lightgrey};
  }
`,D=o.ZP.span`
  display: inline-block;
  width: 100%;
  text-align: center;
`,I=o.ZP.td`
  padding: 0.3rem 0.5rem;
`,F=({item:e,properties:t})=>{const a=(0,l.useCallback)((t=>{const{id:a}=e;let r=null;switch(t){case"date":r=l.createElement(b,e);break;case"matchday":r=l.createElement(_,e);break;case"fixture":r=l.createElement(T,e);break;case"score":{const{score:{fullTime:{homeTeam:t,awayTeam:a}}}=e;r=l.createElement(D,null,`${t??"-"}:${a??"-"}`);break}default:r=t}return l.createElement(I,{key:`${a}-property-${t}`},r)}),[e]);return l.createElement(N,null,t.map(a))};var L=a(5696);const j=(0,o.ZP)(u.$B)`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`,R=o.ZP.caption`
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 0.5rem;
`,A=o.ZP.table`
  width: 100%;
  border-collapse: collapse;
  border: none;
`,q=o.ZP.thead`
  width: 100%;
`,B=o.ZP.tr`
  &:nth-child(even) {
    background-color: ${u.O9.lightgrey};
  }
`,H=o.ZP.th`
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.4rem;
  &:first-letter {
    text-transform: capitalize;
  }
`,J=o.ZP.tbody``,z=({items:e})=>{const{formatMessage:t}=(0,s.Z)(),a=(0,l.useMemo)((()=>({date:t({id:"date"}),matchday:t({id:"matchday"}),fixture:t({id:"fixture"}),score:t({id:"score"})})),[t]),r=(0,l.useMemo)((()=>Object.values(a)),[a]),n=(0,l.useMemo)((()=>Object.keys(a)),[a]),c=(0,l.useMemo)((()=>`${t({id:"matches_in_selection"},{count:(null==e?void 0:e.length)||0})}:`),[e,t]);return l.createElement(j,null,null!=e&&e.length?l.createElement(A,null,l.createElement(R,null,c),l.createElement(q,null,l.createElement(B,null,r.map((e=>l.createElement(H,{scope:"col",key:e},e))))),l.createElement(J,null,null==e?void 0:e.map((e=>l.createElement(F,{key:e.id,item:e,properties:n}))))):l.createElement(L.Z,null))};var Q=a(4454),U=a(5714),G=a(3069),V=a(8189),W=a(1610),Y=a(3863),K=a(5249);const X=o.ZP.div`
  width: 100%;
  display: flex;
  min-width: 0;
  align-items: flex-start;
`,ee=o.ZP.div`
  align-items: flex-start;
  width: 100%;
  display: flex;
  min-width: 0;
  padding: 0 1rem 1rem;
`,te=o.ZP.div`
  align-items: flex-start;
  max-width: 21.428rem;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 0;
`,ae=o.ZP.section`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-direction: column;
`,le=o.ZP.div`
  padding: 1rem 0;
`,re=o.ZP.div`
  padding: 1rem 0;
  display: flex;

  @media (min-width: ${u.J7.md}) {
    display: none;
  }
`,ne=({panel:e,filter:t,searchField:a,selectFieldLeagues:r,selectFieldStatus:n,datepicker:c,items:d})=>{const{formatMessage:m}=(0,s.Z)(),o=i()((0,p.Oq)({id:"matches",formatMessage:m}));return l.createElement(ae,null,l.createElement(le,null,l.createElement(h.Z,null)),l.createElement(re,null,l.createElement(Q.Z,null)),l.createElement(X,null,l.createElement(te,null,l.createElement(U.Z,e,l.createElement(W.Z,t,l.createElement(G.Z,a),l.createElement(V.Z,r),l.createElement(V.Z,n),l.createElement(Y.Z,c)))),l.createElement(ee,null,l.createElement(z,{items:d}))),l.createElement(K.Z,{title:o}))},se=(0,a(3987).c3)()((({serviceStatistic:e})=>{const{formatMessage:t}=(0,s.Z)(),{search:a}=(0,n.TH)(),c=(0,n.k6)(),o=(0,l.useMemo)((()=>{const e={},{leagueIds:t,statusIds:l,dates:r,searchName:n}=(0,p.D8)(a)||{};return t&&(e.leagueIds=(0,p.wk)(t)),l&&(e.statusIds=(0,p.wk)(l)),r&&(e.dates=(0,p.wk)(r)),n&&(e.searchName=(0,p.wk)(n)),e}),[a]),[u,h]=(0,l.useState)(o.leagueIds),[g,E]=(0,l.useState)(o.statusIds),[f,y]=(0,l.useState)(o.searchName),[b,v]=(0,l.useState)(o.dates),w=(0,r.v9)((e=>e)),{matches:{items:k=[]}={},leagues:{items:Z={}}={}}=w,_=(0,r.I0)(),x=(0,l.useMemo)((()=>Object.values(Z)),[Z]),P=(0,l.useCallback)((()=>{_((0,d.rl)({serviceStatistic:e})())}),[e,_]),C=(0,l.useCallback)((e=>{h(e),c.replace({search:(0,p.mj)({paramsString:a,params:{leagueIds:e}}).toString()})}),[c,a]),S=(0,l.useCallback)((e=>{c.replace({search:(0,p.mj)({paramsString:a,params:{statusIds:e}}).toString()}),E(e)}),[E,c,a]),M=(0,l.useCallback)((e=>{c.replace({search:(0,p.mj)({paramsString:a,params:{dates:e}}).toString()}),v(e)}),[v,c,a]),$=(0,l.useCallback)((e=>{const{target:{value:t=""}={}}=e;c.replace({search:(0,p.mj)({paramsString:a,params:{searchName:t}}).toString()}),y(t)}),[y,a,c]),O=(0,l.useMemo)((()=>Object.values(k)),[k]),T=(0,l.useMemo)((()=>(0,p.J7)({matches:O,filters:{leagueIds:u,searchName:f,dates:b,statusIds:g}})),[O,u,f,b,g]);(0,l.useEffect)((()=>{const[t]=g||[];_((0,m.Ps)({serviceStatistic:e})({leagueIds:u,dates:b,status:t}))}),[e,_,g,b,u]),(0,l.useEffect)((()=>{_((0,d.rl)({serviceStatistic:e})())}),[e,_]);const N=(0,l.useMemo)((()=>({placeholder:i()(t({id:"please_select_leagues"})),label:{content:t({id:"leagues"})},value:u,options:(0,p.WP)(x),onEnter:P,onChange:C,isMultiple:!0})),[x,P,C,u,t]),D=(0,l.useMemo)((()=>({placeholder:i()(t({id:"please_select_status"})),label:{content:i()(t({id:"status"}))},value:g,options:(0,p.HO)(Object.values(p.Do)),onChange:S})),[S,g,t]),I=(0,l.useMemo)((()=>({placeholder:i()(t({id:"search"})),label:{content:i()(t({id:"name_league_or_team"}))},value:f,onChange:$})),[f,$,t]),F=(0,l.useMemo)((()=>({calendar:{options:{range:!0},start:null==b?void 0:b[0],end:null==b?void 0:b[1]},placeholder:t({id:"dd_mm_yy"}),onSelect:M,label:{content:i()(t({id:"dates"}))}})),[M,b,t]),L=(0,l.useMemo)((()=>({title:i()(t({id:"filter"}))})),[t]);return l.createElement(ne,{panel:L,datepicker:F,searchField:I,selectFieldLeagues:N,selectFieldStatus:D,items:T})}))}}]);