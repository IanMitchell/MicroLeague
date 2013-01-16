// Global Variables are bad. Oops.
var teams = new Array();
teams[0] = "---";
teams[1] = "TSM";
teams[2] = "CLG.EU";



// What type of languages has a .round() that
// doesn't have a precision level. I mean, come on.
function round_float(x,n){
  if(!parseInt(n))
  	var n=0;
  if(!parseFloat(x))
  	return false;
  return Math.round(x*Math.pow(10,n))/Math.pow(10,n);
}


// Creates and Displays a new Card
function generateCard(title, content) {
  var card = "<div class='update box'><h5>" + title + "</h5><span>" + content + "</span></div>";
  
  $(".updates").prepend(card);
}


// Prepares a Card to be generated
function prepCard(title, content) {
  $("#card-title").val(title);
  $("#card-content").val(content);
}


// Updates the Client and Admin Gold Counter
function updateGold(team, amount) {
  var gold = $(".team-" + team + " .gold-count").text();
  gold = gold.substring(0, gold.length - 1);
  gold = parseFloat(gold);
  
  // Have to use Math.round due to float errors.
  // In chrome or FF (not tested in IE), enter
  // 6.6 + 0.1 to see what I mean
  gold = round_float(gold + amount, 2);
  
  // Update Admin
  $(".team-" + team + " .gold-count").text(gold + "k");
  
  
  // Little more work for Client
  var client = $(".scoreboard .team-" + team + " h3").text();
  client = client.substr(0, client.lastIndexOf(" "));
  client += " (" + gold + "k)";
  
  $(".scoreboard .team-" + team + " h3").text(client);
}


// Updates the Client and Admin Tower Counter
// and preps a card
function updateTower(team, amount) {
  var current = $(".team-" + team + "-tower").text();  
  current = current.substr(0, current.lastIndexOf(" "));
  
  current = parseInt(current);
  current += amount;
  
  $(".team-" + team + "-tower").text(current + " Towers");
  prepCard("Tower Down", teams[team] + " has destroyed a tower!");
}


// Updates the Client and Admin Inhib Counter
// and preps a card
function updateInhib(team, amount) {
  var current = $(".team-" + team + "-inhib").text();  
  current = current.substr(0, current.lastIndexOf(" "));
  
  current = parseInt(current);
  current += amount;
  
  $(".team-" + team + "-inhib").text(current + " Inhibitors");
  
  if (amount > 0) {
    prepCard("Inhibitor Down", teams[team] + " has destroyed an inhibitor!");
  }
  else {
    if (team == 1)
      var other = 2;
    if (team ==2)
      var other = 1;
      
    prepCard("Inhibitor Respawned", teams[other] + "'s inhibitor has respawned!");   
  }
}


// Updates the Client and Admin Kill Counter
// and preps a Card
function updateKills(team, p1, p2) {
  var team_1_kills;
  var team_2_kills;
  
  
  team_1_kills = $(".team-1-kill-count").text();  
  team_1_kills = team_1_kills.substr(0, team_1_kills.lastIndexOf(" "));
  team_1_kills = parseInt(team_1_kills);

  team_2_kills = $(".team-2-kill-count").text();  
  team_2_kills = team_2_kills.substr(0, team_2_kills.lastIndexOf(" "));
  team_2_kills = parseInt(team_2_kills);
  
  
  if (team_1_kills + team_2_kills == 0) {
    prepCard("First Blood!", p1 + " has slain " + p2 + " for first blood!");
  }
  else {
    prepCard("Player Slain", p1 + " has slain " + p2 + "!");
  }
  
  
  if (team == 1) {
    team_1_kills++;
    $(".team-1-kill-count").text(team_1_kills + " Kills");
    
    var client = $(".scoreboard .team-" + team + " h3").text();
    client = client.substr(client.indexOf(" "));
    team_1_kills += " " + client;
  
    $(".scoreboard .team-" + team + " h3").text(team_1_kills);
  }
  else {
    team_2_kills++;
    $(".team-2-kill-count").text(team_2_kills + " Kills");

    var client = $(".scoreboard .team-" + team + " h3").text();
    client = client.substr(client.indexOf(" "));
    team_2_kills += " " + client;
  
    $(".scoreboard .team-" + team + " h3").text(team_2_kills);
  }
}




// Click Handlers
$(document).ready(function() {
  
  // Sliding Variables
  var pregameVisible = true;
  var gameVisible = true;

  var title;
  var content;

  var team_1_champions = new Array();
  var team_2_champions = new Array();
  
  team_1_champions["Dyrus"] = "Olaf";
  team_1_champions["TheOddOne"] = "Maokai";
  team_1_champions["Chaox"] = "Corki";
  team_1_champions["Xpecial"] = "Sona";
  team_1_champions["Regi"] = "Karthus";
  
  team_2_champions["Froggen"] = "Anivia";
  team_2_champions["Krepo"] = "Lulu";
  team_2_champions["YellowPete"] = "Ezreal";
  team_2_champions["Snoopeh"] = "Maokai";
  team_2_champions["Wicked"] = "Irelia";




  // Card Push Handlers
  $("#new-card").click(function() {
    generateCard($("#card-title").val(), $("#card-content").val());
    $("#card-title").val("");
    $("#card-content").val("");
  });




  
  // Team 1 Champ Selection Handlers
  $("#team-1-dyrus-submit").click(function() {
    team_1_champions["Dyrus"] = $("#team-1-dyrus option:selected").text();
    prepCard("Champion Selection", "<strong class='blue'>Dyrus</strong> has chosen " + team_1_champions["Dyrus"]);
    $("#team-1-dyrus").attr("disabled", "true");
    $("#team-1-dyrus-submit").attr("disabled", "true");
  });
  
  $("#team-1-theoddone-submit").click(function() {
    team_1_champions["TheOddOne"] = $("#team-1-theoddone option:selected").text();
    prepCard("Champion Selection", "<strong class='blue'>TheOddOne</strong> has chosen " + team_1_champions["TheOddOne"]);
    $("#team-1-theoddone").attr("disabled", "true");
    $("#team-1-theoddone-submit").attr("disabled", "true");
  });
  
  $("#team-1-chaox-submit").click(function() {
    team_1_champions["Chaox"] = $("#team-1-chaox option:selected").text();
    prepCard("Champion Selection", "<strong class='blue'>Chaox</strong> has chosen " + team_1_champions["Chaox"]);
    $("#team-1-chaox").attr("disabled", "true");
    $("#team-1-chaox-submit").attr("disabled", "true");
  });
  
  $("#team-1-xpecial-submit").click(function() {
    team_1_champions["Xpecial"] = $("#team-1-xpecial option:selected").text();
    prepCard("Champion Selection", "<strong class='blue'>Xpecial</strong> has chosen " + team_1_champions["Xpecial"]);
    $("#team-1-xpecial").attr("disabled", "true");
    $("#team-1-xpecial-submit").attr("disabled", "true");
  });
  
  $("#team-1-regi-submit").click(function() {
    team_1_champions["regi"] = $("#team-1-regi option:selected").text();
    prepCard("Champion Selection", "<strong class='blue'>Regi</strong> has chosen " + team_1_champions["regi"]);
    $("#team-1-regi").attr("disabled", "true");
    $("#team-1-regi-submit").attr("disabled", "true");
  });
  
  
  
  
  // Team 2 Champ Selection Handlers
  $("#team-2-froggen-submit").click(function() {
    team_2_champions["Froggen"] = $("#team-2-froggen option:selected").text();
    prepCard("Champion Selection", "<strong class='purple'>Froggen</strong> has chosen " + team_2_champions["Froggen"]);
    $("#team-2-froggen").attr("disabled", "true");
    $("#team-2-froggen-submit").attr("disabled", "true");
  });
  
    $("#team-2-wickd-submit").click(function() {
    team_2_champions["Wickd"] = $("#team-2-wickd option:selected").text();
    prepCard("Champion Selection", "<strong class='purple'>Wickd</strong> has chosen " + team_2_champions["Wickd"]);
    $("#team-2-wickd").attr("disabled", "true");
    $("#team-2-wickd-submit").attr("disabled", "true");
  });
  
    $("#team-2-krepo-submit").click(function() {
    team_2_champions["Krepo"] = $("#team-2-krepo option:selected").text();
    prepCard("Champion Selection", "<strong class='purple'>Krepo</strong> has chosen " + team_2_champions["Krepo"]);
    $("#team-2-krepo").attr("disabled", "true");
    $("#team-2-krepo-submit").attr("disabled", "true");
  });
  
    $("#team-2-yellowpete-submit").click(function() {
    team_2_champions["YellowPete"] = $("#team-2-yellowpete option:selected").text();
    prepCard("Champion Selection", "<strong class='purple'>YellowPete</strong> has chosen " + team_2_champions["YellowPete"]);
    $("#team-2-yellowpete").attr("disabled", "true");
    $("#team-2-yellowpete-submit").attr("disabled", "true");
  });
  
    $("#team-2-snoopeh-submit").click(function() {
    team_2_champions["Snoopeh"] = $("#team-2-snoopeh option:selected").text();
    prepCard("Champion Selection", "<strong class='purple'>Snoopeh</strong> has chosen " + team_2_champions["Snoopeh"]);
    $("#team-2-snoopeh").attr("disabled", "true");
    $("#team-2-snoopeh-submit").attr("disabled", "true");
  });
  
    
  
  
  
  // Handlers for Bans
  $("#team-1-ban-1-submit").click(function() {
    prepCard("Champion Banned", $("#team-1-ban-1 option:selected").text() + " has been banned by <strong class='blue'>" + $("#team-1 option:selected").text() + "</strong>");
    $("#team-1-ban-1").attr("disabled", "true");
    $("#team-1-ban-1-submit").attr("disabled", "true");
  });
  
  $("#team-1-ban-2-submit").click(function() {
    prepCard("Champion Banned", $("#team-1-ban-2 option:selected").text() + " has been banned by <strong class='blue'>" + $("#team-1 option:selected").text() + "</strong>");
    $("#team-1-ban-2").attr("disabled", "true");
    $("#team-1-ban-2-submit").attr("disabled", "true");
  });
  
  $("#team-1-ban-3-submit").click(function() {
    prepCard("Champion Banned", $("#team-1-ban-3 option:selected").text() + " has been banned by <strong class='blue'>" + $("#team-1 option:selected").text() + "</strong>");
    $("#team-1-ban-3").attr("disabled", "true");
    $("#team-1-ban-3-submit").attr("disabled", "true");
  });
  
  $("#team-2-ban-1-submit").click(function() {
    prepCard("Champion Banned", $("#team-2-ban-1 option:selected").text() + " has been banned by <strong class='purple'>" + $("#team-2 option:selected").text() + "</strong>");
    $("#team-2-ban-1").attr("disabled", "true");
    $("#team-2-ban-1-submit").attr("disabled", "true");
  });
  
  $("#team-2-ban-2-submit").click(function() {
    prepCard("Champion Banned", $("#team-2-ban-2 option:selected").text() + " has been banned by <strong class='purple'>" + $("#team-2 option:selected").text() + "</strong>");
    $("#team-2-ban-2").attr("disabled", "true");
    $("#team-2-ban-2-submit").attr("disabled", "true");
  });
  
  $("#team-2-ban-3-submit").click(function() {
    prepCard("Champion Banned", $("#team-2-ban-3 option:selected").text() + " has been banned by <strong class='purple'>" + $("#team-2 option:selected").text() + "</strong>");
    $("#team-2-ban-3").attr("disabled", "true");
    $("#team-2-ban-3-submit").attr("disabled", "true");
  });
  
  
  
  
  
  
  
  // Handlers for Kill
  $("#team-1-kill").click(function() {
    updateKills(1, 
      "<strong class='blue'>" + $("#team-1-player-1-list option:selected").text() + " (" + team_1_champions[$("#team-1-player-1-list option:selected").text()] + ")</strong>", 
      "<strong class='purple'>" + $("#team-1-player-2-list option:selected").text()  + " (" + team_2_champions[$("#team-1-player-2-list option:selected").text()] + ")</strong>");
  });
  
  $("#team-2-kill").click(function() {
    updateKills(2, 
      "<strong class='purple'>" + $("#team-2-player-1-list option:selected").text() + " (" + team_2_champions[$("#team-2-player-1-list option:selected").text()] + ")</strong>", 
      "<strong class='blue'>" + $("#team-2-player-2-list option:selected").text() + " (" + team_1_champions[$("#team-2-player-2-list option:selected").text()] + ")</strong>");
  });
  
  
  
  
  
  // Handlers for Game Over
  $("#game-over").click(function() {
    prepCard("Game Over!", $("#game-over-list option:selected").text() + " has won the game!");  
  });
  
  
  
  
  
  // Handlers for Baron and Dragon
  $("#baron").click(function() {
    prepCard("Baron Slain!", $("#baron-list option:selected").text() + " has slain Baron Nashor!");
  });
  
  $("#dragon").click(function() {
    prepCard("Dragon Slain!", $("#dragon-list option:selected").text() + " has slain the dragon!");
  });
  
  
  
  
  
  // Handlers for Inhibs
  $("#team-1-inhib-increase").click(function() {
    updateInhib(1, 1);
  });
  
  $("#team-2-inhib-increase").click(function() {
    updateInhib(2, 1);
  });
  
  $("#team-1-inhib-decrease").click(function() {
    updateInhib(1, -1);
  });
  
  $("#team-2-inhib-decrease").click(function() {
    updateInhib(2, -1);
  });


  
  
  
  // Handlers for Towers
  $("#team-1-tower-increase").click(function() {
    updateTower(1, 1);
  });
  
  $("#team-2-tower-increase").click(function() {
    updateTower(2, 1);
  })





  // Handlers for Gold Changes 
  $(".gold-button-1").click(function() {
    var team = 1;
    var amount;
    
    if ($(this).val() == "+0.1k") {
      amount = 0.1;  
    }
    else if ($(this).val() == "+1.0k") {
      amount = 1.0;
    }
    
    updateGold(team, amount);
  });
  
  $(".gold-button-2").click(function() {
    var team = 2;
    var amount;
    
    if ($(this).val() == "+0.1k") {
      amount = 0.1;  
    }
    else if ($(this).val() == "+1.0k") {
      amount = 1.0;
    }
    
    updateGold(team, amount);
  });





  // Pregame Sliding Handlers
  $("#pregame-visibility").click(function() {
  
    if (pregameVisible) {
      $("#admin-pregame-content").slideUp();
      pregameVisible = false;
      $("#pregame-visibility img").attr("src", "style/arrow-down.png");
    }
    else {
      $("#admin-pregame-content").slideDown();
      pregameVisible = true;
      $("#pregame-visibility img").attr("src", "style/arrow-up.png");
    }
    
    return false;
  });
  
  
  // Game Sliding Handlers
  $("#game-visibility").click(function() {
  
    if (pregameVisible) {
      $("#admin-game-content").slideUp();
      pregameVisible = false;
      $("#game-visibility img").attr("src", "style/arrow-down.png");
    }
    else {
      $("#admin-game-content").slideDown();
      pregameVisible = true;
      $("#game-visibility img").attr("src", "style/arrow-up.png");
    }
    
    return false;
  });
});