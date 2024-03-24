import { environment } from 'src/environments/environment';

export class PhoneUtil {

    static maskPhone(phone_number: any) {
        phone_number = PhoneUtil.withoutCountryCode(phone_number).replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        phone_number = !phone_number[2] ?
        phone_number[1] : '(' + phone_number[1] + ') ' + phone_number[2] + (phone_number[3] ? '-' + phone_number[3] : '');
        return phone_number.trim();
    }

    static getCountryCode() {
        const CountryCode = localStorage.getItem('COUNTRY_CODE');
        if(CountryCode){
            return CountryCode;
        }
        return environment.production ? `+1` : `+91`;
    }

    static extractPhone(phone: string) {
        return phone ? phone.replace(/\D/g, '') : '';
    }

    static withCountryCode(phone: string): string {
        const withCountryCode =  phone.startsWith('+') ? phone : `${PhoneUtil.getCountryCode()}${phone}`;
        return withCountryCode.trim();
    }

    static withoutCountryCode(phone: string): string {
        if(!phone) return '';
        return phone.replace(PhoneUtil.getCountryCode(), '').trim();
    }

    static isPhone(phone: string): boolean {
         return (/^\d*$/.test(phone) && phone.length > 9 && phone.length < 12)
    }

}
