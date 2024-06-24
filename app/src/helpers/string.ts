export class StringHelper {
  static formatAddress(address: string | null | undefined, city: string | null | undefined, state: string | null | undefined, zip: string | null | undefined): string {
    const formattedAddress = address ? `${address} ` : '';
    const formattedCity = city ? `${city}, ` : '';
    const formattedState = state ? `${state} ` : '';
    const formattedZip = zip ? `${zip} ` : '';
    return `${formattedAddress}${formattedCity}${formattedState}${formattedZip}`;
  }
}

