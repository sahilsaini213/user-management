export class StringUtil {

    static splitAndReturn(commaSeparatedString: string, index = 0, separator = ","): string {
        const token = commaSeparatedString.split(separator);
        return token[index];
    }

    static avatarLabel(text: string) {
        const tokens = text && text.length ? text.split(' ') : [];
        if(tokens.length>1){
            return tokens.map(tk => tk.charAt(0).toUpperCase()).join('').substring(0,2);
        } else {
            return text && text.substring(0,2);
        }
    }

}
