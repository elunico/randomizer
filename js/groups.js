var num = Number(prompt("How many people per group? ")) || 3;


function setup() {
  noCanvas();
  // no callback 

  var params = getURLParams();
  // var seed = Number(params.seed.substring(0,1))
  var seed = int(Math.random(params.id) * 100)

  function loaded() {
    if (!names) {
      names = ['oops', 'i', 'didn\'t', 'load', 'any', 'names'];
    }

    for (var i = 0; i < names.length; i++) {
      //var n = createDiv(names[i]);
      //n.parent('names');
    }
    howmany = 0;
    randomSeed(seed);
    console.log(seed);
    shuffler();
    setTimeout(shuffler, timing);
  }

  //names = ['dan','aliki','elias','olympia','one','two'];


  //var shuffleButton = select('#shuffle');

  var timing = 5;
  var howmany = 0;


  //shuffleButton.mousePressed(function() {

  //});

  function shuffler() {
    var total = floor(names.length / num);

    namescopy = names.slice();//copy(names);

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
      // Hack for one leftover with special case of groups of 7
      if (namescopy.length === 1) {
        groups[0].push(namescopy[0]);
      } else {
        groups.push(namescopy);
      }
    }

    // check for a group that is smaller than the others and distribute 
    // to remaining groups 
    // prefer oversized to undersized groups

    let preferOversized = true;

    if (preferOversized) {
      let smallest = groups[groups.length - 1]; // groups.reduce((pv, cv, ci, a) => cv.length < pv.length ? cv : pv);
      let needsChange = groups.filter((v) => v.length > smallest.length).length > 0;
      let i = 0;
      if (needsChange) {
        for (let member of smallest) {
          groups[i++ % groups.length].push(member);
        }
        groups.splice(groups.length - 1, 1);
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

  //var num = select('#num').value();
  //console.log(groups.length);

  for (var i = 0; i < groups.length; i++) {

    var tr = createElement('tr');
    tr.id('row' + i);
    tr.class('tablecell');
    var where = 'groupbody';
    tr.parent(where);

    var td = createElement('td');
    td.html(i);
    td.class('tablecell');
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
