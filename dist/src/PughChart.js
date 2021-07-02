import { __decorate } from "tslib";
import { html, css, LitElement, property, query } from 'lit-element';
/**
 *
 *  @element pugh-chart
 *
 *
 * */
export class PughChart extends LitElement {
    constructor() {
        super(...arguments);
        /**
       * This is the href used to style the component. By default it is the bootstrap CDN but it can be manually inputted by the user.
       * @type {string}
       */
        this.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
        /**
        * This is the table class that is by default table table-striped (from Bootstrap). Can be manually inputted by the user.
        * @type {string}
        */
        this.tableClass = "table table-striped";
        /**
        * thead class that is left blank but can be inputted by the user.
        * @type {string}
        */
        this.theadClass = "";
        /**
        * tr class that is left blank but can be inputted by the user.
        * @type {string}
        */
        this.trClass = "";
        /**
        * td class that is left blank but can be inputted by the user.
        * @type {string}
        */
        this.tdClass = "";
        /**
        * th class that is left blank but can be inputted by the user.
        * @type {string}
        */
        this.thClass = "";
        /**
        * tbody class that is left blank but can be inputted by the user.
        * @type {string}
        */
        this.tBodyClass = "";
        /**
        * These are the categories for the chart that must be inputted as a string with commas separating categories.
        * @type {string}
        */
        this.inputCategories = "";
        /**
       * These are the weights for the chart that must be inputted as a string with commas separating weights.
       * @type {string}
       */
        this.inputWeights = "";
        /**
       * These are the options for the chart that must be inputted as a string with commas sepearting score from header but a / separating groupings of entire options.
       * @type {string}
       */
        this.inputOptions = "";
        //Categories, weights, and options array that the strings that are inputted are parsed into.
        this.categories = [];
        this.weights = [];
        this.options = [];
        //2D array that everything is created into.
        this.array = [];
        /**
        * Choose whether to have table editable as soon as it opens or not.
        * @type {Boolean}
        */
        this.editBool = false;
        /**
        * Choose whether to have the default table styling to be dark mode or not. Done as a string for testing purposes in Storybook. May be changed later.
        * @type {String}
        */
        this.darkMode = "false";
        //Checks if this is the firstTime the component is being called.
        this.firstTime = true;
    }
    render() {
        //If this is the first time the component is being rendered then take the inputted strings and add them to the corresponding arrays.
        if (this.firstTime) {
            this.categories = this.inputCategories.split(",");
            this.weights = this.inputWeights.split(",").map(element => parseInt(element));
            this.options = this.inputOptions.split("/").map(element => element.split(","));
            this.firstTime = false;
        }
        this.fillArray();
        //This call creates the table for me. The settings button at the bottom makes the table editable or not. The code is confusing to read and takes time to understand
        //but the general gist of it is that the table is created and then everything is created row by row basically. Map is used to iterate through this.array to create everything,
        //when the editBool is true, the option to edit also becomes available. There are a lot of ternary operators to make everything possible. The code couldn't be encapsulated better
        //because returning HTML back from a function does not work well in Lit (because of the potential security vulnerabilities).
        return html `
      <link rel="stylesheet" href="${this.href}">
    </div>
      <table class="${this.tableClass}">
        <thead class="${this.theadClass}">
          <tr class="${this.trClass}">
            ${this.array[0].map((item, index) => html `<th class="${this.thClass}" scope='col'>${(this.editBool && (1 < index && index < this.options.length + 2) ? html `<div class="parentDiv"><input class="wordInput" type="text" value="${this.array[0][index]}" @change=${(e) => { this.options[index - 2][0] = e.target.value; this.requestUpdate(); }}><button @click=${() => { this.deleteOption(index - 2); }} class="" type="button">❌</button></div>` : this.array[0][index])}</th>`)}
    
    ${this.editBool ? html `<th class="${this.thClass}"><div class="parentDiv categoryDiv"><input id="newoption" placeholder="Category" type="text" class="wordInput"><button @click=${this.addOption} class="addButton" type="button"><span>➕</span></button></div>
    </th>` : ''}
    
          </tr>
        </thead>
        <tbody class="${this.tBodyClass}">
              ${this.array.slice(1).map((item, i) => html `<tr class="${this.trClass}"><th scope='row'>${(this.editBool && i < this.categories.length ? html `<div class="parentDiv"><input class="wordInput" type="text" value="${item[0]}" @change=${(e) => { this.categories[i] = e.target.value; this.requestUpdate(); }}><button @click=${() => { this.deleteCriteria(i); }} class="" type="button">❌</button></div>` : (i == this.categories.length && this.editBool ? html `<div class="parentDiv"><input id="newcriteria" placeholder="Criteria" type="text" class="wordInput"><button @click=${this.addCriteria} class="addButton" type="button"><span>➕</span></button></div>` : item[0]))}</th>${item.slice(1).map((item1, index1) => (i < this.weights.length && this.editBool ? html `<td><input class="numInput" type="number" value="${item1}" @change=${(e) => { index1 == 0 ? this.weights[i] = parseInt(e.target.value) : this.options[index1 - 1][i + 1] = parseInt(e.target.value); this.requestUpdate(); }}></td>` : html `<td>${item1}</td>`))}${(this.editBool ? html `<td></td>` : '')}</tr>`)}
        </tbody>
      </table>
      <button @click=${() => { this.editBool = !this.editBool; }} class="settingsButton" type="button">⚙️</button>

    `;
    }
    //Adds a criteria to the table and also adds a score of 0 to all the options for that criteria.
    addCriteria() {
        this.categories.push(this.criteriaInput.value);
        this.weights.push(0);
        for (var i = 0; i < this.options.length; i++) {
            this.options[i].push(0);
        }
        this.requestUpdate();
        this.criteriaInput.value = '';
    }
    //Deletes a criteria form the table and also gets rid of it from all the options.
    deleteCriteria(index) {
        this.categories.splice(index, 1);
        this.weights.splice(index, 1);
        this.options.forEach((element, i) => { this.options[i].splice(index + 1, 1); });
        this.requestUpdate();
    }
    //Adds a particular option to the table and must be done for all options.
    addOption() {
        var entireOption = [];
        entireOption.push(this.optionInput.value);
        for (var i = 0; i < this.weights.length; i++) {
            entireOption.push(0);
        }
        this.options.push(entireOption);
        this.requestUpdate();
        this.optionInput.value = '';
    }
    //Deletes a particular options.
    deleteOption(index) {
        this.options.splice(index, 1);
        this.requestUpdate();
    }
    //Creates the 2D array with all the information that the table will later be created with. Uses the categories, weights, and options arrays.
    fillArray() {
        if (this.darkMode === "true") {
            console.log("now dark");
            this.tableClass = "table table-dark";
            this.requestUpdate();
        }
        else {
            this.tableClass = "table";
            this.requestUpdate();
        }
        var randArray = [];
        this.array = randArray;
        var catArray = this.categories;
        var weights = this.weights;
        var optionsWithScore2D = this.options;
        var options = [];
        for (var i = 0; i < optionsWithScore2D.length; i++) {
            options.push(optionsWithScore2D[i][0]);
        }
        var firstRow = ["Criteria", "Weight"];
        options.forEach(element => firstRow.push(element));
        this.array.push(firstRow);
        for (var i = 0; i < catArray.length; i++) {
            let row = [catArray[i], weights[i]];
            this.options.forEach(element => row.push(element[i + 1]));
            this.array.push(row);
        }
        var row1 = [" ", " "];
        this.options.forEach(element => row1.push(" "));
        this.array.push(row1);
        var posValues = [];
        var zeros = [];
        var negValues = [];
        var total = [];
        var scores = this.options.map(element => element.slice(1));
        for (var i = 0; i < scores.length; i++) {
            posValues.push(0);
            zeros.push(0);
            negValues.push(0);
            total.push(0);
            for (var k = 0; k < scores[i].length; k++) {
                var val = scores[i][k] * weights[k];
                if (val == 0) {
                    zeros[i] += 1;
                }
                else if (val > 0) {
                    posValues[i] += 1;
                }
                else {
                    negValues[i] += 1;
                }
                total[i] += val;
            }
        }
        var row = [];
        row = [];
        row.push("#+'s");
        row.push(" ");
        row = row.concat(posValues);
        this.array.push(row);
        row = [];
        row.push("#0's");
        row.push(" ");
        row = row.concat(zeros);
        this.array.push(row);
        row = [];
        row.push("#-'s");
        row.push(" ");
        row = row.concat(negValues);
        this.array.push(row);
        row = [];
        row.push("Total");
        row.push(" ");
        row = row.concat(total);
        this.array.push(row);
    }
}
//All the styling for the web component.
PughChart.styles = css `
    :host {
      display: var(--host-display,block);
      padding: 25px;
      color: var(--pugh-chart-text-color, #000);
    }
    .numInput{
      width:50px;
    }

    .wordInput{
      width: 80px;
    }

    .parentDiv{
      list-style: none;
      white-space: nowrap;
    }

    input {
      border: 0.5px solid var(--accentColor,black);
      border-radius: 10%;
    }

    .categoryDiv{
      margin-left: 10px;
    }
    .parentDiv > button{
      display: inline-block;
    }
    .parentDiv > input{
      display: inline-block;
    }
    .parentDiv > div{
      display: inline-block;
    }

    span{
      color: transparent;  
      text-shadow: 0 0 0 #00ff00;
    }

    tr:nth-last-child(4){
      border-top: solid 3px var(--accentColor,black);
    }

    tr:nth-last-child(1){
      border-top: solid 3px var(--accentColor,black);
    }

    tr:nth-last-child(0){
      border-top: solid 3px var(--accentColor,black);
    }

    table tr:last-child{
      border-bottom: solid 3px var(--accentColor,black);
    }

    table{
      font-family: var(--tableFont,Arial);
    }

    button{
      background-color:transparent;
      border:none;
      text-align: center;
      transition-duration: 0.4s; 
      border-radius: 30%;
      color:white;
    }

  `;
__decorate([
    property()
], PughChart.prototype, "href", void 0);
__decorate([
    property()
], PughChart.prototype, "tableClass", void 0);
__decorate([
    property()
], PughChart.prototype, "theadClass", void 0);
__decorate([
    property()
], PughChart.prototype, "trClass", void 0);
__decorate([
    property()
], PughChart.prototype, "tdClass", void 0);
__decorate([
    property()
], PughChart.prototype, "thClass", void 0);
__decorate([
    property()
], PughChart.prototype, "tBodyClass", void 0);
__decorate([
    property()
], PughChart.prototype, "inputCategories", void 0);
__decorate([
    property()
], PughChart.prototype, "inputWeights", void 0);
__decorate([
    property()
], PughChart.prototype, "inputOptions", void 0);
__decorate([
    property({ type: Array })
], PughChart.prototype, "categories", void 0);
__decorate([
    property({ type: Array })
], PughChart.prototype, "weights", void 0);
__decorate([
    property({ type: Array })
], PughChart.prototype, "options", void 0);
__decorate([
    property({ type: Array })
], PughChart.prototype, "array", void 0);
__decorate([
    property({ type: Boolean })
], PughChart.prototype, "editBool", void 0);
__decorate([
    property()
], PughChart.prototype, "darkMode", void 0);
__decorate([
    property({ type: Boolean })
], PughChart.prototype, "firstTime", void 0);
__decorate([
    query('#newcriteria')
], PughChart.prototype, "criteriaInput", void 0);
__decorate([
    query('#newoption')
], PughChart.prototype, "optionInput", void 0);
//# sourceMappingURL=PughChart.js.map