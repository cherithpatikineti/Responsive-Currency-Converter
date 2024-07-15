const BASE_URL="https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
// for (code in countryList){
//     console.log(code,countryList[code]);
// }

const updateFlag =(ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=ele.parentElement.querySelector("img");
    img.src=newSrc;
}

for(let select of dropdowns){
    for(currCode in countryList){
        let newOpt=document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        if(select.name==="from" && currCode==="USD") 
        newOpt.selected="selected";
        if(select.name==="to" && currCode==="INR") 
            newOpt.selected="selected";
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const getExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amt=amount.value;
    if(amt===""||amt<1){
        amt=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmt=amt*rate;
    msg.innerText=`${amt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}..`;
}
window.addEventListener("load",getExchangeRate);

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
   getExchangeRate();
})