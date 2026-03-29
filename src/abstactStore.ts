import { Dispatch, useLayoutEffect, useState } from "react"

export abstract class AbstractStore {

    private ticket = 0;

    private checkPoint = 0;
    private watcherCnt = 0

    private watcherIndex = new Map<number, { setState: Dispatch<number>; callback?: () => Promise<boolean> | boolean }>()

    protected notify() {
        if (this.ticket === this.checkPoint) {
            Promise.resolve().then(() => {
                this.watcherIndex.forEach(async watcher => {
                    if (watcher.callback) {
                        (await watcher.callback()) && watcher.setState(this.ticket)
                    } else {
                        watcher.setState(this.ticket)
                    }
                    this.checkPoint = this.ticket
                })

            })
            this.ticket++;
        }


    }

    createEffectFb(setState: Dispatch<number>, callback?: () => Promise<boolean> | boolean) {
        const uniqueId = this.watcherCnt++
        return () => {
            this.watcherIndex.set(uniqueId, { setState, callback })
            return () => {
                this.watcherIndex.delete(uniqueId)
            }
        }
    }


}

export function useWatch(store: AbstractStore, callback?: () => Promise<boolean> | boolean) {
    const [, setState] = useState(0)
    useLayoutEffect(store.createEffectFb(setState, callback))

}

