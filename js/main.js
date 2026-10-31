(function(){
  var KEY="a11y-bagels",root=document.documentElement,btn=document.getElementById("a11y-btn"),panel=document.getElementById("a11y-panel"),status=document.getElementById("a11y-status");
  if(!btn||!panel)return;
  var names={contrast:"ניגודיות גבוהה",gray:"גווני אפור",light:"רקע בהיר",links:"הדגשת קישורים",font:"גופן קריא",still:"עצירת אנימציות",cursor:"סמן גדול"};
  var st={size:0,contrast:0,gray:0,light:0,links:0,font:0,still:0,cursor:0};
  try{var s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)for(var k in st)if(k in s)st[k]=s[k]|0}catch(e){}
  if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches&&!localStorage.getItem(KEY))st.still=1;
  function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
  function apply(){
    ["contrast","gray","light","links","font","still","cursor"].forEach(function(k){root.classList.toggle("a11y-"+k,!!st[k]);var b=panel.querySelector('[data-tog="'+k+'"]');if(b)b.setAttribute("aria-pressed",st[k]?"true":"false")});
    var sc=1+st.size*0.1;root.style.fontSize=(16*sc)+"px";
    var bd=document.body;bd.style.fontSize=st.size?(17*sc)+"px":"";
  }
  function say(t){status.textContent=t}
  function open(o){panel.hidden=!o;btn.setAttribute("aria-expanded",o?"true":"false");if(o){var f=panel.querySelector("button");f&&f.focus()}else btn.focus()}
  btn.addEventListener("click",function(){open(panel.hidden)});
  document.addEventListener("keydown",function(e){
    if(panel.hidden)return;
    if(e.key==="Escape"){e.preventDefault();open(false);return}
    if(e.key==="Tab"){var els=[].slice.call(panel.querySelectorAll("button,a")).concat([btn]);var i=els.indexOf(document.activeElement);
      if(e.shiftKey&&i===0){e.preventDefault();btn.focus()}else if(!e.shiftKey&&document.activeElement===btn){e.preventDefault();els[0].focus()}}
  });
  panel.addEventListener("click",function(e){
    var t=e.target.closest("button");if(!t)return;
    var a=t.getAttribute("data-act"),g=t.getAttribute("data-tog");
    if(g){st[g]=st[g]?0:1;if(g==="contrast"&&st.contrast)st.light=0;if(g==="light"&&st.light)st.contrast=0;apply();save();say(names[g]+(st[g]?": פועל":": כבוי"))}
    else if(a==="inc"){st.size=Math.min(4,st.size+1);apply();save();say("גודל טקסט: "+(100+st.size*10)+" אחוז")}
    else if(a==="dec"){st.size=Math.max(-2,st.size-1);apply();save();say("גודל טקסט: "+(100+st.size*10)+" אחוז")}
    else if(a==="reset"){for(var k in st)st[k]=0;apply();try{localStorage.removeItem(KEY)}catch(x){}say("כל ההגדרות אופסו")}
  });
  apply();
})();

(function(){
  function go(){var h=document.getElementById("find-us-h");if(h){try{h.focus({preventScroll:true});}catch(e){h.focus();}}}
  if(location.hash==="#find-us"){window.addEventListener("load",function(){setTimeout(go,50);});}
  window.addEventListener("hashchange",function(){if(location.hash==="#find-us")setTimeout(go,50);});
  var l=document.querySelector("a.find-link");
  if(l)l.addEventListener("click",function(){var p=location.pathname;if((p.slice(-1)==="/"||/index\.html$/.test(p))&&location.hash==="#find-us"){var s=document.getElementById("find-us");if(s)s.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});setTimeout(go,50);}});
})();
