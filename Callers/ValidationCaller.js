export class ValidationCaller
{
    constructor(data) {
        console.log('Hello from ValidationCaller');
        console.log('ValidationCaller params ', data.params);
        this.repositoryOne = new data.repositories.RepositoryOne();
        this.repositoryTwo = new data.repositories.RepositoryTwo();
    }
    
    isEqual() {
        console.log('Merge!');
    }
}