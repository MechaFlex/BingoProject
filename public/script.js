for (let row = 0; row < 5; row++) {

    const bingoRow = document.createElement("div")
    bingoRow.id = row.toString()
    bingoRow.className = "bingoRow"
    document.getElementById("bingoContainer").append(bingoRow)

    for (let col = 0; col < 5; col++) {
        const bingoBox = document.createElement("div")
        bingoBox.id = row.toString() + col.toString()
        bingoBox.className = "bingoBox"
        
        document.getElementById(row).append(bingoBox)

        const bingoText = document.createElement("div")
        bingoText.id = row.toString() + col.toString() + "text"
        bingoText.className = "bingoText"
        bingoBox.append(bingoText)
    }
}

//

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults(e){e.preventDefault();e.stopPropagation();}
document.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
    let files = e.dataTransfer.files

    if(files.length == 1){
        let file = files[0]
        if(file.type == "text/plain"){
            if(file.size < 100000){
                let reader = new FileReader()
                let utmaningarArray = []

                reader.onload = async function () {
                    utmaningarArray = reader.result.split("\n")
                    let UAindex = 0

                    if(utmaningarArray.length == 25){
                        for (let i = 0; i < 5; i++) {
                            for (let j = 0; j < 5; j++) {
                                document.getElementById( i.toString() + j.toString() + "text").innerHTML = utmaningarArray[UAindex]
                                UAindex++
                            }
                        }

                        console.log("hej")

                        let q = 0
                        let loadText = setInterval(function(){
                            console.log("hejisdgho")
                            bingoBoxes[q].style.color = "white"
                            bingoBoxes[q].style.transition = "color 1s linear"
                            q++
                        }, 50)
                        if(q == 24){
                            clearInterval(loadText)
                        }
                    }
                    else{
                        alert("Textfilen måste bestå av 25 rader")
                    }
                }   

                reader.readAsText(file)
            }
            else{
                alert("Din fil är på tok för stor")
            }
        }
        else{
            alert("Endast .txt tillåts")
        }
    }
}

//

let teamRed = false
let toggleready = true
document.getElementById("toggleContainer").addEventListener("click",
    async (e) => {
        if(toggleready){
            teamRed = !teamRed
            toggleready = false
            setTimeout(() => toggleready = true, 1000);
            if(teamRed){
                document.getElementById("toggleBall").style.marginLeft = "calc(50% - 10px)"
                document.getElementById("toggleBall").style.transition = "all 1000ms cubic-bezier(.5,0,.5,1)"
    
                for (let i = 0; i < 100; i++) {
                    document.body.style.background = "linear-gradient(335deg, rgba(0,0,0,1) 0%, rgba(" + (i*0.01*146 + 21).toString() + "," + (i*0.01*21 + 21).toString() + "," + (i*-0.01*105 + 147).toString() +",1) 50%, rgba(" + (i*-0.01*146 + 167).toString() + "," + (i*-0.01*21 + 42).toString() + "," + (i*0.01*105 + 42).toString() +",1) 100%)"
                    await new Promise(r => setTimeout(r, 10))
                }
            }
            else{
                document.getElementById("toggleBall").style.marginLeft = "0px"
                document.getElementById("toggleBall").style.transition = "all 1000ms cubic-bezier(.5,0,.5,1)"
    
                for (let i = 0; i < 100; i++) {
                    document.body.style.background = "linear-gradient(335deg, rgba(0,0,0,1) 0%, rgba(" + (i*-0.01*146 + 167).toString() + "," + (i*-0.01*21 + 42).toString() + "," + (i*0.01*105 + 42).toString() +",1) 50%, rgba(" + (i*0.01*146 + 21).toString() + "," + (i*0.01*21 + 21).toString() + "," + (i*-0.01*105 + 147).toString() +",1) 100%)"
                    await new Promise(r => setTimeout(r, 10))
                }
            }
        }
    }
)

//

let bingoBoxes = document.getElementsByClassName("bingoBox");

function redCheck(el){
    if(typeof el == "string"){
        el = document.getElementById(el)
    }
    return getComputedStyle(el).backgroundColor == "rgba(255, 0, 0, 0.5)"
}

function blueCheck(el){
    if(typeof el == "string"){
        el = document.getElementById(el)
    }
    return getComputedStyle(el).backgroundColor == "rgba(0, 0, 255, 0.5)"
}

function checkBingo(){
    for (let i = 0; i < 5; i++) {
        if(redCheck("" + i + "0") && redCheck("" + i + "1") && redCheck("" + i + "2") && redCheck("" + i + "3") && redCheck("" + i + "4")){
            clearInterval(updateBoard)
            document.getElementById("22").style.width = "810%"
            document.getElementById("22").style = "background-color: rgba(255, 0, 0, 0.5); color: white; width: 810%"
            document.getElementById("22").textContent = "BINGO"
        }
        if(blueCheck("" + i + "0") && blueCheck("" + i + "1") && blueCheck("" + i + "2") && blueCheck("" + i + "3") && blueCheck("" + i + "4")){
            clearInterval(updateBoard)
            document.getElementById("22").style.width = "810%"
            document.getElementById("22").style = "background-color: rgba(0, 0, 255, 0.5); color: white; width: 810%"
            document.getElementById("22").textContent = "BINGO"
        }
    }
    for (let i = 0; i < 5; i++) {
        if(redCheck("0" + i) && redCheck("1" + i) && redCheck("2" + i) && redCheck("3" + i) && redCheck("4" + i)){
            clearInterval(updateBoard)
            document.getElementById("22").style.width = "810%"
            document.getElementById("22").style = "background-color: rgba(255, 0, 0, 0.5); color: white; width: 810%"
            document.getElementById("22").textContent = "BINGO"
        }
        if(blueCheck("0" + i) && blueCheck("1" + i) && blueCheck("2" + i) && blueCheck("3" + i) && blueCheck("4" + i)){
            clearInterval(updateBoard)
            document.getElementById("22").style.width = "810%"
            document.getElementById("22").style = "background-color: rgba(0, 0, 255, 0.5); color: white; width: 810%"
            document.getElementById("22").textContent = "BINGO"
        }
    }
}

//

function saveBoard(){
    let boardString = ""
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(redCheck("" + i + j)){
                boardString += "r"
            }
            else if(blueCheck("" + i + j)){
                boardString += "b"
            }
            else{
                boardString += "e"
            }
        }
    }
    return boardString
}

function readBoard(boardString){
    let boardStringArray = Array.from(boardString)
    let q = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if(boardStringArray[q] == "r"){
                document.getElementById("" + i + j).style.backgroundColor = "rgba(255, 0, 0, 0.5)"
            }
            else if(boardStringArray[q] == "b"){
                document.getElementById("" + i + j).style.backgroundColor = "rgba(0, 0, 255, 0.5)"
            }
            else{
                document.getElementById("" + i + j).style.backgroundColor = "rgba(0, 0, 0, 0)"
            }
            q++
        }
    }
}

//

for (let i = 0; i < bingoBoxes.length; i++) {
    bingoBoxes[i].addEventListener('mousedown', function(e){

        if(teamRed){
            if(redCheck(this)){
                this.style = "background-color: rgba(0, 0, 0, 0); color: white"
            }
            else if(blueCheck(this)){}
            else{
                this.style = "background-color: rgba(255, 0, 0, 0.5); color: white"
            }
        }
        else{
            if(blueCheck(this)){
                this.style = "background-color: rgba(0, 0, 0, 0); color: white"
            }
            else if(redCheck(this)){}
            else{
                this.style = "background-color: rgba(0, 0, 255, 0.5); color: white"
            }
        }

    }, false)

    bingoBoxes[i].addEventListener('mouseup', async function(e){
        await new Promise(r => setTimeout(r, 100))
        checkBingo()

        let bingoStr = saveBoard()
        let data = {bingoStr}
        let options =  {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch("/bingoPOST", options)
    }, false)
}

//

let updateBoard = setInterval(function(){
    fetch("/bingoGET")
    .then(res => res.json())
    .then(data => readBoard(data))
    .then(checkBingo())
}, 3000)

//

document.getElementById("clear").addEventListener("click", () => {
    fetch("/bingoCLEAR")
})