const selecttag=document.querySelectorAll("select");
 translatebtn=document.querySelector("button");
 fromtext = document.querySelector(".from-text");
 totext=document.querySelector(".to-text");
exchangeicon=document.querySelector(".exchange");
icons=document.querySelectorAll(".row i");

selecttag.forEach((tag, id)=>{
     for (const country_code in countries) {
         let selected;
         if(id==0 && country_code=="en-GB"){
             selected="selected";
         }
         else if(id==1 && country_code=="hi-IN"){
             selected="selected";
         }
         let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
         tag.insertAdjacentHTML("beforeend",option);
     }
});

exchangeicon.addEventListener("click",()=>{
    let temp=fromtext.value;
    fromtext.value=totext.value;
    totext.value=temp;
    temp=selecttag[0].value;
    selecttag[0].value=selecttag[1].value;
    selecttag[1].value=temp;
})

translatebtn.addEventListener("click",()=>{
  let text =fromtext.value;
  translatefrom=selecttag[0].value;
  translateto=selecttag[1].value;
  if(!text){
      return ;
  }
  totext.setAttribute("placeholder",'translating....');
  
  let apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;

  fetch(apiurl).then(res=>res.json()).then(data=>{
      totext.value=data.responseData.translatedText;
      totext.setAttribute("placeholder",'translation');

  });
});

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
         if(target.classList.contains("fa-copy")){
             if(target.id == "from"){
                 navigator.clipboard.writeText(fromtext.value);               
            }
             else{
                 navigator.clipboard.writeText(totext.value);
              }
         }
         else{
             let utterance;

            if(target.id == "from"){
                utterance=new SpeechSynthesisUtterance(fromtext.value);  
                utterance.lang= selecttag[0].value;
            }
            else{
                utterance=new SpeechSynthesisUtterance(totext.value);  
                utterance.lang= selecttag[1].value;

            }        
            speechSynthesis.speak(utterance); 
        }
    });
});