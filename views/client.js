/*
const inButton = document.querySelector("#in");
const outButton = document.querySelector("#out");
const resetButton = document.querySelector("#reset");
const queButton = document.querySelector("#que");
const callButton = document.querySelector("#call");
const visits = document.querySelector("#visits");
const inside = document.querySelector("#inside");
const last = document.querySelector("#lastInQue");
const first = document.querySelector("#firstInQue");
const now = new Date(Date.now());


function load() {
  fetch("/load").then(function(response) {
    return response.json()
  }).then(function(data) {
    visits.textContent = data.letIn;
    inside.textContent = data.letIn-data.letOut;
    last.textContent = data.que;
    first.textContent = data.call;
    showTime(data.queTime);
    if (data.que === data.call) {
      callButton.disabled = true;
    }
    if (data.letIn === data.letOut) {
      outButton.disabled = true;
    }   
  });
}

function letIn() {
  fetch("/let-in").then(function(response) {
    return response.json()
  }).then(function(data) {
    visits.textContent = data.letIn;
    inside.textContent = data.letIn-data.letOut;
    outButton.disabled = false;
  });
}

function letOut() {
  fetch("/let-out").then(function(response) {
    return response.json()
  }).then(function(data) {
    inside.textContent = data.letIn-data.letOut;
    if (data.letIn === data.letOut) {
      outButton.disabled = true;
    }    
  });
}

function reset() {
  fetch("/reset").then(function(response) {
    return response.json()
  }).then(function(data) {
    visits.textContent = data.letIn;
    inside.textContent = data.letIn-data.letOut;
    last.textContent = data.que;
    first.textContent = data.call;
    document.querySelector("#queTime").innerText = 0;
    inButton.disabled = true;
    callButton.disabled = true;
  });
}

function que() {
  fetch("/que").then(function(response) {
    return response.json()
  }).then(function(data) {
    last.textContent = data.que;
    showTime (data.queTime);
    callButton.disabled = false;
  });
}

function call() {
  fetch("/call").then(function(response) {
    return response.json()
  }).then(function(data) {
    first.textContent = data.call;
    showTime (data.queTime);
    if (data.que === data.call) {
      callButton.disabled = true;
    }
  });
}

function showTime(time){
  let ms = Date.now()-time;
  let min = Math.round(ms/1000/60);
  document.querySelector("#queTime").innerText = min;
  setTimeout(load, 60000);  
}

showTime();

window.onload = function () {
  console.log();
  load();
}

inButton.addEventListener("click", function(event) {
  event.preventDefault();
  letIn();
});

outButton.addEventListener("click", function(event) {
  event.preventDefault();
  letOut();
});

resetButton.addEventListener("click", function(event) {
  if (window.confirm("Nollställ besöksräknare?")) {
    event.preventDefault();
    reset();      
  }
});

queButton.addEventListener("click", function(event) {
  event.preventDefault();
  que();
});

callButton .addEventListener("click", function(event) {
  event.preventDefault();
  call();
});
*/