export interface IVehicle {
    id?: number,
    placa: string,
    chassi: string,
    renavam: string,
    modelo: string,
    marca: string,
    ano: number
}

export interface IFilterOptions {
    chassis: string[],
    modelos: string[],
    marcas: string[],
    anos: number[]
}