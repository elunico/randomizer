var num = Number(prompt("How many people per group? ")) || 3;


function titleCaseName(name) {
  name = name.trim().toLowerCase();
  let parts = name.split(/\s+/);
  for (let i = 0; i < parts.length; i++) {
    parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
  }
  return parts.join(' ');
}

function setup() {
  noCanvas();

  let countP = select('.count');
  countP.html(`Total students: ${count}`);

  var params = getURLParams();
  var seed = int(Math.random(params.id) * 100);
  var preferOversize = true; 

  for (let i = 0; i < names.length; i++) {
    names[i] = titleCaseName(names[i]);
  }

  function loaded() {
    if (!names) {
      names = ['oops', 'i', 'didn\'t', 'load', 'any', 'names'];
    }

    howmany = 0;
    randomSeed(seed);
    console.log(seed);
    shuffler();
    setTimeout(shuffler, timing);
  }

  var shuffleButton = select('#shuffle');
  var resizeButton = select('#resize');
  var preferOversizedBox = select('#preferover');

  var timing = 5;
  var howmany = 0;


  shuffleButton.mousePressed(function () {
    seed = int(Math.random(params.id) * 100);
    loaded();
  });

  resizeButton.mousePressed(function () {
    num = Number(prompt("How many people per group? ")) || 3;
    seed = int(Math.random(params.id) * 100);
    loaded();
  });

  var status = select('#preference');

  console.log(preferOversizedBox.class);
  preferOversizedBox.mousePressed(function() {
    preferOversize = !preferOversize;
    status.elt.className = '';
    status.class(preferOversize ? 'yes' : 'no');
    status.html(preferOversize ? 'yes' : 'no');
    loaded();
  })


  function shuffler() {
    var total = floor(names.length / num);

    namescopy = names.slice();

    var groups = [];
    for (var i = 0; i < total; i++) {
      var group = [];
      for (var j = 0; j < num; j++) {
        var index = floor(random(namescopy.length));
        group.push(namescopy[index]);
        namescopy.splice(index, 1);
      }
      groups.push(group);
    }

    if (namescopy.length > 0) {
      let resize = namescopy.length / 2 <= groups[0].length;
      // if the last group is less than half the size of a full group 
      // we want to distribute them
      // prefer larger groups than smaller groups
      if (resize && preferOversize) {
        let groupIdx = 0; 
        for (let i = 0; i < namescopy.length; i++) {
          groups[groupIdx++ % groups.length].push(namescopy[i]);
        }
      } else {
        groups.push(namescopy);
      }
    }

    buildTable(groups);

    howmany++;
    if (howmany < 100) {
      setTimeout(shuffler, timing);
    }
    var countdown = floor((100 - howmany) / 10);
    select('#timer').html(countdown + 1);

  }
  loaded();

}


function buildTable(groups) {

  var allcells = selectAll('.tablecell');
  for (var i = 0; i < allcells.length; i++) {
    allcells[i].remove();
  }



  var count = 0;

  for (var i = 0; i < groups.length; i++) {

    var tr = createElement('tr');
    tr.id('row' + i);
    tr.class('tablecell');
    var where = 'groupbody';
    tr.parent(where);

    var td = createElement('td');
    td.html(`Team ${Number(i) + 1}`);
    td.class('tablecell-name');
    td.parent('row' + i);

    for (var j = 0; j < groups[i].length; j++) {
      var td = createElement('td');
      td.html(groups[i][j]);
      td.class('tablecell');
      //td.style('width', '300px')
      td.parent('row' + i);
    }

  }
}
