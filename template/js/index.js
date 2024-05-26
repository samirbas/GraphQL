let Page = window.location.toString().split("/")[window.location.toString().split("/").length-1];
if (Page == "" ){
  window.location.replace("index.html")
}

let links = document.getElementsByClassName("go_profile");
for (let i = 0; i< links.length;i++){
  links[i].addEventListener("click",()=>{setCookie("token", "", 0);
  window.location.replace("profile.html");})
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

async function SetToken(Userinfo){
  fetch("https://zone01normandie.org/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept" : "application/json",
      "Authorization" : "Basic "+Userinfo,
    },
  })
  .then(async (response) => {
    if (!response.ok){
      let err = document.getElementById("error");
      err.classList.add("pop-up-error");
      err.innerHTML = "Error: User does not exist or password incorrect";
      let button = document.createElement("button");
      button.classList.add("bgGrey2", "hoverWhite");
      button.innerHTML = "OK";
      button.style.marginTop = "2em";
      button.addEventListener('click',()=>{
        err.classList.remove("pop-up-error");
        err.innerHTML="";
      });
      err.appendChild(button);
    } else {
      await response.json().then(data => setCookie("token", data, 1));
      window.location.replace("profile.html");
    }
  });
}

function authentificate(event){
  event.preventDefault();
  let username = document.getElementById("email-field").value;
  let password = document.getElementById("password-field").value;
  SetToken(btoa(username+":"+password));
}

async function GetDataQuery(gql){
   let data = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept" : "application/json",
      "Authorization" : "Bearer "+getCookie("token"),
    },
    body: JSON.stringify({ query: gql }),
  })
  if (data.ok){
    data = data.json()
    return data;
  }else{
    console.log(data);
  }
}

  
function totalxp(a){
  console.log(a);
  let result = 0;
  for (let i=0; i<a.length;i++){
    if (a[i].originEventId!=undefined&&a[i].path.includes("div-01")&&!a[i].path.includes("piscine-js/")&&!a[i].path.includes("piscine-go"))
      result += a[i].amount;
    
  }
  return result;
}
/*  all project done by a user
  {
      group(where: {
        members: { userLogin: { _eq: "$userlogin"} }
        
      }) {
        id
        path
        status
        captainLogin
        captainId
      createdAt
      updatedAt
        members { id, userId, userLogin, confirmed }
      }
  }

 project working on by user 
  {
      group(where: {
        members: { userLogin: {  _eq: "haboumou"}  } _and:{_not:{ status:{_eq:finished }}}
      }
         order_by:{ createdAt: desc}
        limit:1
      ) {
        path
        status
      createdAt
      updatedAt
  }
  }


  
  
*/

function retrank(level){
  if (level>=60){
    return "Full-Stack developer";
  }
  if (level>=55){
    return "Confirmed developer";
  }
  if (level>=50){
    return "Junior developer";
  }
  if (level>=40){
    return "Basic developer";
  }
  if (level>=30){
    return "Assistant developer";
  }
  if (level>=20){
    return "Apprentice developer";
  }
  if (level>=10){
    return "Beginner developer";
  }
  return "Aspiring developer";
}
function nextrank(level){
  if (level>=60){
    return 0;
  }
  if (level>=55){
    return 60-level;
  }
  if (level>=50){
    return 55-level;
  }
  if (level>=40){
    return 50-level;
  }
  if (level>=30){
    return 40-level;
  }
  if (level>=20){
    return 30-level;
  }
  if (level>=10){
    return 20-level;
  }
  return 10-level;
}
function Copyclonerepo(user,repo) {

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(`git clone https://zone01normandie.org/git/${user}/${repo}
  cd ${repo}
  git reset --hard 9dc797f6cf48840278b1dd3c7089325c1c8277f9`);
  
}
function rotate (M, O, angle) {
  var xM, yM, x, y;
  xM = M.x - O.x;
  yM = M.y - O.y;
  x = xM * Math.cos (angle) + yM * Math.sin (angle) + O.x;
  y = - xM * Math.sin (angle) + yM * Math.cos (angle) + O.y;
  return ({x:Math.round (x), y:Math.round (y)});
}
function numTostringgrey(num){
if (num <1000){
  return (num.toFixed(0)+'<span class="Grey"> B</span>')
}
if (num <1000000){
  return ((num/1000).toFixed(1)+`<span class="Grey"> KB</span>`)
}
return ((num/1000000).toFixed(2)+`<span class="Grey"> MB</span>`)
} 
function numTostring(num){
  if (num <1000){
    return (num.toFixed(0)+' B')
  }
  if (num <1000000){
    return ((num/1000).toFixed(1)+` KB`)
  }
  return ((num/1000000).toFixed(2)+` MB`)
  } 

async function showprofile(){
  let body = document.getElementById("content");
  body.innerHTML = `
  <div id="loading">
  <div class="boxes">
      <div class="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div class="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div class="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div class="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
      </div>
  </div>
  </div>
  `;
  let data = await GetDataQuery(`
  {
    user {
      id
      login
      attrs
      email
      campus
      profile
      lastName
      firstName
      auditRatio
      totalUp
      totalDown
      roles { slug }
      labels { labelName, labelId }
      records {
        banEndAt
        message
      }
     
      xps {
        amount
        path
        originEventId
      }
      events(where: {
        _or: [
          { eventId: { _eq: 148 } },
          { eventId: { _eq: 32 } }
        ]
      }) {
        level
      }
    }
    transaction(where: {type: {_eq: xp}, path: {_ilike: "%div-01%"}}
    order_by: {createdAt: asc}) 
  { 
    type
    amount
    path
    createdAt
    object {
      name
    }
  }
    audit(
      where: {
        grade: { _is_null: true },
        resultId: { _is_null: true },
        private: {code: {_is_null: false}}
      }
      order_by: {endAt: asc_nulls_last, createdAt: asc}
    ) {
      id
      group {
        id
        path
        captainLogin
        captain {
          isAvailable
        }
      }
      private { code }
      createdAt
      endAt
      version
      grade
    }
    
  }
  `);
  let last_act = await GetDataQuery(`{group(where: {
    members: { userLogin: { _eq: "${data.data.user[0].login}"}},
    status: {_eq: finished }
    
  }
  order_by:{updatedAt: desc}) {
    path
    object { 
      type
    }}
}`);
  let project_on = await GetDataQuery(`{
    group(where: {
      members: { userLogin: {  _eq: "${data.data.user[0].login}"}  } _and:{_not:{ status:{_eq:finished }}}
    }
       order_by:{ createdAt: desc}
      limit:1
    ) {
      path
      status
    createdAt
    updatedAt
    object {
      name
    }
}
}`); 
let skils = await GetDataQuery(`{ user {
  transactions (
    order_by: [{ type: desc }, { amount: desc }]
    distinct_on: [type]
    where: { 
      type: { _like: "skill_%" }
    },
  ) 
  { 
    type
    amount
  }
}}`);
skils = skils.data.user[0].transactions;
data = data.data;
console.log(data)
let xps = data.user[0].xps;
last_act = last_act.data.group;
for (let i=0;i<last_act.length; i++){
  for (let j=0;j<xps.length;j++){
    if (last_act[i].path==xps[j].path){
      last_act[i].amount = xps[j].amount;
    }
  }
}
console.log(last_act);
    let git = data.user[0].login;
    let userfname = data.user[0].firstName;
    let userlname = data.user[0].lastName;
    let campus = data.user[0].campus;
    let mail = data.user[0].email;
    console.log(data.user[0].events)
    let level = data.user[0].events[0].level;
    let totalxpdiv = numTostringgrey(Math.round(totalxp(xps)));
    let auditRatio = parseFloat(data.user[0].auditRatio.toFixed(1));
    let ratioUp = numTostring(data.user[0].totalUp);
    let ratiodown = numTostring(data.user[0].totalDown);
    let auditNotif = "";
    let allaudit = "";
    if (data.audit.length >0){
      auditNotif = `<div class="all_audit"><div class="header"><svg width="21px" viewBox="0 0 130 130"><g fill="none" stroke="hsl(60, 100%, 70%)" stroke-width="5px"><path d="M97.77 65H65V31.77"></path><circle cx="65" cy="65" r="53"></circle></g></svg><span class="right_items" style="color:hsl(60, 100%, 70%); border-right: solid 1px rgba(255, 255, 255, 0.15);font-size: 0.75rem;" >`+data.audit.length+`</span></div><div class="audit">`;
      for(let i = 0; i<data.audit.length;i++){
        allaudit+= `
        <div class="audit_items">
          <div class="audittitle">Audits to complete</div> 
          <div class="audit_info">
            <div class="pseudo">${data.audit[i].group.captainLogin} - <span class="purpl">${data.audit[i].group.path.split('/')[data.audit[i].group.path.split('/').length-1]}</span></div>
            <div class="audit_clone"><div style="margin-bottom:5px;">You have to clone the repo</div>
              <button class="coppy" onclick=" navigator.clipboard.writeText('git clone https://zone01normandie.org/git/${data.audit[i].group.captainLogin}/${data.audit[i].group.path.split('/')[data.audit[i].group.path.split('/').length-1]} \\n cd ${data.audit[i].group.path.split('/')[data.audit[i].group.path.split('/').length-1]} \\n git reset --hard 9dc797f6cf48840278b1dd3c7089325c1c8277f9')">Copy</button>
              </div>            
            <div class="code_audit">Code : ${data.audit[i].private.code.toUpperCase()}</div>
          </div>
        </div>`;
      }
      auditNotif +=allaudit+ `</div></div>`;
    }
    setTimeout(()=>{
    document.getElementById("logo1").classList.remove("logo")
    body.innerHTML=`<div class = "backnav"></div>
    <nav class = "navbar" id="nav" >
    <div class = "logonav"> 
      <button  class="linklogo go_profile" > 
        <img alt = "logo" src = "./img/logo.png" class = "img_logo" > 
      </button>
    </div > 
    <div class="right_nav">
    <div class=" audit_notif right_items alignCenter">
      ${auditNotif}
    </div>
    
        <a id="git-link" href="https://zone01normandie.org/git/${git}" target="_blank" class="right_items git">
          <div class="hoverPurple">
          <svg width="21" viewBox="0 0 130 130"><path d="M123.22 59.61L70.39 6.78a7.8 7.8 0 00-11 0l-11 11 13.92 
          13.89A9.26 9.26 0 0174 43.47l13.45 13.41a9.26 9.26 0 11-5.56 
          5.23L69.38 49.6v32.92a9.41 9.41 0 012.45 1.75 9.28 9.28 0 
          11-10.07-2V49a9.13 9.13 0 01-3-2 9.29 9.29 0 01-2-10.14L43 
          23.14 6.78 59.37a7.8 7.8 0 000 11l52.83 52.83a7.8 7.8 0 0011 
          0l52.59-52.59a7.8 7.8 0 00.02-11z" fill="hsl(0, 0%, 80%)"></path></svg></div></a>
    <button class="go_profile">
      <div class="hoverPurple alignCenter">
        <div class="">
          <svg width="25" viewBox="0 0 130 130"><g fill="hsl(0, 0%, 80%)"><circle cx="30" cy="30" r="7"></circle><circle cx="30" cy="65" r="7"></circle><circle cx="30" cy="100" r="7"></circle><circle cx="65" cy="65" r="7"></circle><circle cx="65" cy="100" r="7"></circle><circle cx="100" cy="65" r="7"></circle><circle cx="100" cy="100" r="7"></circle><circle cx="65" cy="30" r="7"></circle><circle cx="100" cy="30" r="7"></circle></g>
            </svg></div>
        <div id="name" class="right_items">${userfname} ${userlname}</div>
      </div>
    </button>
    <button id="deco" class="right_items">
      <div class="strokepurple">
        <svg width="19px" viewBox="0 0 130 130"><path style="transition: stroke 0.2s ease-out 0s, opacity 0.2s ease-out 0s;" fill="none" stroke="hsl(0, 0%, 80%)" stroke-width="7px" d="M85 21.81a51.5 51.5 0 1 1-39.4-.34M64.5 10v51.66"></path></svg>
        </div></button></div></nav>
        <div id="welcom">Welcome, <span class="purpl">${userfname} ${userlname}</span>&#33;</div>`;
        let profile = document.createElement("div");
        profile.classList.add("profile_grid");
        let level_div = document.createElement("div");
        let rank = retrank(level);
        let nextR = nextrank(level);
        level_div.classList.add("level_case");
        level_div.innerHTML = `<div class="level_header">
                                <div class="rank_header">Current rank</div>
                                <div class="rank">${rank}</div> 
                                <div class="next">Next rank in ${nextR} levels</div>
                              </div>
                               <div id="svg_level_draw"><div class="circl"><div class="level">Level</div> <div class="num_lev">${level}</div></div></div>
                               `;
        profile.appendChild(level_div);
        body.appendChild(profile);

        //add xps info
        let xpinfo = document.createElement("div");
        xpinfo.classList.add("xps_grid");
        xpinfo.innerHTML=`<div class="score">${totalxpdiv}</div>
                          <div id="last" class="Last_div"><div class="last_header">Last activity</div></div>`;
        for (let i=0;i<last_act.length&& i<4; i++){
          let am = numTostring(last_act[i].amount);
          let item = document.createElement("div");
          item.classList.add("act_items")
          item.innerHTML = `
          <div class="last_discription"><span class="Type">${last_act[i].object.type}</span> — <span class="path">${last_act[i].path.split('/')[last_act[i].path.split('/').length-1]}</span></div>
          <div class="last_score"> ${am}</div>`;
       profile.appendChild(xpinfo);
          document.getElementById("last").appendChild(item);
        }         

        // add audit ratio
        let ratio_info = document.createElement("div");
        ratio_info.classList.add("ratio_grid");
        let width1= (100/(data.user[0].totalUp+data.user[0].totalDown)) * data.user[0].totalUp;
        let width2= (100/(data.user[0].totalUp+data.user[0].totalDown))* data.user[0].totalDown;
        
        ratio_info.innerHTML = `<div><div class="audit_header">Audits ratio</div>
                                    <div class="div1_0">
                                      <div class="div1_1">
                                        <div class="div1_2"> 
                                          <svg width="100%" height="100%"><line stroke="var(--grey3)" stroke-width="6" x1="0" x2="${width1}%" y1="11" y2="11"></line></svg>
                                        </div>
                                        <div class="div2_0">
                                          <svg width="100%" height="100%"><line stroke="var(--yellow3)" stroke-width="6" x1="0" x2="${width2}%" y1="11" y2="11"></line></svg>
                                        </div>
                                      </div>
                                      <div class="div3_0">
                                        <div class="div3_1">
                                          <div class="div3_2">
                                            <div>Done</div>
                                            <div class="div3_3">
                                              <svg width="12" viewBox="0 0 130 130"><path fill="none" stroke="var(--grey4" stroke-width="6" d="M17.35 55.4L65 7.75l47.65 47.65M65 122.75V8.41"></path></svg>
                                            </div>
                                          </div>
                                          <div>${ratioUp}</div>
                                        </div>
                                        <div class="div4_0">
                                          <div class="centering">
                                            <div>Received</div>
                                            <div class="svg_ratio">
                                              <svg width="12" viewBox="0 0 130 130"><path fill="none" stroke="var(--grey4" stroke-width="6" d="M114.65 73.1L67 120.75 19.35 73.1M67 5.75v114.34"></path></svg>
                                            </div>
                                          </div>
                                          <div>${ratiodown}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="text_message">
                                    <div style="font-size: 3rem; line-height: 0.9;">${auditRatio.toFixed(1)}</div>
                                    <div class="Message_ratio">You can do better!</div>
                                  </div>`;
        profile.appendChild(ratio_info);

        // add current project 
        let currentproject = project_on.data.group[0];
        let diff = new Date();
        if (currentproject.updatedAt){
          diff = Date.now()- new Date(currentproject.updatedAt);
        }else{
          diff = Date.now()- new Date(currentproject.createdAt);
        }
        let week = Math.floor(diff / (604800*1000));
        diff = diff -(week*604800*1000);
        let day = Math.floor(diff / (1000*3600*24));
        diff = diff - (day* (1000*3600*24));
        let hours = Math.floor(diff / (1000*3600));
        diff = diff - (hours* (1000*3600));
        let min = Math.floor(diff / (1000*60));
        diff = diff - (min* (1000*60));
        let sec = Math.floor(diff/1000);
        console.log(hours);
        let activite = document.createElement("div");
        activite.classList.add("activ_grid");
        activite.innerHTML = `
                                <div>
                                  <div class="active">
                                    <div class="active_header">You're currently</div>
                                    <div class="active_p"></div>
                                  </div>
                                  <div class="active_info">Active</div>
                                </div>
                                <div>You're working on <span class="blue">${currentproject.object.name}</span> since ${week}w ${day}d ${hours}h ${min}m ${sec}s, keep going!</div>
                              `
        profile.appendChild(activite)
// add skills graph
skils.sort((a,b)=> {if (a.amount > b.amount){return -1} if (a.amount < b.amount){return 1} return 0;} )
let skills_info = document.createElement("div");
skills_info.classList.add("skills_grid");
let svgdata = `<div class="skills_heder">
                  <div class="heder purpl">Best skills</div>
                  <div class="skills_det">Here are your skills with the highest completion rate among all categories.</div>
               </div>
<svg class="skil_svg" style="overflow: visible;" width="60%" height="60%" viewBox="0 0 400 400" class="mv6-01 pb7-01"><circle fill="none" stroke="rgb(170, 170, 170)" stroke-width="0.75" cx="200" cy="200" r="200"></circle><path stroke-width="0" stroke="none" fill="var(--lightBlue)" d="`;
console.log(skils);

for (let i = 0; i < skils.length && i < 6; i++) {
  let cord = rotate({ x: 200, y: 200 - 200 * skils[i].amount / 100 }, { x: 200, y: 200 }, -(Math.PI / 3) * i);
  if (i === 0) {
    svgdata += `M ${cord.x} ${cord.y}`;
  } else {
    svgdata += `L ${cord.x} ${cord.y}`;
  }
}

svgdata += `"></path>
        <g><line x1="200" y1="0" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)">
        </line><circle cx="200" cy="180" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="160" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="140" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="120" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="100" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="80" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="60" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="40" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="20" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="200" cy="0" fill="rgb(170, 170, 170)" r="0">
        </circle></g><g><line x1="373.2050807568877" y1="100" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)">
        </line><circle cx="217.32050807568876" cy="190" fill="rgb(170, 170, 170)" r="1">
        </circle><circle cx="234.64101615137753" cy="180" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="251.96152422706632" cy="170" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="269.28203230275506" cy="160" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="286.60254037844385" cy="150" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="303.92304845413264" cy="140" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="321.2435565298214" cy="130" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="338.56406460551017" cy="120" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="355.88457268119896" cy="110" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="373.2050807568877" cy="100" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="373.20508075688775" y1="300" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="217.32050807568876" cy="210" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="234.64101615137756" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="251.96152422706632" cy="230" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="269.2820323027551" cy="240" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="286.6025403784439" cy="250" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="303.92304845413264" cy="260" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="321.24355652982143" cy="270" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="338.5640646055102" cy="280" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="355.88457268119896" cy="290" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="373.20508075688775" cy="300" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="200" y1="400" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="200" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="240" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="260" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="280" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="300" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="320" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="340" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="360" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="380" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="200" cy="400" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="26.794919243112304" y1="300.00000000000006" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="182.67949192431124" cy="210" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="165.35898384862247" cy="220" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="148.03847577293368" cy="230.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="130.71796769724492" cy="240.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="113.39745962155615" cy="250.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="96.07695154586739" cy="260.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="78.75644347017861" cy="270.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="61.43593539448983" cy="280.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="44.11542731880107" cy="290.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="26.794919243112304" cy="300.00000000000006" fill="rgb(170, 170, 170)" r="0"></circle></g><g>
        <line x1="26.79491924311219" y1="100.00000000000013" x2="200" y2="200" stroke-width="0.75" stroke="rgb(170, 170, 170)"></line>
        <circle cx="182.6794919243112" cy="190" fill="rgb(170, 170, 170)" r="1"></circle><circle cx="165.35898384862244" cy="180.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="148.03847577293365" cy="170.00000000000003" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="130.7179676972449" cy="160.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="113.3974596215561" cy="150.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="96.07695154586732" cy="140.00000000000006" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="78.75644347017854" cy="130.00000000000009" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="61.435935394489746" cy="120.0000000000001" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="44.11542731880098" cy="110.00000000000011" fill="rgb(170, 170, 170)" r="1"></circle>
        <circle cx="26.79491924311219" cy="100.00000000000013" fill="rgb(170, 170, 170)" r="0"></circle></g>
        <text text-anchor="middle" alignment-baseline="after-edge" x="200" y="-40" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[0].type.split("_")[1]}</text>
        <text text-anchor="start" alignment-baseline="after-edge" x="418.2050807568877" y="100" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[1].type.split("_")[1]}</text>
        <text text-anchor="start" alignment-baseline="before-edge" x="418.20508075688775" y="300" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[2].type.split("_")[1]}</text>
        <text text-anchor="middle" alignment-baseline="before-edge" x="200" y="440" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[3].type.split("_")[1]}</text>
        <text text-anchor="end" alignment-baseline="before-edge" x="-18.205080756887696" y="300.00000000000006" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[4].type.split("_")[1]}</text>
        <text text-anchor="end" alignment-baseline="after-edge" x="-18.20508075688781" y="100.00000000000013" fill="white" font-family="IBM Plex Mono" class="capitalize-01" font-size="24" style="background: red;">${skils[5].type.split("_")[1]}</text></svg>`;
        skills_info.innerHTML= svgdata;
        profile.appendChild(skills_info);
        document.getElementById("deco").addEventListener("click",()=>{setCookie("token", "", 0);
        window.location.replace("index.html");})
      },2000);
    
    
}

function showgraph(){
  let body = document.getElementById("content");
  body.innerHTML = "";
}

let cookie = getCookie("token");
switch (Page){
  case "index.html":
    if (cookie == ""){
      let submit = document.getElementById("login-form");
      submit.addEventListener("submit", (event) => {
        authentificate(event);
      });
    } else {
      window.location.replace("profile.html");
    }
    break;
  case "profile.html":
    if (cookie == ""){
      window.location.replace("index.html");
    }else{
      showprofile();
    }
    break;
  case "deco.html":
    setCookie("token", "", 0);
    window.location.replace("index.html");
    break;
  default:
    document.getElementById("go").addEventListener("click", () => window.location.replace("index.html"));
}