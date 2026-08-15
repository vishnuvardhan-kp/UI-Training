// Buttons
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const calcBtn = document.getElementById("calcBtn");

// Heading 
const side = document.getElementById("side");
const radius = document.getElementById("radius");

//Input Value
const inputValue = document.getElementById("inputValue");

// Pages
const homePage = document.getElementById("page1");
const inputPage = document.getElementById("page2");
const resultPage = document.getElementById("page3")

//Shapes
const circle = document.getElementById("circle");
const triangle = document.getElementById("triangle");
const square = document.getElementById("square");
let selectedShape;

// Object : Shape for 
const shapes = { 
    circle: {
        name : "Circle",
        inputLabel : "Radius",
        inputFormula : "r",
        areaFormula : "&pi; r<sup>2</sup>",
        perimeterFormula : "2 * &pi; * r",
        area : (r) => Math.PI * r * r,
        perimeter : (r) => 2 * Math.PI * r
    }, 

    triangle: {
        name : "Equilateral Triangle",
        inputLabel : "Side",
        inputFormula : "s",
        areaFormula : "0.433*s*s",
        perimeterFormula : "3*s",
        area : (s) => 0.433 * s * s,
        perimeter : (s) => 3 * s
    },

    square: {
        name : "Square",
        inputLabel : "Side",
        inputFormula : "s",
        areaFormula : "s*s",
        perimeterFormula : "4*s",
        area : (s) => s * s,
        perimeter : (s) => 4 * s
    }
}


circle.addEventListener("click", () => {
    selectedShape = "circle";
    circle.style.backgroundColor = "#2f854fda";
    triangle.style.borderBottomColor = "#c54192";
    square.style.backgroundColor = "#186757";
})

triangle.addEventListener("click", () => {
    selectedShape = "triangle";
    triangle.style.borderBottomColor = "#c54192da";
    circle.style.backgroundColor = "#2f854f";
    square.style.backgroundColor = "#186757";
})

square.addEventListener("click", () => {
    selectedShape = "square";
    square.style.backgroundColor = "#186757c7";
    circle.style.backgroundColor = "#2f854f";
    triangle.style.borderBottomColor = "#c54192";
})


nextBtn.addEventListener("click", () => {
    if(!selectedShape) {
        alert("Select one of the shapes");
        return;
    }

    homePage.style.display = "none";
    inputPage.style.display = "block";

    if(selectedShape == "circle") {
        radius.style.display = "block";
        side.style.display = "none";
    } else {
        side.style.display = "block";
        radius.style.display = "none";
    }
})

backBtn.addEventListener("click", () => {
    homePage.style.display = "block";
    inputPage.style.display = "none";
    resetValues();
})

calcBtn.addEventListener("click", () => {
    const input = Number(inputValue.value);

    if(input <= 0) {
        alert("Input must be greater than 0");
        return;
    }

    inputPage.style.display = "none";
    resultPage.style.display = "block";
    const shape = shapes[selectedShape];
    
    resultPage.innerHTML = `
        <div class="${selectedShape}"></div>
        <div class="heading">${shape.name}</div>
        
        <table class="result-table">
            <tr>
                <td>${shape.inputLabel}</td>
                <td>${shape.inputFormula}</td>
                <td>${input.toFixed(2)} cm</td>
            </tr>
            <tr>
                <td>Area</td>
                <td>${shape.areaFormula}</td>
                <td>${shape.area(input).toFixed(2)} sq cm</td>
            </tr>
            <tr>
                <td>Perimeter</td>
                <td>${shape.perimeterFormula}</td>
                <td>${shape.perimeter(input).toFixed(2)} cm</td>
            </tr>
        </table>
        <button class="input-btn" id="startAgain">Start Again</button>
    `

    const startAgainBtn = document.getElementById("startAgain");
    startAgainBtn.addEventListener("click", () => {
            homePage.style.display = "block";
            inputPage.style.display = "none";
            resultPage.style.display = "none";
            resetValues();
    });
})

function resetValues() {
    selectedShape = null;
    inputValue.value = 5;
    circle.style.backgroundColor = "#2f854f";
    triangle.style.borderBottomColor = "#c54192";
    square.style.backgroundColor = "#186757";
}