/*jshint esversion: 8 */
// const proxy = 'https://cors-anywhere.herokuapp.com/';
// https://crossorigin.me/

import axios from 'axios';

export default class Searh {
    constructor(query) {
        this.query = query;
    }

    async getResult() { 
        const key = "d898e3565ece11c51599c589f0b33bb7"; 
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
    } catch (error) {
        alert(error);
    }
}





// getResult("pizza");