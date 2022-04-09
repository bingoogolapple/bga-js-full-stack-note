import { History } from "history"

export default class Navigator {
    history?: History<History.UnknownFacade>

    private static instance: Navigator

    private constructor() { }

    static getInstance() {
        if (!Navigator.instance) {
            Navigator.instance = new Navigator()
        }
        return Navigator.instance
    }

    setup(history: History<History.UnknownFacade>) {
        this.history = history
    }
}
