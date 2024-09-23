// Constants and Variables
const container = document.querySelector('.container');
const userInput = document.querySelector('#input-slider');
const gridValContainer = document.querySelector('.input-slider-val');
const colorSelector = document.querySelector('#color-selector');
const colorbtn = document.querySelector('.colorbtn');
//
const shadebtn = document.querySelector('.shadebtn');

const rainbowbtn = document.querySelector('.rainbowbtn');
const eraserbtn = document.querySelector('.eraserbtn');
const clearbtn = document.querySelector('.clearbtn');
const btnArr = [colorbtn, shadebtn, rainbowbtn, eraserbtn, clearbtn];

let currColor = '#000000';
const activeBtn = '#000000';

const rainbowColors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#9400D3',
];

let numOfColumns = userInput?.value ?? 16;
let currRainbowColorIndex = 0;
let isRainbowMode = false;

let currShadeColorIndex = 0;

let isShadingMode = false;

let opacity = 0.1;
let isDragging = false;
let isErasing = false;

function initialGameSetup() {
  setBtnColor(colorbtn, activeBtn);
  createGrid(numOfColumns);
}

function createRow(num, cellDimension) {
  const divRow = document.createElement('div');
  divRow.classList.add('gridRow');

  for (let j = 0; j < num; j++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('gridCell');
    gridCell.style.width = `${cellDimension}px`;
    gridCell.style.height = `${cellDimension}px`;
    divRow.appendChild(gridCell);
  }
  return divRow;
}

function createGrid(num) {
  const fragment = document.createDocumentFragment();
  const containerWidth = container.offsetWidth;
  const cellDimension = Math.floor(containerWidth / num);
  const gridRowTemplate = createRow(num, cellDimension);

  for (let index = 0; index < num; index++) {
    const rowClone = gridRowTemplate.cloneNode(true);
    fragment.appendChild(rowClone);
  }

  container.appendChild(fragment);
}

function resetValues() {
  opacity = 0.1;
  container.classList.remove('no-cursor');
}

function resetDrawingSettings() {
  numOfColumns = 16;
  isErasing = false;
  isRainbowMode = false;
  isShadingMode = false;
  currColor = colorSelector.value;
  userInput.value = numOfColumns;
}
function colorCell(event) {
  const element = event.target;

  if (isRainbowMode) {
    currRainbowColorIndex = (currRainbowColorIndex + 1) % rainbowColors.length;
    element.style.backgroundColor = isErasing
      ? '#fefefe'
      : `${rainbowColors[currRainbowColorIndex]}`;

    // opacity = opacity <= 1 ? opacity + 0.1 : 0.1;
    // element.style.opacity = `${opacity}`;
  } else if (isShadingMode) {
    opacity = opacity <= 0.3 ? opacity + 0.1 : 0.1;
    element.style.opacity = `${opacity}`;

    element.style.backgroundColor = isErasing ? '#fefefe' : `${currColor}`;
  } else {
    element.style.backgroundColor = isErasing ? '#fefefe' : `${currColor}`;
  }
}

function updateGridSize(numOfColumns) {
  container.replaceChildren();
  createGrid(numOfColumns);
  gridValContainer.textContent = `${numOfColumns} * ${numOfColumns}`;
}

function toggleColorMode() {
  isErasing = false;
  isRainbowMode = false;
  isShadingMode = false;
  setBtnColor(colorbtn, activeBtn);
}

function toggleShading() {
  isErasing = false;
  isRainbowMode = false;
  isShadingMode = true;
  setBtnColor(shadebtn, activeBtn);
}

function toggleRainbowMode(event) {
  isErasing = false;
  isRainbowMode = true;
  isShadingMode = false;
  setBtnColor(rainbowbtn, activeBtn);
}

function clearGrid() {
  resetValues();
  resetDrawingSettings();
  updateGridSize(numOfColumns);
  setBtnColor(colorbtn, activeBtn);
}

function setColor() {
  const color = colorSelector.value;
  currColor = color;
  colorBtn(color);
}

function getColor(event) {
  currColor = event.target.value;
  if (isShadingMode) {
    setBtnColor(shadebtn, activeBtn);
  } else {
    setBtnColor(colorbtn, activeBtn);
  }
}

function setBtnColor(btnElement, color = '#a99191') {
  btnArr.forEach((btn) => {
    btn.style.backgroundColor = btn === btnElement ? color : '#a99191';
    btn.style.color = btn === btnElement ? 'white' : 'unset';
  });
}

function toggleEraserMode() {
  isErasing = !isErasing;
  isRainbowMode = false;
  isShadingMode = false;

  setBtnColor(eraserbtn, activeBtn);
}

container.addEventListener('mousedown', (event) => {
  if (event.button === 0 && event.target.classList.contains('gridCell')) {
    container.classList.add('no-cursor');
    isDragging = true;
    colorCell(event);
    event.preventDefault();
  }
});

container.addEventListener('mouseover', (event) => {
  if (isDragging && event.target.classList.contains('gridCell')) {
    colorCell(event);
  }
});

container.addEventListener('mouseup', () => {
  isDragging = false;
  resetValues();
});

initialGameSetup();
