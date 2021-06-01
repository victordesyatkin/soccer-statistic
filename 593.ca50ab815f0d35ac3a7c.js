(globalThis.webpackChunksoccer_statistic=globalThis.webpackChunksoccer_statistic||[]).push([[593],{908:(e,t,a)=>{"use strict";a.d(t,{Z:()=>u});var l=a(7294),s=a(5977),n=a(6896),r=a(9163),i=a(4751),c=a(1471),m=a(1189);const o=r.ZP.div`
  width: 100%;
`,d=r.ZP.span`
  padding: 0 0.3rem;
`,u=()=>{const{formatMessage:e}=(0,n.Z)(),{pathname:t}=(0,s.TH)(),a=t.split("/"),r=[l.createElement(m.Z,{key:"breadcrumbs-home_page",to:"/",content:(0,c.Oq)({id:"home_page",formatMessage:e})})],u=(0,i.v9)((e=>e.teams.items));let p="/";return a.forEach(((t,s)=>{let n=t.trim().toLocaleLowerCase();if(n){if(r.push(l.createElement(d,{key:`breadcrumbs-separator-${n}`},"-")),p+=`${n}/`,s&&"teams"===a[s-1]){const e=u[n]||{},{name:t}=e||{};t&&(n=t)}r.push(l.createElement(m.Z,{key:`breadcrumbs-${n}`,to:p,content:(0,c.Oq)({id:n,formatMessage:e})}))}})),l.createElement(o,null,r)}},4454:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var l=a(7294),s=a(3987),n=a(5950);const r=(0,s.E7)()((({isOpened:e,setIsOpened:t})=>{const a=(0,l.useCallback)((()=>{t&&t(!e)}),[e,t]);return l.createElement(n.Z,{onClick:a,content:"Filters",theme:"bold"})}))},1610:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});var l=a(7294);const s=({children:e,method:t,action:a,onSubmit:s})=>l.createElement("form",{className:"filter",method:t,action:a,onSubmit:s},l.Children.map(e,(e=>l.createElement("div",{className:"filter__item"},e))))},5714:(e,t,a)=>{"use strict";a.d(t,{Z:()=>c});var l=a(7294),s=a(4184),n=a.n(s),r=a(3987),i=a(5950);const c=(0,r.E7)()((({isOpened:e,setIsOpened:t,children:a,title:s})=>{const r=(0,l.useCallback)((()=>{t&&t(!1)}),[t]);return l.createElement("article",{className:n()("panel",{panel_opened:e})},l.createElement("div",{className:"panel__header"},l.createElement("span",{className:"panel__button-times"},l.createElement(i.Z,{iconType:"times",onClick:r})),s&&l.createElement("p",{className:"panel__title"},s)),a&&l.createElement("div",{className:"panel__body"},a))}))},5249:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});var l=a(3935),s=a(39),n=a.n(s);const r=({title:e="",titleSite:t="football-statistic"})=>{const a=document.getElementsByTagName("title")[0]||null,s=n()((e||"").trim());let r=n()(t);return s&&(r+=` - ${s}`),a&&r&&l.createPortal(r,a)||null}},2593:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>J});var l=a(7294),s=a(4751),n=a(5977),r=a(6896),i=a(39),c=a.n(i),m=a(1761),o=a(2561),d=a(9163),u=a(523),p=a(1471),g=a(5714),f=a(1610),h=a(4454),E=a(3069),Z=a(8189),b=a(908),v=a(5696),x=a(1189),M=a(242);const w=d.ZP.p`
  color: ${u.O9.grey};
  margin-top: 1rem;
  font-size: 0.786rem;
  text-transform: capitalize;
`,y=({name:e})=>l.createElement(w,null,e),O=d.ZP.article`
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${u.O9.lightgrey};
  text-align: center;
  border-radius: 4px;
  border-bottom: 3px solid;
  background-color: ${u.O9.white};
`,k=d.ZP.div`
  width: 7rem;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${(0,M.m4)(u.O9.lightgrey,.3)};
  border-radius: 4px;
`,C=d.ZP.img`
  width: 100%;
  object-fit: contain;
  object-position: center center;
`,_=d.ZP.p`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.929rem;
  color: ${u.O9.grey};
  margin-top: 3rem;
`,P=e=>{const{logo:t,name:a,area:s}=e;return l.createElement(O,null,l.createElement(k,null,t?l.createElement(C,{src:t,alt:a,title:a}):l.createElement(v.Z,null)),l.createElement(_,null,a),l.createElement(y,s))},S=d.ZP.li`
  padding: 1rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`,$=d.ZP.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: 100%;
`,I=({items:e})=>{const t=(0,l.useMemo)((()=>(0,p.sQ)()),[]);return(0,l.useMemo)((()=>null==e?void 0:e.length),[e])?l.createElement($,null,null==e?void 0:e.map((e=>{const{id:a}=e;return l.createElement(S,{key:a},l.createElement(x.Z,{to:`${t.TEAMS}/${a}`},l.createElement(P,e)))}))):l.createElement(v.Z,null)};var q=a(5249);const N=d.ZP.section`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  flex-direction: column;
`,T=d.ZP.div`
  padding: 1rem 0;
`,F=d.ZP.div`
  padding: 1rem 0;
  display: flex;

  @media (min-width: ${u.J7.md}) {
    display: none;
  }
`,j=d.ZP.div`
  display: flex;
  width: 100%;
`,L=d.ZP.div`
  min-width: 0;
  max-width: 20rem;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  @media (min-width: ${u.J7.md}) {
    min-width: 20rem;
  }
`,z=d.ZP.div`
  display: flex;
  width: 100%;
  min-width: 0;
  padding: 1rem;
`,H=({panel:e,filter:t,searchField:a,selectFieldCountries:s,selectFieldLeagues:n,items:i})=>{const{formatMessage:m}=(0,r.Z)(),o=c()((0,p.Oq)({id:"teams",formatMessage:m}));return l.createElement(N,null,l.createElement(T,null,l.createElement(b.Z,null)),l.createElement(F,null,l.createElement(h.Z,t)),l.createElement(j,null,l.createElement(L,null,l.createElement(g.Z,e,l.createElement(f.Z,t,l.createElement(E.Z,a),l.createElement(Z.Z,s),l.createElement(Z.Z,n)))),l.createElement(z,null,l.createElement(I,{items:i}))),l.createElement(q.Z,{title:o}))},J=(0,a(3987).c3)()((({serviceStatistic:e})=>{const{formatMessage:t}=(0,r.Z)(),{search:a,pathname:i}=(0,n.TH)(),d=(0,n.k6)(),u=(0,l.useMemo)((()=>{let e;const{leagueId:t="2001"}=(0,p.D8)(a)||{};return t&&(e=[t]),e}),[a]),[g,f]=(0,l.useState)([]),[h,E]=(0,l.useState)(u),[Z,b]=(0,l.useState)(""),v=(0,s.v9)((e=>e)),{teams:{items:x={}},countries:{items:M=[]},leagues:{items:w={}},mapCompetitionSeasons:{items:y={}},mapSeasonTeams:{items:O={}}}=v,k=(0,l.useMemo)((()=>Object.values(x)),[x]),C=(0,l.useMemo)((()=>Object.values(w)),[w]),_=(0,s.I0)(),P=(0,l.useCallback)((()=>{M.length||_((0,m.tf)({serviceStatistic:e})())}),[M,e,_]),S=(0,l.useCallback)((()=>{_((0,o.rl)({serviceStatistic:e})([]))}),[e,_]),$=(0,l.useCallback)((e=>{f(e)}),[f]),I=(0,l.useCallback)((e=>{E(e),d.replace({pathname:i})}),[E,i,d]),q=(0,l.useCallback)((e=>{const{target:{value:t=""}={}}=e;b(t)}),[b]),N=(0,l.useMemo)((()=>(0,p.Oc)({teams:k,mapSeasonTeamsItems:O,mapCompetitionSeasonsItems:y,filters:{countryIds:g,teamName:Z,leagueIds:h}})),[k,g,Z,h,y,O]);(0,l.useEffect)((()=>{const t=(0,p.Pg)({leagues:w,leagueIds:h});t.length&&_((0,o.rl)({serviceStatistic:e})(t))}),[w,e,_,h]),(0,l.useEffect)((()=>{const t=(0,p.xY)({mapCompetitionSeasonsItems:y,leagueIds:h});t.length&&_((0,o.ZZ)({serviceStatistic:e})(t))}),[y,e,_,h]);const T=(0,l.useMemo)((()=>({placeholder:c()((0,p.Oq)({id:"please_select_countries",formatMessage:t})),label:{content:(0,p.Oq)({id:"countries",formatMessage:t})},options:(0,p.ON)(M),onEnter:P,onChange:$,isMultiple:!0})),[M,P,$,t]),F=(0,l.useMemo)((()=>({placeholder:c()((0,p.Oq)({id:"please_select_leagues",formatMessage:t})),label:{content:(0,p.Oq)({id:"leagues",formatMessage:t})},options:(0,p.WP)(C),onEnter:S,onChange:I,value:h,isMultiple:!1})),[C,S,I,h,t]),j=(0,l.useMemo)((()=>({placeholder:c()((0,p.Oq)({id:"search",formatMessage:t})),label:{content:(0,p.Oq)({id:"name",formatMessage:t})},value:Z,onChange:q})),[Z,q,t]),L=(0,l.useMemo)((()=>({title:c()((0,p.Oq)({id:"filter",formatMessage:t}))})),[t]);return l.createElement(H,{panel:L,searchField:j,selectFieldCountries:T,selectFieldLeagues:F,items:N})}))}}]);