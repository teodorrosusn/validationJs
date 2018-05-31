/******************>CALLERS<******************/
import { ValidationCaller } from '../Callers/ValidationCaller.js';

/******************>REPOSITORIES<******************/
import { RepositoryOne } from '../Repositories/RepositoryOne.js';
import { RepositoryTwo } from '../Repositories/RepositoryTwo.js';

export class ValidationProvider
{
    constructor() {
        this._callers = {
            ValidationCaller: {
                instance    : ValidationCaller,
                repositories: {
                    RepositoryOne: RepositoryOne, 
                    RepositoryTwo: RepositoryTwo
                }
            }
        }
    }
}