export function getCountriesKeysFromNumbers(numbers: number[]): string[] {
    const result: string[] = [];
    for (const number of numbers) {
        const countries = data[number];
        if (countries) {
            result.push(...countries);
        }
    }
    return result;
}
