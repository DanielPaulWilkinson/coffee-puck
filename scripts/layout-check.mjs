import puppeteer from 'puppeteer-core'
const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']})
const p=await b.newPage(); const out=process.env.OUT||'/tmp/'
const routes=[['home',''],['new-brew','brew/new'],['hint','brew/r2'],['bean-shelf','beans'],['bean-detail','beans/b1'],['history','history'],['add-bean','beans/new'],['edit-brew','brew/r9/edit'],['edit-bean','beans/b1/edit']]
let fail=0
for(const w of [390,768,860,1024,1440]){ await p.setViewport({width:w,height:900})
 for(const [n,r] of routes){ await p.goto(`http://localhost:4173/?demo=1#/${r}`,{waitUntil:'networkidle0'}); await new Promise(r=>setTimeout(r,400))
  const m=await p.evaluate(()=>{const mn=document.querySelector('main').getBoundingClientRect();
   const ins=[...document.querySelectorAll('input[type=number]')].map(i=>Math.round(i.getBoundingClientRect().width));
   const clipped=[...document.querySelectorAll('button,.chip')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent.trim());
   return {main:Math.round(mn.width),left:Math.round(mn.left),right:Math.round(innerWidth-mn.right),sw:document.documentElement.scrollWidth,ins,clipped}})
  const bad=m.main<340||m.sw>w||m.ins.some(x=>x<72)||m.clipped.length
  if(bad)fail++; console.log(w,n,JSON.stringify(m),bad?'FAIL':'ok')
  await p.screenshot({path:`${out}${n}-${w}.png`,fullPage:true})}}
await b.close(); process.exit(fail?1:0)
