export interface tableConfig{
    alias: [string],
    encabezados: [string],
    multiseleccion?: boolean,
    titulo?: string,
    busqueda?: boolean
}

export interface datatableConfig{
    alias: Array<string>,
    encabezados: Array<string>,
    multiseleccion?: boolean,
    titulo?: string,
    busqueda?: boolean,
    ordenFilas?: boolean,
    numeroFilas?: Array<number>
}