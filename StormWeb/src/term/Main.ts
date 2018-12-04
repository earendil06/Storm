import App from "../Application";

export default class Term {
    static main() {
        (window as any).app = new App({
            el: '#container'
        });
    }
}