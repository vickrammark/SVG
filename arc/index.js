var range = document.querySelector("#range");
var number = document.querySelector("#number");
var arc = document.querySelector("#arc");
var length=document.querySelector("#arcLength");
length.innerHTML=arc.getTotalLength()+"sdsf"

range.oninput=function(e){
    console.log(e)
    number.value=this.value;
    arc.style.strokeDashoffset=77-this.value
}