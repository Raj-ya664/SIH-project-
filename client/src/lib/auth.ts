interface User {
  id: string;
  username: string;
  role: 'admin' | 'faculty' | 'student';
  email?: string;
}

class AuthService {
  private user: User | null = null;

  getUser(): User | null {
    if (!this.user) {
      const stored = localStorage.getItem('edutime-user');
      if (stored) {
        this.user = JSON.parse(stored);
      }
    }
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('edutime-user', JSON.stringify(user));
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('edutime-user');
  }

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();
