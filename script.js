var buttons = document.querySelectorAll("button");

var display = document.getElementById("display");

function getRandomColor(){
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    var value = this.textContent;
    
    if(value !== "c"){
      this.style.backgroundColor = getRandomColor();
    }
    

    if (value === "c") {
      display.value = "";
      
      buttons.forEach(function(btn){
        btn.style.backgroundColor = "";
      });
      
    } else if (value === "Add") {
      display.value += "+";
    } else if (value === "Subtract") {
      display.value += "-";
    } else if (value === "=" || value === "Equals") {
      try {
        display.value = eval(display.value);
      } catch (e) {
        display.value = "Error";
      }
    } else {
      display.value += value;
    }
  });
}
