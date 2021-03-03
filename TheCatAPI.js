function getCat() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.thecatapi.com/v1/images/search');
    request.onload = function() {
        let data = JSON.parse(request.response);
        let url = data[0].url;
        showCat(url);    
    }
    request.send();
}

function showCat(url) {
    let catImg = document.getElementById("catImg");
    catImg.setAttribute("src", url);
}

function getBreedsId() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.thecatapi.com/v1/breeds');
    request.onload = function() {
        let data = JSON.parse(request.response);
        let str = "";
        for(let i = 0; i < data.length; i++) {
            str += "<option value='" + data[i].id +"'>" + data[i].name + "</option>";
        }
        let breeds = document.getElementById("breed");
        breeds.innerHTML = str;
    }
    request.send();
}

let imgAry = [];
let breedsImg = document.getElementById("breedsImg");

function changeBreeds() {
    let breedsId = document.getElementById("breed").value;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.thecatapi.com/v1/images/search?breed_ids=' + breedsId + '&limit=5');
    request.onload = function() {
        let data = JSON.parse(request.response);
        setBreedsImg(data);
        document.getElementById("origin").innerHTML = data[0].breeds[0].origin;
        document.getElementById("weight").innerHTML = data[0].breeds[0].weight.metric + " kg";
        document.getElementById("lifeSpan").innerHTML = data[0].breeds[0].life_span + " average age life span"; 
        document.getElementById("temperament").innerHTML = data[0].breeds[0].temperament;
        document.getElementById("descript").innerHTML = data[0].breeds[0].description;
        document.getElementById("catwiki").setAttribute("href", data[0].breeds[0].wikipedia_url);
    }
    request.send();
}

function setBreedsImg(data) {
    imgAry = [];
    for(let i = 0; i < data.length; i++) {
        imgAry.push(data[i].url);
    }
    breedsImg.setAttribute("src", imgAry[0]);
}

function clickBreedsImg() {
    for(let i = 0; i < imgAry.length; i++) {
        if(imgAry[i] == breedsImg.getAttribute("src")) {
            if(i == imgAry.length - 1) {
                i = 0 ;
                breedsImg.setAttribute("src", imgAry[i]);
            }else {
                i++;
                breedsImg.setAttribute("src", imgAry[i]);
            }
        }
    }
}
getBreedsId();

function clickEventListener() {
    let breeds = document.getElementById("navbreeds");
    let cats = document.getElementById("navcats");

    breeds.addEventListener("click", clickbreeds);
    cats.addEventListener("click", clickcats);
}

function clickbreeds() {
    document.getElementById("breeds").style.display = "block";
    document.getElementById("cat").style.display = "none";
}

function clickcats() {
    document.getElementById("breeds").style.display = "none";
    document.getElementById("cat").style.display = "block";
}

clickEventListener();