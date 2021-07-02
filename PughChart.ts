import { html, css, LitElement, property, query } from 'lit-element';
import { repeat } from 'lit/directives/repeat.js';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

/**
 * A text field web component
 */
export class PughChart extends LitElement {

  @property()
  href = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"

  @property()
  tableClass = "table table-striped"

  @property()
  theadClass = ""

  @property()
  trClass = ""

  @property()
  tdClass = ""

  @property()
  thClass = ""

  @property()
  tBodyClass = ""

  @property()
  inputCategories = ""

  @property()
  inputWeights = ""

  @property()
  inputOptions = ""

  @property({ type: Array })
  categories: any[] = [];

  @property({ type: Array })
  weights: any[] = [];

  @property({ type: Array })
  options: any[][] = []

  @property({ type: Array })
  array: (string | number)[][] = []

  @property({type: Boolean})
  editBool = false;

  @property()
  darkMode = "false";

  @property({type:Boolean})
  firstTime = true;

  render() {
    if(this.firstTime){
      this.categories = this.inputCategories.split(",");
      this.weights = this.inputWeights.split(",").map(element => parseInt(element));
      this.options = this.inputOptions.split("/").map(element => element.split(","));
      this.firstTime = false;
    }
    this.fillArray();
    /*if(this.editBool){
      for(var i = 1; i < this.array.length;i++){
        this.array[i].push(" ");
      }
    }else{
      if(this.array[1][this.array[1].length] === " "){
        for(var i = 1; i < this.array.length-1;i++){
          this.array[i].splice(this.array[1].length,1);
        }
      }
    }*/
    return html`
      <link rel="stylesheet" href="${this.href}">
    </div>
      <table class="${this.tableClass}">
        <thead class="${this.theadClass}">
          <tr class="${this.trClass}">
            ${this.array[0].map(
      (item, index) =>
        html`<th class="${this.thClass}" scope='col'>${(this.editBool && (1<index && index < this.options.length+2) ? html`<div class="parentDiv"><input class="wordInput" type="text" value="${this.array[0][index]}" @change=${(e: { target: { value: any; }; }) => { this.options[index-2][0] = e.target.value; this.requestUpdate(); }}><button @click=${()=>{this.deleteOption(index-2)}} class="" type="button">❌</button></div>` : this.array[0][index])}</th>`
    )}
    
    ${this.editBool ? html`<th class="${this.thClass}"><div class="parentDiv categoryDiv"><input id="newoption" placeholder="Category" type="text" class="wordInput"><button @click=${this.addOption} class="addButton" type="button"><span>➕</span></button></div>
    </th>`: ''}
    
          </tr>
        </thead>
        <tbody class="${this.tBodyClass}">
              ${this.array.slice(1).map(
      (item, i) =>
        html`<tr class="${this.trClass}"><th scope='row'>${(this.editBool && i < this.categories.length ? html`<div class="parentDiv"><input class="wordInput" type="text" value="${item[0]}" @change=${(e: { target: { value: any; }; }) => { this.categories[i] = e.target.value; this.requestUpdate(); }}><button @click=${() => {this.deleteCriteria(i)}} class="" type="button">❌</button></div>` : (i == this.categories.length && this.editBool ? html`<div class="parentDiv"><input id="newcriteria" placeholder="Criteria" type="text" class="wordInput"><button @click=${this.addCriteria} class="addButton" type="button"><span>➕</span></button></div>`:item[0]))}</th>${item.slice(1).map((item1, index1) => (i < this.weights.length && this.editBool ? html`<td><input class="numInput" type="number" value="${item1}" @change=${(e: { target: { value: any; }; }) => { index1 == 0 ? this.weights[i] = parseInt(e.target.value) : this.options[index1 - 1][i + 1] = parseInt(e.target.value); this.requestUpdate(); }}></td>` : html`<td>${item1}</td>`))}${(this.editBool ? html`<td></td>` : '')}</tr>`
    )}
        </tbody>
      </table>
      <button @click=${() => {this.editBool = !this.editBool;}} class="settingsButton" type="button">⚙️</button>

    `
  }
  @query('#newcriteria')
  criteriaInput!: HTMLInputElement;

  @query('#newoption')
  optionInput!: HTMLInputElement;

  addCriteria(){
    this.categories.push(this.criteriaInput.value);
    this.weights.push(0);
    for(var i = 0; i < this.options.length;i++){
      this.options[i].push(0);
    }
    this.requestUpdate();
    this.criteriaInput.value = '';
  }

  deleteCriteria(index:number){
    this.categories.splice(index,1);
    this.weights.splice(index,1);
    this.options.forEach((element,i)=>{this.options[i].splice(index+1,1)});
    this.requestUpdate();

  }

  addOption(){
    var entireOption = [];
    entireOption.push(this.optionInput.value);
    for(var i = 0; i < this.weights.length; i++){
      entireOption.push(0);
    }
    this.options.push(entireOption);
    this.requestUpdate();
    this.optionInput.value = '';

  }

  deleteOption(index:number){
    this.options.splice(index,1);
    this.requestUpdate();
  }


  //Creates the 2D array with all the information that the table will later be created with.
  fillArray() {
    if(this.darkMode === "true"){
      console.log("now dark")
      this.tableClass = "table table-dark"
      this.requestUpdate();
    }
    else{
      this.tableClass = "table"
      this.requestUpdate();
    }
    var randArray: (string | number)[][] = []
    this.array = randArray;
    var catArray = this.categories
    var weights = this.weights
    var optionsWithScore2D = this.options;
    var options: any[] = [];
    for (var i = 0; i < optionsWithScore2D.length; i++) {
      options.push(optionsWithScore2D[i][0])
    }
    var firstRow: string[] = ["Criteria", "Weight"];
    options.forEach(element => firstRow.push(element));
    this.array.push(firstRow);
    for (var i = 0; i < catArray.length; i++) {
      let row: any = [catArray[i], weights[i]];
      this.options.forEach(element => row.push(element[i + 1]));
      this.array.push(row);
    }
    var row1: any = [" "," "];
    this.options.forEach(element => row1.push(" "));
    this.array.push(row1);
    var posValues: number[] = [];
    var zeros: number[] = [];
    var negValues: number[] = [];
    var total: number[] = [];
    var scores: any[] = this.options.map(element => element.slice(1))
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
    var row: any[] = [];
    row = [];
    row.push("#+'s")
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
    row = []
    row.push("Total");
    row.push(" ");
    row = row.concat(total);
    this.array.push(row);

  }

  

  static styles = css`
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
}
