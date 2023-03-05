const setting = document.querySelector(".setting");
const buttonSetting  = setting.querySelector(".cog");
const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const buttonSend = chatBox.querySelector(".send");
const buttonNextPage = chatBox.querySelector(".nextpage");
const buttonPreviousPage = chatBox.querySelector(".previouspage");
const chatBoxBody = chatBox.querySelector(".chat-box-content");
const output_field_message =  chatBox.querySelector(".message");
const output_field_response =  chatBox.querySelector(".response");
var interactionBoxCurrent = 0;
var interactionBoxTotal = 0;
const interactionBoxList = [];
var interactionBoxListText = "Your are a GameMaster aka GM of this tabletop game, you'll have to discribe the scene in which I am. I will tell the action I would like to do, you will take them in consideration to discribe the next scene. This back and forth is an interaction (one description then one input from the player). You can not say or do thing for me, the 'player', the player input will be between '~' those are his action.  You can only describe thing around me and simulate dialogs or fight with npc. after describing a scene you finish the descripion with 'What do you do ?' if there is a need for the player input, it isn't necessary on every interaction. If needed ask the player question about his action and goals.The story take place in a fantastic land set in the middle age, were frogs are sentient and human do not existe. I'm an unnamed Frog, you will have to choose an adventure that will take 15 interactions to finish, with a beginning and an end";

buttonSetting.addEventListener("click", function(){
  settingMenu();
});

buttonSend.addEventListener("click", function(){
  sendMessage();
});

buttonNextPage.addEventListener("click", function() {
  NextPage();
});
buttonPreviousPage.addEventListener("click", function() {
  PreviousPage();
});

inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
    }
});

function settingMenu(){
  const settingAp = setting.querySelector(".settingMenu").style.display;
  console.log(settingAp)
  if (settingAp == "none"){
    setting.querySelector(".settingMenu").style.display = "grid";
  } else {
    setting.querySelector(".settingMenu").style.display = "none";
  }
}

function PreviousPage(){
  if (interactionBoxCurrent != 0){
    interactionBoxCurrent -= 1;
    output_field_message.innerHTML = interactionBoxList[interactionBoxCurrent][0];
    output_field_response.innerHTML  = interactionBoxList[interactionBoxCurrent][1]; 
  }
  return interactionBoxCurrent;
}


function NextPage(){
  if (interactionBoxCurrent != interactionBoxTotal){
    interactionBoxCurrent += 1;
    output_field_message.innerHTML = interactionBoxList[interactionBoxCurrent][0];
    output_field_response.innerHTML  = interactionBoxList[interactionBoxCurrent][1]; 
  }
  return interactionBoxCurrent;
}


function sendMessage() {
  interactionBoxCurrent += 1;
  interactionBoxTotal += 1;
  var message = "~" + inputField.value + "~" ;
  inputField.value = "";
  output_field_message.innerHTML  = message;
  interactionBoxListText = interactionBoxListText + "\n\n" + message;
  console.log(interactionBoxListText)
  output_field_response.innerHTML  = "Loading..."; 
  fetch('http://localhost:3000/message', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({message : interactionBoxListText})
  }).then((response) => {
    return response.json();
  }).then((data) => {
    output_field_response.innerHTML  = data.message; 
    interactionBoxListText = interactionBoxListText + data.message;
    const interaction = [message, data.message];
    interactionBoxList.push(interaction);
    console.log(interactionBoxList);
  });
  return interactionBoxCurrent, interactionBoxTotal, interactionBoxList;
}
