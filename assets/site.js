(function(){
  var d=document,root=d.documentElement,nav=d.getElementById('nav'),menu=d.getElementById('menu'),theme=d.getElementById('theme');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var onScroll=function(){nav.classList.toggle('scrolled',window.scrollY>8)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(menu){menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});}
  if(theme){theme.addEventListener('click',function(){var cur=root.getAttribute('data-theme');var sys=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var now=(cur||sys)==='dark'?'light':'dark';root.setAttribute('data-theme',now);try{localStorage.setItem('theme',now)}catch(e){}});}
  var f=d.getElementById('cform');
  if(f){f.addEventListener('submit',function(ev){ev.preventDefault();var fd=new FormData(f);var s=encodeURIComponent('Hello from '+fd.get('name'));var b=encodeURIComponent(fd.get('msg')+'\n\n— '+fd.get('name')+' ('+fd.get('email')+')');window.location.href='mailto:alahiji@gmail.com?subject='+s+'&body='+b;});}
  /* collapsible panels: open on wide screens, closed on phones */
  var wide=window.matchMedia('(min-width:641px)').matches;
  d.querySelectorAll('details.acc').forEach(function(el){el.open=wide;});
  /* carousel dots */
  d.querySelectorAll('.dots[data-track]').forEach(function(dots){
    var track=d.getElementById(dots.getAttribute('data-track'));if(!track)return;
    var items=Array.prototype.slice.call(track.children);
    items.forEach(function(_,i){var b=d.createElement('i');if(i===0)b.className='on';dots.appendChild(b);});
    var upd=function(){var w=track.clientWidth,x=track.scrollLeft,best=0,bd=1e9;items.forEach(function(it,i){var c=it.offsetLeft-track.offsetLeft+it.offsetWidth/2-x-w/2;if(Math.abs(c)<bd){bd=Math.abs(c);best=i;}});Array.prototype.forEach.call(dots.children,function(b,i){b.className=i===best?'on':'';});};
    track.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});upd();
  });
  if(reduce){return;}
  root.classList.add('js');
  d.querySelectorAll('.tile').forEach(function(t){t.addEventListener('pointermove',function(e){var r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px')});});
  /* reveal on scroll: only elements below the first screen get the pre-state, so the page is complete at rest */
  var vh=window.innerHeight;
  var targets=Array.prototype.slice.call(d.querySelectorAll('.tile,.sec-h,.page-h'));
  targets.forEach(function(el){if(el.getBoundingClientRect().top>vh*0.9){el.classList.add('rv');}});
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  targets.forEach(function(el){io.observe(el)});
  var anim=Array.prototype.slice.call(d.querySelectorAll('.spark.draw,.meter.fill,.radar.grow'));
  var io2=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io2.unobserve(en.target);}});},{threshold:0.3});
  anim.forEach(function(el){io2.observe(el)});
  /* belt and braces: a plain scroll-position check, so nothing depends on observer timing */
  var sweep=function(){var h=window.innerHeight;targets.concat(anim).forEach(function(el){if(el.classList.contains('in'))return;var r=el.getBoundingClientRect();if(r.top<h*1.05&&r.bottom>0){el.classList.add('in');}});};
  window.addEventListener('scroll',function(){window.requestAnimationFrame(sweep)},{passive:true});window.addEventListener('resize',sweep);sweep();
  setTimeout(function(){d.querySelectorAll('.rv:not(.in),.draw:not(.in),.fill:not(.in),.grow:not(.in)').forEach(function(el){el.classList.add('in')});},2500);
  /* count-up on the stat tiles */
  var counted=false;
  var count=function(){if(counted)return;counted=true;d.querySelectorAll('.stat .big').forEach(function(el){var tn=el.firstChild;if(!tn||tn.nodeType!==3)return;var m=/^\s*(\d+)/.exec(tn.nodeValue);if(!m)return;var target=+m[1],rest=tn.nodeValue.slice(m[0].length),t0=null;var step=function(ts){if(!t0)t0=ts;var p=Math.min(1,(ts-t0)/900),ease=1-Math.pow(1-p,3);tn.nodeValue=Math.round(target*ease)+rest;if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);});};
  var st=d.querySelector('.stat .big');if(st){var io3=new IntersectionObserver(function(en){if(en[0].isIntersecting){count();io3.disconnect();}},{threshold:0.5});io3.observe(st);}
})();