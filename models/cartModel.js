class Cart {
    constructor(user) {
        this.user = user;
        this.formations = [];
    }

    addFormation(newFormation) {
        this.formations.push(newFormation);
    }

    removeFormation(deleteFormation) {
        this.formations = this.formations.filter(item => item != deleteFormation);
    }
}

module.exports = Cart;