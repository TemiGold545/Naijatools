const $=s=>document.querySelector(s);
const workspace=$("#workspace"), content=$("#toolContent");
$("#year").textContent=new Date().getFullYear();
$("#themeBtn").onclick=()=>document.body.classList.toggle("dark");
$("#toolSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase();document.querySelectorAll(".tool-card").forEach(c=>c.hidden=!c.innerText.toLowerCase().includes(q));});
$("#closeTool").onclick=()=>{workspace.hidden=true;workspace.scrollIntoView({behavior:"smooth"});};
document.querySelectorAll(".tool-card").forEach(c=>c.onclick=()=>openTool(c.dataset.tool));
$("#shareBtn").onclick=async()=>{const data={title:"NaijaMultiTools",text:"Try these free everyday tools!",url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);alert("Website link copied!")}else alert("Copy this website address from your browser.");};

function openTool(name){
 const titles={calculator:"Calculator",text:"Text toolkit",converter:"Unit converter",password:"Password maker",notes:"Quick notes",age:"Age calculator",budget:"Budget planner",tip:"Tip calculator",percentage:"Percentage tool",discount:"Discount calculator",vat:"VAT calculator",loan:"Loan estimator",date:"Date difference",picker:"Random picker",gpa:"Grade average"};
 $("#toolTitle").textContent=titles[name];workspace.hidden=false;content.innerHTML="";
 const templates={
 calculator:`<label class="field">Calculation<input id="calcDisplay" placeholder="Enter a calculation, e.g. (25+5)*3"></label><button class="action" id="calculate">Calculate</button><button class="action secondary" id="clearCalc">Clear</button><div class="result" id="calcResult">Your answer will appear here.</div><p><small>Use numbers and + − × ÷ parentheses and decimals.</small></p>`,
 text:`<label class="field">Enter your text<textarea id="textInput" placeholder="Type or paste your text here..."></textarea></label><div class="result" id="textStats">0 words · 0 characters</div><button class="action" data-case="upper">UPPERCASE</button><button class="action" data-case="lower">lowercase</button><button class="action" data-case="title">Title Case</button><button class="action secondary" id="copyText">Copy text</button>`,
 converter:`<label class="field">Value<input id="convValue" type="number" value="1"></label><label class="field">Convert<select id="convType"><option value="km-mi">Kilometres → Miles</option><option value="mi-km">Miles → Kilometres</option><option value="kg-lb">Kilograms → Pounds</option><option value="lb-kg">Pounds → Kilograms</option><option value="c-f">Celsius → Fahrenheit</option><option value="f-c">Fahrenheit → Celsius</option><option value="m-cm">Metres → Centimetres</option><option value="cm-m">Centimetres → Metres</option></select></label><div class="result" id="convResult">1</div><button class="action" id="convert">Convert</button>`,
 password:`<label class="field">Password length<input id="passLength" type="number" min="8" max="64" value="16"></label><label class="field"><input type="checkbox" id="passSymbols" checked style="display:inline;width:auto"> Include symbols</label><button class="action" id="makePass">Generate password</button><div class="result" id="passResult">Your password will appear here.</div><button class="action secondary" id="copyPass">Copy password</button><p><small>For important accounts, use a trusted password manager and never share your password.</small></p>`,
 notes:`<label class="field">Your note<textarea id="noteInput" placeholder="Write a note..."></textarea></label><button class="action" id="saveNote">Save note</button><button class="action secondary" id="clearNote">Clear</button><div class="result" id="noteStatus">Notes are saved only in this browser on this device.</div>`,
 age:`<label class="field">Date of birth<input id="birthDate" type="date"></label><button class="action" id="getAge">Calculate age</button><div class="result" id="ageResult">Your age will appear here.</div>`,
 budget:`<label class="field">Monthly income (₦)<input id="income" type="number" min="0" placeholder="e.g. 150000"></label><label class="field">Monthly expenses (₦)<input id="expenses" type="number" min="0" placeholder="e.g. 95000"></label><button class="action" id="budgetCalc">Calculate balance</button><div class="result" id="budgetResult">Your balance will appear here.</div>`,
 tip:`<label class="field">Bill amount<input id="bill" type="number" min="0" placeholder="e.g. 25000"></label><label class="field">Tip percentage<input id="tipPercent" type="number" min="0" value="10"></label><label class="field">Number of people<input id="people" type="number" min="1" value="1"></label><button class="action" id="tipCalc">Calculate split</button><div class="result" id="tipResult">Each person's share will appear here.</div>`,

 percentage:`<label class="field">Percentage<input id="pctRate" type="number" placeholder="e.g. 15"></label><label class="field">Of this number<input id="pctBase" type="number" placeholder="e.g. 240"></label><button class="action" id="pctCalc">Calculate</button><div class="result" id="pctResult">Result appears here.</div><hr><label class="field">Change from<input id="pctFrom" type="number"></label><label class="field">Change to<input id="pctTo" type="number"></label><button class="action" id="changeCalc">Find percentage change</button><div class="result" id="changeResult">Change appears here.</div>`,
 discount:`<label class="field">Original price (₦)<input id="oldPrice" type="number" min="0"></label><label class="field">Discount (%)<input id="discountRate" type="number" min="0" max="100" value="10"></label><button class="action" id="discountCalc">Calculate sale price</button><div class="result" id="discountResult">Sale price appears here.</div>`,
 vat:`<label class="field">Amount before VAT (₦)<input id="vatAmount" type="number" min="0"></label><label class="field">VAT rate (%)<input id="vatRate" type="number" min="0" value="7.5"></label><button class="action" id="vatCalc">Calculate total</button><div class="result" id="vatResult">VAT and total appear here. Confirm the rate applicable to your transaction.</div>`,
 loan:`<label class="field">Loan amount<input id="loanAmount" type="number" min="0"></label><label class="field">Annual simple interest rate (%)<input id="loanRate" type="number" min="0"></label><label class="field">Duration (years)<input id="loanYears" type="number" min="0" step="0.1"></label><button class="action" id="loanCalc">Estimate</button><div class="result" id="loanResult">Estimate appears here.</div><small>Simple-interest estimate only; lender fees and repayment schedules are not included.</small>`,
 date:`<label class="field">Start date<input id="dateStart" type="date"></label><label class="field">End date<input id="dateEnd" type="date"></label><button class="action" id="dateCalc">Count days</button><div class="result" id="dateResult">Number of days appears here.</div>`,
 picker:`<label class="field">Enter options, one per line<textarea id="pickerItems" placeholder="Option one&#10;Option two&#10;Option three"></textarea></label><button class="action" id="pickOne">Pick randomly</button><div class="result" id="pickerResult">Your choice appears here.</div>`,
 gpa:`<p>Enter grades as numbers separated by commas (for example, 5, 4, 3, 2). This is a simple average only.</p><label class="field">Grades<input id="grades" placeholder="5, 4, 3, 2"></label><button class="action" id="gpaCalc">Calculate average</button><div class="result" id="gpaResult">Average appears here.</div><small>Use your school's official grading scale and credit-unit weighting for an official GPA.</small>`
 };
 content.innerHTML=templates[name];workspace.scrollIntoView({behavior:"smooth",block:"start"});
 if(name==="calculator"){
  $("#calculate").onclick=()=>{try{let s=$("#calcDisplay").value;if(!/^[0-9+\-*/().%\s]+$/.test(s))throw Error();let r=Function('"use strict";return ('+s+')')();if(!Number.isFinite(r))throw Error();$("#calcResult").textContent="Answer: "+r}catch(e){$("#calcResult").textContent="Please enter a valid calculation."}};
  $("#clearCalc").onclick=()=>{$("#calcDisplay").value="";$("#calcResult").textContent="Your answer will appear here."};
 }
 if(name==="text"){
  const input=$("#textInput");input.oninput=()=>{$("#textStats").textContent=(input.value.trim()?input.value.trim().split(/\s+/).length:0)+" words · "+input.value.length+" characters"};
  content.querySelectorAll("[data-case]").forEach(b=>b.onclick=()=>{let v=input.value;if(b.dataset.case==="upper")v=v.toUpperCase();if(b.dataset.case==="lower")v=v.toLowerCase();if(b.dataset.case==="title")v=v.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());input.value=v;input.dispatchEvent(new Event("input"))});
  $("#copyText").onclick=()=>navigator.clipboard?.writeText(input.value);
 }
 if(name==="converter")$("#convert").onclick=()=>{let v=Number($("#convValue").value),t=$("#convType").value,fn={"km-mi":x=>x*.621371,"mi-km":x=>x/ .621371,"kg-lb":x=>x*2.20462,"lb-kg":x=>x/2.20462,"c-f":x=>x*9/5+32,"f-c":x=>(x-32)*5/9,"m-cm":x=>x*100,"cm-m":x=>x/100}[t];$("#convResult").textContent=Number.isFinite(v)?fn(v).toLocaleString(undefined,{maximumFractionDigits:4}):"Enter a valid number"};
 if(name==="password"){
  $("#makePass").onclick=()=>{let chars="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"+($("#passSymbols").checked?"!@#$%&*_-+=":""),n=Math.max(8,Math.min(64,Number($("#passLength").value)||16)),a=new Uint32Array(n);crypto.getRandomValues(a);$("#passResult").textContent=Array.from(a,x=>chars[x%chars.length]).join("")};
  $("#copyPass").onclick=()=>navigator.clipboard?.writeText($("#passResult").textContent);
 }
 if(name==="notes"){
  $("#noteInput").value=localStorage.getItem("naijaMultiToolsNote")||"";
  $("#saveNote").onclick=()=>{localStorage.setItem("naijaMultiToolsNote",$("#noteInput").value);$("#noteStatus").textContent="Saved on this device."};
  $("#clearNote").onclick=()=>{localStorage.removeItem("naijaMultiToolsNote");$("#noteInput").value="";$("#noteStatus").textContent="Note cleared."};
 }
 if(name==="age")$("#getAge").onclick=()=>{let d=new Date($("#birthDate").value+"T00:00:00"),now=new Date();if(!$("#birthDate").value||d>now){$("#ageResult").textContent="Choose a valid date in the past.";return}let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth(),day=now.getDate()-d.getDate();if(day<0)m--;if(m<0){y--;m+=12}$("#ageResult").textContent=`You are ${y} years and ${m} months old.`};
 if(name==="budget")$("#budgetCalc").onclick=()=>{let i=Number($("#income").value),e=Number($("#expenses").value);$("#budgetResult").textContent=i>=0&&e>=0&&$("#income").value!==""&&$("#expenses").value!==""?"Remaining balance: ₦"+(i-e).toLocaleString():"Enter both amounts."};
 if(name==="tip")$("#tipCalc").onclick=()=>{let b=Number($("#bill").value),p=Number($("#tipPercent").value),n=Number($("#people").value);$("#tipResult").textContent=b>=0&&p>=0&&n>0&&$("#bill").value!==""?"Each person pays: "+((b*(1+p/100))/n).toLocaleString(undefined,{style:"currency",currency:"NGN",maximumFractionDigits:2}):"Enter valid amounts and number of people."};
 if(name==="percentage"){
  $("#pctCalc").onclick=()=>$("#pctResult").textContent=(Number($("#pctRate").value)*Number($("#pctBase").value)/100).toLocaleString();
  $("#changeCalc").onclick=()=>{let a=Number($("#pctFrom").value),b=Number($("#pctTo").value);$("#changeResult").textContent=a!==0?(((b-a)/Math.abs(a))*100).toFixed(2)+"% change":"Starting value must not be zero."};
 }
 if(name==="discount")$("#discountCalc").onclick=()=>{let a=Number($("#oldPrice").value),r=Number($("#discountRate").value);$("#discountResult").textContent=a>=0&&r>=0&&r<=100&&$("#oldPrice").value!==""?"You save ₦"+(a*r/100).toLocaleString()+" · Sale price ₦"+(a*(1-r/100)).toLocaleString():"Enter a valid price and discount from 0 to 100."};
 if(name==="vat")$("#vatCalc").onclick=()=>{let a=Number($("#vatAmount").value),r=Number($("#vatRate").value);$("#vatResult").textContent=a>=0&&r>=0&&$("#vatAmount").value!==""?"VAT: ₦"+(a*r/100).toLocaleString()+" · Total: ₦"+(a*(1+r/100)).toLocaleString():"Enter valid values."};
 if(name==="loan")$("#loanCalc").onclick=()=>{let a=Number($("#loanAmount").value),r=Number($("#loanRate").value),y=Number($("#loanYears").value);$("#loanResult").textContent=a>0&&r>=0&&y>0?"Estimated simple interest: "+(a*r*y/100).toLocaleString()+" · Total: "+(a*(1+r*y/100)).toLocaleString():"Enter a positive amount and duration."};
 if(name==="date")$("#dateCalc").onclick=()=>{let a=$("#dateStart").value,b=$("#dateEnd").value;if(!a||!b){$("#dateResult").textContent="Choose both dates.";return}$("#dateResult").textContent=Math.abs(Math.round((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/86400000)).toLocaleString()+" days between the dates."};
 if(name==="picker")$("#pickOne").onclick=()=>{let a=$("#pickerItems").value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);$("#pickerResult").textContent=a.length?a[Math.floor(Math.random()*a.length)]:"Enter at least one option."};
 if(name==="gpa")$("#gpaCalc").onclick=()=>{let raw=$("#grades").value.split(",").map(x=>x.trim()).filter(Boolean),a=raw.map(Number);$("#gpaResult").textContent=a.length&&a.every(Number.isFinite)?"Simple average: "+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2):"Enter valid grades separated by commas."};

}

// Installable Progressive Web App
let installPrompt=null;
const installButtons=[$("#installBtn"),$("#installBtnBottom")].filter(Boolean);
window.addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;installButtons.forEach(b=>b.hidden=false)});
installButtons.forEach(button=>button.addEventListener("click",async()=>{
 if(!installPrompt){alert("On iPhone: open Share in Safari, then choose Add to Home Screen. On Android: open your browser menu and choose Install app or Add to Home screen.");return}
 installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButtons.forEach(b=>b.hidden=true);
}));
window.addEventListener("appinstalled",()=>installButtons.forEach(b=>b.hidden=true));
if("serviceWorker" in navigator && (location.protocol==="https:" || location.hostname==="localhost")){
 window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
}
