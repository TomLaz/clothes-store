import React from 'react';
import { projectFirestore, timestamp } from './firebase';

const useFirestore = ( collection: string ): { docs: any[]; updateCollection: Function } => {
    const [ docs, setDocs ] = React.useState<any[]>( [] );

    const updateCollection =
    async ( keyProp: string, objectProp: any ): Promise<void> => {

        await projectFirestore.collection( collection ).doc( keyProp ).get()
            .then( async ( file ) => {
                if ( file.exists ) {
                    await projectFirestore.collection( collection ).doc( keyProp ).update({
                        createdAt: timestamp(),
                        products: objectProp
                    });
                } else {
                    await projectFirestore.collection( collection ).doc( keyProp ).set({
                        createdAt: timestamp(),
                        products: objectProp
                    });
                }
            });
    };

    React.useEffect( () => {
        const unsub = projectFirestore.collection( collection )
            .orderBy( 'createdAt', 'desc' )
            .onSnapshot( ( snap ) => {
                const documents: any[] = [];
                snap.forEach( ( doc ) => {
                    documents.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });
                setDocs( documents );
            });
        return (): void => unsub();

    }, [ collection ] );

    return { docs, updateCollection };
};

export default useFirestore;
