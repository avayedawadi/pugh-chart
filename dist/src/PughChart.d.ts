import { LitElement } from 'lit-element';
/**
 * A text field web component
 */
export declare class PughChart extends LitElement {
    href: string;
    tableClass: string;
    theadClass: string;
    trClass: string;
    tdClass: string;
    thClass: string;
    tBodyClass: string;
    inputCategories: string;
    inputWeights: string;
    inputOptions: string;
    categories: any[];
    weights: any[];
    options: any[][];
    array: (string | number)[][];
    editBool: boolean;
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
