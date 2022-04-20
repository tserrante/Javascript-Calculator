
let inputNodeList = document.querySelectorAll(".input");
let inputArray = Array.from(inputNodeList);

let displayField = document.querySelector('.display');

console.log(inputArray);


inputArray.forEach(function(btn){
        btn.addEventListener("click", () => displayField.innerText = btn.innerText);
    });

