var reg = (elm, n) => elm != null ? elm[n] : '';
var cn = (ob, nm) => ob ? ob.getElementsByClassName(nm) : console.log(ob);
var tn = (ob, nm) => ob ? ob.getElementsByTagName(nm) : console.log(ob);
var gi = (ob, nm) => ob ? ob.getElementById(nm) : console.log(ob);
// var noHTML = (str) => str.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
var rando = (n) => Math.round(Math.random()*n);

var tsvTo2dArr = (tsv) => tsv.split(/\r|\n/)
.map(itm=> itm.split(/(?<=^|\t)/));

var jsonKeys = (str) => tsvTo2dArr(str)[0].map(col=>col.toLowerCase().trim().replace(/\W+/g, '_'));

function d2arrToJSON(str){
  var temp = [];
  var keys = jsonKeys(str);
  var d2arr = tsvTo2dArr(str);
  d2arr.shift();
  d2arr.forEach(row=>{
  var tempObj = '{';
    for(var i=0; i<keys.length; i++){
	  var val = row[i] ? row[i].replace(/"/g, '\"') : '';
      tempObj = tempObj + '"' + keys[i] + '":"' + val.trim() + '",';
    }
    temp.push(JSON.parse(tempObj.replace(/,$/, '')+'}'));
  });
 return temp;
}

function dragElement() {
  this.style.border = '1px solid #5E9ED6';
  this.style.background = '#111111';
  this.style.transition = 'all 166ms';
  var elmnt = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) {
    document.getElementById(this.id).onmousedown = dragMouseDown;
  } else {
    this.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.opacity = "0.85";
    elmnt.style.transition = "opacity 1000ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
  }
}


function createPopTextArea(id){
if(document.getElementById(id)) document.getElementById(id).outerHTML = "";

var cd = document.createElement("div");
cd.setAttribute("id", id);
cd.style.display = "inline-block";
cd.style.position = "fixed";
cd.style.top = "10%";
cd.style.left = "50%";
cd.style.width = "25%";
cd.style.height = "33%";
cd.style.background = "transparent";
cd.style.borderRadius = ".15em";
cd.style.padding = "0px";
cd.style.zIndex = "10000";
document.body.appendChild(cd);

var hd = document.createElement("div");
hd.setAttribute("id", id+"_mover");
hd.style.width = "99%";
hd.style.height = "8%";
hd.style.backgroundColor = "#000000";
hd.style.borderTopLeftRadius = ".15em";
hd.style.borderTopRightRadius = ".15em";
hd.style.padding = "6px";
hd.style.cursor = 'move';
hd.style.boxShadow = "1px 1px 1px 0px #888888";
hd.addEventListener('mouseover', dragElement);
hd.addEventListener('mouseout', nodrag);
cd.appendChild(hd);


var tf = document.createElement("input");
tf.setAttribute("id", id+"_textfile");
tf.setAttribute("placeholder", "filename")
tf.style.width = "36%";
tf.style.height = "100%";
tf.style.padding = "6px";
tf.style.border = "1px solid #000000";
tf.style.background = "#0f0f0f";
tf.style.color = "#ffffff";
tf.style.fontSize = "1em";
tf.style.userSelect = "none";
tf.style.float = "right";
tf.style.transform = "translate(0px, -4.5px)";
tf.style.boxShadow = "1px 1px 1px 0px #888888";
tf.addEventListener('keydown', (event) => { if (event.key == 'Enter') dlBox(); });
hd.appendChild(tf);

 
var cb = document.createElement("button");
cb.setAttribute("id", id+"_close");
cb.innerText = "+";
cb.style.position = "absolute";
cb.style.background = "transparent";
cb.style.height = "0px";
cb.style.width = "0px";
cb.style.display = "inline-block";
cb.style.transform = "scale(2.9, 2.9) translate(8px, -14.5px) rotate(45deg)";
cb.style.borderRadius = "1em";
cb.style.padding = "0px";
cb.style.boxShadow = "0px";
cb.style.border = "0px";
cb.style.cursor = "pointer";
cb.style.userSelect = "none";
cb.style.fontWeight = "bold";
cb.style.color = "Crimson";
cb.style.fontFamily = '"DejaVu Sans Mono", Menlo';
cb.addEventListener("click", killParent);
cb.addEventListener("mouseover", hoverI);
cb.addEventListener("mouseout", hoverO);
cd.appendChild(cb);

var tb = document.createElement("div");
tb.setAttribute("id", id+"_textarea");
tb.setAttribute("contenteditable", "true");
tb.innerText = "text area";
tb.style.width = "99%";
tb.style.height = "92%";
tb.style.padding = "6px";
tb.style.border = "1px solid #000000";
tb.style.background = "#303030";
tb.style.color = "#3f3f3f";
tb.style.fontSize = "1em";
tb.style.userSelect = "none";
tb.style.boxShadow = "1px 1px 1px 0px #888888";
tb.addEventListener("click", rmvPlaceholder);
tb.addEventListener("blur", rmvPlaceholder);
// tb.addEventListener('keyup', syntaxer);
cd.appendChild(tb);

}

async function killParent() {
  this.style.transform = "scale(.3, .3) translate(10px, -14.5px) rotate(45deg)";
  this.style.transition = 'all 266ms cubic-bezier(.9,.37,.66,.96)';
  await delay(166);
  this.parentElement.outerHTML = "";
}
async function killElm(){
  this.outerHTML = "";
}


function hoverI(){
  this.style.transform = "scale(2.9, 2.9) translate(0px, -14.5px) rotate(0deg)";
  this.style.transition = 'all 266ms cubic-bezier(.9,.37,.66,.96)';
}
function hoverO(){
  this.style.transform = "scale(2.9, 2.9) translate(8px, -14.5px) rotate(45deg)";
  this.style.transition = 'all 266ms cubic-bezier(.9,.37,.66,.96)';
}


function nodrag(){
  this.style.border = '0px solid #5E9ED6';
  this.style.background = '#000000';
  this.style.transition = 'all 166ms';
}

function rmvPlaceholder(){
var td = gi(document, "popup_textarea");
  if(/^text area$/.test(td.innerText)){
    td.innerText = "";
    td.style.color = "#ffffff";
  }
}

function dlBox(){
  var filename = gi(document,'popup_textfile').value;
  var userinput = gi(document,'popup_textarea').innerText;
  var string2write = d2arrToJSON(userinput);
  downloadr(string2write,filename)
}

async function downloadr(str, name) {
  var type = 'data:text/plain;charset=utf-8,';
  var strDL = str;
  if(/\.json$/.test(name)){
   var type = 'data:application/json;charset=utf-8,';
   var strDL = JSON.stringify(str);
  }

  var file = new Blob([strDL], { type: type });
  var a = document.createElement('a'),
      url = URL.createObjectURL(file);
  a.href = url;
  a.download = /\..{2,4}$/.test(name) ? name : name+'_def.txt';
  document.body.appendChild(a);
  a.click();
  await delay(10);
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
// downloadr(containArrCSV, 'CEI_IndeedReviews.csv');
// downloadr(containArr, 'CEI_IndeedReviews.json');

/*
function btnAction() {
this.style.background = "rgb(40, 40, 40);
this.style.transform = "scale(1, 1) translate(0px, 0px)";
this.style.transition = "all 173ms";
}
*/


function syntaxer(){
  var str = this.value;
  var objXstart = /(?<=\.\b)(?=\w)/g;
  var objXend = /(?<=\.\b\w+)\b/g;
//   var quoX = /".+?"/g;
//   var varX = /(?<=\bvar\b\s+)\w+\s*\=|(?<=\bfunction\b\s+)\w+/g;
// if(objXstart.test(str)){
  var output = str.replace(objXstart, '<span style="color: #ffc549;">').replace(objXend, '</span>');
  this.innerHTML = output;

// }
}

createPopTextArea("popup");

function alterBoxDimensions(){
  var cd = gi(document, 'popup');
  var td = gi(document, 'popup_textarea');
  var rowLen = tn(td,'div').length;
  if(rowLen > 12 && rowLen < 40){
	cd.style.height = Math.round(rowLen * 2) +"%";
  }
  if(rowLen > 39){
	cd.style.height = "80%";
  }
}
// alterBoxDimensions()
