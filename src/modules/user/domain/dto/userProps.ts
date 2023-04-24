export interface UserProps {
    id: string,
    user: string,
    password: string,
    firtsName: string,
    lastName: string,
    email: string,
    age: number,
}

export interface UserAction {
    fullName(): string;
}