export default interface Adapter<T, U> {
    excute( port: T ): Promise<U>;
}