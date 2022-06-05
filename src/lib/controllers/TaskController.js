import EthersProvider from "$lib/contracts/ethersProvider";
import { writable } from "svelte/store";

const beseState = {
    name: "loading...", 
    address: "loading...", 
    balance: "0.0", 
    tasks: [] 
    
}


class TaskController{
    #taskStore = writable({...beseState})

    constructor(){
        this.store={
            subscribe: this.#taskStore.subscribe
        }
    }

    async init(){
        this.ethersProvider = new EthersProvider(); 
        this.#getName(); 
    }

    async #getName() {
        await this.ethersProvider?.taskContract.getName(); 
        this.#taskStore.update(s=> ({...s, name}))
    }
}

export default new TaskController(); 