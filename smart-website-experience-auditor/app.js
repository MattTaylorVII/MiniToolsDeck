(()=>{'use strict';
const $=id=>document.getElementById(id), val=id=>$(id).value, esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let report=null, filename='website-audit';
const notice=(msg)=>{$('notice').textContent=msg};
const safeDownload=(name,content,type)=>{const blob=new Blob([content],{type});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
function analyze(){
 const raw=val('source');if(!raw.trim()||!/<(?:html|head|body|title|h1|main|div|p)\b/i.test(raw)){notice('Please paste or upload a complete HTML document before auditing.');return}
 const doc=new DOMParser().parseFromString(raw,'text/html'), all=sel=>Array.from(doc.querySelectorAll(sel)), first=sel=>doc.querySelector(sel);
 const findings=[];let passes=0,checks=0;
 function test(category,title,ok,detail,fix,priority='medium'){
  checks++;if(ok){passes++;return}
  findings.push({category,title,priority,detail,fix});
 }
 const text=e=>e?.textContent?.trim()||'';
 if($('seo').checked){
 const title=text(first('title')),desc=first('meta[name="description" i]')?.getAttribute('content')?.trim()||'';
 test('SEO','Missing or Empty Page Title',title.length>0,'No nonempty <title> element found.','Add a descriptive and unique title element in the document head.','high');
 test('SEO','Title Length Needs Review',title.length>=20&&title.length<=65,`Title contains ${title.length} characters. This is a heuristic, not a search-engine limit.`,'Use a concise, meaningful page title, usually around 20–65 characters.','info');
 test('SEO','Missing Meta Description',desc.length>0,'No meta description content found.','Add a useful description summarising this page.','medium');
 test('SEO','Meta Description Length',desc.length>=50&&desc.length<=170,`Description contains ${desc.length} characters. Length guidance is approximate.`,'Write a useful, unique description, often around 50–170 characters.','info');
 test('SEO','Missing Canonical URL',!!first('link[rel~="canonical" i][href]'),'No canonical link detected.','Specify a canonical URL when appropriate; check its correctness.','medium');
 const h1=all('h1');test('SEO','Primary Heading Count',h1.length===1,`Found ${h1.length} H1 elements.`,'Use one clear primary H1 for the main page topic.','medium');
 test('SEO','Missing Open Graph Title',!!first('meta[property="og:title" i][content]'),'No og:title metadata detected.','Add an Open Graph title for social previews.','info');
 }
 if($('accessibility').checked){
 const imgs=all('img'),bad=imgs.filter(e=>!e.hasAttribute('alt'));
 test('Accessibility','Images Missing Alt Attributes',bad.length===0,`${bad.length} of ${imgs.length} images lack an alt attribute.`,'Provide meaningful alt text for informative images and alt="" for decorative images.','high');
 const fields=all('input:not([type=hidden]),textarea,select').filter(e=>!['submit','reset','button','image'].includes((e.getAttribute('type')||'').toLowerCase()));
 const missing=fields.filter(e=>{let id=e.getAttribute('id');return !e.hasAttribute('aria-label')&&!e.hasAttribute('aria-labelledby')&&!e.closest('label')&&!(id&&all('label[for]').some(l=>l.getAttribute('for')===id))});
 test('Accessibility','Form Controls Without Accessible Names',missing.length===0,`${missing.length} of ${fields.length} controls appear to lack a label or accessible name.`,'Connect labels with for/id, nest controls in labels, or supply an accessible name.','high');
 const buttons=all('button'),unnamed=buttons.filter(e=>!text(e)&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')&&!e.getAttribute('title'));
 test('Accessibility','Buttons Without Accessible Names',unnamed.length===0,`${unnamed.length} of ${buttons.length} buttons have no obvious accessible name.`,'Provide visible text or an aria-label for icon-only buttons.','high');
 const links=all('a'),emptyLinks=links.filter(e=>!text(e)&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')&&!e.querySelector('img[alt]:not([alt=""])'));
 test('Accessibility','Links Without Accessible Names',emptyLinks.length===0,`${emptyLinks.length} of ${links.length} links appear unnamed.`,'Provide descriptive link text or an accessible name.','high');
 test('Accessibility','Missing Document Language',!!doc.documentElement.getAttribute('lang'),'No lang attribute on the html element.','Add the correct language code, e.g. lang="en".','medium');
 test('Accessibility','Missing Main Landmark',!!first('main,[role="main"]'),'No main landmark detected.','Wrap primary content in <main> or provide role="main".','medium');
 }
 if($('mobile').checked){
 const viewport=first('meta[name="viewport" i]')?.getAttribute('content')||'';
 test('Mobile','Missing Responsive Viewport',/width\s*=\s*device-width/i.test(viewport),'The viewport meta tag does not declare device-width.','Add <meta name="viewport" content="width=device-width, initial-scale=1">.','high');
 const fixed=all('[width]').filter(e=>Number(e.getAttribute('width'))>1200);
 test('Mobile','Large Fixed Width Attributes',fixed.length===0,`${fixed.length} elements have a numeric width attribute over 1200px.`,'Check oversized fixed-width media for responsive behaviour.','info');
 test('Mobile','Legacy Frameset Detected',all('frameset,frame').length===0,'Legacy frameset elements were found.','Use modern responsive document layouts.','medium');
 }
 if($('content').checked){
 const hs=all('h1,h2,h3,h4,h5,h6'),skips=[];let prev=0;
 for(const h of hs){const n=Number(h.tagName.slice(1));if(prev&&n>prev+1)skips.push(`${'H'+prev} → ${'H'+n}`);prev=n}
 test('Content','Heading Level Jumps',skips.length===0,skips.length?`Possible jumps: ${skips.slice(0,4).join(', ')}.`:'No heading jumps.','Keep a logical heading hierarchy, without skipping levels unnecessarily.','medium');
 test('Content','No Visible Heading',hs.length>0,`Found ${hs.length} heading elements.`,'Add meaningful headings to structure the page.','high');
 const unlabeled=all('iframe').filter(e=>!e.hasAttribute('title'));
 test('Content','Iframes Missing Titles',unlabeled.length===0,`${unlabeled.length} iframes lack title attributes.`,'Add a short descriptive title to each iframe.','medium');
 const anchors=all('a[href]'),generic=anchors.filter(e=>/^(click here|read more|here)$/i.test(text(e)));
 test('Content','Ambiguous Link Text',generic.length===0,`${generic.length} links use generic standalone wording.`,'Use descriptive text that makes sense out of context.','info');
 }
 if(!checks){notice('Select at least one audit category.');return}
 const score=Math.round(100*passes/checks);
 report={generatedAt:new Date().toISOString(),source:val('url').trim()||'Local HTML',score,checks,passed:passes,findings,methodology:'Static DOM checks only; score = 100 * passed / applicable checks. No live performance, security, visual or WCAG certification.'};
 $('empty').hidden=true;$('results').hidden=false;$('score').textContent=score;$('meter').style.width=score+'%';$('checks').textContent=checks;$('passed').textContent=passes;$('warnings').textContent=findings.length;$('critical').textContent=findings.filter(f=>f.priority==='high').length;
 $('status').textContent=score>=85?'Strong foundations':score>=65?'Needs refinement':'Needs attention';
 const priority={high:0,medium:1,info:2};findings.sort((a,b)=>priority[a.priority]-priority[b.priority]);
 $('findings').innerHTML=findings.length?findings.map(f=>`<div class="finding"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><strong>${esc(f.title)}</strong><span class="severity ${esc(f.priority)}">${esc(f.priority.toUpperCase())}</span></div><p>${esc(f.category)} · ${esc(f.detail)}</p><p><strong>Next step:</strong> ${esc(f.fix)}</p></div>`).join(''):'<div class="info">All selected static checks passed. This does not guarantee overall site quality.</div>';
 notice(`Audit complete: ${checks} checks, ${findings.length} review items.`);
}
$('analyse').addEventListener('click',analyze);
$('file').addEventListener('change',async e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>5*1024*1024){notice('File exceeds 5 MB.');return} $('source').value=await file.text();filename=file.name.replace(/\.(html?|xhtml)$/i,'')||'website';notice(`Loaded ${file.name} (${Math.round(file.size/1024)} KB).`);});
const drop=$('drop');drop.addEventListener('dragover',e=>{e.preventDefault();drop.style.borderColor='#40e0ca'});drop.addEventListener('dragleave',()=>drop.style.borderColor='');drop.addEventListener('drop',async e=>{e.preventDefault();drop.style.borderColor='';const file=e.dataTransfer.files[0];if(!file||!/\.(html?|xhtml)$/i.test(file.name)||file.size>5*1024*1024){notice('Drop an HTML file no larger than 5 MB.');return}$('source').value=await file.text();filename=file.name.replace(/\.(html?|xhtml)$/i,'');notice(`Loaded ${file.name}.`)});
$('fetch').addEventListener('click',async()=>{const input=val('url').trim();let u;try{u=new URL(input);if(!['https:','http:'].includes(u.protocol))throw Error('scheme')}catch{notice('Enter a valid http:// or https:// URL.');return}const btn=$('fetch');btn.disabled=true;notice('Trying a direct browser fetch…');try{const res=await fetch(u.href,{mode:'cors',redirect:'follow',credentials:'omit',signal:AbortSignal.timeout(12000)});if(!res.ok)throw Error(`HTTP ${res.status}`);const contentType=res.headers.get('content-type')||'';if(!/html/i.test(contentType))throw Error('Response is not HTML');const txt=await res.text();if(txt.length>5*1024*1024)throw Error('HTML exceeds 5 MB');$('source').value=txt;filename=u.hostname.replace(/[^a-z0-9.-]/gi,'_');notice(`Loaded HTML from ${u.hostname}. This is server-returned source; client-rendered content may be absent.`)}catch(err){notice(`Unable to fetch directly (${err.message}). Many websites block browser cross-origin requests. Use View Page Source → copy/paste, or upload a saved HTML file.`)}finally{btn.disabled=false}});
$('example').addEventListener('click',()=>{$('url').value='';$('source').value='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Example Landing Page</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><header><nav><a href="/">Home</a></nav></header><main><h1>Launch Your Next Campaign</h1><p>Convert more visitors with our platform.</p><img src="hero.jpg"><h3>Features</h3><form><input type="email" placeholder="Your email"><button>Get Started</button></form><a href="/details">Read more</a></main></body></html>';filename='example-landing-page';notice('Example HTML loaded. Select Audit This Page.');analyze()});
$('clear').addEventListener('click',()=>{$('source').value='';$('url').value='';$('file').value='';report=null;$('results').hidden=true;$('empty').hidden=false;$('status').textContent='Awaiting page';notice('Cleared.');});
$('json').addEventListener('click',()=>{if(report)safeDownload(filename+'-audit.json',JSON.stringify(report,null,2),'application/json')});
$('csv').addEventListener('click',()=>{if(!report)return;const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';const rows=[['Category','Priority','Finding','Evidence','Recommendation'],...report.findings.map(f=>[f.category,f.priority,f.title,f.detail,f.fix])];safeDownload(filename+'-findings.csv',rows.map(r=>r.map(quote).join(',')).join('\r\n'),'text/csv')});
$('print').addEventListener('click',()=>{if(report)window.print()});
const theme=$('themeToggle');if(theme)theme.addEventListener('click',()=>{document.body.classList.toggle('light-theme');theme.querySelector('i')?.classList.toggle('fa-sun');theme.querySelector('i')?.classList.toggle('fa-moon')});
})();