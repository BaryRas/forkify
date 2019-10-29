/*jshint esversion: 8 */
// https://crossorigin.me/

import axios from 'axios';
import { key, proxy } from '../config';

export default class Searh {
    constructor(query) {
        this.query = query;
    }

    async getResult() { 
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
    } catch (error) {
        alert(error);
    }
}





// getResult("pizza");