/**
 * 
 * @param args 
 * classnames('ass',['a','b'])
 * classnames('ass',{'ddd':true,'ccc':false})
 */

export const classnames = (...args: any) => {

    const classes = args.map((item: any) => {
        const itemType = typeof item
        if (itemType === 'string' || itemType === 'number') {
            return item
        } else if (Array.isArray(item)) {
            return classnames.apply(null, item)
        } else if (itemType === 'object') {
            const arr: string[] = []
            for (const classname of Object.keys(item)) {
                if (item[classname]) {
                    arr.push(classnames.call(null, classname))
                }
            }
            return arr.filter(t => t).join(' ')
        }
    })
    return classes.join(' ')



}