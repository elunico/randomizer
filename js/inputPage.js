let input;
let submit;
let result;

function setup() {
  noCanvas();

  input = select('#names');
  submit = select('#submit');
  result = select('#result');

  checkInput();

  submit.mousePressed(() => {
    let data = input.value();
    names = data.split('\n');

    // If blank
    for (let i = names.length - 1; i >= 0; i--) {
      names[i] = names[i].trim();
      if (names[i].length === 0) {
        names.splice(i, 1);
      }
    }
    createURL(names);
  });

  input.input(() => {
    checkInput(input, submit);
  });
}

function checkInput() {
  // Check if the input is invalid and disable the button
  if (input.value().trim().length <= 0) {
    submit.attribute('disabled', true);
    result.html('');
  } else {
    submit.removeAttribute('disabled');
  }
}

