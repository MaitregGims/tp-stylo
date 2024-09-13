let main = document.querySelector('main')
let form = document.querySelector('form')
let picker = document.querySelector('.pen-picker')
let color;
let actionForm = document.querySelector('#pen-action')
let refill = document.querySelector('#refill')
let capBtn = document.querySelector('#cap')
let ancrelvl = document.querySelector('#ancre-lvl')
let output = document.querySelector('.text-output');
let clear = document.querySelector('#clear');


function Pencil(hexValue) {
    this.textColor = hexValue
    this.cap = true
    this.ancre = 100
    this.text = "";

    this.ouvrir = function () { this.cap = false; }
    this.fermer = function () { this.cap = true; }

    this.reload = function () { 
        refill.classList.add('hidden')
        this.ancre = 100; 
        ancrelvl.style.width = this.ancre + "%"
    }

    this.write = () => {
        if (this.cap == true) {
            document.write('veuillez enlever le bouchon.')
            document.write('cap')
            return 0
        }

        if (this.ancre == 0) {
            alert("vous avez plus d'encre")
            return 0
        }
        let p = document.createElement('p');
        output.appendChild(p);
        p.style.color = this.textColor
        p.classList.add('out');

        for (let i = 0; i < this.text.length; i++) {
            if (this.ancre == 0) {
                alert("vous avez plus d'encre")
                return 0
            }
            p.textContent += this.text[i];
            this.ancre--;
            ancrelvl.style.width = this.ancre + "%"
            refill.classList.remove('hidden')

            if (this.text[i] == " ") {
                this.ancre++;
                ancrelvl.style.width = this.ancre + "%"
            }
        }
    }

    let div = document.createElement('div')
    picker.appendChild(div)
    div.style.backgroundColor = hexValue
    div.classList.add('colors')
    color = document.querySelector('.colors')
}

let bic = new Pencil("blue");

refill.addEventListener('click', () => {
    bic.reload()
    console.log(bic.encre)
    alert('encre recharger')
})

form.addEventListener('submit', (y) => {
    y.preventDefault();
    let colors = document.querySelector('.color').value
    color.style.backgroundColor = colors
    bic.textColor = colors
    ancrelvl.style.backgroundColor = colors
})

actionForm.addEventListener('submit', (y) => {
    y.preventDefault();
    if (bic.cap == true) {
        alert("impossible d'ecrire le bouchon est fermé")
    } else {
        bic.text = document.querySelector(".writting").value
        bic.write()
    }
})


capBtn.addEventListener('click', () => {
    if (bic.cap == true) {
        bic.ouvrir()
        capBtn.textContent = "fermer le bouchon" 
        alert("stylo ouvert")
    } else {
        bic.fermer();
        alert("stylo ouvert")
        capBtn.textContent = "ouvrir le bouchon" 
    }
})

clear.addEventListener('click', () => {
    let words = document.querySelectorAll('.out')
    for (let i = 0; i < words.length; i++) {
        words[i].remove()
    }
})