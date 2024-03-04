import { useQuery   } from "@tanstack/react-query";
import { githubApi  } from "../../api/githubApi";
import { Label      } from "../interfaces/label";
import { sleep } from "../../helpers/sleep";

const getLabels = async():Promise<Label[]> => {

    //Sleep lo usamos unicamente para ver como useQuery cambia de estado cuando salimos del foco

    await sleep( 2 );
    
    const { data } = await githubApi.get<Label[]>( '/labels' );

    return data;
}

export const useLabels = () => {

    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        //De esta manera evitamos que, por defecto, reactQuery no vuelva a actualizar la data cada vez que perdemos el foco y volvemos a tomarlo en la app
        refetchOnWindowFocus: false,
        //El tiempo que queremos nuestra data este cacheada, para el ejemplo la dejamos una hora
        staleTime: 1000 * 60 * 60 ,
        //Sirve para mostrar informacion antes de que aparezca la data de la api
        //Podemos usar initialData tambien, la diferencia con placeholderData es que, si tenemos staleTime activado, va a considerar a la data del arreglo fresca y la va a dejar en cache
        //InitialData solo sirve si tenes de antemano la data con la cual vas a trabajar
        placeholderData: [
            {
                "id":791921801,
                "node_id":"MDU6TGFiZWw3OTE5MjE4MDE=",
                "url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
                "name":"❤️",
                "color":"ffffff",
                "default":false,
            },
            {
                "id":69105383,
                "node_id":"MDU6TGFiZWw2OTEwNTM4Mw==",
                "url":"https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
                "name":
                "Browser: IE",
                "color":"c7def8",
                "default":false,
            }
        ],
        //
    });

    return labelsQuery;
}