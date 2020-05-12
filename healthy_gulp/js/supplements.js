API_URL = 'http://2abb90d4.ngrok.io/api/'
API_URL1 = 'http://2abb90d4.ngrok.io/search/query?q='



document.getElementById('current_supplement_submit').onclick = function(){
    let elem = document.getElementById("current_supplement").value
    
    let request = new XMLHttpRequest()
    request.open("GET", API_URL1 + elem, false);
    request.send();
    let data = JSON.parse(request.responseText)
    
    showDetails(data[0])
    }


function showDetails(supplement) {
    let request = new XMLHttpRequest()
    request.open("GET", API_URL + "classes/" + supplement['class_id'], false);
    request.send();
    let data = JSON.parse(request.responseText)
    console.log(data)
    let class_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "purposes/" + supplement['purpose_id'], false);
    request.send();
    data = JSON.parse(request.responseText)
    console.log(data)
    let purpose_name = data['name']
    request = new XMLHttpRequest()
    request.open("GET", API_URL + "supplements/" + supplement['id'] + "/side-effects", false);
    request.send();
    data = JSON.parse(request.responseText)
    console.log(data)
    let side_effects = []
    for (let i = 0; i< data.length; i++) {
        side_effects.push(data[i]['name'])
    }
    document.getElementById('section2_inner_body_results_h').innerText = ('About supplement: ')
    document.getElementById('supplement-class').innerText = ('Class - ' + class_name)
    document.getElementById('supplement-purpose').innerText = ("Purpose - " + purpose_name)
    document.getElementById('supplement-side-effects').innerText = ("Side-effects: " + side_effects.join(', '))
}

function resetColors() {
    let children = document.getElementById('supplement-container').children
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundImage = 'linear-gradient(to right, #4f8aff, white)'
    }
}