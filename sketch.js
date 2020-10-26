var chef, chefImage, chefName;
var robot, robotImage, robotName;
var gameState = "start"
var database;
var counter = 0;
var buttonState = 0;
var x = 0;

function preload() {
  //load the images
  chefImage = loadImage("Images/Chef 21.16.06.png")
  robotImage = loadImage("Images/RobotProfile.png")
}
function setup() {
  //creates the canvas and database
  createCanvas(windowWidth, windowHeight);
  database = firebase.database()

  //creates the chef
  chef = createSprite(windowWidth/2 + 100, windowHeight/2, 50, 50);
  chef.addImage(chefImage)
  chef.scale = 2
  
  //creates the robot
  robot = createSprite(windowWidth/2 - 100, windowHeight/2, 50, 50);
  robot.addImage(robotImage)
  robot.scale = 0.2

  //creates the two input boxes where you put your name
  input1 = createInput("Chef Name")
  input1.position(windowWidth/2 + 70, windowHeight/2 + 100)

  input2 = createInput("Robot Name")
  input2.position(windowWidth/2 - 130, windowHeight/2 + 100)

  database.ref("Counter/").on("value", data => {
    counter = data.val().Counter
  })

  database.ref("gameState/").on("value", data => {
    gameState = data.val()
  })
}
function draw() {
  //background and text
  background(230, 156, 103);
  textSize(30)
  text("No idea!", windowWidth/2 - 20, 40)

  if(buttonState == 1) {
    x = x + 1
  }
  if(x == 30) {
    buttonState = 0;
  }
  if(mousePressedOver(chef) && buttonState == 0) {
    name = input1.value()
    updateName(name, "Chef");
    buttonState = 1;
    counter = counter + 1
    updateCounter(counter);
  }
  if(mousePressedOver(robot) && buttonState == 0) {
    name = input2.value()
    updateName(name, "Robot");
    buttonState = 1
    counter = counter + 1
    updateCounter(counter);
  }
  database.ref("Players/").on("value", data => {
    chefName = data.val().Chef.name
    robotName = data.val().Robot.name
  })
  if(counter == 2) {
    gameState = "play"
    updateState(gameState);
  }
  drawSprites();
}
//the function to update the database
function updateName(name, branch) {
    database.ref("Players/"+ branch + "/").set({
      name: name
    })
}
function updateCounter(counter) {
  database.ref("Counter/").set({
    Counter: counter
  })
}
function updateState(state) {
  database.ref("/").update({
    gameState: state
  })
}