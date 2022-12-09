"use strict";

// TODO: DEBUG THE APP TO UPDATE the background
// TODO: if the word the user selects is in the wordGrid[i],
// TODO: then update the background: 'rgb(101, 191, 101)'
// TODO: strike through the selected word in wordGrid[i]
// TODO: if the user finds all the words, then alert 'Congratulations! You found all the words!'

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 4

   Wordsearch Game Script
   
   Filename: kg_search.js
   Author: Hesbon Osoro
   Date: 12/10/22  
   
   
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

/*============================================================*/

window.onload = function () {
  var wordSearchTable = document.getElementById("wordTable");
  wordSearchTable.innerHTML = drawWordSearch(letterGrid, wordGrid);

  var wordSearchList = document.getElementById("wordList");
  wordSearchList.innerHTML = showList(wordArray);

  var pickedLetter = document.getElementById("pickedLetter");
  var wordSearchTable = document.getElementById("wordSearchTable");
  var wordSearchList = document.getElementById("wordSearchList");

  var wordCells = wordSearchTable.querySelectorAll("td");

  // create cell from wordCells then put cursor: pointer
  for (var i = 0; i < wordCells.length; i++) {
    wordCells[i].style.cursor = "pointer";
    wordCells[i].onmousedown = function (e) {
      pickedLetter.textContent = e.target.textContent;
    };
  }
  var showSolution = document.getElementById("showSolution");
  /* 
  make the characters of the wordGrid on the letterGrid 
  with a background: rgb(101, 191, 101); 
  */
  showSolution.onclick = function () {
    for (var i = 0; i < wordCells.length; i++) {
      if (wordCells[i].className == "wordCell") {
        wordCells[i].style.backgroundColor = "rgb(101, 191, 101)";
      }
    }
    var wordList = wordSearchList.querySelectorAll("li");
    for (var i = 0; i < wordList.length; i++) {
      wordList[i].style.textDecoration = "line-through";
    }
  };
  var clearSolution = document.getElementById("clearSolution");
  clearSolution.onclick = function () {
    for (var i = 0; i < wordCells.length; i++) {
      wordCells[i].style.backgroundColor = "";
    }
    var wordList = wordSearchList.querySelectorAll("li");

    for (var i = 0; i < wordList.length; i++) {
      wordList[i].style.textDecoration = "";
    }
  };

  var wordListItems = wordSearchList.querySelectorAll("li");

  var wordFound = 0;

  wordSearchTable.addEventListener("mousedown", function (e) {
    var targetCell = e.target;
    targetCell.style.backgroundColor = "pink";
    pickedLetter.value += targetCell.textContent;

    wordSearchTable.addEventListener("mouseover", function (e) {
      var targetCell = e.target;
      if (targetCell.className == "wordCell") {
        targetCell.style.backgroundColor = "pink";
        pickedLetter.value += targetCell.textContent;
      }
    });

    wordSearchTable.addEventListener("mouseup", function (e) {
      var targetCell = e.target;
      for (var i = 0; i < wordListItems.length; i++) {
        if (pickedLetter.value == wordListItems[i].textContent) {
          wordListItems[i].style.textDecoration = "line-through";
          wordListItems[i].style.color = "lightgray";
          for (var j = 0; j < wordCells.length; j++) {
            if (wordCells[j].textContent == pickedLetter.value) {
              wordCells[j].style.backgroundColor = "lightgreen";
            }
          }
          wordFound++;
        }
      }
      if (wordFound == wordListItems.length) {
        alert("Congratulations! You found all the words!");
      }
      pickedLetter.value = "";
      for (var i = 0; i < wordCells.length; i++) {
        wordCells[i].style.backgroundColor = "";
      }
    });
  });

  /* 
  check if the word the user clicks is on the wordGrid[i], 
  then update the background: 'rgb(101, 191, 101)'
  */
};

function drawWordSearch(letters, words) {
  var rowSize = letters.length;
  var colSize = letters[0].length;

  var htmlCode = "<table id='wordSearchTable'>";
  htmlCode += "<caption>Word Search</caption>";

  for (var i = 0; i < rowSize; i++) {
    htmlCode += "<tr>";

    for (var j = 0; j < colSize; j++) {
      if (words[i][j] == " ") {
        htmlCode += "<td>";
      } else {
        htmlCode += "<td class='wordCell'>";
      }
      htmlCode += letters[i][j];
      htmlCode += "</td>";
    }

    htmlCode += "</tr>";
  }
  htmlCode += "</table>";

  return htmlCode;
}

function showList(list) {
  var htmlCode = "<ul id='wordSearchList'>";

  for (var i = 0; i < list.length; i++) {
    htmlCode += "<li>" + list[i] + "</li>";
  }

  htmlCode += "</ul>";

  return htmlCode;
}
