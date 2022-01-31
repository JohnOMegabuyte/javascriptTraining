class Entity {
    species;
    weight;
    height;s
    diet;
    where;
    when;
    facts;
    imageFile;
    name;

    constructor(json) {
        let i = 0;
        this.species = json.species;
        this.weight = json.weight;
        this.height = json.height;
        this.diet = json.diet;
        this.where = json.where;
        this.when = json.when;

        this.facts = [];
        this.facts.push(json.fact);
        this.imageFile = "./images/" + this.species + ".png";
        this.name = json.name;

    }

    compareWeight(other) {
        let returnString;
        let ratio = other.weight / this.weight;
        returnString = `${other.species} Weighs ${ratio} times ${this.name}´s weight`;
        return returnString;
    }
    compareHeight(other) {
        let returnString;
        let ratio = other.height / this.weight;
        returnString = `${other.species} Was ${ratio} times as tall as ${this.name}`;
        return returnString;
    }
    compareDiets(other) {
        let returnString;
        if (other.diet.localeCompare(this.diet) == 0) {
            returnString = `both ${other.species} & ${this.name} are ${other.diet} `;

        }
        else {
            returnString = `${other.species} was ${other.diet} while ${this.name} is ${this.diet} `;

        }

        return returnString;
    }
    getWhen() {
        return `${this.species} lived in the region of ${this.where}`;
    }
    getWhere() {
        return `${this.species} lived Around ${this.when}`;
    }

}
class Dinosoar extends Entity {
    constructor(json) {
        super(json);
    }

}
class Human extends Entity {
    constructor(json) {
        super(json);
    }

}
function construnctHumanFn() {
    return new Human({
        species: `human`,
        weight: this.document.getElementById(`weight`).value,
        diet: this.document.getElementById(`diet`).value,
        name: this.document.getElementById(`name`).value,
        height: (this.document.getElementById(`feet`).value * 12) + (this.document.getElementById(`inches`).value),
    });

};
const jsonData = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": 372,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
}

entities = [];
submitted = false;

function submit() {
    document.getElementById(`form-body`).style.display = submitted ? "block" : "none";
    document.getElementById(`grid`).style.display = submitted ? "none" : "flex";
    entities = [];
    jsonData.Dinos.forEach(element => {
        entities.push(new Dinosoar(element));
    });

    submitted = !submitted;
    if (submitted) {
        const human = construnctHumanFn();
        entities.forEach(dino => {
            dino.facts.push(human.compareHeight(dino));
            dino.facts.push(human.compareWeight(dino));
            dino.facts.push(human.compareDiets(dino));
            dino.facts.push(dino.getWhen());
            dino.facts.push(dino.getWhere());
        });
        pushGridItems(human);
    }
}
function pushGridItems(human) {
    const grid = document.getElementById(`grid`);
    let inner = ``;
    entities.forEach((creature, index) => {
        if (index == 4) {
            //push human
            inner += constructInnerHtml(human);
        }
        inner += constructInnerHtml(creature);
    });
    grid.innerHTML = inner;

}
function constructInnerHtml(toConstruct) {
    let rand = toConstruct.species =="Pigeon"?0: Math.floor(Math.random() * 6);
    let propName = `species`;
    if (toConstruct instanceof Human)
        propName = `name`;
    let imageFile = toConstruct[`imageFile`].toLowerCase();
    let ret = `<div class="grid-item">`;
    ret += `<label>${toConstruct[propName]}</label>`;
    ret += `<img src="${imageFile}"></img>`;
    if (!(toConstruct instanceof Human)) {
        let fact = toConstruct.facts[rand];
        ret += `<label>${fact}</label>`;

    }
    ret += `</div>`;
    return ret;
}
document.getElementById(`btn`).onclick = submit;

