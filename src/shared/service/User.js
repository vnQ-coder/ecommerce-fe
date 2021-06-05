const roles = { admin: 'admin', user: 'user', vendor: 'vendor' };
class User {
    user = null;

    constructor(user) {
      this.user = user;
    }

    isLoggedIn() { return !!this.user; }

    isAdmin() { return this.isLoggedIn() && this.user.role === roles.admin; }

    isVendor() { return this.isLoggedIn() && this.user.role === roles.vendor; }

    isUser() { return this.isLoggedIn() && this.user.role === roles.user; }
}

export default User;
