const scene = document.getElementById("scene");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const cloud = document.getElementById("cloud");
const river = document.getElementById("river");
const grass = document.getElementById("grass");

let raining = false;
let riverHeight = 20;
let rainInterval;

/* STARS */
for(let i=0;i<70;i++){
  const s=document.createElement("div");
  s.className="star";
  s.style.top=Math.random()*300+"px";
  s.style.left=Math.random()*100+"%";
  scene.appendChild(s);
}
const stars=document.querySelectorAll(".star");

/* GRASS */
for(let i=0;i<120;i++){
  const b=document.createElement("div");
  b.className="blade";
  b.style.height=20+Math.random()*30+"px";
  grass.appendChild(b);
}

/* RAIN */
function startRain(){
  if(raining) return;
  raining=true;
  rainInterval=setInterval(()=>{
    const r=document.createElement("div");
    r.className="rain";
    r.style.left=Math.random()*100+"%";
    scene.appendChild(r);
    setTimeout(()=>r.remove(),1000);

    if(riverHeight<120){
      riverHeight+=2;
      river.style.height=riverHeight+"px";
    }
  },80);
}

function stopRain(){
  raining=false;
  clearInterval(rainInterval);
}

/* AUTO RIVER DRY */
setInterval(()=>{
  if(!raining && scene.classList.contains("day") && riverHeight>20){
    riverHeight--;
    river.style.height=riverHeight+"px";
  }
},200);

/* EVENTS */
sun.onclick=()=>{
  scene.classList.replace("day","night");
  sun.classList.add("hidden");
  moon.classList.remove("hidden");
  stars.forEach(s=>s.style.opacity=1);
};

moon.onclick=()=>{
  scene.classList.replace("night","day");
  moon.classList.add("hidden");
  sun.classList.remove("hidden");
  stars.forEach(s=>s.style.opacity=0);
  stopRain();
};

cloud.onclick=(e)=>{
  e.stopPropagation();
  raining ? stopRain() : startRain();
};
