interface ValueObjectProps {
    [key: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    protected readonly props: T;

    protected constructor(props: T) {
        this.props = Object.freeze({ ...props });
    }

    equal(vo?: ValueObject<T>): boolean {
        if (!vo) return false;
        return isEqual(this.props, vo.props);
    }
    
    getValue(): T {
        return this.props;
    }
}

function isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(key => isEqual(a[key], b[key]));
}