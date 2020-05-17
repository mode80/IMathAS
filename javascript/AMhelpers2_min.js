var AutoSuggestIdCounter,autoSuggestLists,autoSuggestObjects,initstack=[],loadedscripts=[],callbackstack={},imathasAssess=function($){var LivePreviews,MQsyntaxtimer,greekletters,onlyAscii,allParams={};function clearparams(e){var t;for(t in e)delete allParams[t]}function init(e,t,a){var i,r,n,s,c,l,o,d;for(i in e)if(!isNaN(parseInt(i))){if(allParams[i]=e[i],(r=e[i]).helper&&r.qtype.match(/^(calc|numfunc|string|interval)/)&&(s=document.getElementById("qn"+i),c=r.qtype,r.calcformat&&(c+=","+r.calcformat),r.displayformat&&(c+=","+r.displayformat),r.matrixsize?(c+=",matrixsized",$("input[id^=qn"+i+"-]").attr("data-mq",c)):s.setAttribute("data-mq",c),r.vars&&s.setAttribute("data-mq-vars",r.vars),t&&(r.matrixsize?MQeditor.toggleMQAll("input[id^=qn"+i+"-]",!0,!0):MQeditor.toggleMQ(s,!0,!0),$("#pbtn"+i).hide())),r.preview&&(l=i,document.getElementById("pbtn"+i).addEventListener("click",function(){showPreview(l)}),r.qtype.match(/matrix/)||(LivePreviews.hasOwnProperty(i)&&delete LivePreviews[i],setupLivePreview(i,t),document.getElementById("qn"+i).addEventListener("keyup",updateLivePreview),t&&showSyntaxCheckMQ(i))),"debit"===r.format?document.getElementById("qn"+i).addEventListener("keyup",editdebit):"credit"===r.format?(document.getElementById("qn"+i).addEventListener("keyup",editcredit),initcreditboxes()):"normslider"===r.format&&imathasDraw.addnormslider(i,!0),r.autosuggest&&(!autoSuggestLists.hasOwnProperty(r.autosuggest)&&r.hasOwnProperty(r.autosuggest)&&(autoSuggestLists[r.autosuggest]=r[r.autosuggest]),autoSuggestLists.hasOwnProperty(r.autosuggest)&&(autoSuggestObjects[i]=new AutoSuggest(document.getElementById("qn"+i),autoSuggestLists[r.autosuggest]))),r.tip)if(s=document.getElementById("qn"+i+"-0"))for(n=0;document.getElementById("qn"+i+"-"+n);)setupTips("qn"+i+"-"+n,r.tip,r.longtip),n++;else setupTips("qn"+i,r.tip,r.longtip);"draw"===r.qtype&&setupDraw(i),"file"===r.qtype&&initFileAlt(document.getElementById("qn"+i)),"multans"===r.qtype&&initMultAns(i),r.usetinymce&&(document.getElementById("qn"+i).disabled&&!document.getElementById("tinyprev"+i)?(o=$("#qn"+i).val(),(d=$("<div>",{id:"tinyprev"+i,class:"introtext"})).html(o),$("#qn"+i).hide().after(d)):initeditor("selector","#qn"+i+".mceEditor",null,!1,function(e){e.on("blur",function(e){tinymce.triggerSave(),jQuery(e.target.targetElm).triggerHandler("change")}).on("focus",function(e){jQuery(e.target.targetElm).triggerHandler("focus")})})),"essay"==r.qtype&&$("#qnwrap"+i+".introtext img").on("click",rotateimg),initEnterHandler(i)}if(initDupRubrics(),initShowAnswer2(),a&&setScoreMarkers(a),initqsclickchange(),initClearScoreMarkers(),e.scripts){!function e(t,a){var i;if("code"==t[a][0]){try{window.eval(t[a][1])}catch(e){console.log("Error executing question script:"+t[a][1])}t.length>a+1&&e(t,a+1)}else-1==loadedscripts.indexOf(t[a][1])?jQuery.getScript(t[a][1]).always(function(){loadedscripts.push(t[a][1]),t.length>a+1&&e(t,a+1)}):t.length>a+1&&e(t,a+1);if(t.length<=a+1){for(i=0;i<initstack.length;i++)initstack[i]();initstack.length=0}}(e.scripts,0)}}function setupTips(e,t,a){var i,r=document.getElementById(e);r&&(r.setAttribute("data-tip",t),i=e.substr(2).split(/-/)[0],document.getElementById("tips"+i)||$("body").append($("<div>",{class:"hidden",id:"tips"+i}).html(a)),r.setAttribute("aria-label",t),r.setAttribute("aria-describedby","tips"+i),r.addEventListener("focus",function(){showehdd(e,t,i)}),r.addEventListener("blur",hideeh),r.addEventListener("click",function(){reshrinkeh(e)}))}function clearTips(){hideAllEhTips()}function initqsclickchange(){$("input[id^=qs][value=spec]").each(function(e,t){$(t).siblings("input[type=text]").off("keyup.qsclickchange").on("keyup.qsclickchange",function(e){8!=e.keyCode&&46!=e.keyCode&&$(t).prop("checked",!0)})})}function clearScoreMarkers(e){var t,a,i=e.currentTarget;null!==(t=i.className.match(/(ansgrn|ansred|ansyel)/))?($(i).removeClass(t[0]),$(i).nextAll(".scoremarker.sr-only").first().remove(),"select"==i.tagName.toLowerCase()&&$(i).nextAll("svg.scoremarker").first().remove(),"hidden"==i.type&&$("#mqinput-"+i.id).removeClass(t[0])):0<(a=$(i).closest("[id^=qnwrap]")).length&&null!==(t=a[0].className.match(/(ansgrn|ansred|ansyel)/))&&(a.removeClass(t[0]),a.find(".scoremarker").remove())}function setScoreMarkers(e){var t,a,i='<svg class="scoremarker" viewBox="0 0 24 24" width="16" height="16" stroke="green" stroke-width="3" fill="none" role="img" aria-hidden=true>';i+='<polyline points="20 6 9 17 4 12"></polyline></svg>',i+='<span class="sr-only scoremarker">'+_("Correct")+"</span>",t='<svg class="scoremarker" viewBox="0 0 24 24" width="16" height="16" stroke="rgb(255,187,0)" stroke-width="3" fill="none" role="img" aria-hidden=true>',t+='<path d="M 5.3,10.6 9,14.2 18.5,4.6 21.4,7.4 9,19.8 2.7,13.5 z" /></svg>',t+='<span class="sr-only scoremarker">'+_("Partially correct")+"</span>",a='<svg class="scoremarker" viewBox="0 0 24 24" width="16" height="16" stroke="rgb(153,0,0)" stroke-width="3" fill="none" role="img" aria-hidden=true>',a+='<path d="M18 6 L6 18 M6 6 L18 18" /></svg>',a+='<span class="sr-only scoremarker">'+_("Incorrect")+"</span>",$(e).find(".scoremarker").remove(),$(e).find("div.ansgrn,table.ansgrn").append(i),$(e).find("div.ansyel,table.ansyel").append(t),$(e).find("div.ansred,table.ansred").append(a),$(e).find("select.ansgrn").after(i),$(e).find("select.ansyel").after(t),$(e).find("select.ansred").after(a),$(e).find("span[id^=mqinput-].ansgrn,input[type=text].ansgrn").after('<span class="scoremarker sr-only">'+_("Correct")+"</span>"),$(e).find("span[id^=mqinput-].ansyel,input[type=text].ansyel").after('<span class="scoremarker sr-only">'+_("Partially correct")+"</span>"),$(e).find("span[id^=mqinput-].ansred,input[type=text].ansred").after('<span class="scoremarker sr-only">'+_("Incorrect")+"</span>")}function initClearScoreMarkers(){$("input[id^=qn]").off("input.clearmarkers").on("input.clearmarkers",clearScoreMarkers),$("input[id^=qs],select[id^=qn]").off("change.clearmarkers").on("change.clearmarkers",clearScoreMarkers)}function initEnterHandler(e){$("input[type=text][name=qn"+e+"]").off("keydown.enterhandler").on("keydown.enterhandler",function(e){if(13==e.which){var t=$(this).closest(".questionwrap").find(".submitbtnwrap .primary");0<t.length&&e.preventDefault(),t.is(":disabled")||t.trigger("click")}})}function handleMQenter(e){var t=$("#"+e).closest(".questionwrap").find(".submitbtnwrap .primary");t.is(":disabled")||t.trigger("click")}function initDupRubrics(){$(".rubriclink").each(function(e,t){var a,i,r;$(t).removeClass("rubriclink"),-1!==(a=t.id.substring(16)).indexOf("-")&&(a=1e3*(1*(i=a.split("-"))[0]+1)+1*i[1]),0<(r=$("#mqinput-qn"+a+",input[type=text]#qn"+a+",select#qn"+a+",textarea#qn"+a+",div.intro#qnwrap"+a)).length&&(r.after(t),$(t).show())})}function initShowAnswer2(){$("input.sabtn + span.hidden, input.sabtn + div.hidden").each(function(e,t){var a,i,r,n,s,c=t.id.substring(3),l=c;if(-1!==l.indexOf("-")&&(l=1e3*(1*(a=l.split("-"))[0]+1)+1*a[1]),i=$("<span>",{class:"keywrap"}).append($("<button>",{type:"button","aria-controls":"ans"+c,"aria-expanded":"false",class:"keybtn","aria-label":_("View Key"),title:_("View Key")}).on("click",function(e){var t="true"==e.currentTarget.getAttribute("aria-expanded");e.currentTarget.setAttribute("aria-expanded",t?"false":"true"),$("#ans"+c).toggle(!t)}).html('<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>')),0<$(t).closest(".autoshowans").length){if(0<(r=$("#qnwrap"+l)).length)return $(t).prev(".sabtn").remove(),i.append($(t).hide().removeClass("hidden")).addClass("inwrap"),void r.append(i);if(0<(n=$("#mqinput-qn"+l+",input[type=text]#qn"+l+",select#qn"+l+",textarea#qn"+l)).length)return $(t).prev(".sabtn").remove(),i.append($(t).hide().removeClass("hidden")),void n.after(i)}s=$(t).parent(),i.append($(t).hide().removeClass("hidden")),s.empty().append(i)}),$("input.dsbtn + div.hidden").attr("aria-hidden",!0).attr("aria-expanded",!1),$("input.dsbtn").each(function(){var e=$(this).siblings("div:first-of-type").attr("id");$(this).attr("aria-expanded",!1).attr("aria-controls",e).off("click.sashow").on("click.sashow",function(){$(this).attr("aria-expanded",!0).siblings("div:first-of-type").attr("aria-expanded",!0).attr("aria-hidden",!1).removeClass("hidden")})})}function initShowAnswer(){$("input.sabtn + span.hidden").attr("aria-hidden",!0).attr("aria-expanded",!1),$("input.sabtn").each(function(){var e=$(this).siblings("span:first-of-type").attr("id");$(this).attr("aria-expanded",!1).attr("aria-controls",e).off("click.sashow").on("click.sashow",function(){$(this).attr("aria-expanded",!0).siblings("span:first-of-type").attr("aria-expanded",!0).attr("aria-hidden",!1).removeClass("hidden")})}),$("input.dsbtn + div.hidden").attr("aria-hidden",!0).attr("aria-expanded",!1),$("input.dsbtn").each(function(){var e=$(this).siblings("div:first-of-type").attr("id");$(this).attr("aria-expanded",!1).attr("aria-controls",e).off("click.sashow").on("click.sashow",function(){$(this).attr("aria-expanded",!0).siblings("div:first-of-type").attr("aria-expanded",!0).attr("aria-hidden",!1).removeClass("hidden")})})}function setupDraw(e){var t,a,i,r=document.getElementById("qn"+e).value,n=r.split(";;"),s=[];for(t=0;t<n.length;t++)if(5==t?n[t]="["+n[t].replace(/&quot;/g,'"')+"]":(n[t]="["+n[t].replace(/\(/g,"[").replace(/\)/g,"]")+"]",0==t&&2<n[t].length&&(n[t]="["+n[t].replace(/;/g,"],[")+"]")),""===n[t])s[t]=[];else try{s[t]=JSON.parse(n[t])}catch(e){s[t]=[]}window.drawla[e]=s,window.canvases[e]=allParams[e].canvas,imathasDraw.initCanvases(e),(a=document.getElementById("drawtools"+e))&&a.addEventListener("click",function(e){var t,a,i,r=e.target;r.hasAttribute("data-drawaction")&&(t=r.getAttribute("data-drawaction"),a=r.getAttribute("data-qn"),"clearcanvas"===t?imathasDraw.clearcanvas(a):"settool"===t&&(i=r.getAttribute("data-val"),imathasDraw.settool(r,a,i)))}),(i=document.getElementById("qn"+e).parentNode.querySelector(".a11ydrawadd"))&&i.addEventListener("click",function(e){var t=e.target.getAttribute("data-qn");imathasDraw.adda11ydraw(t)})}function initMultAns(e){var t,a=$("#qnwrap"+e).find("label:last").text().match(/none\s+of/i);a&&(t=$('input[name^="qn'+e+'["]')).on("change",function(){this.checked&&this.value==t.length-1?t.not(":last").prop("checked",!1):this.checked&&t.last().prop("checked",!1)})}function isBlank(e){return!e||0===e.length||/^\s*$/.test(e)}function editdebit(e){var t=e.target,a=$("#qn"+(1*t.id.substr(2)-1));!isBlank(t.value)&&a.hasClass("iscredit")&&(a.css("padding-left"),a.is("select")?a.css("margin-right",20):a.width(""),a.css("padding-left",""),a.removeClass("iscredit"))}function editcredit(e){var t,a=e.target,i=$("#qn"+(1*a.id.substr(2)-2));isBlank(a.value)||i.hasClass("iscredit")||(t=parseInt(i.css("padding-left")),i.is("select")?i.css("margin-right",0):i.width(i.width()-20),i.css("padding-left",20+t),i.addClass("iscredit"))}function initcreditboxes(){$(".creditbox").each(function(e,t){editcredit({target:t})})}function setupLivePreview(i,e){LivePreviews.hasOwnProperty(i)||("MathJax"==mathRenderer||"Katex"==mathRenderer?(LivePreviews[i]={delay:"MathJax"==mathRenderer?100:0,finaldelay:1e3,preview:null,buffer:null,timeout:null,finaltimeout:null,mjRunning:!1,mjPending:!1,oldText:null,Init:function(e){$("#p"+i).css("positive","relative").append('<span id="lpbuf1'+i+'" style="visibility:hidden;position:absolute;"></span>').append('<span id="lpbuf2'+i+'" style="visibility:hidden;position:absolute;"></span>'),this.preview=document.getElementById("lpbuf1"+i),this.buffer=document.getElementById("lpbuf2"+i),e||showPreview(i)},SwapBuffers:function(){var e=this.preview,t=this.buffer;this.buffer=e,this.preview=t,e.style.visibility="hidden",e.style.position="absolute",t.style.position="",t.style.visibility=""},Update:function(e){this.timeout&&clearTimeout(this.timeout),this.finaltimeout&&clearTimeout(this.finaltimeout),this.timeout=setTimeout(this.callback,this.delay),this.finaltimeout=setTimeout(this.DoFinalPreview,this.finaldelay)},RenderNow:function(e){this.buffer.innerHTML=this.oldtext=e,this.mjRunning=!0,this.RenderBuffer()},RenderBuffer:function(){"MathJax"==mathRenderer?MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.buffer],["PreviewDone",this]):"Katex"==mathRenderer&&(renderMathInElement(this.buffer),"undefined"!=typeof MathJax&&MathJax.version&&0<$(this.buffer).children(".mj").length?MathJax.Hub.Queue(["PreviewDone",this]):this.PreviewDone())},DoFinalPreview:function(){$("#pbtn"+i).trigger("click")},preformat:function(e){var t=allParams[i].qtype,a=allParams[i].calcformat;return preformat(i,e,t,a)},CreatePreview:function(){if(this.timeout=null,!this.mjPending){var e=document.getElementById("qn"+i).value;e!==this.oldtext&&(this.mjRunning?(this.mjPending=!0,MathJax.Hub.Queue(["CreatePreview",this])):(this.oldtext=e,this.buffer.innerHTML="`"+this.preformat(e)+"`",this.mjRunning=!0,this.RenderBuffer()))}},PreviewDone:function(){this.mjRunning=this.mjPending=!1,this.SwapBuffers(),updateehpos()}},"undefined"!=typeof MathJax?(LivePreviews[i].callback=MathJax.Callback(["CreatePreview",LivePreviews[i]]),LivePreviews[i].callback.autoReset=!0):LivePreviews[i].callback=function(){LivePreviews[i].CreatePreview()},LivePreviews[i].Init(e)):LivePreviews[i]={finaldelay:1e3,finaltimeout:null,Update:function(e){this.finaltimeout&&clearTimeout(this.finaltimeout),this.finaltimeout=setTimeout(this.DoFinalPreview,this.finaldelay)},RenderNow:function(e){var t=document.getElementById("p"+i);t.innerHTML=e,rendermathnode(t)},DoFinalPreview:function(){$("#pbtn"+i).trigger("click")}})}function updateLivePreview(e){var t=e.target.id.substr(2);setupLivePreview(t),LivePreviews[t].Update()}function clearLivePreviewTimeouts(){for(var e in LivePreviews)clearTimeout(LivePreviews[e].finaltimeout)}function normalizemathunicode(e){return e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g,"")).replace(/\u2013|\u2014|\u2015|\u2212/g,"-")).replace(/\u2044|\u2215/g,"/")).replace(/∞/g,"oo").replace(/≤/g,"<=").replace(/≥/g,">=").replace(/∪/g,"U")).replace(/±/g,"+-").replace(/÷/g,"/").replace(/·|✕|×|⋅/g,"*")).replace(/√/g,"sqrt").replace(/∛/g,"root(3)")).replace(/²/g,"^2").replace(/³/g,"^3")).replace(/\u2329/g,"<").replace(/\u232a/g,">")).replace(/₀/g,"_0").replace(/₁/g,"_1").replace(/₂/g,"_2").replace(/₃/g,"_3")).replace(/\bOO\b/i,"oo")).replace(/θ/,"theta").replace(/ϕ/,"phi").replace(/φ/,"phi").replace(/π/,"pi").replace(/σ/,"sigma").replace(/μ/,"mu")).replace(/α/,"alpha").replace(/β/,"beta").replace(/γ/,"gamma").replace(/δ/,"delta").replace(/ε/,"epsilon").replace(/κ/,"kappa")).replace(/λ/,"lambda").replace(/ρ/,"rho").replace(/τ/,"tau").replace(/χ/,"chi").replace(/ω/,"omega")).replace(/Ω/,"Omega").replace(/Γ/,"Gamma").replace(/Φ/,"Phi").replace(/Δ/,"Delta").replace(/Σ/,"Sigma")}function showPreview(e){var t,a=allParams[e],i="",r=processByType(e);r.str&&(i="`"+r.str+"`"),r.dispvalstr&&""!=r.dispvalstr&&-1!=a.calcformat.indexOf("showval")&&(i+=(""==i?"":" = ")+"`"+r.dispvalstr+"`"),r.err&&""!=r.err&&""!=r.str&&(i+="``"==i?"":". <span class=noticetext>"+r.err+"</span>"),LivePreviews.hasOwnProperty(e)?LivePreviews[e].RenderNow(i):((t=document.getElementById("p"+e)).innerHTML=i,rendermathnode(t))}function syntaxCheckMQ(e,t){clearTimeout(MQsyntaxtimer);var a=parseInt(e.replace(/\D/g,""));MQsyntaxtimer=setTimeout(function(){showSyntaxCheckMQ(a)},1e3)}function showSyntaxCheckMQ(e){var t,a=processByType(e),i="";a.err&&""!=a.err&&""!=a.str&&(i+="<span class=noticetext>"+a.err+"</span>"),LivePreviews.hasOwnProperty(e)?((t=document.getElementById("p"+e).firstChild).innerHTML=i,t.style.visibility="",t.style.position=""):(t=document.getElementById("p"+e)).innerHTML=i}function preSubmitForm(e){var t,a,i,r;for(a in allParams)!1!==(t=preSubmit(a))&&((i=document.getElementById("qn"+a+"-val"))?i.value=t:((r=document.createElement("input")).type="hidden",r.name="qn"+a+"-val",r.value=t,e.appendChild(r)))}function preSubmit(e){var t=processByType(e);return!!t.submitstr&&t.submitstr}function preSubmitString(e,t){var a,i=parseInt(e.substr(2));return allParams.hasOwnProperty(i)&&(a=allParams[i],t=(t=normalizemathunicode(t)).replace(/^\s+/,"").replace(/\s+$/,""),"numfunc"==a.qtype&&(t=AMnumfuncPrepVar(i,t)[3])),t}function processByType(e){var t,a,i,r;if(!allParams.hasOwnProperty(e))return!1;if(a={},"draw"==(t=allParams[e]).qtype)return imathasDraw.encodea11ydraw(),{};if("choices"==t.qtype||"multans"==t.qtype||"matching"==t.qtype)return{};if(t.hasOwnProperty("matrixsize"))a=processSizedMatrix(e);else{if(!(i=document.getElementById("qn"+e)))return!1;if((r=(r=normalizemathunicode(r=i.value)).replace(/^\s+/,"").replace(/\s+$/,"")).match(/^\s*$/))return{str:"",displvalstr:"",submitstr:""};if(r.match(/^\s*DNE\s*$/i))return{str:"DNE",displvalstr:"",submitstr:"DNE"};if(r.match(/^\s*oo\s*$/i))return{str:"oo",displvalstr:"",submitstr:"oo"};if(r.match(/^\s*-oo\s*$/i))return{str:"-oo",displvalstr:"",submitstr:"-oo"};switch(t.qtype){case"calculated":a=processCalculated(r,t.calcformat);break;case"interval":case"calcinterval":a=processCalcInterval(r,t.calcformat,t.vars);break;case"calcntuple":a=processCalcNtuple(r,t.calcformat);break;case"calccomplex":a=processCalcComplex(r,t.calcformat);break;case"calcmatrix":a=processCalcMatrix(r,t.calcformat);break;case"numfunc":a=processNumfunc(e,r,t.calcformat);break;case"matrix":(a=processCalcMatrix(r,"")).dispvalstr=""}a.str=preformat(e,r,t.qtype,t.calcformat)}return a}function preformat(e,t,a,i){return t=normalizemathunicode(t),a.match(/interval/)?i.match(/inequality/)?(t=t.replace(/<=/g," le ").replace(/>=/g," ge ").replace(/</g," lt ").replace(/>/g," gt ")).match(/all\s*real/i)&&(t="text("+t+")"):t=t.replace(/U/g,"uu"):"numfunc"==a?t=AMnumfuncPrepVar(e,t)[1]:"calcntuple"==a?t=t.replace(/<+/g,"(:").replace(/>+/g,":)"):"calculated"==a&&(-1==i.indexOf("list")&&-1==i.indexOf("set")&&(t=t.replace(/(\d)\s*,\s*(?=\d{3}\b)/g,"$1")),-1!=i.indexOf("scinot")&&(t=t.replace(/(x|X|\u00D7)/,"xx"))),t=t.replace(/[^\u0000-\u007f]/g,"?")}function AMnumfuncPrepVar(e,t){var i,a,r,n,s,c,l,o,d,u,h,p=allParams[e].vars.slice(),g=p.join("|"),m=allParams[e].fvars.join("|");for(p.push("DNE"),g.match(/lambda/)&&(t=t.replace(/lamda/,"lambda")),i=[],a=(a=t).replace(/(arcsinh|arccosh|arctanh|arcsech|arccsch|arccoth|arcsin|arccos|arctan|arcsec|arccsc|arccot|sinh|cosh|tanh|sech|csch|coth|sqrt|ln|log|exp|sin|cos|tan|sec|csc|cot|abs|root)/g,functoindex),t=t.replace(/(arcsinh|arccosh|arctanh|arcsech|arccsch|arccoth|arcsin|arccos|arctan|arcsec|arccsc|arccot|sinh|cosh|tanh|sech|csch|coth|sqrt|ln|log|exp|sin|cos|tan|sec|csc|cot|abs|root)/g,functoindex),r=0;r<p.length;r++)if("varE"==p[r])t=t.replace("E","varE"),a=a.replace("E","varE");else for(i[r]=!1,n=0;n<p.length;n++)if(r!=n&&p[n].toLowerCase()==p[r].toLowerCase()&&p[n]!=p[r]){i[r]=!0;break}for(t=(t=t.replace(new RegExp("("+g+")","gi"),function(e,t){for(var a=0;a<p.length;a++)if(p[a]==t||!i[a]&&p[a].toLowerCase()==t.toLowerCase())return"@v"+a+"@"})).replace(/@v(\d+)@/g,function(e,t){return p[t]}),a=(a=(a=a.replace(new RegExp("("+g+")","gi"),function(e,t){for(var a=0;a<p.length;a++)if(p[a]==t||!i[a]&&p[a].toLowerCase()==t.toLowerCase())return"@v"+a+"@"})).replace(/(@v(\d+)@|\d+(\.\d+)?)!/g,"{:$&:}")).replace(/@v(\d+)@/g,function(e,t){return p[t]}),s=t,c=new Array,r=0;r<p.length;r++)1<p[r].length&&(o=!1,-1!=greekletters.indexOf(p[r].toLowerCase())&&(o=!0),p[r].match(/^\w+_\w+$/)?(l=i[r]?"g":"gi",d=new RegExp(/^(\w+)_(\w+)$/,l).exec(p[r]),u=new RegExp(d[1]+"_\\("+d[2]+"\\)",l),a=a.replace(u,p[r]),t=t.replace(u,p[r]),s=s.replace(u,p[r]),1<d[1].length&&-1==greekletters.indexOf(d[1].toLowerCase())&&(d[1]='"'+d[1]+'"'),1<d[2].length&&-1==greekletters.indexOf(d[2].toLowerCase())&&(d[2]='"'+d[2]+'"'),a=a.replace(new RegExp(d[0],l),d[1]+"_"+d[2]),t=t.replace(new RegExp(d[0],"g"),"repvars"+r),p[r]="repvars"+r):o||"varE"==p[r]||c.push(p[r]));return 0<c.length&&(vltq=c.join("|"),h=new RegExp("("+vltq+")","g"),a=a.replace(h,'"$1"')),a=(a=a.replace("varE","E")).replace(/@(\d+)@/g,indextofunc),t=t.replace(/@(\d+)@/g,indextofunc),s=s.replace(/@(\d+)@/g,indextofunc),g.match(/\bf\b/)&&!m.match(/\bf\b/)&&(a=(a=a.replace(/([^a-zA-Z])f\^([\d\.]+)([^\d\.])/g,"$1f^$2{::}$3")).replace(/([^a-zA-Z])f\(/g,"$1f{::}(")),g.match(/\bg\b/)&&!m.match(/\bg\b/)&&(a=(a=a.replace(/([^a-zA-Z])g\^([\d\.]+)([^\d\.])/g,"$1g^$2{::}$3")).replace(/([^a-zA-Z])g\(/g,"$1g{::}(")),[t,a,p.join("|"),s]}function processCalculated(e,t){var a,i,r,n,s,c;for(e=e.replace(/=/,""),a=-1!=t.indexOf("list")?e.split(/,/):-1!=t.indexOf("set")?e.replace(/[\{\}]/g,"").split(/,/):[e],i="",n=[],s=0;s<a.length;s++)str=a[s],i+=singlevalsyntaxcheck(str,t),i+=syntaxcheckexpr(str,t),i+=(r=singlevaleval(str,t))[1],n.push(r[0]);return c=n.join(", "),-1!=t.indexOf("set")&&(c="{"+c+"}"),{err:i,dispvalstr:c,submitstr:n.join(",")}}function processCalcInterval(e,t,a){var r,n,s,c,l,o,d,u,h,p,g,m;if(-1!=t.indexOf("inequality")){if(1<(r=ineqtointerval(e=e.replace(/or/g," or "),a)).length)return{err:"wrongvar"==r[1]?_("you may have used the wrong variable"):_("invalid inequality notation")};e=r[0]}if(n=[],s=[],c=[],l="U",-1!=t.indexOf("list")){for(l=",",o=0,d=1;d<e.length-1;d++)","==e.charAt(d)&&(")"!=e.charAt(d-1)&&"]"!=e.charAt(d-1)||"("!=e.charAt(d+1)&&"["!=e.charAt(d+1)||(n.push(e.substring(o,d)),o=d+1));n.push(e.substring(o))}else n=e.split(/\s*U\s*/i);for(u="",m=[],i=0;i<n.length;i++){if(h=n[i],sm=h.charAt(0),em=h.charAt(h.length-1),2!=(p=(p=h.substring(1,h.length-1)).split(/,/)).length||"("!=sm&&"["!=sm||")"!=em&&"]"!=em){-1!=t.indexOf("inequality")?u+=_("invalid inequality notation")+". ":u+=_("invalid interval notation")+". ";break}for(j=0;j<2;j++)-1!=t.indexOf("decimal")&&p[j].match(/[\d\.]e\-?\d/)&&(p[j]=p[j].replace(/e/,"E")),u+=singlevalsyntaxcheck(p[j],t),u+=syntaxcheckexpr(p[j],t),p[j].match(/^\s*\-?oo\s*$/)?m[j]=p[j]:(u+=(g=singlevaleval(p[j],t))[1],m[j]=g[0]);s[i]=sm+m[0]+","+m[1]+em,-1!=t.indexOf("inequality")&&(m[0].toString().match(/oo/)?m[1].toString().match(/oo/)?c[i]="RR":c[i]=a+("]"==em?"le":"lt")+m[1]:m[1].toString().match(/oo/)?c[i]=a+("["==sm?"ge":"gt")+m[0]:c[i]=m[0]+("["==sm?"le":"lt")+a+("]"==em?"le":"lt")+m[1])}return-1!=t.indexOf("inequality")?{err:u,dispvalstr:c.join(' "or" '),submitstr:s.join(l)}:{err:u,dispvalstr:s.join(" uu "),submitstr:s.join(l)}}function processCalcNtuple(e,t){var a,i,r="",n=0,s=0,c="",l=!0,o=NaN;for((e=(e=e.replace(/(\s+,\s+|,\s+|\s+,)/,",")).replace(/<<(.*)>>/,"<$1>")).charAt(0).match(/[\(\[\<\{]/)||(l=!1),i=0;i<e.length;i++)a=!1,0==n&&(r+=e.charAt(i),s=i+1,","==e.charAt(i)&&(e.substring(i+1).match(/^\s*[\(\[\<\{]/)&&e.substring(0,i).match(/[\)\]\>\}]\s*$/)||(l=!1))),e.charAt(i).match(/[\(\[\<\{]/)?n++:e.charAt(i).match(/[\)\]\>\}]/)&&(n--,a=!0),(0==n&&a||1==n&&","==e.charAt(i))&&(sub=e.substring(s,i).replace(/^\s+/,"").replace(/\s+$/,""),"oo"==sub||"-oo"==sub?r+=sub:(c+=singlevalsyntaxcheck(sub,t),c+=syntaxcheckexpr(sub,t),c+=(o=singlevaleval(sub,t))[1],r+=o[0]),r+=e.charAt(i),s=i+1);return 0!=n&&(l=!1),0==l&&(c=_("Invalid notation")+". "+c),{err:c,dispvalstr:r,submitstr:r}}function processCalcComplex(e,t){var a,i,r,n,s,c,l="",o=e.split(","),d="",u="",h=[];for(s=0;s<o.length;s++)d=o[s].replace(/^\s+/,"").replace(/\s+$/,""),-1==t.indexOf("sloppycomplex")&&("string"==typeof(c=parsecomplex(o[s]))?l+=c:(l+=singlevalsyntaxcheck(c[0],t),l+=singlevalsyntaxcheck(c[1],t))),syntaxcheckexpr(d,t),a=scopedeval("var i=0;"+(n=prepWithMath(mathjs(d,"i")))),i=scopedeval("var i=1;"+n),r=scopedeval("var i=-1;"+n),"synerr"!=a&&"synerr"!=i||(l+=_("syntax incomplete"),a=NaN),isNaN(a)||"Infinity"==a||isNaN(i)||isNaN(r)||"Infinity"==i||(i-=a,u=Math.abs(a)<1e-16?"":a,u+=Math.abs(i)<1e-16?"":(0<i&&""!=u?"+":"")+i+"i",h.push(u));return{err:l,dispvalstr:h.join(", "),submitstr:h.join(",")}}function processSizedMatrix(e){var t,a,i,r,n,s,c,l,o=allParams[e],d=o.matrixsize,u="";for(o.calcformat&&(u=o.calcformat),t=[],a=[],i=[],s="",c=r=0;c<d[0];c++){for(t[c]=[],a[c]=[],l=0;l<d[1];l++)s+=syntaxcheckexpr(n=normalizemathunicode(n=document.getElementById("qn"+e+"-"+r).value),u),s+=singlevalsyntaxcheck(n,u),t[c][l]=n,res=singlevaleval(n,u),s+=res[1],a[c][l]=res[0],i.push(res[0]),r++;t[c]="("+t[c].join(",")+")",a[c]="("+a[c].join(",")+")"}return{err:s,str:"["+t.join(",")+"]",dispvalstr:"calcmatrix"==o.qtype?"["+a.join(",")+"]":"",submitstr:i.join("|")}}function processCalcMatrix(e,t){var a,i,r,n,s,c,l,o,d,u,h,p=!0;for(((e=(e=(e=e.replace(/\[/g,"(")).replace(/\]/g,")")).replace(/\s+/g,"")).length<2||"("!==e.charAt(0)||")"!==e.charAt(e.length-1))&&(p=!1),e=e.substring(1,e.length-1),a="",i=[],s=n=r=0;s<e.length;s++)"("==e.charAt(s)?n++:")"==e.charAt(s)?n--:","==e.charAt(s)&&0==n&&(i.push(e.substring(r+1,s-1)),r=s+1);for(i.push(e.substring(r+1,e.length-1)),c=-1,0!==n&&(p=!1),d=[],u=[],s=0;s<i.length;s++){for(d[s]=[],l=i[s].split(","),-1<c&&l.length!=c&&(p=!1),c=l.length,h=0;h<l.length;h++)a+=syntaxcheckexpr(o=l[h].replace(/^\s+/,"").replace(/\s+$/,""),t),a+=singlevalsyntaxcheck(o,t),res=singlevaleval(o,t),a+=res[1],d[s][h]=res[0],u.push(res[0]);d[s]="("+d[s].join(",")+")"}return p||(a=_("Invalid matrix format")+". "),{err:a,dispvalstr:"["+d.join(",")+"]",submitstr:u.join("|")}}function processNumfunc(e,t,a){var i,r,n,s,c,l,o=allParams[e],d=o.vars,u=o.fvars,h=o.domain,p=a.match(/equation/),g="",m=AMnumfuncPrepVar(e,t),f=m[0];for(f=f.replace(/,/g,"").replace(/^\s+/,"").replace(/\s+$/,""),i=m[2].split("|"),t.match(/=/)?(p?1<t.match(/=/g).length&&(g+=_("syntax error: your equation should only contain one equal sign")):g+=_("syntax error: you gave an equation, not an expression"),f=f.replace(/(.*)=(.*)/,"$1-($2)")):p&&(g+=_("syntax error: this is not an equation")),0<u.length&&(reg=new RegExp("("+u.join("|")+")\\(","g"),f=f.replace(reg,"$1*sin($1+")),f=prepWithMath(mathjs(f,i.join("|"))),n=l=0;n<20;n++){for(s="var DNE=1;",r=0;r<i.length-1;r++)c=h[r][2]?Math.floor(Math.random()*(h[r][0]-h[r][1]+1)+h[r][0]):Math.random()*(h[r][0]-h[r][1])+h[r][0],s+="var "+i[r]+"="+c+";";if("synerr"!==scopedeval(s+f)){l++;break}}return 0===l&&(g+=_("syntax error")+". "),{err:g+=syntaxcheckexpr(t,"",d.join("|"))}}function simplifyVariable(e){return e.replace(/[^\w_\^\-+]/g,"")}function ineqtointerval(e,t){var a,i,r,n,s,c=simplifyVariable(t);if((e=e.replace(/(\d)\s*,\s*(?=\d{3}\b)/g,"$1")).match(/all\s*real/i))return["(-oo,oo)"];if(e.match(/DNE/))return["DNE"];for(r=[],n=e.split(/\s*or\s*/),s=0;s<n.length;s++)if(str=n[s],a=str.match(/^(.*?)(<=?|>=?)(.*?)(<=?|>=?)(.*?)$/)){if(simplifyVariable(a[3])!=c)return["","wrongvar"];if(a[2].charAt(0)!=a[4].charAt(0))return["","invalid"];i="<"==a[2].charAt(0)?("<"==a[2]?"(":"[")+a[1]+","+a[5]+("<"==a[4]?")":"]"):(">"==a[4]?"(":"[")+a[5]+","+a[1]+(">"==a[2]?")":"]"),r.push(i)}else{if(!(a=str.match(/^(.*?)(<=?|>=?)(.*?)$/)))return["","invalid"];if(simplifyVariable(a[1])==c)i="<"==a[2].charAt(0)?"(-oo,"+a[3]+("<"==a[2]?")":"]"):(">"==a[2]?"(":"[")+a[3]+",oo)",r.push(i);else{if(simplifyVariable(a[3])!=c)return["","wrongvar"];i="<"==a[2].charAt(0)?("<"==a[2]?"(":"[")+a[1]+",oo)":"(-oo,"+a[1]+(">"==a[2]?")":"]"),r.push(i)}}return[r.join("U")]}function parsecomplex(e){var t,a,i,r,n,s,c,l;if(l=(e=(e=(e=(e=e.replace(/\s/,"")).replace(/\((\d+\*?i|i)\)\/(\d+)/g,"$1/$2")).replace(/sin/,"s$n")).replace(/pi/,"p$")).length,2<e.split("i").length)return _("error - more than 1 i in expression");if(-1==(n=e.indexOf("i")))t=e,a="0";else{for(r=0,c=n-1;0<c;c--)if(")"==(i=e.charAt(c)))r++;else if("("==i)r--;else if(("+"==i||"-"==i)&&0==r)break;if(c<0&&(c=0),0!=r)return _("error - invalid form");for(r=0,s=n+1;s<l;s++)if("("==(i=e.charAt(s)))r++;else if(")"==i)r--;else if(("+"==i||"-"==i)&&0==r)break;if(0!=r)return _("error - invalid form");if(0<n-c&&0<s-n&&(s==l||0==c)){if(s==l)t=e.substr(0,c),a=e.substr(c,n-c);else{if(0!=c)return _("error - invalid form");t=e.substr(s),a=e.substr(0,n)}a=(a=(a+="*"+e.substr(n+1+("*"==e.charAt(n+1)?1:0),s-n-1)).replace("-*","-1*").replace("+*","+1*")).replace(/(\+|-)1\*(.+)/g,"$1$2")}else if(1<n-c)a=e.substr(c,n-c),t=e.substr(0,c)+e.substr(n+1);else if(1<s-n)if(0<n){if("+"!=e.charAt(n-1)&&"-"!=e.charAt(n-1))return _("error - invalid form");a=e.charAt(n-1)+e.substr(n+1+("*"==e.charAt(n+1)?1:0),s-n-1),t=e.substr(0,n-1)+e.substr(s)}else a=e.substr(n+1,s-n-1),t=e.substr(0,n)+e.substr(s);else a="+"==e.charAt(c)?"1":"-"==e.charAt(c)?"-1":0==n?"1":e.charAt(c),t=(0<n?e.substr(0,c):"")+e.substr(n+1);""==t&&(t="0"),"/"==a.charAt(0)?a="1"+a:"+"!=a.charAt(0)&&"-"!=a.charAt(0)||"/"!=a.charAt(1)||(a=a.charAt(0)+"1"+a.substr(1)),"*"==a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),"+"==a.charAt(0)&&(a=a.substr(1)),"+"==t.charAt(0)&&(t=t.substr(1))}return[t=(t=t.replace("s$n","sin")).replace("p$","pi"),a=(a=(a=a.replace("s$n","sin")).replace("p$","pi")).replace(/\*\//g,"/")]}function singlevalsyntaxcheck(e,t){if((e=e.replace(/(\d)\s*,\s*(?=\d{3}\b)/g,"$1")).match(/DNE/i))return"";if(e.match(/-?oo$/)||e.match(/-?oo\W/))return"";if(e.match(/,/))return _("Invalid use of a comma.");if(-1!=t.indexOf("allowmixed")&&e.match(/^\s*\-?\s*\d+\s*(_|\s)\s*(\d+|\(\d+\))\s*\/\s*(\d+|\(\d+\))\s*$/))return"";if(-1!=t.indexOf("fracordec")){if(!(e=e.replace(/([0-9])\s+([0-9])/g,"$1*$2").replace(/\s/g,"")).match(/^\-?\(?\d+\s*\/\s*\-?\d+\)?$/)&&!e.match(/^\-?\d+$/)&&!e.match(/^\-?(\d+|\d+\.\d*|\d*\.\d+)$/))return _(" invalid entry format")+". "}else if(-1!=t.indexOf("fraction")||-1!=t.indexOf("reducedfraction")){if(!(e=e.replace(/([0-9])\s+([0-9])/g,"$1*$2").replace(/\s/g,"")).match(/^\(?\-?\(?\d+\)?\/\(?\d+\)?$/)&&!e.match(/^\(?\d+\)?\/\(?\-?\d+\)?$/)&&!e.match(/^\s*?\-?\d+\s*$/))return _("not a valid fraction")+". "}else if(-1!=t.indexOf("mixednumber")){if(!(e.match(/^\(?\-?\s*\(?\d+\)?\/\(?\d+\)?$/)||e.match(/^\(?\d+\)?\/\(?\-?\d+\)?$/)||e.match(/^\s*\-?\s*\d+\s*(_|\s)\s*(\d+|\(\d+\))\s*\/\s*(\d+|\(\d+\))\s*$/)||e.match(/^\s*\-?\s*\d+\s*$/)))return _("not a valid mixed number")+". ";e=e.replace(/_/," ")}else if(-1!=t.indexOf("scinot")){if(!(e=(e=e.replace(/\s/g,"")).replace(/(x|X|\u00D7)/,"xx")).match(/^\-?[1-9](\.\d*)?(\*|xx)10\^(\(?\-?\d+\)?)$/)){if(-1==t.indexOf("scinotordec"))return _("not valid scientific notation")+". ";if(!e.match(/^\-?(\d+|\d+\.\d*|\d*\.\d+)$/))return _("not valid decimal or scientific notation")+". "}}else if(-1!=t.indexOf("decimal")&&-1==t.indexOf("nodecimal")){if(!e.match(/^\-?(\d+|\d+\.\d*|\d*\.\d+)([eE]\-?\d+)?$/))return _(" not a valid integer or decimal number")+". "}else if(!onlyAscii.test(e))return _("Your answer contains an unrecognized symbol")+". ";return""}function syntaxcheckexpr(e,t,a){var i,r,n,s,c,l="";for(-1!=t.indexOf("notrig")&&e.match(/(sin|cos|tan|cot|sec|csc)/i)?l+=_("no trig functions allowed")+". ":-1!=t.indexOf("nodecimal")&&-1!=e.indexOf(".")?l+=_("no decimals allowed")+". ":-1==t.indexOf("mixed")&&e.match(/\-?\s*\d+\s*(_|\s)\s*(\d+|\(\d+\))\s*\/\s*(\d+|\(\d+\))/)&&(l+=_("mixed numbers are not allowed")+". "),s=n=r=i=0;s<e.length;s++)"("==e.charAt(s)?i++:")"==e.charAt(s)?i--:"["==e.charAt(s)?r++:"]"==e.charAt(s)?r--:"|"==e.charAt(s)&&(n=1-n);if(0==i&&0==r||(l+=" ("+_("unmatched parens")+"). "),0!=n&&(l+=" ("+_("unmatched absolute value bars")+"). "),reg=a?new RegExp("(sqrt|ln|log|exp|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs)s*("+a+"|\\d+)","i"):new RegExp("(sqrt|ln|log|exp|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs)s*(\\d+)","i"),errstuff=e.match(reg),null!=errstuff&&(l+="["+_("use function notation")+" - "+_("use $1 instead of $2",errstuff[1]+"("+errstuff[2]+")",errstuff[0])+"]. "),a&&(reg=new RegExp("(repvars\\d+|arc|sqrt|root|ln|log|exp|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs|pi|sign|DNE|e|oo|"+a+")","ig"),e.replace(reg,"").match(/[a-zA-Z]/)&&(l+=_(" Check your variables - you might be using an incorrect one")+". ")),2<(e.match(/\|/g)||[]).length)for(c=/\|.*?\|\s*(.|$)/g;match=c.exec(e);)if(""!=match[1]&&match[1].match(/[^+\-\*\/\^\)]/)){l+=_(" You may want to use abs(x) instead of |x| for absolute values to avoid ambiguity")+". ";break}return e.match(/%/)&&!e.match(/^\s*[+-]?\s*((\d+(\.\d*)?)|(\.\d+))\s*%\s*$/)&&(l+=_(" Do not use the percent symbol, %")+". "),l}function singlevaleval(e,t){(e=e.replace(/,/,"")).match(/^\s*[+-]?\s*((\d+(\.\d*)?)|(\.\d+))\s*%\s*$/)&&(e=e.replace(/%/,"")+"/100"),-1!=t.indexOf("mixed")&&(e=e.replace(/(\d+)\s+(\d+|\(\d+\))\s*\/\s*(\d+|\(\d+\))/g,"($1+$2/$3)")),-1!=t.indexOf("scinot")&&(e=e.replace("xx","*"));try{var a=scopedmatheval(e);return""===a?[NaN,_("syntax incomplete")+". "]:[a,""]}catch(e){return[NaN,_("syntax incomplete")+". "]}}function scopedeval(c){try{return eval(c)}catch(e){return"synerr"}}function scopedmatheval(c){if(c.match(/^\s*[a-df-zA-Z]\s*$/))return"";try{return eval(prepWithMath(mathjs(c)))}catch(e){return""}}return LivePreviews=[],MQsyntaxtimer=null,greekletters=["alpha","beta","chi","delta","epsilon","gamma","varphi","phi","psi","sigma","rho","theta","lambda","mu","nu","omega","tau"],onlyAscii=/^[\u0000-\u007f]*$/,{init:init,clearparams:clearparams,preSubmitForm:preSubmitForm,preSubmit:preSubmit,preSubmitString:preSubmitString,clearLivePreviewTimeouts:clearLivePreviewTimeouts,syntaxCheckMQ:syntaxCheckMQ,clearTips:clearTips,handleMQenter:handleMQenter}}(jQuery);function prepWithMath(e){return e=(e=(e=e.replace(/\b(abs|acos|asin|atan|ceil|floor|cos|sin|tan|sqrt|exp|max|min|pow)\(/g,"Math.$1(")).replace(/\(E\)/g,"(Math.E)")).replace(/\((PI|pi)\)/g,"(Math.PI)")}function toggleinlinebtn(e,t){var a,i=document.getElementById(t),r=document.getElementById(e);"none"==r.style.display?(r.style.display="",r.setAttribute("aria-hidden",!1),i.setAttribute("aria-expanded",!0)):(r.style.display="none",r.setAttribute("aria-hidden",!0),i.setAttribute("aria-expanded",!1)),a=i.innerHTML,i.innerHTML=a.match(/\[\+\]/)?a.replace(/\[\+\]/,"[-]"):a.replace(/\[\-\]/,"[+]")}function AutoSuggest(e,t){var a,r,n,s,c,l,o=this;this.elem=e,this.suggestions=t,this.eligible=new Array,this.inputText=null,this.highlighted=-1,this.div=document.getElementById("autosuggest"),null==this.div&&(this.div=document.createElement("div"),this.div.id="autosuggest",document.getElementsByTagName("body")[0].appendChild(this.div),this.div.appendChild(document.createElement("ul"))),a=9,r=27,n=38,s=40,c=13,e.setAttribute("autocomplete","off"),e.id||(l="autosuggest"+AutoSuggestIdCounter,AutoSuggestIdCounter++,e.id=l),e.onkeydown=function(e){var t=o.getKeyCode(e);switch(t){case a:o.useSuggestion("tab");break;case c:return o.useSuggestion("enter"),!1;case r:o.hideDiv();break;case n:0<o.highlighted&&o.highlighted--,o.changeHighlight(t);break;case s:o.highlighted<o.eligible.length-1&&o.highlighted++,o.changeHighlight(t)}},e.onkeyup=function(e){switch(o.getKeyCode(e)){case a:case r:case n:case s:return;default:1<this.value.length?(o.inputText=this.value,o.getEligible(),0<o.eligible.length?o.highlighted=0:o.highlighted=-1,o.createDiv(),o.positionDiv(),o.showDiv()):(o.hideDiv(),0==this.value.length&&(o.inputText=""))}},e.onblur=function(e){setTimeout(o.hideDiv,100)},this.useSuggestion=function(e){-1<this.highlighted&&(this.elem.value=this.eligible[this.highlighted]),this.hideDiv()},this.showDiv=function(){this.div.style.display="block"},this.hideDiv=function(){o.div.style.display="none",o.highlighted=-1},this.changeHighlight=function(){var e,t=this.div.getElementsByTagName("LI");for(i in t)e=t[i],this.highlighted==i?e.className="selected":e.className=""},this.positionDiv=function(){var e=this.elem,t=findPos(e);t[1]+=e.offsetHeight,this.div.style.left=t[0]+"px",this.div.style.top=t[1]+"px"},this.createDiv=function(){var e,t,a,r=document.createElement("ul");for(i in this.eligible)e=this.eligible[i],t=document.createElement("li"),(a=document.createElement("a")).href="#",a.onclick=function(){return!1},a.innerHTML=e,t.appendChild(a),o.highlighted==i&&(t.className="selected"),r.appendChild(t);this.div.replaceChild(r,this.div.childNodes[0]),r.onmouseover=function(e){for(var t,a=o.getEventSource(e);a.parentNode&&"LI"!=a.tagName.toUpperCase();)a=a.parentNode;for(i in t=o.div.getElementsByTagName("LI"))if(t[i]==a){o.highlighted=i;break}o.changeHighlight()},r.onclick=function(e){return o.useSuggestion("click"),o.hideDiv(),o.cancelEvent(e),!1},this.div.className="suggestion_list",this.div.style.position="absolute"},this.getEligible=function(){var e,t;if(this.eligible=new Array,",",-1==this.inputText.indexOf(" "))for(i in e=new RegExp("\\b"+this.inputText.toLowerCase()),this.suggestions)(t=this.suggestions[i]).toLowerCase().match(e)&&(this.eligible[this.eligible.length]=t,i+",")},this.getKeyCode=function(e){return e?e.keyCode:window.event?window.event.keyCode:void 0},this.getEventSource=function(e){return e?e.target:window.event?window.event.srcElement:void 0},this.cancelEvent=function(e){e&&(e.preventDefault(),e.stopPropagation()),window.event&&(window.event.returnValue=!1)}}AutoSuggestIdCounter=0,autoSuggestLists={},autoSuggestObjects={},document.write=function(){};
