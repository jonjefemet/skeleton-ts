export default interface UseCase<T, U> {
    excute( port: T ): Promise<U>;
}