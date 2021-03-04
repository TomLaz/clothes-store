class NumberUtils {
    static getCurrency( amount: number ): string {
        const formatter = new Intl.NumberFormat( 'es-AR', {
            style: 'currency',
            currency: 'ARS'
        });
        return formatter.format( amount );
    }
}
export default NumberUtils;
