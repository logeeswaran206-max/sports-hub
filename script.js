const $=s=>document.querySelector(s);
const games=[
 {sport:"Football",league:"Premier Division",a:"Northgate FC",b:"Harbor United",sa:1,sb:1,min:34,max:90,rate:.012},
 {sport:"Basketball",league:"Metro League",a:"Rivermen",b:"Skyline",sa:58,sb:61,min:19,max:48,rate:.5},
 {sport:"Tennis",league:"Open Final",a:"A. Moreau",b:"K. Tanaka",sa:"6 4 3",sb:"4 6 2",min:0,max:0,rate:0},
 {sport:"Cricket",league:"T20 Cup",a:"Kestrels 148/5",b:"Lions",sa:"16.2 ov",sb:"Yet to bat",min:0,max:0,rate:0}
];
function renderGames(){
  $("#games").innerHTML=games.map((g,i)=>{
    const status=g.max?`<span class="live">${Math.floor(g.min)}'</span>`:`<span class="live">Live</span>`;
    return `<article class="game"><div class="top"><span class="tag">${g.sport} · ${g.league}</span>${status}</div>
    <div class="team"><span>${g.a}</span><span class="sc" id="s${i}a">${g.sa}</span></div>
    <div class="team"><span>${g.b}</span><span class="sc" id="s${i}b">${g.sb}</span></div></article>`}).join("");
}
renderGames();
// simulate live play
setInterval(()=>{
  games.forEach((g,i)=>{
    if(!g.max)return;
    g.min=Math.min(g.max,g.min+(g.sport==="Football"?1:.6));
    if(Math.random()<(g.sport==="Football"?.06:.55)){
      const side=Math.random()<.5?"a":"b",pts=g.sport==="Football"?1:[2,2,3][Math.floor(Math.random()*3)];
      g["s"+side]+=pts;
    }
  });
  const prev=[...document.querySelectorAll(".sc")].map(e=>e.textContent);
  renderGames();
  document.querySelectorAll(".sc").forEach((e,k)=>{if(e.textContent!==prev[k])e.classList.add("bump")});
},3000);

const stories=[
 {sport:"Football",c:"#1b4dff",t:"Northgate edge six-goal thriller to go top",p:"A stoppage-time winner sends the league leaders three points clear after a wild second half.",m:"2h ago"},
 {sport:"Basketball",c:"#e5302b",t:"Rivermen rookie drops 41 in overtime win",p:"The 20-year-old guard hit five threes in the extra period.",m:"4h ago"},
 {sport:"Tennis",c:"#2a7d4f",t:"Moreau into a third final of the season",p:"A straight-sets win sets up a rematch.",m:"5h ago"},
 {sport:"Cricket",c:"#7a3fb5",t:"Kestrels post 190 in the T20 Cup opener",p:"A rapid half-century at the death turned the innings.",m:"7h ago"},
 {sport:"Football",c:"#1b4dff",t:"Harbor United sign veteran defender on a free",p:"The 33-year-old arrives on a two-year deal.",m:"9h ago"},
 {sport:"Basketball",c:"#e5302b",t:"Skyline coach out after fifth straight loss",p:"An assistant takes over for Friday's game.",m:"Yesterday"}
];
let sel="All";
const sports=["All",...new Set(stories.map(s=>s.sport))];
$("#tabs").innerHTML=sports.map(s=>`<button class="tab" data-s="${s}" aria-pressed="${s===sel}">${s}</button>`).join("");
$("#tabs").addEventListener("click",e=>{const b=e.target.closest(".tab");if(!b)return;sel=b.dataset.s;
 document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-pressed",x.dataset.s===sel));renderNews()});
function renderNews(){
  const list=stories.filter(s=>sel==="All"||s.sport===sel).slice(0,sel==="All"?3:6);
  $("#newsGrid").innerHTML=list.length?list.map(s=>`<article class="story"><div class="img" style="background:${s.c}">${s.sport}</div>
  <div class="b"><h3>${s.t}</h3><p>${s.p}</p><span class="meta">${s.m}</span></div></article>`).join(""):`<p class="empty">No stories for this sport yet.</p>`;
}
renderNews();

const table=[["Northgate FC",8,6,1,1],["Harbor United",8,5,2,1],["Eastbridge",8,5,1,2],["Marlow Town",8,4,2,2],["Redfield",8,3,3,2],["Kingsport",8,2,2,4],["Ashvale",8,1,3,4],["Dunmore",8,0,2,6]];
$("#tbody").innerHTML=table.map((r,i)=>`<tr><td>${i+1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td class="pts">${r[2]*3+r[3]}</td></tr>`).join("");
$("#fix").innerHTML=[["Sat 12 Oct","Eastbridge v Northgate FC"],["Sat 12 Oct","Harbor United v Redfield"],["Sun 13 Oct","Marlow Town v Kingsport"],["Sun 13 Oct","Ashvale v Dunmore"]].map(f=>`<li><span>${f[1]}</span><time>${f[0]}</time></li>`).join("");

let t;function toast(m){const el=$("#toast");el.textContent=m;el.classList.add("on");clearTimeout(t);t=setTimeout(()=>el.classList.remove("on"),2400)}
$("#form").addEventListener("submit",e=>{e.preventDefault();const v=$("#email").value.trim();
 if(!/^\S+@\S+\.\S+$/.test(v)){toast("Enter a valid email address");return}
 $("#email").value="";toast("Subscribed. Final scores arrive nightly.")});
