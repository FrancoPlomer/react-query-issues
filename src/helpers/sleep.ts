
export const sleep = ( seconds: number = 1 ):Promise<Boolean> => {

    return new Promise( ( resolve ) => {

        setTimeout(() => {

            resolve( true );
        }, seconds * 1000 );
    })
} 