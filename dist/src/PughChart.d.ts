import { LitElement } from 'lit-element';
/**
 *
 *  @element pugh-chart
 *
 *
 * */
export declare class PughChart extends LitElement {
    /**
   * This is the href used to style the component. By default it is the bootstrap CDN but it can be manually inputted by the user.
   * @type {string}
   */
    href: string;
    /**
    * This is the table class that is by default table table-striped (from Bootstrap). Can be manually inputted by the user.
    * @type {string}
    */
    tableClass: string;
    /**
    * thead class that is left blank but can be inputted by the user.
    * @type {string}
    */
    theadClass: string;
    /**
    * tr class that is left blank but can be inputted by the user.
    * @type {string}
    */
    trClass: string;
    /**
    * td class that is left blank but can be inputted by the user.
    * @type {string}
    */
    tdClass: string;
    /**
    * th class that is left blank but can be inputted by the user.
    * @type {string}
    */
    thClass: string;
    /**
    * tbody class that is left blank but can be inputted by the user.
    * @type {string}
    */
    tBodyClass: string;
    /**
    * These are the categories for the chart that must be inputted as a string with commas separating categories.
    * @type {string}
    */
    inputCategories: string;
    /**
   * These are the weights for the chart that must be inputted as a string with commas separating weights.
   * @type {string}
   */
    inputWeights: string;
    /**
   * These are the options for the chart that must be inputted as a string with commas sepearting score from header but a / separating groupings of entire options.
   * @type {string}
   */
    inputOptions: string;
    categories: any[];
    weights: any[];
    options: any[][];
    array: (string | number)[][];
    /**
    * Choose whether to have table editable as soon as it opens or not.
    * @type {Boolean}
    */
    editBool: boolean;
    /**
    * Choose whether to have the default table styling to be dark mode or not. Done as a string for testing purposes in Storybook. May be changed later.
    * @type {String}
    */
    darkMode: string;
    firstTime: boolean;
    render(): import("lit-element").TemplateResult;
    criteriaInput: HTMLInputElement;
    optionInput: HTMLInputElement;
    addCriteria(): void;
    deleteCriteria(index: number): void;
    addOption(): void;
    deleteOption(index: number): void;
    fillArray(): void;
    static styles: import("lit-element").CSSResult;
}
