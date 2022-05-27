//const help = require("nodemon/lib/help");


/*Create the room class*************************************************************************************/
class Room {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedRooms = {};
    this._character = "";
    this._item = "";
    this._defeated = "";
    
  }

  /******getting***********************************/
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character
  }

  get item() {
    return this._item
  }

  get defeated() {
    return this._defeated
  }

  /******setting************************************/
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  set item(value) {
    this._item = value;
  }

  set defeated(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._defeated = false;
  }

  /*a method to produce friendly room description*/
  
  describe() {
    return "Looking around the " + this._name + " you can see " + this._description;
  }

  /* a method to add rooms to link rooms to this one
  * it does this by adding them to _linkedRooms*/
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

 
   /* a method to produce friendly description of linked rooms*/
  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = []
    for (const [direction, room] of entries) {
      let text = " The " + room._name + " is to the " + direction;
      details.push(text);
    }
    return details;
  }

  /* a method to move the adventurer to a new room*/
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
     alert("You can't go that way. \nYou are at the " + this.name);     
     return this;
    }
  }
}

/*Create the item class*************************************************************************************************************************/
class item {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._object ="";
  }

/******setting***********************************/
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
  
  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set object(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._object = value;
  }

/******getting***********************************/
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get object() {
    return this._object;
  }

// a method to produce friendly item description
  describe() {
    return "You have found a " + this._name + ", the " + this._name + " is " + this._description;
  }

  /*a method to take an item*/
  // take(item) {
  //   if (item = this._object) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}


/*Create the Character class****************************************************************************************************************************/
class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";

  }

  /******setting***********************************/
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }
  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  /******getting***********************************/
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get conversation() {
    return this._conversation;
  }
 
  // a method to produce friendly character description
  describe() {
    return "You have met " + this._name + ", " + this._name + " is " + this._description;
  }

  //a method to produce friendly conversation text
  converse() {
    return this._name + " says " + "'" + this._conversation + "'";
  }
}

/*Create the Friend subclass***************************************************************************************/
class Friend extends Character {
  constructor(name) {
    super(name)
    this._prize = ""
  }
  /******setting************************************/
  set prize(value) {
    this._prize = value
  }

  /******getting************************************/
  get prize() {
    return this._prize
  }

  rescue() {
    //add how to give prize to player backpack
    return "You have rescued " + this._name + ", " + this._name + " is pleased and gives you a Prize. You have been given a " + this._prize.name +
      ". The " + this._prize.name + " is " + this._prize.description;
      
  }

}

/*Create the Enemy subclass***************************************************************************************/
class Enemy extends Character {
  constructor(name) {
    super(name);
    this._weakness = "";
    
  }

  /******setting************************************/
  set weakness(value) {
    if (value.length < 4) {
      //alert("Description is too short.test1");
      return;
    }
    this._weakness = value;
  }


  /*a method to determine the result of fighting an enemy*/
  fight(item) {
    if (item = this._weakness) {
      return true;
    } else {
      return false;
    }
  }

}



//create the indiviual room objects and add their descriptions *************************************************************
const Droppoint = new Room("Droppoint");
Droppoint.description = "a small clearing. There is a dense forest to the east and a small hut to the west.";
Droppoint.defeated = false;

const Weapons = new Room("Weapons Room");
Weapons.description = "the small room has a table in the middle and a small back door to the east.";
Weapons.defeated = false;

const narrowPath = new Room("Narrow Path");
narrowPath.description = "heading east there is an enormous enclosure with a broken door. Could Sally be in there?";
narrowPath.defeated = false;

const coelDino = new Room("Coelophysis Enclosure");
coelDino.description = "the area filled with Coelophysis. Don’t let their size fool you. They hunt in large packs. They are also quite agile and boast blade-like cutting teeth. There is an exit to the east of the enclosure.";
coelDino.defeated = false;

const trexDino = new Room("T-Rex Enclosure");
trexDino.description = "the defeated T-Rex laying lifeless on the floor! You may now continue on your mission!";
trexDino.defeated = false;

const rescueRoom = new Room("Rescue Room");
rescueRoom.description = "the room is pretty empty apart from a small crate in the corner. You search the room and find Sally hiding behine a crate. To rescue Sally you must talk to her!";
rescueRoom.defeated = false;

const veloDino = new Room("Velociraptor Enclosure");
veloDino.description = "5 hungry Velociraptors. There is NO WAY OUT. You must fight them!";
veloDino.defeated = false;

//Trex Room with no directions available. Once fight has been typed the user is automatically taken to TrexDino room with directions avaible and the game continues.
const trexDino1 = new Room("T-Rex Enclosure");
trexDino1.description = "the home to the mighty T-Rex. \nThere is a small door to the north of the enclosure, but to get to it you must defeat the T-Rex standing in your way by fighting it! \nGood Luck!";
trexDino1.defeated = false;


//link the  rooms together *************************************************************************************************
Droppoint.linkRoom("north", Weapons);
Droppoint.linkRoom("east", coelDino);
Weapons.linkRoom("south", Droppoint);
Weapons.linkRoom("east", narrowPath);
narrowPath.linkRoom("west", Weapons);
narrowPath.linkRoom("east", trexDino1);
coelDino.linkRoom("north", trexDino1);
coelDino.linkRoom("west", Droppoint);
coelDino.linkRoom("east", veloDino);
trexDino.linkRoom("north", rescueRoom);
//trexDino.linkRoom("west", narrowPath);
//trexDino1.linkRoom("north", trexDino);


//add characters**************************************************************************************************************
const Coel = new Enemy("Coelophysis bauri");
Coel.conversation = "Click Click Click";
Coel.description = "a small dinosaur with a deadly bite";
Coel.pronoun = "they";
Coel.weakness = "meat";
Coel.defeated = false;


const tRex = new Enemy("T-Rex");
tRex.conversation = "Roooooaaaarrrrrr";
tRex.description = "the most deadliest Dinosaur that ever lived";
tRex.pronoun = "he";
tRex.weakness = "meat";
tRex.defeated = false;

const tRex1 = new Enemy("T-Rex");
tRex.conversation = "Roooooaaaarrrrrr";
tRex.description = "the most deadliest Dinosaur that ever lived";
tRex.pronoun = "he";
tRex.weakness = "meat";
tRex.defeated = false;

const veloc = new Enemy("Velociraptor");
veloc.conversation = "Grrrrrrrrrrrrr";
veloc.description = "a medium but deadly Dinosaur. They hunt together and are voracious with their claws";
veloc.pronoun = "they";
veloc.weakness = "";
veloc.defeated = false;

//add items**************************************************************************************************************
const Meat = new item("Bucket of Meat");
Meat.description = "a large number of steaks to distract the Coelophysis with!";
Meat.object = "meat"

const Gun = new item("Gun");
Gun.description = "a fully loaded automatic rifle";

const Medal = new item("Medal");
Medal.description = "a shiny gold medal. Congratulations! You have WON!";

const sally = new Friend("Sally");
sally.conversation = "Thank you so much for finding me but to complete your mission you must 'rescue' me. I will reward you with a medal!";
sally.description = "the last surviver in Jurassic Park.";
sally.prize = Medal;

// add characters to rooms***********************************************************************************************
coelDino.character = Coel;
trexDino1.character = tRex;
veloDino.character = veloc;
rescueRoom.character = sally;

//add items to rooms*****************************************************************************************************
Weapons.item = Gun;
Droppoint.item = Meat;


//Subroutine to display information about the current room
function displayRoomInfo(room) {

  let occupantMsg = "";
  

  /******Display any Characters in a room************************************/
  if (room.character === "") {
      occupantMsg = "";
  } else {      
      occupantMsg = room.character.describe();
  }

  /******Display any Items in a room************************************/
  if (room.item === "") {
       ItemMsg = "";
  } else {      
    ItemMsg = room.item.describe();
  }

 /******Display all variables in given order************************************/
  textContent = "<p>" + room.describe() + "</p>" + "<p>" + occupantMsg + "</p>" + "<p>" + ItemMsg + "</p>" + "<p>" + room.getDetails() + "</p>";

    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '><input type="text" id="usertext" />';
    document.getElementById("usertext").focus();
}


function commandHandler(command, character) {
  switch (command) {

    //Responses when fight command is used on the Dinosaurs pages
    case "fight":
      if (currentRoom === trexDino1 || currentRoom === coelDino) {
        msg = "Congratulations you have defeated the mighty " + character.name;
        alert(msg)        
        document.getElementById("usertext").value = "";
        trexDino1.linkRoom("north", trexDino);  
        currentRoom = currentRoom.move("north");
        tRex.description = "now dead and you can continue!"
        displayRoomInfo(currentRoom);

      } else if (currentRoom === veloDino) {       
        alert("You cannot defeat the Velociraptors, there are too many. \nYou have been KILLED! ");
        startGame(location.reload());

      } else {
        alert("You can't reform that task here",);
        document.getElementById("usertext").value = "";
      }
      break;

    //talk can only be used when talking to friends
    case "talk":
      if (currentRoom === rescueRoom) {
        msg = character.converse();
        alert(msg)
        document.getElementById("usertext").value = "";
      } else {
        alert("You can't reform that task here",);
        document.getElementById("usertext").value = "";
      }
      break;

    //help can be accessed anywhere and anytime in the game
    case "help":
      alert("Useful Commands: \n-north \n-south \n-east \n-west \n-help \n-fight \n-talk \n-rescue");
      document.getElementById("usertext").value = "";
      break;

    //rescue can only be used in the rescue room with Sally
    case "rescue":
      if (currentRoom === rescueRoom) {
        msg = character.rescue();
        alert(msg)
        startGame(location.reload());
        } else {
          alert("You can't reform that task here",);
          document.getElementById("usertext").value = "";
        }
      break;

    //case "take":
      // if (item.take === true) {
      //   msg = "You have collected " + item.name;
      //   alert(msg)
      // } else {
      //   break;
      // }
     // break;
    default:
      alert("yet to be implemented")
      break;
    //blank command box after commands
  }
}


//Subroutine to complete inital game set up then handle commands from the user

function startGame() {
  //set and display start room
  currentRoom = Droppoint;
  displayRoomInfo(currentRoom);

  //handle commands
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let command = document.getElementById("usertext").value.toLowerCase();
      const directions = ["north", "south", "east", "west"];
      const commands = ["fight", "rescue", "talk", "take", "help"];    

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        displayRoomInfo(currentRoom);
      } else if (commands.includes(command)) {
        commandHandler(command, currentRoom.character)
      } else {
        document.getElementById("usertext").value = ""
        //change to text message for short time and then reshow
        alert("that is not a valid command please try again")
      }

      
      
      // if (currentRoom === trexDino) {
      //     this._defeated = false;
      //   console.log(this.defeated);

      //   if (this.defeated = false){ //have not fought the trex yet
      //     console.log(this.defeated);

      //       if (command === "fight"){

      //                   if (commands.includes(command)) {
      //                     commandHandler(command, currentRoom.character)
      //                   } else {
      //                     document.getElementById("usertext").value = ""
      //                     //change to text message for short time and then reshow
      //                     alert("that is not a valid command please try again")
      //                   }

      //       } else{ alert("must fight trex")}
      //   } else {
      //             if (directions.includes(command)) {
      //             currentRoom = currentRoom.move(command);
      //             displayRoomInfo(currentRoom);
      //           } else if (commands.includes(command)) {
      //             commandHandler(command, currentRoom.character)
      //           } else {
      //             document.getElementById("usertext").value = ""
      //             //change to text message for short time and then reshow
      //             alert("that is not a valid command please try again")
      //           }
      //         }

      // } else {
      //         if (directions.includes(command)) {
      //         currentRoom = currentRoom.move(command);
      //         displayRoomInfo(currentRoom);
      //       } else if (commands.includes(command)) {
      //         commandHandler(command, currentRoom.character)
      //       } else {
      //         document.getElementById("usertext").value = ""
      //         //change to text message for short time and then reshow
      //         alert("that is not a valid command please try again")
      //       }
      //     }


    }
  });
}


  
    
