// Buttons
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const calcBtn = document.getElementById("calcBtn");

// Input Value
const inputValue = document.getElementById("inputValue");
// Input Heading
const inputHeading = document.getElementById("inputHeading");

// Pages
const homePage = document.getElementById("page1");
const inputPage = document.getElementById("page2");
const resultPage = document.getElementById("page3");

let selectedShape;

// Object : Shape
const shapes = {
    circle: {
        name : "Circle",
        type : "circle",
        color : "#2f854f",
        colorProperty : "backgroundColor",
        inputLabel : "Radius",
        inputFormula : "r",
        areaFormula : "&pi; r<sup>2</sup>",
        perimeterFormula : "2 * &pi; * r",
        area : (r) => Math.PI * r * r,
        perimeter : (r) => 2 * Math.PI * r
    }, 

    triangle: {
        name : "Equilateral Triangle",
        type : "triangle",
        color : "#c54192",
        colorProperty : "borderBottomColor",
        inputLabel : "Side",
        inputFormula : "s",
        areaFormula : "0.433*s*s",
        perimeterFormula : "3*s",
        area : (s) => 0.433 * s * s,
        perimeter : (s) => 3 * s
    },

    square: {
        name : "Square",
        type : "square",
        color : "#186757",
        colorProperty : "backgroundColor",
        inputLabel : "Side",
        inputFormula : "s",
        areaFormula : "s*s",
        perimeterFormula : "4*s",
        area : (s) => s * s,
        perimeter : (s) => 4 * s
    }
}

const shapesContainer = document.getElementById("shapesContainer");
Object.entries(shapes).forEach(([key, shape]) => {
    const element = document.createElement("div");
    element.className = shape.type;
    element.id = shape.type;
    element.style[shape.colorProperty] = shape.color;
    shapesContainer.appendChild(element);
});

shapesContainer.addEventListener("click", (event) => {
    const element = event.target;
    if(!shapes[element.id]) return;
    // Remove previous selection
    shapesContainer.querySelector(".selected")?.classList.remove("selected");
    // Highlight current selection
    element.classList.add("selected");
    // Saving the selected Shape
    selectedShape = element.id;
})

nextBtn.addEventListener("click", () => {
    if(!selectedShape) {
        alert("Select one of the shapes");
        return;
    }
    
    const shape = shapes[selectedShape];
    homePage.style.display = "none";
    inputPage.style.display = "block";
    
    inputHeading.textContent = `2. Enter ${shape.inputLabel}`;
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
    renderResult(shape,input);
})

function renderResult(shape, input) {
    resultPage.innerHTML = `
        <div class="${shape.type}"></div>
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
}

function resetValues() {
    selectedShape = null;
    inputValue.value = 5;
    shapesContainer.querySelector(".selected")?.classList.remove("selected");
}